#!/usr/bin/env python3
"""Rebuild `Hoffman Brand Tour.html` (repo root) from `templates/brand-tour/BrandTour.dc.html`.

    python3 templates/brand-tour/export_standalone.py            # rebuild
    python3 templates/brand-tour/export_standalone.py --verify   # rebuild, then render three screens headlessly

Run from the repo root. Needs Pillow (`pip install pillow`) for the photo thumbnails, and Google Chrome
for --verify. The previous standalone is the DONOR: everything that does not live in the template
(the inlined dc-runtime, the fluent-emoji runtime, the base64 fonts, the 86 logo/annotation resources)
is carried over from it untouched. From the template we take the body and the logic script, inline the
static SVGs as data URIs, and register the photography as `photo_*` resources at contact-sheet size.

Rules learnt the hard way:
  * keep photographs OUT of literal style attributes in the template — bind a style object and let
    `photoUrl()` resolve to the resource map (design environment: relative path; standalone: data URI)
  * the standalone is not offline: it loads React and the emoji from a CDN (decision 2026-09-17)
  * the donor's <style> block is kept (it carries standalone-only CSS and the base64 fonts) and any rule
    the template has that the donor lacks is appended — so new CSS in the template DOES reach the standalone
  * always look at the rendered frames; the standalone boot path logs one benign SyntaxError.
"""
import base64, io, json, os, re, subprocess, sys, tempfile, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / 'templates/brand-tour/BrandTour.dc.html'
OUT = ROOT / 'Hoffman Brand Tour.html'
PHOTOS = ROOT / 'assets/photography'
THUMB = {'cities': (800, 56)}          # family -> (width, jpeg quality); everything else:
THUMB_DEFAULT = (480, 55)

def b64(p): return base64.b64encode(pathlib.Path(p).read_bytes()).decode()
def svg_uri(rel): return 'data:image/svg+xml;base64,' + b64(ROOT / 'assets' / rel)
def photo_key(f): return 'photo_' + re.sub(r'\.jpg$', '', f.replace('/', '_'))
def jpg_uri(f):
    from PIL import Image
    fam = f.split('/')[0] if '/' in f else ''
    w, q = THUMB.get(fam, THUMB_DEFAULT)
    im = Image.open(PHOTOS / f).convert('RGB'); im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()

def parts(s):
    a = s.index('<section data-idx="0"'); b = s.index('</x-dc>', a)
    x = s.index('<script type="text/x-dc" data-dc-script'); y = s.index('</script>', x) + len('</script>')
    return s[:a], s[a:b], s[b:x], s[x:y], s[y:]

def export():
    src, don = SRC.read_text(), OUT.read_text()
    _, body, _, script, _ = parts(src); head, _, mid, _, tail = parts(don)
    n_sections = len(re.findall(r'<section data-idx="\d+"', body))
    # head: the template's own <style> block is the truth (new keyframes, rules); only the @font-face
    # lines are swapped for the donor's base64-subset versions, matched by family/style/weight
    def style_block(s):
        # anchor on the block's own first comment: the inlined emoji runtime contains a literal "<style>" string
        m = s.index('/* Compact brand-token fallback'); a = s.rfind('<style>', 0, m); b = s.index('</style>', a) + len('</style>'); return a, b
    def ff_key(line):
        m = re.search(r"font-family:\s*'([^']+)';\s*font-style:\s*(\w+);\s*font-weight:\s*([\d ]+);", line); return m.groups() if m else None
    da, db = style_block(head); donor_lines = head[da:db].split('\n')
    donor_set = {l.strip() for l in donor_lines}
    sa, sb = style_block(src)
    extra = [l for l in src[sa:sb].split('\n') if l.strip() not in donor_set and '@font-face' not in l and l.strip() not in ('<style>', '</style>')]
    head = head[:da] + '\n'.join(donor_lines[:-1] + extra + donor_lines[-1:]) + head[db:]   # donor block (it carries standalone-only CSS) + the template's new rules
    # head: refresh the @template comment; register photos in the resource map
    desc = re.search(r'<!-- @template name="Interactive brand tour" description="[^"]*" -->', src).group(0)
    head = re.sub(r'<!-- @template name="Interactive brand tour" description="[^"]*" -->', lambda _: desc, head, count=1)
    head = re.sub(r'"photo_[^"]+":"data:image/jpeg;base64,[A-Za-z0-9+/=]*",', '', head)   # drop last export's photos
    head = re.sub(r'"icon_[^"]+":"data:image/svg\+xml;base64,[A-Za-z0-9+/=]*",', '', head)  # ...and dock icons
    photos = re.findall(r"\{ f: '([^']+)', fam:", script)
    icons = re.findall(r"icon: '([^']+)'", script)
    k = head.index('window.__resources={') + len('window.__resources={')
    head = (head[:k] + ''.join(json.dumps(photo_key(f)) + ':' + json.dumps(jpg_uri(f)) + ',' for f in photos)
            + ''.join(json.dumps('icon_' + i) + ':' + json.dumps(svg_uri('icons/' + i + '.svg')) + ',' for i in icons) + head[k:])
    # body + script: inline the static SVGs the same way the first export did
    body = re.sub(r'src="\.\./\.\./assets/([^"]+\.svg)"', lambda m: 'src="' + svg_uri(m.group(1)) + '"', body)
    script = re.sub(r"'\.\./\.\./assets/([^']+\.svg)'", lambda m: "'" + svg_uri(m.group(1)) + "'", script)
    out = head + body + mid + script + tail
    bad = re.findall(r'style="[^"]*url\(data:', out)
    assert not bad, 'a data URI landed inside a literal style attribute — bind that style as an object instead'
    OUT.write_text(out)
    print(f'exported {OUT.name}: {n_sections} sections · {len(photos)} photographs · {len(icons)} dock icons · {len(out)/1e6:.2f} MB')

def verify(screens=(1, 17, 18)):
    chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    s = OUT.read_text(); tmp = pathlib.Path(tempfile.mkdtemp(prefix='brand-tour-'))
    for n in screens:
        f = tmp / f's{n}.html'; f.write_text(s.replace("screen: 0, clock: ''", f"screen: {n}, clock: ''", 1))
        r = subprocess.run([chrome, '--headless', '--disable-gpu', '--window-size=1600,900', '--virtual-time-budget=20000',
                            '--enable-logging=stderr', '--v=0', f'--screenshot={tmp}/s{n}.png', f'file://{f}'], capture_output=True, text=True)
        errs = [l for l in r.stderr.splitlines() if 'CONSOLE' in l and not any(k in l for k in ('never resolved', 'Unexpected token', 'Access to fetch'))]  # the three benign file:// lines
        print(f'  screen {n:>2}: {"ok" if (tmp / f"s{n}.png").exists() else "NO FRAME"}' + (f' · {len(errs)} console line(s)' if errs else ''))
    print(f'  frames in {tmp} — look at them before shipping')

if __name__ == '__main__':
    export()
    if '--verify' in sys.argv: verify()
