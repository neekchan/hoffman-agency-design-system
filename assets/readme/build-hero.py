#!/usr/bin/env python3
"""Build assets/readme/hero.svg — the banner at the top of the README — from the system's own assets.

    /Library/Frameworks/Python.framework/Versions/3.14/bin/python3 assets/readme/build-hero.py

Needs fontTools + Pillow. All type is OUTLINED from the real Poppins / Libre Baskerville files, so GitHub
(which renders README SVGs as <img> with no external fonts or images) shows exactly this. Photographs,
the emoji and the Flat icons are embedded as data URIs; the logo, squiggle and annotation are inlined.
Counts on the tiles are read from disk — re-run after adding assets.
"""
import base64, io, os, re, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image
ROOT = pathlib.Path(__file__).resolve().parents[2]
W, H = 1600, 640
NAVY, NAVY9, NAVY8, N200, N300, LIME, AQUA, VIOLET, PURPLE, TEAL, PAPER = '#182D43', '#0E1C2B', '#12253A', '#C8D2DD', '#95A8BD', '#D2EB00', '#86FFF1', '#CB65FF', '#6103B9', '#145F7B', '#FAFAF7'
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
def width(text, fontfile, size, tracking=0.0):
    cmap, gs, upem, hmtx = font(fontfile); s = size / upem
    return sum((hmtx[cmap[ord(c)]][0] * s if ord(c) in cmap else size * 0.28) + tracking * size for c in text)
def img_b64(path, box, fmt='JPEG', q=68):
    im = Image.open(path); im = im.convert('RGBA' if fmt == 'PNG' else 'RGB')
    if fmt == 'JPEG':
        w, h = im.size; side = min(w, h); im = im.crop(((w - side) // 2, (h - side) // 2 - (side // 10 if h > w else 0), (w - side) // 2 + side, (h - side) // 2 + side - (side // 10 if h > w else 0)))
    im = im.resize((box, box), Image.LANCZOS); b = io.BytesIO(); im.save(b, fmt, quality=q, optimize=True) if fmt == 'JPEG' else im.save(b, fmt, optimize=True)
    return f'data:image/{"jpeg" if fmt == "JPEG" else "png"};base64,' + base64.b64encode(b.getvalue()).decode()
def embed_svg(path, x, y, w, h, key, fill=None, aspect='xMidYMid meet'):
    s = pathlib.Path(path).read_text(); s = re.sub(r'<\?xml[^>]*\?>', '', s).strip()
    s = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{key}_{m.group(1)}"', s)
    s = re.sub(r'url\(#([^)]+)\)', lambda m: f'url(#{key}_{m.group(1)})', s); s = re.sub(r'href="#([^"]+)"', lambda m: f'href="#{key}_{m.group(1)}"', s)
    if fill:  # recolour the whole mark: drop its own styling, paint from the root
        s = re.sub(r'<style>.*?</style>', '', s, flags=re.S); s = re.sub(r'\s(?:fill|stroke|style|class)="[^"]*"', '', s)
        s = re.sub(r'<svg\b', f'<svg fill="{fill}"', s, count=1)
    # the nested file's own placement/size attributes go; ours replace them (duplicate attributes = malformed XML = broken image)
    m = re.match(r'<svg\b[^>]*>', s); tag = re.sub(r'\s(?:x|y|width|height|preserveAspectRatio)="[^"]*"', '', m.group(0))
    s = tag.replace('<svg', f'<svg x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="{aspect}"', 1) + s[m.end():]
    return s
def count(folder, ext): return sum(1 for f in os.listdir(ROOT / folder) if f.endswith(ext))
photos = count('assets/photography', '.jpg') + sum(count(f'assets/photography/{d}', '.jpg') for d in ('cities', 'moments', 'still-life', 'storyteller'))
illos, emoji, icons = count('assets/house-style/examples', '.jpg'), count('assets/emoji/3d', '.png'), count('assets/icons', '.svg')
layouts = re.search(r'(\d+) slide layouts', (ROOT / 'README.md').read_text()).group(1)

o = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t d">',
     '<title id="t">The Hoffman Agency Design System</title>',
     f'<desc id="d">Navy banner: the stretched hello in the brand colours, the line "Point an LLM here. Ship things that stay on brand.", the agency positioning, and six tiles previewing the palette, the two typefaces, {emoji} Fluent emoji, {photos} photographs, {illos} illustrations and {icons} icons, with the Storyline squiggle edge-locked at the right.</desc>',
     f'<rect width="{W}" height="{H}" fill="{NAVY}"/>',
     embed_svg(ROOT / 'assets/storyline-line-lime.svg', W - 1138, 0, 1138, H, 'sq', aspect='xMaxYMid meet'),
     embed_svg(ROOT / 'assets/logo-horizontal-white.svg', 64, 50, 140, 30, 'lg'),
     f'<text x="226" y="72" font-family="{MONO}" font-size="19" font-weight="700" letter-spacing="2.6" fill="{LIME}">DESIGN SYSTEM <tspan fill="{N300}">· {layouts} SLIDE LAYOUTS · A 23-SCREEN INTERACTIVE TOUR</tspan></text>']
# the stretched hello, in the cover's colours
hello = 'hellllllo.'; fills = [LIME, LIME, '#DFEF4B', '#EEF7A2', PAPER, '#E4E9EF', AQUA, AQUA, AQUA, VIOLET]
o.append(run(hello, 'Poppins-Black.ttf', 150, 58, 232, LIME, tracking=-0.035, fills=fills)[0])
# the pitch
svg, adv = run('Point an LLM here.', 'Poppins-Bold.ttf', 46, 64, 300, '#FFFFFF', tracking=-0.02); o.append(svg)
svg, adv = run('Ship things that stay ', 'Poppins-Bold.ttf', 46, 64, 352, '#FFFFFF', tracking=-0.02); o.append(svg)
svg2, adv2 = run('on brand.', 'LibreBaskerville-Italic-VariableFont_wght.ttf', 48, 64 + adv, 352, LIME, tracking=-0.01); o.append(svg2)
o.append(embed_svg(ROOT / 'assets/annotations/underline-01.svg', 64 + adv - 6, 360, adv2 + 4, (adv2 + 4) * 54.55 / 1065.52, 'ul', fill=LIME, aspect='none'))
# the agency line, as Nic wrote it
o.append(run('Integrated Comms agency that helps tech brands solve hard business problems.', 'Poppins-Regular.ttf', 23, 64, 404, N200, tracking=-0.005)[0])
o.append(run('The harder the better.', 'Poppins-SemiBold.ttf', 23, 64, 436, '#FFFFFF', tracking=-0.005)[0])
# six tiles: what is inside
T, G, Y = 116, 14, 470
def tile(i): return 64 + i * (T + G)
x = tile(0); o.append(f'<g>' + ''.join(f'<rect x="{x + k * T / 7:.2f}" y="{Y}" width="{T / 7 + 0.5:.2f}" height="{T}" fill="{c}"/>' for k, c in enumerate([NAVY9, LIME, VIOLET, PURPLE, AQUA, TEAL, PAPER])) + '</g>')
x = tile(1); o.append(f'<rect x="{x}" y="{Y}" width="{T}" height="{T}" fill="{PAPER}"/>' + run('Aa', 'Poppins-Black.ttf', 48, x + 10, Y + 52, NAVY, tracking=-0.03)[0] + run('Aa', 'LibreBaskerville-Italic-VariableFont_wght.ttf', 48, x + 46, Y + 104, PURPLE)[0])
x = tile(2); o.append(f'<rect x="{x}" y="{Y}" width="{T}" height="{T}" fill="{NAVY8}"/><image x="{x + 12}" y="{Y + 12}" width="92" height="92" href="{img_b64(ROOT / "assets/emoji/3d/rocket.png", 184, "PNG")}"/>')
x = tile(3); o.append(f'<image x="{x}" y="{Y}" width="{T}" height="{T}" href="{img_b64(ROOT / "assets/photography/cities/taipei-daan.jpg", 232)}"/>')
x = tile(4); o.append(f'<image x="{x}" y="{Y}" width="{T}" height="{T}" href="{img_b64(ROOT / "assets/house-style/examples/complexity-into-clarity.jpg", 232)}"/>')
x = tile(5); o.append(f'<rect x="{x}" y="{Y}" width="{T}" height="{T}" fill="{NAVY8}"/>' + ''.join(embed_svg(ROOT / f'assets/icons/{n}.svg', x + 12 + (k % 2) * 50, Y + 12 + (k // 2) * 50, 42, 42, f'ic{k}') for k, n in enumerate(['gear', 'camera', 'artist-palette', 'compass'])))
for i, cap in enumerate(['7 COLOURS', 'TWO FACES', f'{emoji} EMOJI', f'{photos} PHOTOS', f'{illos} DRAWINGS', f'{icons:,} ICONS']):
    o.append(f'<text x="{tile(i) + T / 2}" y="{Y + T + 26}" text-anchor="middle" font-family="{MONO}" font-size="13" font-weight="700" letter-spacing="1.4" fill="{N300}">{cap}</text>')
o.append('</svg>')
out = '\n'.join(o); (ROOT / 'assets/readme/hero.svg').write_text(out)
print(f'hero.svg: {len(out) / 1024:.0f} KB · {photos} photos · {illos} illustrations · {emoji} emoji · {icons} icons · {layouts} layouts')
