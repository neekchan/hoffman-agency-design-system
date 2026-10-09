/* tile_count.js — the social count test (AGENTS.md Section 20, CHECKLIST.md "Social tiles & carousels").
 *
 * Counts what is actually on each square tile and checks it against the social budget:
 *   content elements ≤ 4 · words ≤ 15 · type sizes ≤ 3 + 1 hero · hand-drawn marks ≤ 1 ·
 *   accent colours ≤ 1 (beyond the surface and white/navy type) · quiet area ≥ 40%.
 *
 * Use it one of two ways — no install, no dependencies:
 *   1. Devtools: open the tile page, paste this whole file into the console, then run
 *        tileCount()                     → a table in the console + the rows returned
 *   2. Headless: add <script src="tools/tile_count.js" data-auto></script> at the end of the page;
 *      it writes JSON into <pre id="tile-count-out"> once fonts settle, so
 *        "Google Chrome" --headless=new --allow-file-access-from-files --virtual-time-budget=8000 \
 *          --dump-dom file:///path/to/page.html
 *      prints the result inside the dumped DOM.
 *
 * What it counts as a tile: section[data-screen-label] (the social-tile template) or [data-tile].
 * What it treats as chrome (excluded from words and elements, still counted as ink and sizes):
 *   anything inside .foot or [data-chrome] — the series marker, logo and handle.
 * Also excluded from words only: list markers ([data-marker], "01") and a quote's attribution or a
 *   source line ([data-source]) — they say "which one" and "says who", not the idea.
 * Marks: annotation SVGs (src contains /annotations/), .mk / .tha-highlight highlights, [data-mark].
 * Quiet area: every cell of an 8px grid that holds no type, mark, icon, logo or filled block.
 *   A photograph or a .tha-placeholder photo slot counts as quiet; so does the Storyline line used
 *   as a field (img src contains storyline-line) and anything marked [data-field].
 * Numbers in the report are a measurement, not a verdict on taste: paste them into the delivery
 * report as evidence, and give a one-line reason for any budget you break (CHECKLIST.md, LOCKS).
 */
(function () {
  const BUDGET = { elements: 4, words: 15, sizes: 4, marks: 1, accents: 1, quiet: 40 };

  // Reference points per colour family (tokens from colors_and_type.css). Navy tints are muted type,
  // not an accent, so the whole navy ramp sits in one family.
  const FAMILIES = {
    navy: ['#0E1C2B', '#12253A', '#182D43', '#233E58', '#35526F', '#5A7591', '#95A8BD', '#C8D2DD', '#E4E9EF', '#F3F5F8'],
    lime: ['#D2EB00', '#687600', '#DFEF4B', '#EEF7A2', '#FAFCE0'], violet: ['#CB65FF'], purple: ['#6103B9'],
    aqua: ['#86FFF1'], teal: ['#145F7B'], white: ['#FFFFFF', '#FAFAF7'], sand: ['#F1EFE7'],
  };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const NEUTRAL = new Set(['white', 'navy', 'sand']);
  const rgb = (s) => { const m = String(s).match(/[\d.]+/g); return m ? m.slice(0, 4).map(Number) : null; };
  function family(c) {
    const v = rgb(c); if (!v || (v.length === 4 && v[3] < 0.15)) return null;
    let best = null, bd = 1e9;
    for (const [k, list] of Object.entries(FAMILIES)) for (const h of list) {
      const f = hex(h); const d = (v[0] - f[0]) ** 2 + (v[1] - f[1]) ** 2 + (v[2] - f[2]) ** 2;
      if (d < bd) { bd = d; best = k; }
    }
    return best;
  }
  const isAccent = (fam, surface) => fam && fam !== surface && !NEUTRAL.has(fam);

  const isChrome = (el) => !!el.closest('.foot, [data-chrome]');
  const isPhoto = (el) => !!el.closest('.tha-placeholder, [data-field], [data-photo]') ||
    (el.tagName === 'IMG' && (/\.(jpe?g|webp|avif)(\?|$)/i.test(el.src) || /storyline-line/.test(el.src))) ||
    (el.tagName === 'IMG' && el.dataset.photo !== undefined);
  const isMark = (el) => (el.tagName === 'IMG' && /\/annotations\//.test(el.src)) ||
    el.matches('.mk, .tha-highlight, [data-mark]');

  function blockOf(node, tile) {
    let el = node.parentElement;
    while (el && el !== tile) {
      const d = getComputedStyle(el).display;
      if (!/^inline$/.test(d)) return el;
      el = el.parentElement;
    }
    return tile;
  }

  function measure(tile, W, H) {
    const host = document.createElement('div');
    host.style.cssText = `position:fixed;left:0;top:0;width:${W}px;height:${H}px;z-index:2147483647;overflow:hidden;`;
    const t = tile.cloneNode(true);
    t.style.width = W + 'px'; t.style.height = H + 'px'; t.style.display = getComputedStyle(tile).display === 'none' ? 'flex' : '';
    host.appendChild(t); document.body.appendChild(host);
    const box = t.getBoundingClientRect();
    const surface = family(getComputedStyle(t).backgroundColor);

    const cell = 8, cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
    const ink = new Uint8Array(cols * rows);
    const paint = (r) => {
      const x0 = Math.max(0, Math.floor((r.left - box.left) / cell)), y0 = Math.max(0, Math.floor((r.top - box.top) / cell));
      const x1 = Math.min(cols, Math.ceil((r.right - box.left) / cell)), y1 = Math.min(rows, Math.ceil((r.bottom - box.top) / cell));
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) ink[y * cols + x] = 1;
    };

    let words = 0; const sizeAt = []; const blocks = new Map(); const accents = new Set(); let marks = 0; let images = 0;
    const tw = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      const txt = n.textContent.replace(/\s+/g, ' ').trim();
      if (!txt) continue;
      const p = n.parentElement;
      if (p.closest('.tha-placeholder, [data-photo], script, style')) continue;
      const cs = getComputedStyle(p);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) if (q.width > 0.5) paint(q);
      const fs = Math.round(parseFloat(cs.fontSize)); sizeAt.push([blockOf(n, t), fs]);
      const fam = family(cs.color); if (isAccent(fam, surface)) accents.add(fam);
      if (isChrome(p)) continue;
      if (!p.closest('[data-marker], [data-source]')) words += txt.split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      const b = p.closest('[data-source]') || blockOf(n, t);
      const key = b.parentElement === t ? b : b;
      blocks.set(key, true);
    }
    for (const el of t.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue;
      if (isMark(el)) { marks++; paint(r); const fam = el.tagName === 'IMG' ? null : family(cs.backgroundColor); if (isAccent(fam, surface)) accents.add(fam); continue; }
      if (el.tagName === 'IMG' || el.tagName === 'svg' || el.tagName === 'SVG' || el.matches('.tha-placeholder')) {
        if (isPhoto(el)) { if (!isChrome(el) && el.matches('img, .tha-placeholder')) images++; continue; }
        paint(r); if (!isChrome(el)) images++; continue;
      }
      const bg = family(cs.backgroundColor);
      if (bg && bg !== surface && !isPhoto(el) && el !== t) {
        paint(r); if (isAccent(bg, surface)) accents.add(bg);
      }
    }
    // Siblings of the same tag and size read as one list: fold them into one element.
    // A list reads as one element: climb from each block, and wherever an ancestor has a twin sibling
    // (same tag, class, child count and font size — a repeated row), fold to the list that holds the rows.
    const hasTwin = (a) => a.parentElement && [...a.parentElement.children].some((x) => x !== a && x.tagName === a.tagName &&
      x.className === a.className && x.childElementCount === a.childElementCount && getComputedStyle(x).fontSize === getComputedStyle(a).fontSize && [...blocks.keys()].some((k) => x === k || x.contains(k)));
    const groups = new Set();
    for (const b of blocks.keys()) {
      let key = b;
      for (let a = b; a && a !== t && a.parentElement && a.parentElement !== t; a = a.parentElement) {
        if (hasTwin(a)) key = a.parentElement;
      }
      groups.add(key);
    }
    const elements = groups.size + images;
    let inked = 0; for (const v of ink) inked += v;
    const quiet = Math.round(100 * (1 - inked / ink.length));
    host.remove();

    // Type sizes: the hero block (the one holding the largest size) counts once, whatever its own
    // sub-sizes (a hero "81" with a half-size "%" is one typographic unit). Sizes within 12% of each
    // other read as one tier (a 22px handle beside a 24px eyebrow).
    const maxFs = Math.max(0, ...sizeAt.map((x) => x[1]));
    const heroBlock = (sizeAt.find((x) => x[1] === maxFs) || [])[0];
    const raw = [...new Set(sizeAt.filter((x) => x[0] !== heroBlock).map((x) => x[1]))].sort((a, b) => b - a);
    const tiers = []; for (const v of raw) { if (!tiers.length || v < tiers[tiers.length - 1] * 0.88) tiers.push(v); }
    const s = sizeAt.length ? [maxFs, ...tiers.filter((v) => v !== maxFs)] : [];
    const row = {
      tile: tile.dataset.screenLabel || tile.dataset.tile || '?', surface,
      elements, words, sizes: s.length, sizeList: s.join('/'), marks, accents: accents.size, accentList: [...accents].join('+') || '—', quiet,
    };
    const fails = [];
    if (row.elements > BUDGET.elements) fails.push(`elements ${row.elements}>${BUDGET.elements}`);
    if (row.words > BUDGET.words) fails.push(`words ${row.words}>${BUDGET.words}`);
    if (row.sizes > BUDGET.sizes) fails.push(`sizes ${row.sizes}>${BUDGET.sizes}`);
    if (row.marks > BUDGET.marks) fails.push(`marks ${row.marks}>${BUDGET.marks}`);
    if (row.accents > BUDGET.accents) fails.push(`accents ${row.accents}>${BUDGET.accents}`);
    if (row.quiet < BUDGET.quiet) fails.push(`quiet ${row.quiet}%<${BUDGET.quiet}%`);
    row.result = fails.length ? 'OVER: ' + fails.join(', ') : 'within budget';
    return row;
  }

  function tileCount(opts = {}) {
    const W = opts.width || 1080, H = opts.height || W;
    const tiles = [...document.querySelectorAll(opts.selector || 'section[data-screen-label], [data-tile]')];
    const rows = tiles.map((tl) => measure(tl, W, H));
    if (console.table) console.table(rows);
    return rows;
  }
  window.tileCount = tileCount;

  const me = document.currentScript;
  if (me && me.dataset.auto !== undefined) {
    const run = () => {
      const pre = document.getElementById('tile-count-out') || document.body.appendChild(Object.assign(document.createElement('pre'), { id: 'tile-count-out' }));
      try { pre.textContent = JSON.stringify(tileCount({ width: +me.dataset.width || 1080 })); }
      catch (e) { pre.textContent = JSON.stringify({ error: String(e) }); }
    };
    const go = () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(run, 1500));
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
  }
})();
