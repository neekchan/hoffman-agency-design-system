---
name: hoffman-agency-design
description: Use this skill to generate well-branded interfaces and assets for The Hoffman Agency, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Brand colors**: Navy `#182D43`, Lime `#D2EB00`, Lavender `#CB65FF`, Purple `#6103B9`, Cyan `#86FFF1`, Teal `#145F7B`. Paper `#FAFAF7` for surfaces. All tokens in `colors_and_type.css` (token names `--tha-violet`/`--tha-aqua` remain for stability; display names are Lavender / Cyan).
- **Type**: **Poppins** (sans — workhorse for everything: headlines, body, UI). **Libre Baskerville — ITALIC ONLY** for emphasis (single word inside a Poppins headline, pull-quotes). Never use Baskerville upright. **M PLUS 2** for Japanese, **Noto Sans** family for CJK / other languages. JetBrains Mono for captions/stats. Huge display sizes. (Whitespace: *generous* on web; *fill the frame* on slides — see the medium split below.)
- **Signature motif**: The "Storyline" squiggle. **The background decides the version**: (1) on **light / non-navy** backgrounds use `assets/storyline-navy-lime.svg` — the boxed square monogram, self-contained, locked to a corner like a logo; (2) on **navy / dark fields** use `assets/storyline-line-lime.svg` — the line as a *background layer* that's part of the field: bottom layer above the navy fill, behind content, lime, **edge-locked** to the top/right/bottom (full frame height, no bleed, sharp ends absorbed by the frame). Never float the boxed monogram adrift on navy; never float the line as an object.
- **Hand-drawn annotations** — 76 SVG marks across 6 categories (lines, circles, arrows, ticks, crosses, accents in `assets/annotations/`) plus a 7th technique, **Highlights** (CSS marker-pen overlay over body text). All SVGs use `fill="currentColor"` and are colored **contextually** — pick whichever brand color contrasts best with the text and background where the mark sits.
- **Surfaces — two light models**: default is a warm **paper page (`--bg-1`) with white cards (`--bg-2`)**. Alternative is a **pure-white page with warm sand cards** — add `class="tha-theme-white"` to a section and its cards become `--tha-sand #F1EFE7`. Always step page → card one notch; never paper-on-paper or white-on-white (too faint).
- **Media placeholders**: when imagery can't be auto-placed, reserve a labelled box with `.tha-placeholder` + a ratio (`--16x9`/`--4x3`/`--1x1`/`--4x5`/`--3x1`/`--icon`). Drop in an `<svg class="tha-placeholder__icon">`, a `.tha-placeholder__label`, and a `.tha-placeholder__hint` that art-directs the shot. **The label must read `Type · Aspect · generate W×Hpx` — the recommended pixel resolution is required on every image placeholder, never the aspect alone** (16:9→1920×1080 · 4:3→1440×1080 · 3:4→1080×1440 · 4:5→1080×1350 · 1:1→1280×1280 · 3:1→1800×600 · 2:1→1600×800 · 9:16→1080×1920). `.on-dark` for navy, `--accent` for a lime hero frame. Never ship an unlabelled grey box.
- **Emoji typographic storytelling**: an emoji standing in for one charged word inside a Poppins line (`We turn opinion into 📈 influence`). Wrap in `.tha-emoji` (rides the baseline) and always add `role="img" aria-label="<the word>"`. Max 3 per surface; in place of a word only, never as bullets/icons.
- **Contrast & color pairing (WCAG)**: `preview/brand-contrast-matrix.html` scores every pair; `preview/brand-color-pairings.html` shows each color **as a surface** with the type colors that pass on it and their role (Body ≥ 4.5 / Large+Bold ≥ 3). **Cross-pollination is allowed** — any two brand colors may combine, across the warm/cool pairs included (lavender on teal, cyan on purple…), wherever WCAG clears; contrast is the gate, not pairing. **Every color is a viable surface**, not just navy/paper — lime & cyan surfaces take navy/dark type (never white); navy/purple/teal surfaces take white or a light accent.
- **Voice patterns**: stretched letters (`hellllllo 2026`), the ladder (word-scale steps across lines), strikethrough humor (`~~doubling~~ tripling down`), and lowercase first words as casual signal. Smart, Human, Energetic, Distilled, Bold, Creative, Authentic. Short lines, no jargon, no "leverage". Emojis allowed sparingly with copy (max 3 per page). See CONTENT FUNDAMENTALS in README.
- **Layout posture (web)**: asymmetric, square-cornered, bold type as hero, sparse decorative imagery, generous negative space.
- **⚠ MEDIUM SPLIT — web vs. slides**: This system serves two media with different layout physics. **Web / social** (webpages, UI kit, tiles) follows `DESIGN.md` + `colors_and_type.css` — web type scale (16px body), generous whitespace, sparse imagery. **Slides / office docs** (1920×1080 decks) follow `CLAUDE.md` + `LAYOUTS.md` and **OVERRIDE the web rules**: a dedicated slide type scale as FLOORS, biased high (20–24px labels · 30–36px body / default 32 · 40–52px subhead · 64–80px title · 120–132px statement/divider · 176px+ cover · ~240px closing word — never the old 28px "safe" body), "fill the frame" (no dead whitespace), and **imagery by default on every slide**. Color, fonts, the italic-word move, the Storyline motif, annotations, and voice are brand-wide and apply to both. When building a deck, never inherit web body sizes, web max-widths, or "sparse imagery."
- **⚡ DECK MODE — Presenter XOR Document**: every deck is exactly one mode. **Presenter** (live) = ≤1 idea, ≤15 words/slide, image-led, detail in **speaker notes**; **Document** (leave-behind, stands alone) = denser, hierarchical, short bullets allowed. Never mix the two. Infer the mode from context, state the assumption, ask only if genuinely ambiguous. Both modes keep the full Hoffman visual system (fill-the-frame, slide scale, whole palette) — mode changes *depth*, not appearance. `templates/keynote/` ships both behind a **Mode** tweak. See `CLAUDE.md §12`.

## Files

- `README.md` — full design system (content, visual, iconography) + the file-structure map
- `CLAUDE.md` — **slide/deck SOPs**; the authority when building decks or fixed-canvas office docs (§0 precedence, §8 Fluent emoji)
- `LAYOUTS.md` — deck layout library (48 layouts, L01–L51) + slide best-practice guide
- `DESIGN.md` — portable AI context file (google-labs-code/design.md format)
- `POWER-DESIGN-PRINCIPLES.md` — portable craft-rules layer (one-idea, grid, contrast, mode purity…); a *reference* layer — try to honor it, don't rigidly stick (precedence in-file)
- `colors_and_type.css` — CSS custom properties + base element styles
- `assets/` — logos, marks, Storyline squiggle, `emoji/` (Fluent injector), `annotations/`
- `preview/` — design-system cards (for reference)
- `templates/` — reusable DC starting points (`deck`, `keynote`, `one-pager`, `social-tile`)
- `ui_kits/website/` — website UI kit (`index.html` + JSX components)

> **🔒 `references/` is confidential** — the owner's private source material. **Never** export, bundle, download, publish, or copy it into any deliverable (downloads, zips, standalone/inline builds, PPTX/PDF, handoffs, public URLs). Read it for context only.
