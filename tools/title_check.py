#!/usr/bin/env python3
"""CI runner for the title line-break check (AGENTS.md Section 2.5 "The break is authored";
POWERPOINT.md check 17). The check itself lives in tools/title_check.js, which also runs with no
install at all: paste it into any browser's console, or load it with data-auto under headless
Chrome (usage at the top of that file). This runner exists so a build can fail automatically.

Usage: python3 tools/title_check.py deck.html        (`py` instead of `python3` on Windows) [--selector "h1,h2,h3,.title"]
       exit 1 on any heading that wrapped on its own, or when a fallback font rendered the page.
Needs: python3 -m pip install -r tools/requirements.txt && python3 -m playwright install chromium
Render with the system fonts installed (Poppins incl. ExtraBold, Libre Baskerville Italic) or the
result is meaningless; the runner reports fallback fonts and fails on them.
"""
import asyncio, os, pathlib, sys

HERE = os.path.dirname(os.path.abspath(__file__))
JS_FILE = os.path.join(HERE, 'title_check.js')

def usage(msg=''):
    print(__doc__.strip()); print()
    if msg: print(msg)
    sys.exit(2)

try:
    from playwright.async_api import async_playwright
except ModuleNotFoundError:
    usage('Playwright is not installed. Either install it:\n'
          '    python3 -m pip install -r tools/requirements.txt && python3 -m playwright install chromium\n'
          'or run the same check with no install: open the deck in a browser, paste tools/title_check.js\n'
          'into the console and run titleCheck(); or use the headless-Chrome line at the top of that file.')

async def main():
    if len(sys.argv) < 2: usage('A deck path is required.')
    html = sys.argv[1]; sel = None
    if '--selector' in sys.argv: sel = sys.argv[sys.argv.index('--selector') + 1]
    js = open(JS_FILE, encoding='utf-8').read()
    url = html if html.startswith(('http', 'file:')) else pathlib.Path(html).resolve().as_uri()
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        await pg.goto(url); await pg.wait_for_timeout(1500)
        await pg.evaluate(js)
        res = await pg.evaluate('(sel) => window.__titleCheckMeasure(sel || undefined)', sel)
        await b.close()
    for t in res['rows']:
        print(f"{t['slide']:02d} {t['tag'][:16]:16} {t['px']:>4}px lines={t['lines']} brs={t['brs']} widest={t['widest']:>4}/{t['measure']:<4} {t['flag']:9} {t['text']}")
    print(f"headings that wrapped on their own: {res['wrapped']}")
    if res['fallbackFonts']:
        print(f"FALLBACK FONTS IN USE: {', '.join(res['fallbackFonts'])} — install Poppins + Libre Baskerville Italic and re-run")
    print('title check: ' + ('PASS' if res['ok'] else 'FAIL'))
    sys.exit(0 if res['ok'] else 1)

asyncio.run(main())
