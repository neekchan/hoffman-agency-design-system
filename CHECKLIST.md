# Visual Consistency Checklist

A short list to run through before shipping any branded surface — slide, social tile, document, web layout.

---

## Type

- [ ] Headline is **Poppins** (700 or 800) with exactly **one word** in `<em>` → Libre Baskerville italic
- [ ] No upright Libre Baskerville used as body or display
- [ ] Sentence case on headings; UPPERCASE only on eyebrows (tracked at 0.14em)
- [ ] One hero idea per surface — everything else shrinks hard
- [ ] **Slides only:** uses the **slide type scale** (20px min · 24–32px body · 40px subhead · 64–88px title · 96–150px display) — NOT the 16px web body; **≤ 3 distinct sizes** per slide (see `CLAUDE.md §1`)

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

- [ ] Imagery the AI can't place is a **labelled** `.tha-placeholder` (icon + `__label` + art-direction `__hint`) — never a bare grey box
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
- [ ] **Slides only:** content **fills the frame** edge-to-edge — no dead whitespace, no 1240px/68ch web caps; imagery present by default; "restraint" = few elements scaled large, never small elements floating (see `CLAUDE.md §0, §2`)

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

---

When in doubt, **simplify**. The system works because it is restrained.
