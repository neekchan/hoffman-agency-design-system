/* title_check.js — the title line-break check (AGENTS.md Section 2.5 "The break is authored",
 * CHECKLIST.md "Every multi-line heading breaks only at its own <br>", POWERPOINT.md check 17).
 *
 * Every display heading must break only where the markup says (<br>). A heading whose rendered
 * line count exceeds its <br> count + 1 has wrapped on its own: the browser chose the word, the
 * phrase breaks mid-sense, and a PowerPoint export freezes that wrap. Also flags a heading whose
 * widest line fills under 55% of its measure, so it can be sized up (AGENTS.md Section 2.5,
 * "fill the width or size up").
 *
 * Use it one of three ways. The first two need no install and no dependencies:
 *   1. Devtools: open the deck in any browser (Chrome, Safari, Edge, Firefox), paste this whole
 *      file into the console, then run
 *        titleCheck()                    → a table in the console + the rows returned
 *        titleCheck('h1,h2')             → your own selector instead of the default list
 *      Every slide is measured, including the ones the stage is not showing (they are laid out,
 *      only hidden), so one call covers the whole deck.
 *   2. Headless: add <script src="tools/title_check.js" data-auto></script> at the end of the page;
 *      it writes JSON into <pre id="title-check-out"> once fonts settle, so
 *        "Google Chrome" --headless=new --allow-file-access-from-files --virtual-time-budget=8000 \
 *          --dump-dom file:///path/to/deck.html | grep -A1 'id="title-check-out"'
 *      prints the result inside the dumped DOM. Any Chromium works; no Python, no Playwright. On Windows:
 *        "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --allow-file-access-from-files ^
 *          --virtual-time-budget=8000 --dump-dom file:///C:/path/to/deck.html | findstr title-check-out
 *   3. CI: tools/title_check.py runs this same file through Playwright and exits 1 on a self-wrap.
 *      It is the only path that needs an install (pip install -r tools/requirements.txt).
 *
 * Precondition for every path: the system fonts (Poppins incl. ExtraBold, Libre Baskerville Italic)
 * must be installed or loaded on the page that renders. A substitute font wraps differently and
 * hides exactly the failure this looks for. Fallback fonts are reported in the `fonts` field.
 *
 * What it measures: h1, h2, h3, .title, .hero, .line3, .dv-title, .giant, .quote and .stat .n at
 * 40px or larger on the 1920×1080 canvas, on every deck-stage > section or section.slide.
 * Numbers are a measurement, not a verdict: a SELF-WRAP is a build failure (fix the <br> or the
 * size); `narrow` is a prompt to size up, not a rule.
 */
(function () {
  const SEL = 'h1,h2,h3,.title,.hero,.line3,.dv-title,.giant,.quote,.stat .n';
  const MIN_PX = 40;        // display tier only; body copy wraps by design
  const NARROW = 0.55;      // widest line under this share of the measure → "narrow"

  function measure(sel) {
    const out = [];
    const slides = [...document.querySelectorAll('deck-stage > section, section.slide')];
    const seen = new Set();
    slides.forEach((s, i) => {
      if (seen.has(s)) return; seen.add(s);
      const r = s.getBoundingClientRect(); const sc = r.width / 1920 || 1;
      s.querySelectorAll(sel).forEach((el) => {
        const brs = el.querySelectorAll('br').length;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let n; const tops = []; let maxRight = 0, minLeft = 1e9;
        while ((n = walker.nextNode())) {
          if (!n.textContent.trim()) continue;
          const rg = document.createRange(); rg.selectNodeContents(n);
          for (const q of rg.getClientRects()) {
            if (q.width < 1) continue;
            const m = (q.top + q.bottom) / 2;
            if (!tops.some((t) => Math.abs(t - m) < 6 * sc)) tops.push(m);
            maxRight = Math.max(maxRight, q.right); minLeft = Math.min(minLeft, q.left);
          }
        }
        const cs = getComputedStyle(el); const box = el.getBoundingClientRect();
        const fs = parseFloat(cs.fontSize);                       // computed styles are untransformed
        if (fs < MIN_PX || tops.length === 0) return;
        const measureW = Math.min(box.width / sc, parseFloat(cs.maxWidth) || 1e9);  // rects carry the stage scale, max-width does not
        const row = {
          slide: i + 1,
          label: s.getAttribute('data-label') || s.id || '',
          tag: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''),
          px: Math.round(fs), brs, lines: tops.length,
          widest: Math.round((maxRight - minLeft) / sc), measure: Math.round(measureW),
          fonts: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
          text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60),
        };
        row.flag = row.lines > row.brs + 1 ? 'SELF-WRAP' : (row.lines >= 2 && row.widest < NARROW * row.measure ? 'narrow' : '');
        out.push(row);
      });
    });
    const wrapped = out.filter((r) => r.flag === 'SELF-WRAP').length;
    const fallback = [...new Set(out.map((r) => r.fonts))].filter((f) => !/poppins|baskerville/i.test(f));
    return { rows: out, wrapped, fallbackFonts: fallback, ok: wrapped === 0 && fallback.length === 0 };
  }

  function titleCheck(sel) {
    const res = measure(sel || SEL);
    if (typeof console.table === 'function') console.table(res.rows.map(({ slide, label, tag, px, lines, brs, widest, measure, flag, text }) => ({ slide, label, tag, px, lines, brs, widest, measure, flag, text })));
    console.log(`headings that wrapped on their own: ${res.wrapped}` + (res.fallbackFonts.length ? `  ·  FALLBACK FONTS IN USE: ${res.fallbackFonts.join(', ')} — install Poppins + Libre Baskerville Italic and re-run` : ''));
    console.log(res.ok ? 'title check: PASS' : 'title check: FAIL');
    return res;
  }
  window.titleCheck = titleCheck;
  window.__titleCheckMeasure = measure;

  const me = document.currentScript;
  if (me && me.hasAttribute('data-auto')) {
    const run = () => {
      const res = measure(me.getAttribute('data-selector') || SEL);
      const pre = document.getElementById('title-check-out') || document.body.appendChild(Object.assign(document.createElement('pre'), { id: 'title-check-out' }));
      pre.textContent = JSON.stringify(res);
    };
    const go = () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(run, 1500));
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
  }
})();
