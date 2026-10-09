# Visual Consistency Checklist — and the delivery gate

A short list to run through before shipping any branded surface — slide, social tile, document, web layout.

**This is a gate, not a tick list.** Run it against the *finished* artifact, then paste a **delivery report** (format at the end of this file) with the deliverable. Three tiers:

- **HARD** — any FAIL blocks ship. No exceptions, no "flagged for later". These are the sections marked **HARD** below: content integrity · confidentiality · contrast · built inside the system · functional (web/app) · finished file (`.pptx`).
- **LOCKS** — everything else. Fix it, or write a one-line reason for the exception in the report. Silence is not an exception.
- **Evidence or it didn't happen** — a PASS line states what was checked and how (a count, a path, the render that was looked at). A bare "PASS" is a FAIL. A screenshot is not a render; a tick is not a check.

---

## Before you build (intake)

- [ ] **Intake run** (`INTAKE.md`): medium, Presenter/Document mode, audience/tone/language, colour direction and imagery choice confirmed; the one-line brief was restated back
- [ ] **Imagery decided** (`IMAGERY.md`): generate / user-supplies / labelled placeholder chosen up front — not left to chance mid-build
- [ ] **Built inside the system**: `colors_and_type.css` + `_ds_bundle.js` loaded, started from the medium's template, named layouts from `LAYOUTS.md` — no hand-authored bespoke chrome

## Content integrity — **HARD**

The brand promise is *earned* media. A deck or page that invents its evidence breaks the one thing the agency sells. These apply to every medium.

- [ ] **Every number is real and traceable** — statistics, percentages, prices, dates, counts, market sizes. The source sits in speaker notes, a footnote slot, or the build note. A number with no source is cut, not kept because it looks right
- [ ] **No invented testimonials, quotes, named people, client names, logos, awards, press mentions or case-study results.** Real and supplied, or absent
- [ ] **Unknown content is a visible, labelled placeholder** — the slot reads `[REAL DATA · what goes here · who supplies it]` in the surface itself (not a code comment), the same way an image slot reads `Type · Aspect · generate W×Hpx`. Never plausible-looking filler that could ship by accident
- [ ] **Stock stand-in imagery carries a visible swap flag on the surface** (caption, corner tag or the placeholder hint) until the real photo lands. An unflagged stand-in is disguised as final (`IMAGERY.md`)
- [ ] **Qualifiers survive the edit** — "up to", "in pilot", "estimated", "n = 12" stay attached to the claim they qualify. Cutting the hedge is inventing a result (`SOUNDCHECK.md` → never present an inference as a verified result)
- [ ] **Generated type matches the brief, word for word** — when an image model set any of the words (social path B, `AGENTS.md` Section 20), every word on the image was read against the brief or ledger. An added claim, a dropped headline or a changed figure is a FAIL here, not a typo
- [ ] **Repeated figures are single-sourced** — the same number reads identically everywhere it appears (moved here from intake; it is a HARD check)
- [ ] **Deck-level:** the governing thought of each slide is supported by what is actually on the slide or in its notes, not by a claim the evidence does not make

## Social tiles & carousels

For LinkedIn / Instagram tiles and carousels (`AGENTS.md` Section 20). These are LOCKS: fix, or give a one-line reason. Measure them with `tools/tile_count.js`; a guess is not evidence.

- [ ] **One idea per tile**, and the brief was written as a per-tile ledger before layout (`INTAKE.md`)
- [ ] **≤ 4 content elements per tile** (eyebrow, headline, hero figure, support line, one list, one image)
- [ ] **≤ 15 words per tile** — a figure is one word; chrome, list markers and attributions excluded
- [ ] **≤ 3 type sizes + 1 hero per tile**, chrome included; nothing under 22px on a 1080 tile
- [ ] **≤ 1 hand-drawn mark per tile**, highlights included
- [ ] **One surface + one accent per tile**, surfaces rotating across the carousel
- [ ] **≥ 40% of each tile is quiet** — no type, mark, icon, logo or filled block
- [ ] **Chrome is the series marker only**, plus the logo on the cover and closing. No masthead, issue line, rules or footer repeated across every tile
- [ ] **Each claim lives on one tile**; no device appears on every tile just because the concept has it
- [ ] **No generated brand asset** — logo, Storyline and marks are the real files (`AGENTS.md` Section 4.6)

## Functional — web & app surfaces — **HARD**

For `ui_kits/website/`, `ui_kits/app/` and any interactive HTML deliverable. Static decks and tiles skip this section.

- [ ] **Every navigation link resolves** to a real section, page or anchor. No `href="#"`, no links to pages that do not exist yet unless the link text itself says so
- [ ] **No dead controls** — every button, toggle, input and menu does what its label says, or is visibly marked inert (`disabled` + a reason, or a `[REAL DATA]`-style placeholder label). A control that does nothing on click is a FAIL
- [ ] **Keyboard-reachable with a visible focus state** on every interactive element; `prefers-reduced-motion` honoured (`AGENTS.md Section 16`)
- [ ] **States are marked, not invented** — the interaction-states catalog and empty/error/loading patterns are *reserved* in `DESIGN.md`. Where a surface needs one, leave a labelled `<!-- TODO state: loading — spec reserved, DESIGN.md Tier 1 -->` marker rather than inventing a spec. Inventing a reserved item is a FAIL
- [ ] **Run before ship** — the page was opened and clicked through, the console is clean, nothing is reachable only by guesswork. Say what was clicked in the report

## Deck mode (slides)

- [ ] Deck declares **one mode — Presenter XOR Document** (`AGENTS.md Section 12`); word-count / bullet-density stays consistent across all slides
- [ ] **Presenter**: ≤1 idea, ≤15 words/slide, image-led; detail is in **speaker notes**, not on the slide
- [ ] **Document**: denser + hierarchical, short bullets allowed, each slide stands alone — still no paragraphs
- [ ] No sparse hero slide sitting beside a six-bullet wall (the "schizophrenic deck" tell)
- [ ] **Titles fill the width and break clean** — no truncation/ellipsis, no mid-phrase wrap, no title running half-width with a dead strip of white on the right (`AGENTS.md Section 2.5`)
- [ ] **Every multi-line heading breaks only at its own `<br>`** — rendered lines = authored breaks + 1 on every slide (`tools/title_check.py` passes); no `ch` caps on display type; no `text-wrap: balance` on slide headings; each line fits its measure at the floor size (`AGENTS.md Section 2.5`, "The break is authored")
- [ ] **Every content slide carries a visual** — image, placeholder, icon, Fluent emoji or annotation; no bare text slide with empty margins (`AGENTS.md Section 3`)
- [ ] **Chunked, not dumped** — dense points broken into 2–4 short labelled beats, never a paragraph or a six-line bullet stack (`AGENTS.md Section 5`)
- [ ] **Every slide is identifiable in the markup** — `data-screen-label="NN Label"` authored on every slide, not left to the runtime component; a comment or diff pinned to a coordinate is otherwise unattributable (`AGENTS.md Section 14`)
- [ ] **Tappable cards read as tappable, quietly** — one mark per card (never two), quiet at rest, motion on hover, the card itself never lifts (`AGENTS.md Section 15`)
- [ ] **Corner mark is visible on its surface** — `storyline-navy-white.svg` is a NAVY mark for LIGHT grounds; on navy/purple/teal use `storyline-mark.svg` tinted to the contrast colour (`README` → The Storyline squiggle)
- [ ] **Any "animated" emoji genuinely animates** — checked against `assets/emoji/animated-manifest.json`, not assumed from the folder name (`AGENTS.md Section 8`)
- [ ] **Presenter deck: the animated brand mark was offered**, with its pre-set link. If accepted, it sits where the user directed (the closing if they didn't say) and is the hero of its slide, never beside body copy or as a bullet. It comes from a pre-set Brand Mark Studio link (never hand-built), is exported transparent with `on=` the slide's surface, and is a GIF in `.pptx` or an APNG in HTML. If the file isn't in yet, the placeholder carries the link. Document-mode decks carry none (`AGENTS.md Section 17`)
- [ ] **Marks and the words they mark are different colours** — a lime underline under a lime word erases itself (`README` → Hand-drawn annotations)

## Finished PowerPoint file (`.pptx` / `.potx`) — **HARD**

Run against the **exported file**, not the source that made it (`POWERPOINT.md Section 9`). Render every slide at full size — a passing screenshot is not proof.

- [ ] File opens; slide count as expected; slide size **16:9** (13.333in × 7.5in / 1920×1080)
- [ ] **Theme fonts are Poppins** (major + minor) — not Calibri/Aptos/Arial; theme colours match the Hoffman palette (`POWERPOINT.md Section 2`)
- [ ] No unintended **fallback font** in any text run; fonts embedded when portability requires it
- [ ] Only approved logo files used; every logo's **aspect ratio within 1%** of `assets/asset-manifest.json` (set one dimension, derive the other, lock ratio)
- [ ] **Logo variant matches surface** — paper/white/sand → 2-colour, **lime and cyan → 1-colour navy**, navy/purple/teal/lavender → 1-colour white
- [ ] No content overlaps a **protected** logo / boxed-Storyline zone (the full-frame line is a background layer, exempt)
- [ ] No element spills off-canvas; no image **stretched** (displayed ratio ≈ source); no low-res image over-enlarged
- [ ] Every diagram **arrow connects a visible source and target** — not open space, not an oversized textbox edge; workflows use L35
- [ ] No unresolved image placeholder / production note; speaker notes present when Presenter mode requires them
- [ ] Advisory: ≤3 type sizes/slide, ≤15 words/slide (Presenter), square corners default, headline carries its italic emphasis (word or phrase), layout code matches its manifest structure

## Confidentiality & export — **HARD**

- [ ] **`references/` is NEVER included** in any download, zip, bundle, standalone/inline build, published URL, PPTX/PDF, or handoff — it is the owner's confidential source material (read-for-context only)

## Type

- [ ] Headline is **Poppins** (700 or 800) with its **emphasis** — a key word *or* short phrase — in `<em>` → Libre Baskerville italic (chosen by meaning, not a fixed count; one emphasis per line, never scattered)
- [ ] **The italic emphasis also carries a brand colour** where it helps it read (lime on navy, purple/teal on paper, navy on lime) — a WCAG-passing accent, not a monochrome serif; one coloured emphasis per headline (`AGENTS.md Section 10`)
- [ ] No upright Libre Baskerville used as body or display
- [ ] Sentence case on headings; UPPERCASE only on eyebrows (tracked at 0.14em)
- [ ] One hero idea per surface — everything else shrinks hard
- [ ] **Slides only:** uses the **slide type scale as FLOORS, biased high** (20–24px labels · 30–36px body / def 32 · 40–52px subhead · 64–80px title · 120–132px statement/divider · 176px+ cover · ~240px closing) — NOT the 28px "safe" or 16px web body; **≤ 3 distinct sizes** per slide (see `AGENTS.md Section 1`)
- [ ] **Slides only:** no micro-text — nothing ≤10pt except a functional eyebrow / mono label; on-slide sources, footnotes, placeholder captions & repeated sub-labels are cut (sources → speaker notes); **3–5 large elements** per slide (see `AGENTS.md Section 9`)

## Color — contrast lines are **HARD**

- [ ] **Social:** one surface + one accent per tile, rotating across the carousel (`AGENTS.md` Section 20)
- [ ] **Web only:** on-canvas palette respects 30/30/10/10/10/10 ratio (Navy / Lime / Lavender / Purple / Cyan / Teal). **Decks/docs are exempt** — a deck should move through the full palette (a different surface per section/theme); the only color gates on slides are WCAG contrast + one dominant color per slide.
- [ ] Lead with **one dominant secondary** as the layout's (or slide's) mood; a second brand color may join as accent or type
- [ ] **Cross-pair combinations are allowed** (e.g. lavender + teal, cyan + purple) — *if* the pair clears WCAG (`preview/brand-color-pairings.html`)
- [ ] Color-on-color type clears WCAG: **≥ 4.5 body, ≥ 3 large/bold** — never type-on-type below 3:1
- [ ] **Display type is held to AAA (ratio ≥ 7), not AA** — when the pair is the *point* of a slide (a display headline, a statement word, a hero stat), passing AA is not enough: teal on aqua scores 5.96 and reads flat projected, purple on the same aqua scores 7.92 and carries it. Check `preview/brand-color-pairings.html`, which marks every pair on both bars (`AGENTS.md Section 7`)
- [ ] Colored **surfaces** use a WCAG-passing brand color as type — paper and navy aren't the only backgrounds (lime/cyan surface → navy type; navy/purple/teal surface → white/light type)
- [ ] Lime text on white? → switched to `--fg-accent` (#687600, lime-600)
- [ ] Text/background pair clears WCAG AA (≥ 4.5, or ≥ 3 for ≥24px) — check `preview/brand-contrast-matrix.html`; lime & cyan are backgrounds, never text on light
- [ ] No gradients, no three-color washes, no glows — the only sanctioned blends are the L12 textured icon cards and the Brand Mark Studio's animated mark

## Surfaces

- [ ] One light model per surface: **paper page + white cards**, or **white page + sand cards** (`.tha-theme-white`)
- [ ] Page and card sit one step apart — never paper-on-paper or white-on-white
- [ ] Cards keep a hairline `--border-2` so panels read even at low contrast

## Imagery & placeholders

- [ ] **Image workflow followed** (`IMAGERY.md`): capability checked → user asked (generate / supply / placeholder) → if generating, a reusable style prompt or the Hoffman house style was used; one image language across the piece
- [ ] Imagery the AI can't place is a **labelled** `.tha-placeholder` (icon + `__label` + art-direction `__hint` + generator-ready `__prompt`) — never a bare grey box
- [ ] Photo placeholder labels use the required format: `Type · Aspect · generate W×Hpx` (for example, `Portrait · 4:5 · generate 1080×1350px`)
- [ ] Placeholder ratio matches the real asset (`--16x9` / `--1x1` / `--4x5` / `--icon`, etc.); `.on-dark` on navy

## Emoji typography

- [ ] Emoji only **in place of a word**, wrapped in `.tha-emoji`, with `role="img" aria-label="<word>"`
- [ ] ≤ 3 emoji per surface; never used as bullets, icons, or decoration

## Logo

- [ ] Logo variant matches background: paper/white/sand → 2-color; lime and cyan → 1-color navy; navy, purple, teal or lavender → 1-color pure white (`assets/asset-manifest.json` → `surfaceToLogo`)
- [ ] Logo on a fixed corner, clearspace ≥ cap-height of "H" on all four sides
- [ ] Not rotated, stretched, recolored, or below min size (24px horizontal / 32px stacked)
- [ ] On social carousels: logo on cover + closing tiles only is acceptable; on internal decks/docs, every page can carry the chrome logo

## Storyline squiggle

- [ ] Version matches the background: **light / non-navy → boxed corner monogram**; **navy / dark field → line as background layer**
- [ ] **Line frequency (slides):** the full-strength lime line on navy is used **once per deck** (cover OR closing, not both); on any other slide the line is **faded / low-opacity** background texture (≈8–15%), never solid. A plain navy field (no line) is always fine
- [ ] Line sits as the **bottom layer above the fill, behind content** — and is **edge-locked**: full frame height, flush to the top, right & bottom edges, no bleed, sharp ends absorbed by the frame
- [ ] Boxed monogram is **never floating adrift on a navy field**; line is **never floated as an object** or shrunk into a corner with the cut-ends showing
- [ ] Not used as inline divider, tiled pattern, replacement for the wordmark, or animated loop

## Annotations

- [ ] At most **1–2 hand-drawn marks per surface** (a social tile: **1**)
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
- [ ] **Slides only:** content **fills the frame** edge-to-edge — no dead whitespace, no 1240px/68ch web caps; imagery present by default; "restraint" = few elements scaled large, never small elements floating (see `AGENTS.md Section 0, Section 2`)
- [ ] **Slides only:** default safe margin **~0.5″ (72px)**, not 0.9″; image-led layouts (cover, divider, statement, split, persona, photo + lists — the full list is `LAYOUTS.md` Part 6) **full-bleed** the image to ≥1 edge while the type half keeps the margin (see `AGENTS.md Section 2`, `LAYOUTS.md Part 6`)

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
| Print US Letter (the one-pager template) | 8.5 × 11 in at 300 DPI |

Safe zone on social tiles: keep critical content **≥ 80px from all four edges** (the same 80px rule used for series numbering).

## Voice

- [ ] Reads as **Smart, Human, Energetic, Distilled, Bold, Creative, Authentic**
- [ ] No agency clichés (*leverage, end-to-end, best-in-class, at the intersection of, revolutionary, disruptive, storytelling solutions*)
- [ ] Active voice, short sentences, no empty hedging; retain qualifications that materially change a claim (`SOUNDCHECK.md` for slides)
- [ ] CTA is a direct verb + object — never "Learn more"
- [ ] **Emojis** allowed *with* copy, max 3 per page — expect cross-platform variance.
- [ ] **Voice patterns** used intentionally, not by accident — stretched letters (cover/section only), the ladder (once per deck), strikethrough humor (once per deck). Lowercase first words are okay as a casual signal.
- [ ] **Decks & documents:** reviewed the audience, title spine and individual lines with **Soundcheck**, keeping good titles and useful exemptions; resolved any collision with the ≤8-word/one-line layout target while preserving the point. The review produces improvements, not pass/fail scores for each title (see `SOUNDCHECK.md` and `AGENTS.md Section 10`).

---

When in doubt, **simplify**. The system works because it is restrained.

---

## Delivery report — paste this with every deliverable

The report is the gate's output. One line per HARD section, one line for the LOCKS, one line saying what was actually done to verify, one verdict. Keep it under 15 lines; the detail goes in the build note, not here.

```
DELIVERY GATE · <deliverable> · <medium> · <Presenter|Document|n/a> · system v<X.Y.Z>

HARD  content integrity   PASS — 14 figures, 14 sourced in notes; 2 slots left as [REAL DATA] on slides 06, 11
HARD  confidentiality     PASS — references/ not in export (checked zip listing)
HARD  contrast            PASS — 9 type/surface pairs, all ≥ 4.5 or ≥ 3 at ≥ 24px (brand-contrast-matrix)
HARD  built in system     PASS — colors_and_type.css + _ds_bundle.js loaded; layouts L03, L20, L35; adherence linter clean
HARD  functional          n/a — static deck            (web/app: "all 9 nav links resolve; 0 dead controls; tab order checked")
HARD  finished file       PASS — rendered all 24 slides at full size with Poppins + Baskerville Italic; 0 fallback fonts

COUNT social          n/a — deck                    (social: "tile_count.js: 4 tiles; max 4 elements, 15 words, 3+1 sizes, 1 mark; min quiet 52%")

LOCKS 31 checked · 2 exceptions — slide 03 carries two marks (ladder + underline, the ladder is the point); slide 18 title is 9 words (client's product name is 3)

VERIFIED BY  opened the exported .pptx in PowerPoint, rendered every slide, read every number against the source sheet

RESULT  SHIP            (or: DO NOT SHIP — content integrity FAIL, 3 unsourced stats on slide 09)
```

Rules of the report:

- A HARD FAIL means **DO NOT SHIP**, full stop. Fix it, re-run, re-report.
- Social tiles add a **COUNT** line: the `tools/tile_count.js` numbers for the worst tile on each budget. Over budget is a LOCK exception with a reason, not a silent pass.
- A PASS without evidence is a FAIL. "Checked" is not evidence; "rendered 24 slides, 0 clipped titles" is.
- Exceptions on LOCKS get a reason, not an apology. If the reason doesn't survive being read aloud, it isn't an exception — fix the item.
- The report is written by whoever (or whatever) built the artifact and read by a human before it leaves the building. A self-graded PASS is a claim; the human's eyeball is the check.

---

<sub>The Hoffman Agency design system — created by **Nicolas Chan**, Head of Digital &amp; Chief Strategist, AMEA.<br>[neekchan@gmail.com](mailto:neekchan@gmail.com) · [nchan@hoffman.com](mailto:nchan@hoffman.com) · [linkedin.com/in/nicolaschan](https://www.linkedin.com/in/nicolaschan/)</sub>
