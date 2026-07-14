# Visual Consistency Checklist

A short list to run through before shipping any branded surface — slide, social tile, document, web layout.

---

## Deck mode (slides)

- [ ] Deck declares **one mode — Presenter XOR Document** (`AGENTS.md §12`); word-count / bullet-density stays consistent across all slides
- [ ] **Presenter**: ≤1 idea, ≤15 words/slide, image-led; detail is in **speaker notes**, not on the slide
- [ ] **Document**: denser + hierarchical, short bullets allowed, each slide stands alone — still no paragraphs
- [ ] No sparse hero slide sitting beside a six-bullet wall (the "schizophrenic deck" tell)

## Finished PowerPoint file (`.pptx` / `.potx`)

Run against the **exported file**, not the source that made it (`POWERPOINT.md §9`). Render every slide at full size — a passing screenshot is not proof.

- [ ] File opens; slide count as expected; slide size **16:9** (13.333in × 7.5in / 1920×1080)
- [ ] **Theme fonts are Poppins** (major + minor) — not Calibri/Aptos/Arial; theme colours match the Hoffman palette (`POWERPOINT.md §2`)
- [ ] No unintended **fallback font** in any text run; fonts embedded when portability requires it
- [ ] Only approved logo files used; every logo's **aspect ratio within 1%** of `assets/asset-manifest.json` (set one dimension, derive the other, lock ratio)
- [ ] **Logo variant matches surface** — paper → 2-colour, **lime → 1-colour navy**, navy/secondary → 1-colour white
- [ ] No content overlaps a **protected** logo / boxed-Storyline zone (the full-frame line is a background layer, exempt)
- [ ] No element spills off-canvas; no image **stretched** (displayed ratio ≈ source); no low-res image over-enlarged
- [ ] Every diagram **arrow connects a visible source and target** — not open space, not an oversized textbox edge; workflows use L35
- [ ] No unresolved image placeholder / production note; speaker notes present when Presenter mode requires them
- [ ] Advisory: ≤3 type sizes/slide, ≤15 words/slide (Presenter), square corners default, headline carries its italic emphasis (word or phrase), layout code matches its manifest structure

## Confidentiality & export

- [ ] **`references/` is NEVER included** in any download, zip, bundle, standalone/inline build, published URL, PPTX/PDF, or handoff — it is the owner's confidential source material (read-for-context only)

## Type

- [ ] Headline is **Poppins** (700 or 800) with its **emphasis** — a key word *or* short phrase — in `<em>` → Libre Baskerville italic (chosen by meaning, not a fixed count; one emphasis per line, never scattered)
- [ ] No upright Libre Baskerville used as body or display
- [ ] Sentence case on headings; UPPERCASE only on eyebrows (tracked at 0.14em)
- [ ] One hero idea per surface — everything else shrinks hard
- [ ] **Slides only:** uses the **slide type scale as FLOORS, biased high** (20–24px labels · 30–36px body / def 32 · 40–52px subhead · 64–80px title · 120–132px statement/divider · 176px+ cover · ~240px closing) — NOT the 28px "safe" or 16px web body; **≤ 3 distinct sizes** per slide (see `AGENTS.md §1`)
- [ ] **Slides only:** no micro-text — nothing ≤10pt except a functional eyebrow / mono label; on-slide sources, footnotes, placeholder captions & repeated sub-labels are cut (sources → speaker notes); **3–5 large elements** per slide (see `AGENTS.md §9`)

## Color

- [ ] **Web / social only:** on-canvas palette respects 30/30/10/10/10/10 ratio (Navy / Lime / Lavender / Purple / Cyan / Teal). **Decks/docs are exempt** — a deck should move through the full palette (a different surface per section/theme); the only color gates on slides are WCAG contrast + one dominant color per slide.
- [ ] Lead with **one dominant secondary** as the layout's (or slide's) mood; a second brand color may join as accent or type
- [ ] **Cross-pair combinations are allowed** (e.g. lavender + teal, cyan + purple) — *if* the pair clears WCAG (`preview/brand-color-pairings.html`)
- [ ] Color-on-color type clears WCAG: **≥ 4.5 body, ≥ 3 large/bold** — never type-on-type below 3:1
- [ ] Colored **surfaces** use a WCAG-passing brand color as type — paper and navy aren't the only backgrounds (lime/cyan surface → navy type; navy/purple/teal surface → white/light type)
- [ ] Lime text on white? → switched to `--fg-accent` (#A7BC00)
- [ ] Text/background pair clears WCAG AA (≥ 4.5, or ≥ 3 for ≥24px) — check `preview/brand-contrast-matrix.html`; lime & cyan are backgrounds, never text on light
- [ ] No gradients, no three-color washes, no glows

## Surfaces

- [ ] One light model per surface: **paper page + white cards**, or **white page + sand cards** (`.tha-theme-white`)
- [ ] Page and card sit one step apart — never paper-on-paper or white-on-white
- [ ] Cards keep a hairline `--border-2` so panels read even at low contrast

## Imagery & placeholders

- [ ] Imagery the AI can't place is a **labelled** `.tha-placeholder` (icon + `__label` + art-direction `__hint` + generator-ready `__prompt`) — never a bare grey box
- [ ] Photo placeholder labels use the required format: `Type · Aspect · generate W×Hpx` (for example, `Portrait · 4:5 · generate 1080×1350px`)
- [ ] Placeholder ratio matches the real asset (`--16x9` / `--1x1` / `--4x5` / `--icon`, etc.); `.on-dark` on navy

## Emoji typography

- [ ] Emoji only **in place of a word**, wrapped in `.tha-emoji`, with `role="img" aria-label="<word>"`
- [ ] ≤ 3 emoji per surface; never used as bullets, icons, or decoration

## Logo

- [ ] Logo variant matches background: paper → 2-color; lime → 1-color navy; navy or secondary → 1-color pure white
- [ ] Logo on a fixed corner, clearspace ≥ cap-height of "H" on all four sides
- [ ] Not rotated, stretched, recolored, or below min size (24px horizontal / 32px stacked)
- [ ] On social carousels: logo on cover + closing tiles only is acceptable; on internal decks/docs, every page can carry the chrome logo

## Storyline squiggle

- [ ] Version matches the background: **light / non-navy → boxed corner monogram**; **navy / dark field → line as background layer**
- [ ] **Line frequency (slides):** the full-frame line on navy is a **bookend** — cover & closing only (**≤2 per deck**), never a content-slide background; navy content slides use a plain field, no line
- [ ] Line sits as the **bottom layer above the fill, behind content** — and is **edge-locked**: full frame height, flush to the top, right & bottom edges, no bleed, sharp ends absorbed by the frame
- [ ] Boxed monogram is **never floating adrift on a navy field**; line is **never floated as an object** or shrunk into a corner with the cut-ends showing
- [ ] Not used as inline divider, tiled pattern, replacement for the wordmark, or animated loop

## Annotations

- [ ] At most **1–2 hand-drawn marks per surface**
- [ ] Marks come from the approved set: **lines/underlines · circles · arrows · ticks · crosses · accents** (76 SVGs in `assets/annotations/`) or a **Highlight** (CSS marker-pen overlay, brand-color background behind a word with safe contrast)
- [ ] Mark color is **contextual** — contrasts with both the text and the background where it sits (the cross-out only reads if it's the opposite color of the word)
- [ ] Stroke 3–5px, lime, lavender, navy or any brand color chosen for contrast
- [ ] No wavy lines or squiggly arrows outside this set
- [ ] No emoji, no unicode pictograms

## Layout

- [ ] Asymmetric grid preferred; content biased to 7–8 of 12 columns
- [ ] Section padding ≥ 80px on desktop; 128px on hero blocks
- [ ] Square corners (0–2px) by default; 6px only on form inputs; pill on tags only
- [ ] No frosted glass, no parallax, no scroll-jacking
- [ ] **Slides only:** content **fills the frame** edge-to-edge — no dead whitespace, no 1240px/68ch web caps; imagery present by default; "restraint" = few elements scaled large, never small elements floating (see `AGENTS.md §0, §2`)
- [ ] **Slides only:** default safe margin **~0.5″ (72px)**, not 0.9″; image-led layouts (cover, divider, statement, split, persona, case panel) **full-bleed** the image to ≥1 edge while the type half keeps the margin (see `AGENTS.md §2`, `LAYOUTS.md Part 6`)

## Series numbering (for carousels & multi-part decks)

- [ ] Number top-left, **80px from edges**, **48pt Poppins Bold**
- [ ] Color flips with background: white on dark surfaces, navy on lime
- [ ] Plain numerals (1, 2, 3 …) — never emoji or stylized digits
- [ ] Identical position and size across every tile/slide in the series

## Format-specific sizing

| Format | Dimensions |
|---|---|
| Slide deck (16:9) | 1920 × 1080 px |
| Square social tile (LinkedIn, IG) | **2160 × 2160 px** (preferred); 1080 × 1080 px minimum |
| Vertical story (IG, TikTok) | 1080 × 1920 px |
| Web hero | 1440 × 900 px design canvas |
| Print A4 | 210 × 297 mm at 300 DPI |

Safe zone on social tiles: keep critical content **≥ 80px from all four edges** (the same 80px rule used for series numbering).

## Voice

- [ ] Reads as **Smart, Human, Energetic, Distilled, Bold, Creative, Authentic**
- [ ] No agency clichés (*leverage, end-to-end, best-in-class, at the intersection of, revolutionary, disruptive, storytelling solutions*)
- [ ] Active voice, short sentences, no hedging
- [ ] CTA is a direct verb + object — never "Learn more"
- [ ] **Emojis** allowed *with* copy, max 3 per page — expect cross-platform variance.
- [ ] **Voice patterns** used intentionally, not by accident — stretched letters (cover/section only), the ladder (once per deck), strikethrough humor (once per deck). Lowercase first words are okay as a casual signal.
- [ ] **Slides only:** headline is **editorial, not descriptive** — ≤8 words with a point of view (question, two-beat, italic emphasis, giant word), not a label like "X: an overview" (see `AGENTS.md §10`)

---

When in doubt, **simplify**. The system works because it is restrained.
