#!/usr/bin/env python3
"""Title line-break check (AGENTS.md Section 2.5, "The break is authored"; POWERPOINT.md check 17).
Every display heading must break only where the markup says (<br>). A heading whose rendered
line count exceeds its <br> count + 1 has wrapped on its own, which is what produces mid-phrase
breaks; the PowerPoint export would then freeze that wrap. Also reports each heading's widest line
against its measure so a title filling under ~55% can be sized up.
Usage: python3 tools/title_check.py deck.html [--selector "h1,h2,h3,.title"]   exit 1 on any self-wrap
Needs Playwright with Chromium. Render with the system fonts installed or the result is meaningless."""
import asyncio, sys
from playwright.async_api import async_playwright
SEL = 'h1,h2,h3,.title,.hero,.line3,.dv-title,.giant,.quote,.stat .n'
JS = r"""
(sel) => {
  const out = [];
  const slides = [...document.querySelectorAll('deck-stage > section, section.slide')];
  slides.forEach((s, i) => {
    const r = s.getBoundingClientRect(); const sc = r.width / 1920 || 1;
    s.querySelectorAll(sel).forEach(el => {
      const brs = el.querySelectorAll('br').length;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; const tops = []; let maxRight = 0, minLeft = 1e9;
      while ((n = walker.nextNode())) {
        if (!n.textContent.trim()) continue;
        const rg = document.createRange(); rg.selectNodeContents(n);
        for (const q of rg.getClientRects()) { if (q.width < 1) continue; const m = (q.top + q.bottom) / 2; if (!tops.some(t => Math.abs(t - m) < 6)) tops.push(m); maxRight = Math.max(maxRight, q.right); minLeft = Math.min(minLeft, q.left); }
      }
      const cs = getComputedStyle(el); const box = el.getBoundingClientRect();
      const measure = Math.min(box.width, parseFloat(cs.maxWidth) || 1e9) / sc;
      out.push({ slide: i + 1, tag: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''), brs, lines: tops.length,
                 widest: Math.round((maxRight - minLeft) / sc), measure: Math.round(measure), fs: parseFloat(cs.fontSize) / sc,
                 text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60) });
    });
  });
  return out;
}
"""
async def main():
    html = sys.argv[1]; sel = SEL
    if '--selector' in sys.argv: sel = sys.argv[sys.argv.index('--selector') + 1]
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        await pg.goto('file://' + html if not html.startswith(('http', 'file:')) else html); await pg.wait_for_timeout(1200)
        res = await pg.evaluate(JS, sel); await b.close()
    bad = 0
    for t in res:
        if t['fs'] < 40: continue
        flag = ''
        if t['lines'] > t['brs'] + 1: flag = 'SELF-WRAP'; bad += 1
        elif t['widest'] < 0.55 * t['measure'] and t['lines'] >= 2: flag = 'narrow'
        print(f"{t['slide']:02d} {t['tag'][:16]:16} {t['fs']:>5.0f}px lines={t['lines']} brs={t['brs']} widest={t['widest']:>4}/{t['measure']:<4} {flag:9} {t['text']}")
    print(f"headings that wrapped on their own: {bad}")
    sys.exit(1 if bad else 0)
asyncio.run(main())
