#!/usr/bin/env node
/**
 * lint-deck.js — rendered-output linter for Hoffman decks (enforcement teeth).
 *
 * The catalog validator (validate-design-system.js) only checks manifests. This
 * tool RENDERS a deck in headless Chromium at 1920×1080 and measures the pixels,
 * catching the failures the written rules keep hitting:
 *
 *   • type below the slide floor (tiny fonts)            → AGENTS.md §1
 *   • titles that truncate / clip                        → AGENTS.md §2.5
 *   • titles / content that under-fill the width         → AGENTS.md §2.5
 *   • right-side or lower-band dead space                → AGENTS.md §2, §2.5
 *   • content slides with no image/graphic/emoji         → AGENTS.md §3
 *   • near-invisible text (real white-on-white)          → CHECKLIST "Surfaces"
 *   • content overflowing the 1920×1080 frame
 *   • brand tokens / component bundle not loaded         → root-cause #0
 *
 * Contrast is measured from the ACTUAL rendered pixel behind each text run
 * (screenshot → decoded in-page on a canvas), so layered colour surfaces and
 * SVG/gradient fills read correctly instead of tripping a naive CSS walk.
 *
 * Usage:
 *   node tools/lint-deck.js <deck.html> [more.html ...] [options]
 *   npm run lint:deck -- path/to/deck.html
 *
 * Options:
 *   --json          machine-readable output
 *   --strict        exit non-zero on WARN too, and if the browser can't launch
 *   --quiet         only print slides that have findings
 *   --no-contrast   skip pixel contrast sampling (faster)
 *   --max-slides=N  stop after N slides (default 200)
 *
 * Exit codes: 0 = clean (or only warnings without --strict); 1 = errors found;
 * 2 = usage error. If Playwright/Chromium is unavailable the linter prints an
 * install hint and exits 0 (use --strict to make that a failure in CI).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const opts = {
  json: argv.includes('--json'),
  strict: argv.includes('--strict'),
  quiet: argv.includes('--quiet'),
  contrast: !argv.includes('--no-contrast'),
  maxSlides: 200,
};
const maxArg = argv.find((a) => a.startsWith('--max-slides='));
if (maxArg) opts.maxSlides = parseInt(maxArg.split('=')[1], 10) || 200;
const files = argv.filter((a) => !a.startsWith('--'));

if (!files.length) {
  console.error('usage: node tools/lint-deck.js <deck.html> [more.html ...] [--json] [--strict] [--quiet] [--no-contrast]');
  process.exit(2);
}

// ---- thresholds (kept in one place so they are easy to tune) ----
const T = {
  FONT_FLOOR: 20,        // px — hard floor for any non-chrome text (AGENTS §1)
  BODY_SOFT: 24,         // px — warn for real body paragraphs (<p>/<li>, >25 chars) under this
  CONTRAST_ERR: 1.6,     // ratio — below this, text is effectively invisible
  CONTRAST_WARN: 2.5,    // ratio — below this, contrast is weak
  TITLE_MIN_PX: 48,      // px — a text element this big with no title class is treated as the title
  TITLE_UNDERFILL: 0.45, // title single-line width < 45% of frame → underfill candidate
  DEADSPACE_RIGHT: 0.62, // rightmost content < 62% of width → right-side dead space
  DEADSPACE_BOTTOM: 0.72,// lowest content < 72% of height → lower-band dead space
  VISUAL_MIN_AREA: 400,  // px² — ignore visuals smaller than this when counting graphics
  OVERFLOW_TOL: 2,       // px — tolerance before calling something an overflow
};

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  try { ({ chromium } = require('playwright-core')); } catch (e2) { /* handled below */ }
}

// Runs INSIDE the page for each slide. `shot` is a PNG data-URL of the slide (or null).
/* istanbul ignore next */
async function MEASURE(args) {
  const { index, mode, count, T, shot } = args;
  const isEl = (n) => n && n.nodeType === 1;
  const isEdge = index === 0 || index === count - 1; // covers/closings use space differently
  const CHROME = '[class*="deck-num" i],[class*="slide-num" i],[class*="page-num" i],[class*="pagenum" i],'
    + '[class*="eyebrow" i],[class*="kicker" i],[class*="mono" i],[class*="logo" i],[class*="foot" i],'
    + '[class*="chip" i],[class*="tag" i],[class*="caption" i],[class*="credit" i],[class*="source" i],[class*="thumb" i]';
  const isChrome = (el) => !!el.closest(CHROME);

  function slideEl() {
    if (mode === 'stage') {
      const st = document.querySelector('deck-stage');
      const kids = [...st.children].filter((el) => isEl(el) && !['SCRIPT', 'TEMPLATE', 'STYLE', 'LINK'].includes(el.tagName));
      return kids[index];
    }
    if (mode === 'flow') return document.querySelectorAll('.slide, section.slide, [data-slide]')[index];
    return document.body;
  }
  const slide = slideEl();
  if (!slide) return { error: 'no slide element at index ' + index };
  const sr = slide.getBoundingClientRect();
  const FW = Math.round(sr.width) || 1920;
  const FH = Math.round(sr.height) || 1080;
  const L = (r) => ({ left: r.left - sr.left, top: r.top - sr.top, right: r.right - sr.left, bottom: r.bottom - sr.top });

  const findings = [];
  const add = (sev, msg) => findings.push({ sev, msg });

  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  const directText = (el) => {
    let t = '';
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.textContent;
    return t.trim();
  };
  const parseColor = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x));
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (fg, bg) => {
    const a = lum(fg), b = lum(bg), hi = Math.max(a, b), lo = Math.min(a, b);
    return (hi + 0.05) / (lo + 0.05);
  };

  // ---- decode the slide screenshot to a pixel buffer (browser's own PNG decoder) ----
  let PX = null, PW = 0, PH = 0;
  if (shot) {
    try {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = shot; });
      PW = img.naturalWidth; PH = img.naturalHeight;
      const cv = document.createElement('canvas');
      cv.width = PW; cv.height = PH;
      const ctx = cv.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      PX = ctx.getImageData(0, 0, PW, PH).data;
    } catch (e) { PX = null; }
  }
  // `shot` is an INK-FREE background plate (all text was hidden before the screenshot),
  // so any pixel in a text element's box is the true surface colour behind that text.
  const sampleBg = (r) => {
    if (!PX) return null;
    const sx = PW / FW, sy = PH / FH; // plate may be scaled vs. CSS px
    const cx0 = r.left + (r.right - r.left) * 0.25, cx1 = r.left + (r.right - r.left) * 0.75;
    const cy0 = r.top + (r.bottom - r.top) * 0.25, cy1 = r.top + (r.bottom - r.top) * 0.75;
    const rs = [], gs = [], bs = [];
    const nx = 5, ny = 3;
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
      const x = Math.round((cx0 + (cx1 - cx0) * (i + 0.5) / nx) * sx);
      const y = Math.round((cy0 + (cy1 - cy0) * (j + 0.5) / ny) * sy);
      if (x < 0 || y < 0 || x >= PW || y >= PH) continue;
      const idx = (y * PW + x) * 4;
      rs.push(PX[idx]); gs.push(PX[idx + 1]); bs.push(PX[idx + 2]);
    }
    if (!rs.length) return null;
    const med = (a) => { a.sort((p, q) => p - q); return a[Math.floor(a.length / 2)]; };
    return { r: med(rs), g: med(gs), b: med(bs) };
  };

  const all = [...slide.querySelectorAll('*')];
  const overGraphic = (() => {
    const rects = all
      .filter((el) => (/^(SVG|CANVAS|IMG|PICTURE|VIDEO)$/.test(el.tagName) || /chart/i.test(el.className || '')) && visible(el))
      .map((el) => { const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, rt: r.right, b: r.bottom }; });
    return (el) => {
      const r = el.getBoundingClientRect(); const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
      return rects.some((g) => cx >= g.l && cx <= g.rt && cy >= g.t && cy <= g.b);
    };
  })();

  let contentRight = 0, contentBottom = 0, hasContent = false;
  let biggest = null, biggestPx = 0;

  for (const el of all) {
    if (!visible(el)) continue;
    const cs = getComputedStyle(el);
    const txt = directText(el);
    const chrome = isChrome(el);

    if (txt) {
      const fpx = parseFloat(cs.fontSize);
      if (!chrome) {
        const r = L(el.getBoundingClientRect());
        contentRight = Math.max(contentRight, r.right);
        contentBottom = Math.max(contentBottom, r.bottom);
        hasContent = true;
        if (fpx > biggestPx) { biggestPx = fpx; biggest = el; }
      }
      // font floor
      if (!chrome && fpx < T.FONT_FLOOR) {
        add('ERROR', `text below ${T.FONT_FLOOR}px floor (${Math.round(fpx)}px): "${txt.slice(0, 40)}"`);
      } else if (!chrome && /^(P|LI)$/.test(el.tagName) && fpx < T.BODY_SOFT && el.children.length === 0 && txt.length > 25) {
        add('WARN', `body copy under ${T.BODY_SOFT}px (${Math.round(fpx)}px): "${txt.slice(0, 40)}"`);
      }
      // contrast — from the real rendered pixel behind the text
      const fg = parseColor(cs.color);
      if (fg && PX) {
        const bg = sampleBg(L(el.getBoundingClientRect()));
        if (bg) {
          const ratio = contrast(fg, bg);
          if (ratio < T.CONTRAST_ERR) {
            if (overGraphic(el)) add('WARN', `low contrast ${ratio.toFixed(2)}:1 over a graphic — verify by eye: "${txt.slice(0, 40)}"`);
            else add('ERROR', `near-invisible text, contrast ${ratio.toFixed(2)}:1: "${txt.slice(0, 40)}"`);
          } else if (ratio < T.CONTRAST_WARN && !chrome) {
            add('WARN', `weak contrast ${ratio.toFixed(2)}:1: "${txt.slice(0, 40)}"`);
          }
        }
      }
    }

    // overflow — text should never clip (ERROR); a media element past the edge is usually an intentional bleed (WARN)
    const isMedia = /^(IMG|SVG|CANVAS|VIDEO|PICTURE)$/.test(el.tagName) || /placeholder|chart/i.test(el.className || '');
    if ((txt || isMedia) && cs.overflow !== 'hidden') {
      const r = L(el.getBoundingClientRect());
      const over = [];
      if (r.right > FW + T.OVERFLOW_TOL) over.push(`right +${Math.round(r.right - FW)}px`);
      if (r.bottom > FH + T.OVERFLOW_TOL) over.push(`bottom +${Math.round(r.bottom - FH)}px`);
      if (r.left < -T.OVERFLOW_TOL) over.push(`left ${Math.round(r.left)}px`);
      if (r.top < -T.OVERFLOW_TOL) over.push(`top ${Math.round(r.top)}px`);
      if (over.length && (txt.length > 1 || isMedia)) {
        const sev = txt ? 'ERROR' : 'WARN';
        add(sev, `overflows frame (${over.join(', ')})${txt ? ': "' + txt.slice(0, 30) + '"' : ' [' + el.tagName.toLowerCase() + ' bleed]'}`);
      }
    }

    if (isMedia && !chrome) {
      const br = el.getBoundingClientRect();
      if (br.width * br.height >= T.VISUAL_MIN_AREA) {
        const r = L(br);
        contentRight = Math.max(contentRight, r.right);
        contentBottom = Math.max(contentBottom, r.bottom);
        hasContent = true;
      }
    }
  }

  // ---- title checks ----
  let title = slide.querySelector('h1, h2, [class*="title" i], [class*="headline" i]');
  if (title && (!visible(title) || !directText(title))) {
    title = [...slide.querySelectorAll('h1,h2,[class*="title" i],[class*="headline" i]')].find((t) => visible(t) && directText(t)) || null;
  }
  if (!title && biggest && biggestPx >= T.TITLE_MIN_PX) title = biggest;
  if (title && visible(title)) {
    const cs = getComputedStyle(title);
    const fpx = parseFloat(cs.fontSize);
    if (cs.textOverflow === 'ellipsis' && title.scrollWidth > title.clientWidth + 2) {
      add('ERROR', `title truncated with ellipsis: "${directText(title).slice(0, 40)}"`);
    } else if (title.scrollWidth > title.clientWidth + 2 && /hidden|clip/.test(cs.overflowX + cs.overflow)) {
      add('ERROR', `title clipped (scrollW ${title.scrollWidth} > clientW ${title.clientWidth}): "${directText(title).slice(0, 40)}"`);
    }
    const r = L(title.getBoundingClientRect());
    const oneLine = (r.bottom - r.top) < fpx * 1.9;
    const wide = (r.right - r.left) >= T.TITLE_UNDERFILL * FW;
    if (oneLine && !wide && r.left < 0.2 * FW && !isEdge) {
      add('WARN', `title under-fills width (${Math.round(((r.right - r.left) / FW) * 100)}% of frame, one line) — grow it, wrap it, or fill the right: "${directText(title).slice(0, 40)}"`);
    }
  }

  // ---- dead space (skipped on covers/closings, which use space differently) ----
  if (hasContent && !isEdge) {
    if (contentRight < T.DEADSPACE_RIGHT * FW) {
      add('WARN', `right ~${Math.round((1 - contentRight / FW) * 100)}% of the frame is empty — fill with imagery/type or widen the content (§2.5)`);
    }
    if (contentBottom < T.DEADSPACE_BOTTOM * FH) {
      add('WARN', `lower ~${Math.round((1 - contentBottom / FH) * 100)}% of the frame is empty — fill the lower third (§2)`);
    }
  }

  // ---- missing visual ----
  const visuals = [...slide.querySelectorAll('img, svg, canvas, video, picture, fluent-emoji, [class*="placeholder" i], [class*="chart" i]')]
    .filter((v) => !isChrome(v) && visible(v) && (() => { const b = v.getBoundingClientRect(); return b.width * b.height >= T.VISUAL_MIN_AREA; })());
  if (!visuals.length) add('WARN', 'no image/graphic/emoji on this slide — imagery is the default (§3)');

  return { FW, FH, findings };
}

function docModel(page) {
  return page.evaluate(() => {
    const navy = getComputedStyle(document.documentElement).getPropertyValue('--tha-navy').trim();
    let cssLinked = false;
    for (const ss of document.styleSheets) if (ss.href && /colors_and_type\.css/.test(ss.href)) cssLinked = true;
    const tokens = !!navy || cssLinked;
    let bundleScript = false;
    for (const s of document.scripts) if (s.src && /_ds_bundle/.test(s.src)) bundleScript = true;
    const components = !!document.querySelector('deck-stage, fluent-emoji');
    const globalNs = Object.keys(window).some((k) => /HoffmanAgencyDesignSystem/.test(k));
    const bundle = bundleScript || components || globalNs;
    const stage = document.querySelector('deck-stage');
    let mode = 'single', count = 1, canDrive = false;
    if (stage) {
      const kids = [...stage.children].filter((el) => el.nodeType === 1 && !['SCRIPT', 'TEMPLATE', 'STYLE', 'LINK'].includes(el.tagName));
      if (kids.length) { mode = 'stage'; count = kids.length; canDrive = typeof stage.goTo === 'function'; }
    }
    if (mode === 'single') {
      const s = document.querySelectorAll('.slide, section.slide, [data-slide]');
      if (s.length) { mode = 'flow'; count = s.length; }
    }
    return { tokens, bundle, mode, count, canDrive };
  });
}

function slideRect(page, mode, index) {
  return page.evaluate(({ mode, index }) => {
    let el;
    if (mode === 'stage') {
      const st = document.querySelector('deck-stage');
      el = [...st.children].filter((n) => n.nodeType === 1 && !['SCRIPT', 'TEMPLATE', 'STYLE', 'LINK'].includes(n.tagName))[index];
    } else if (mode === 'flow') {
      el = document.querySelectorAll('.slide, section.slide, [data-slide]')[index];
      if (el) el.scrollIntoView();
    } else { el = document.body; }
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: Math.min(r.width, innerWidth), height: Math.min(r.height, innerHeight) };
  }, { mode, index });
}

async function lintFile(browser, file) {
  const abs = path.resolve(file);
  if (!fs.existsSync(abs)) return { file, error: 'file not found' };
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const result = { file, slides: [], docFindings: [] };
  try {
    await page.goto('file://' + abs, { waitUntil: 'load', timeout: 30000 });
    try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}
    await page.waitForTimeout(250);
    const doc = await docModel(page);
    result.mode = doc.mode; result.count = doc.count;
    if (!doc.tokens) result.docFindings.push({ sev: 'ERROR', msg: 'brand tokens not loaded — no --tha- vars and no colors_and_type.css (built outside the system?)' });
    if (!doc.bundle) result.docFindings.push({ sev: 'WARN', msg: 'component bundle may not be loaded — no deck-stage / fluent-emoji / _ds_bundle' });

    const n = Math.min(doc.count, opts.maxSlides);
    for (let i = 0; i < n; i++) {
      if (doc.mode === 'stage' && doc.canDrive) {
        await page.evaluate((idx) => { document.querySelector('deck-stage').goTo(idx); }, i);
        await page.waitForTimeout(180);
      } else if (doc.mode === 'stage' && !doc.canDrive && i > 0) {
        result.slides.push({ index: i, skipped: 'cannot drive deck-stage (no goTo)' });
        continue;
      }
      // Measure the FINAL render, not a mid-reveal frame: let entrance animations
      // register, then seek every running animation to its end state.
      await page.evaluate(() => new Promise((res) => {
        const finish = () => {
          try { document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }); } catch (e) {}
          res();
        };
        requestAnimationFrame(() => requestAnimationFrame(finish));
      }));
      await page.waitForTimeout(80);
      let shot = null;
      if (opts.contrast) {
        // capture an INK-FREE background plate: hide all glyphs, screenshot, restore.
        // Sampling this plate gives the true surface colour behind each text run,
        // so bold/visible text can't corrupt the reading (and real white-on-white shows).
        let tag = null;
        try {
          const clip = await slideRect(page, doc.mode, i);
          tag = await page.addStyleTag({ content: '*{color:transparent !important;text-shadow:none !important;-webkit-text-fill-color:transparent !important;}' });
          await page.waitForTimeout(40);
          const buf = await page.screenshot(clip && clip.width > 1 ? { clip } : {});
          shot = 'data:image/png;base64,' + buf.toString('base64');
        } catch (e) { shot = null; }
        if (tag) { try { await tag.evaluate((n) => n.remove()); } catch (e) {} }
      }
      const m = await page.evaluate(MEASURE, { index: i, mode: doc.mode, count: doc.count, T, shot });
      result.slides.push({ index: i, ...m });
    }
  } catch (e) {
    result.error = String((e && e.message) || e);
  } finally {
    await page.close();
  }
  return result;
}

function report(results) {
  let errors = 0, warns = 0;
  const C = { reset: '\x1b[0m', red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m', dim: '\x1b[2m', bold: '\x1b[1m' };
  const useColor = process.stdout.isTTY;
  const col = (c, s) => (useColor ? c + s + C.reset : s);

  for (const r of results) {
    console.log('\n' + col(C.bold, r.file) + (r.mode ? col(C.dim, `  (${r.count} ${r.mode} slide${r.count === 1 ? '' : 's'})`) : ''));
    if (r.error) { console.log('  ' + col(C.red, 'ERROR ') + r.error); errors++; continue; }
    for (const d of r.docFindings) {
      if (d.sev === 'ERROR') errors++; else warns++;
      console.log('  ' + col(d.sev === 'ERROR' ? C.red : C.yellow, d.sev.padEnd(5)) + ' ' + d.msg);
    }
    for (const s of r.slides) {
      const label = `  slide ${String(s.index + 1).padStart(2, '0')}`;
      if (s.skipped) { if (!opts.quiet) console.log(label + col(C.dim, '  · ' + s.skipped)); continue; }
      if (s.error) { console.log(label + '  ' + col(C.red, 'ERROR ') + s.error); errors++; continue; }
      const found = s.findings || [];
      if (!found.length) { if (!opts.quiet) console.log(label + col(C.green, '  · clean')); continue; }
      console.log(label);
      for (const d of found) {
        if (d.sev === 'ERROR') errors++; else warns++;
        console.log('    ' + col(d.sev === 'ERROR' ? C.red : C.yellow, d.sev.padEnd(5)) + ' ' + d.msg);
      }
    }
  }
  console.log('\n' + col(C.bold, `summary: ${errors} error(s), ${warns} warning(s)`));
  return { errors, warns };
}

(async () => {
  if (!chromium) {
    const msg = 'lint-deck: Playwright/Chromium not available. Install with `npm i -D playwright` '
      + 'and `npx playwright install chromium`, or run where a browser is present.';
    if (opts.json) console.log(JSON.stringify({ skipped: true, reason: 'no-playwright' }, null, 2));
    else console.error(msg);
    process.exit(opts.strict ? 1 : 0);
  }
  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    try {
      browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
    } catch (e2) {
      const msg = 'lint-deck: could not launch Chromium (' + ((e && e.message) || e) + ').';
      if (opts.json) console.log(JSON.stringify({ skipped: true, reason: 'launch-failed' }, null, 2));
      else console.error(msg);
      process.exit(opts.strict ? 1 : 0);
    }
  }
  const results = [];
  for (const f of files) results.push(await lintFile(browser, f));
  await browser.close();

  const anyErr = results.some((r) => r.error
    || (r.docFindings || []).some((d) => d.sev === 'ERROR')
    || (r.slides || []).some((s) => s.error || (s.findings || []).some((d) => d.sev === 'ERROR')));
  const anyWarn = results.some((r) => (r.docFindings || []).some((d) => d.sev === 'WARN')
    || (r.slides || []).some((s) => (s.findings || []).some((d) => d.sev === 'WARN')));

  if (opts.json) console.log(JSON.stringify(results, null, 2));
  else report(results);
  process.exit(anyErr || (opts.strict && anyWarn) ? 1 : 0);
})();
