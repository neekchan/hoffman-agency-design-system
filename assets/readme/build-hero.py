#!/usr/bin/env python3
"""Build assets/readme/hero.svg — the banner at the top of the README — from the system's own assets.

    /Library/Frameworks/Python.framework/Versions/3.14/bin/python3 assets/readme/build-hero.py

Needs fontTools + Pillow; Google Chrome for the row of tour frames (skipped with a warning if absent).
All type is OUTLINED from the real Poppins / Libre Baskerville files, so GitHub — which renders README
SVGs as <img> with no fonts and no external resources — shows exactly this. Photographs, emoji and the
tour frames ride along as data URIs; the logo, squiggle, annotations and Flat icons are inlined.
Every count is read from disk — re-run after adding assets or changing the tour.

Three bands, 1600×1000 (GitHub caps the README column's width, so height is what makes a hero big):
  A · the pitch — the stretched hello, "Point an LLM here", the agency line, the Storyline line edge-locked
  B · the tour, running — four real screens rendered from Hoffman Brand Tour.html
  C · what's inside — nine tiles: palette, faces, emoji, photograph, illustration, icons, layout, marks, offices
"""
import base64, io, os, re, subprocess, tempfile, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image
ROOT = pathlib.Path(__file__).resolve().parents[2]
W, H = 1600, 1000
NAVY, NAVY9, NAVY8, N200, N300, N500, LIME, AQUA, VIOLET, PURPLE, TEAL, PAPER = '#182D43', '#0E1C2B', '#12253A', '#C8D2DD', '#95A8BD', '#35526F', '#D2EB00', '#86FFF1', '#CB65FF', '#6103B9', '#145F7B', '#FAFAF7'
MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
_F = {}
def font(name):
    if name not in _F:
        f = TTFont(ROOT / 'fonts' / name); _F[name] = (f.getBestCmap(), f.getGlyphSet(), f['head'].unitsPerEm, f['hmtx'])
    return _F[name]
def run(text, fontfile, size, x, y, fill, tracking=0.0, fills=None):
    """Outline text with its baseline at (x, y). Returns (svg, advance)."""
    cmap, gs, upem, hmtx = font(fontfile); s = size / upem; out = []; cx = x
    for i, ch in enumerate(text):
        g = cmap.get(ord(ch))
        if g is None: cx += size * 0.28; continue
        pen = SVGPathPen(gs); gs[g].draw(pen); d = pen.getCommands()
        if d: out.append(f'<path transform="translate({cx:.1f},{y:.1f}) scale({s:.5f},{-s:.5f})" fill="{fills[i] if fills else fill}" d="{d}"/>')
        cx += hmtx[g][0] * s + tracking * size
    return ''.join(out), cx - x
def square_b64(path, box, fmt='JPEG', q=68, bias=0.0):
    im = Image.open(path); im = im.convert('RGBA' if fmt == 'PNG' else 'RGB')
    if fmt == 'JPEG':
        w, h = im.size; side = min(w, h); left = (w - side) // 2; top = int((h - side) * (0.5 - bias)); im = im.crop((left, top, left + side, top + side))
    im = im.resize((box, box), Image.LANCZOS); b = io.BytesIO()
    im.save(b, fmt, quality=q, optimize=True) if fmt == 'JPEG' else im.save(b, fmt, optimize=True)
    return f'data:image/{"jpeg" if fmt == "JPEG" else "png"};base64,' + base64.b64encode(b.getvalue()).decode()
def frame_b64(path, w=528, q=60):
    im = Image.open(path).convert('RGB'); im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS); b = io.BytesIO()
    im.save(b, 'JPEG', quality=q, optimize=True, progressive=True); return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
def embed_svg(path, x, y, w, h, key, fill=None, aspect='xMidYMid meet'):
    s = pathlib.Path(path).read_text(); s = re.sub(r'<\?xml[^>]*\?>', '', s).strip()
    s = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{key}_{m.group(1)}"', s)
    s = re.sub(r'url\(#([^)]+)\)', lambda m: f'url(#{key}_{m.group(1)})', s); s = re.sub(r'href="#([^"]+)"', lambda m: f'href="#{key}_{m.group(1)}"', s)
    if fill:  # recolour the whole mark: drop its own styling (annotations use currentColor), paint from the root
        s = re.sub(r'<style>.*?</style>', '', s, flags=re.S); s = re.sub(r'\s(?:fill|stroke|style|class)="[^"]*"', '', s)
        s = re.sub(r'<svg\b', f'<svg fill="{fill}"', s, count=1)
    # the nested file's own placement/size attributes go; ours replace them (duplicate attributes = malformed XML = broken image)
    m = re.match(r'<svg\b[^>]*>', s); tag = re.sub(r'\s(?:x|y|width|height|preserveAspectRatio)="[^"]*"', '', m.group(0))
    return tag.replace('<svg', f'<svg x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="{aspect}"', 1) + s[m.end():]
def count(folder, ext): return sum(1 for f in os.listdir(ROOT / folder) if f.endswith(ext))
def render_frames(screens):
    chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; std = ROOT / 'Hoffman Brand Tour.html'
    if not (os.path.exists(chrome) and std.exists()): print('warning: Chrome or the standalone missing — tour band skipped'); return {}
    s = std.read_text(); tmp = pathlib.Path(tempfile.mkdtemp(prefix='hero-frames-')); out = {}
    for n in screens:
        f = tmp / f'f{n}.html'; f.write_text(s.replace("screen: 0, clock: ''", f"screen: {n}, clock: ''", 1))
        subprocess.run([chrome, '--headless', '--disable-gpu', '--window-size=1920,1080', '--virtual-time-budget=14000', f'--screenshot={tmp}/f{n}.png', f'file://{f}'], capture_output=True)
        if (tmp / f'f{n}.png').exists(): out[n] = tmp / f'f{n}.png'
    return out
def mono(x, y, text, size, fill, anchor='start', spacing=1.4, weight=700):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{MONO}" font-size="{size}" font-weight="{weight}" letter-spacing="{spacing}" fill="{fill}">{text}</text>'

photos = count('assets/photography', '.jpg') + sum(count(f'assets/photography/{d}', '.jpg') for d in ('cities', 'moments', 'still-life', 'storyteller'))
cities, illos, emoji, icons, marks = count('assets/photography/cities', '.jpg'), count('assets/house-style/examples', '.jpg'), count('assets/emoji/3d', '.png'), count('assets/icons', '.svg'), count('assets/annotations', '.svg')
layouts = re.search(r'(\d+) slide layouts', (ROOT / 'README.md').read_text()).group(1)
screens = len(re.findall(r'<section data-idx="\d+"', (ROOT / 'templates/brand-tour/BrandTour.dc.html').read_text()))
TOUR = [(1, 'HOME'), (5, 'SOUNDCHECK'), (17, 'THE LIBRARY'), (18, 'SIXTEEN OFFICES')]
frames = render_frames([n for n, _ in TOUR])

o = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t d">',
     '<title id="t">The Hoffman Agency Design System</title>',
     f'<desc id="d">Three bands on navy. The pitch: the stretched hello in the brand colours, "Point an LLM here. Ship things that stay on brand.", and the agency line — an integrated comms agency that helps tech brands solve hard business problems, the harder the better. The tour, running: four screens of the {screens}-screen interactive brand tour. What is inside: the palette, the two typefaces, {emoji} Fluent emoji, {photos} photographs, {illos} illustrations, {icons:,} icons, {layouts} slide layouts, {marks} hand-drawn marks and {cities} offices.</desc>',
     f'<rect width="{W}" height="{H}" fill="{NAVY}"/>']
# ---- band A · the pitch
A = 470
o.append(embed_svg(ROOT / 'assets/storyline-line-lime.svg', W - round(A * 1920 / 1080), 0, round(A * 1920 / 1080), A, 'sq', aspect='xMaxYMid meet'))
o.append(embed_svg(ROOT / 'assets/logo-horizontal-white.svg', 64, 50, 140, 30, 'lg'))
o.append(mono(226, 72, f'DESIGN SYSTEM <tspan fill="{N300}">· {layouts} SLIDE LAYOUTS · A {screens}-SCREEN INTERACTIVE TOUR · {photos} PHOTOGRAPHS</tspan>', 19, LIME, spacing=2.6))
o.append(run('hellllllo.', 'Poppins-Black.ttf', 150, 58, 232, LIME, tracking=-0.035, fills=[LIME, LIME, '#DFEF4B', '#EEF7A2', PAPER, '#E4E9EF', AQUA, AQUA, AQUA, VIOLET])[0])
o.append(run('Point an LLM here.', 'Poppins-Bold.ttf', 46, 64, 300, '#FFFFFF', tracking=-0.02)[0])
svg, adv = run('Ship things that stay ', 'Poppins-Bold.ttf', 46, 64, 352, '#FFFFFF', tracking=-0.02); o.append(svg)
svg2, adv2 = run('on brand.', 'LibreBaskerville-Italic-VariableFont_wght.ttf', 48, 64 + adv, 352, LIME, tracking=-0.01); o.append(svg2)
o.append(embed_svg(ROOT / 'assets/annotations/underline-01.svg', 64 + adv - 6, 360, adv2 + 4, (adv2 + 4) * 54.55 / 1065.52, 'ul', fill=LIME, aspect='none'))
o.append(run('Integrated Comms agency that helps tech brands solve hard business problems.', 'Poppins-Regular.ttf', 23, 64, 404, N200, tracking=-0.005)[0])
o.append(run('The harder the better.', 'Poppins-SemiBold.ttf', 23, 64, 436, '#FFFFFF', tracking=-0.005)[0])
# ---- band B · the tour, running
B0, FW, FH, FG = A, 352, 198, 16
o.append(f'<rect x="0" y="{B0}" width="{W}" height="290" fill="{NAVY9}"/>')
o.append(mono(64, B0 + 34, f'THE TOUR, RUNNING <tspan fill="{N300}">· {screens} SCREENS YOU PRESS, DRAG AND BREAK · templates/brand-tour/</tspan>', 15, LIME, spacing=2.0))
for i, (n, label) in enumerate(TOUR):
    x, y = 64 + i * (FW + FG), B0 + 52
    if n in frames: o.append(f'<image x="{x}" y="{y}" width="{FW}" height="{FH}" href="{frame_b64(frames[n])}"/>')
    else: o.append(f'<rect x="{x}" y="{y}" width="{FW}" height="{FH}" fill="{NAVY8}"/>')
    o.append(f'<rect x="{x + 0.5}" y="{y + 0.5}" width="{FW - 1}" height="{FH - 1}" fill="none" stroke="{N500}" stroke-width="1"/>')
    o.append(mono(x, y + FH + 24, f'{n:02d} <tspan fill="{N300}">· {label}</tspan>', 13, LIME))
# ---- band C · what's inside
C0, T, G, TY = B0 + 290, 144, 18, B0 + 290 + 52
o.append(mono(64, C0 + 34, f'WHAT&#8217;S INSIDE <tspan fill="{N300}">· EVERYTHING BELOW IS IN THIS REPO, NOT A MOCK-UP</tspan>', 15, LIME, spacing=2.0))
def tx(i): return 64 + i * (T + G)
x = tx(0); o.append(''.join(f'<rect x="{x + k * T / 7:.2f}" y="{TY}" width="{T / 7 + 0.5:.2f}" height="{T}" fill="{c}"/>' for k, c in enumerate([NAVY9, LIME, VIOLET, PURPLE, AQUA, TEAL, PAPER])))
x = tx(1); o.append(f'<rect x="{x}" y="{TY}" width="{T}" height="{T}" fill="{PAPER}"/>' + run('Aa', 'Poppins-Black.ttf', 58, x + 12, TY + 62, NAVY, tracking=-0.03)[0] + run('Aa', 'LibreBaskerville-Italic-VariableFont_wght.ttf', 58, x + 56, TY + 126, PURPLE)[0])
x = tx(2); o.append(f'<rect x="{x}" y="{TY}" width="{T}" height="{T}" fill="{NAVY8}"/><image x="{x + 14}" y="{TY + 14}" width="{T - 28}" height="{T - 28}" href="{square_b64(ROOT / "assets/emoji/3d/rocket.png", 232, "PNG")}"/>')
x = tx(3); o.append(f'<image x="{x}" y="{TY}" width="{T}" height="{T}" href="{square_b64(ROOT / "assets/photography/cities/taipei-daan.jpg", 288)}"/>')
x = tx(4); o.append(f'<image x="{x}" y="{TY}" width="{T}" height="{T}" href="{square_b64(ROOT / "assets/house-style/examples/complexity-into-clarity.jpg", 288)}"/>')
x = tx(5); o.append(f'<rect x="{x}" y="{TY}" width="{T}" height="{T}" fill="{NAVY8}"/>' + ''.join(embed_svg(ROOT / f'assets/icons/{n}.svg', x + 14 + (k % 2) * 62, TY + 14 + (k // 2) * 62, 54, 54, f'ic{k}') for k, n in enumerate(['gear', 'camera', 'artist-palette', 'compass'])))
x = tx(6); o.append(f'<rect x="{x}" y="{TY}" width="{T}" height="{T}" fill="{NAVY}"/><rect x="{x + 16}" y="{TY + 22}" width="34" height="4" fill="{LIME}"/><rect x="{x + 16}" y="{TY + 40}" width="92" height="11" fill="#FFFFFF"/><rect x="{x + 16}" y="{TY + 57}" width="66" height="11" fill="#FFFFFF"/><rect x="{x + 16}" y="{TY + 84}" width="104" height="4" fill="{N300}"/><rect x="{x + 16}" y="{TY + 94}" width="88" height="4" fill="{N300}"/><rect x="{x + 16}" y="{TY + 104}" width="96" height="4" fill="{N300}"/><rect x="{x + 16}" y="{TY + 118}" width="14" height="10" fill="{LIME}"/><rect x="{x + 0.5}" y="{TY + 0.5}" width="{T - 1}" height="{T - 1}" fill="none" stroke="{N500}" stroke-width="1"/>')
x = tx(7); o.append(f'<rect x="{x}" y="{TY}" width="{T}" height="{T}" fill="{PAPER}"/>' + embed_svg(ROOT / 'assets/annotations/circle-01.svg', x + 14, TY + 16, T - 28, 50, 'mk1', fill=PURPLE) + embed_svg(ROOT / 'assets/annotations/underline-01.svg', x + 18, TY + 76, T - 36, 12, 'mk2', fill=LIME, aspect='none') + embed_svg(ROOT / 'assets/annotations/arrow-01.svg', x + 22, TY + 96, T - 44, 36, 'mk3', fill=PURPLE))
x = tx(8); o.append(f'<image x="{x}" y="{TY}" width="{T}" height="{T}" href="{square_b64(ROOT / "assets/photography/cities/singapore-north-bridge.jpg", 288)}"/>')
for i, cap in enumerate(['7 COLOURS', 'TWO FACES', f'{emoji} EMOJI', f'{photos} PHOTOS', f'{illos} DRAWINGS', f'{icons:,} ICONS', f'{layouts} LAYOUTS', f'{marks} MARKS', f'{cities} OFFICES']):
    o.append(mono(tx(i) + T / 2, TY + T + 26, cap, 13, N300, anchor='middle'))
o.append('</svg>')
out = '\n'.join(o); (ROOT / 'assets/readme/hero.svg').write_text(out)
print(f'hero.svg: {len(out) / 1024:.0f} KB · frames {len(frames)}/4 · {photos} photos · {illos} illustrations · {emoji} emoji · {icons} icons · {marks} marks · {cities} offices · {layouts} layouts · {screens} screens')
