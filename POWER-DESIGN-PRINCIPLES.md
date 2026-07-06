# Power Design Principles — a portable design-philosophy layer

Codified design principles, kept **separate from tokens** so they travel across any brand or design system.

- **Tokens** (colors, type, spacing) = *what it looks like.* They change per brand.
- **Principles** (this file) = *how it must behave and decide.* They're brand-agnostic and identical everywhere.

**How to use:** load this file alongside a brand's tokens. The agent obeys the tokens for *appearance* and these rules for *decisions*. Drop it next to `tokens.md` / `DESIGN.md` in a design system, put it in a skill, or paste it into any LLM as a system prompt.

Every principle is written as a **checkable rule**, not a vibe. Each carries five fields:

- **Rule** — a threshold, ratio, or `A XOR B` an agent can verify
- **Test** — how to check pass/fail
- **Fails when** — what the violation looks like
- **Why** — the authority, so it's trusted, not arbitrary

Source lineage: the 20 rules of Power Design (Tufte · Reynolds · Duarte · NN/g · WCAG · Refactoring UI · Müller-Brockmann).

---

## How to use this layer — reference, try, don't stick

**These are a REFERENCE layer, not a set of hard gates.** When writing or laying out text, *reference these rules and try your best to honor them* — but do **not** rigidly stick to them where the brand's house style deliberately does something else. They are the *why* behind good decisions, so you can reason about a trade-off instead of following a checklist blindly.

**Precedence when a rule collides with a house SOP — resolve by category:**

- **Universal craft WINS (apply as written) —** one idea (01), glanceable (02), chunks (03), F-pattern anchor (19), type-scale rhythm (06), size count (07), line-height (09), line length (10), contrast (11, WCAG AA floor / AAA 7:1 target), one accent per surface (13), no hue-only encoding (14), 8pt grid (15), one grid (16), proximity (17), data-ink (18), and **mode purity (20)**. This is brand-agnostic craft; honor it everywhere.
- **The brand's house SOPs WIN (they override the rule for their medium) —** the density, whitespace, palette-breadth, and margin calls are the brand's to make. In *this* system (The Hoffman Agency) those overrides live in `AGENTS.md` and apply **on slides**:
  - **04 Whitespace (≥40% / ≥60%)** → overridden by **"fill the frame"** (`AGENTS.md §2`) on Hoffman *slides*: restraint = few *large* elements, not empty space. (On *web*, the whitespace rule stands — Hoffman web is generous-whitespace.)
  - **05 Safe-zone (≥96px)** → Hoffman slides use a **~72px (0.5″)** margin (`AGENTS.md §2`).
  - **08 Body ≥24px / ≥28pt** → superseded by the **higher** Hoffman slide type scale (body 30–36px / 15–18pt; `AGENTS.md §1`). Hoffman is stricter, so honor the Hoffman scale.
  - **12 60-30-10 color** → does **not** apply to Hoffman *decks*, which move through the **whole palette** deliberately (`AGENTS.md §7`). It *does* still apply to Hoffman *web / social*.
- **No conflict → both hold.** If a rule and an SOP don't collide, obey both. If they collide and it isn't listed above, the **medium precedence in `AGENTS.md §0`** decides (slide rules win on slides, web rules on web).

**In short:** universal craft (contrast, grid, one-idea, mode purity) is non-negotiable; the density / whitespace / palette / margin calls follow the house style for the medium. Reference the rest, try to honor it, don't be a slave to it.

> **Rule 20 (Mode purity) is elevated to a hard rule in this system.** Every deck is Presenter **XOR** Document — see `AGENTS.md §12` for what each mode means in Hoffman terms, how the detail moves to speaker notes in Presenter mode, and how the agent decides the mode (infer from context, state the assumption, ask only if genuinely ambiguous).

---

## Focus & attention

### 01 · One idea
- **Rule:** Max one headline (≤10 words) + at most one supporting block per slide. A second headline = a second slide.
- **Test:** Count headlines and independent content blocks. >1 idea → split.
- **Fails when:** two competing messages share a canvas; the audience picks neither.
- **Why:** Reynolds, *Presentation Zen*; Duarte, *Slide:ology*.

### 02 · Glanceable
- **Rule:** The single message must be extractable in ≤3 seconds.
- **Test:** Show the slide for 3s, then hide it. If a viewer can't state the point, simplify or split.
- **Fails when:** the eye has to *study* the slide to decode it.
- **Why:** Duarte, *Resonate*; NN/g 3-second rule.

### 03 · Chunks
- **Rule:** ≤7 distinct visual chunks per slide; aim 3–5. Group atoms with proximity so the brain reads chunks, not items.
- **Test:** Count perceptible groups after grouping. >7 → consolidate.
- **Fails when:** nine ungrouped elements read as noise.
- **Why:** Miller 1956; Cowan 2001 (~4).

### 19 · F-pattern
- **Rule:** Headline + key visual live in the top-left→top-right band; first 200px vertical is the primary attention zone.
- **Test:** Is the core message in the top band, left-anchored? Centered-everything → fail.
- **Fails when:** the point is buried mid-slide or centered with no hierarchy.
- **Why:** NN/g eye-tracking (2006, 2017).

## Space & grid

### 04 · Whitespace
- **Rule:** ≥40% of slide area is empty (background only). Hero slides ≥60%.
- **Test:** Estimate the empty-pixel ratio. Below threshold → remove or shrink.
- **Fails when:** a cramped, anxious wall of content.
- **Why:** Refactoring UI; Presentation Zen.
- **Hoffman override:** on *slides* this yields to **"fill the frame"** (`AGENTS.md §2`) — see precedence above. Holds on *web*.

### 05 · Safe-zone
- **Rule:** 5% clear margin on every side (≥96px on 1920×1080). No text/logo/focal element inside it.
- **Test:** Check the outer 5% band is empty of focal content.
- **Fails when:** text kisses the edge; projector overscan clips it.
- **Why:** SMPTE/EBU title-safe; Apple HIG margins.
- **Hoffman override:** Hoffman slides use **~72px (0.5″)**, packing the frame tighter (`AGENTS.md §2`).

### 15 · 8pt grid
- **Rule:** Every margin/padding/gap ∈ {8, 16, 24, 32, 48, 64, 96, 128} (4 allowed for tight icon work). Never 13, never 27.
- **Test:** Scan spacing values for non-members of the set.
- **Fails when:** ad-hoc 13px/27px gaps create optical drift.
- **Why:** Bryn Jackson (Spec FM); Material Design.

### 16 · One grid
- **Rule:** A single 12-column grid, 24–32px gutters. Every element snaps to it.
- **Test:** Do all elements align to shared grid lines? Eyeballed centers → fail.
- **Fails when:** nearly-aligned-but-not elements drift.
- **Why:** Müller-Brockmann, *Grid Systems*.

### 17 · Proximity
- **Rule:** Related items ≤16px apart; unrelated items ≥48px apart. Distance = relationship.
- **Test:** Measure gaps between related vs unrelated groups.
- **Fails when:** a caption floats equidistant from two things; grouping is ambiguous.
- **Why:** Gestalt proximity; Williams, CRAP.

## Typography

### 06 · Type scale
- **Rule:** Pick one modular ratio (1.25 / 1.333 / 1.414 / 1.5 / 1.618); derive every size from it. No ad-hoc sizes.
- **Test:** Do all sizes fall on the chosen ratio's ladder?
- **Fails when:** invented sizes (19px, 23px) break the rhythm.
- **Why:** Bringhurst; Tim Brown, Modular Scale.

### 07 · Four sizes
- **Rule:** ≤4 distinct type sizes per slide; ≤6 across the deck.
- **Test:** Count unique font-sizes per slide and deck-wide.
- **Fails when:** a fifth size signals an unmade decision.
- **Why:** Refactoring UI; Müller-Brockmann.
- **Hoffman note:** Hoffman is stricter still — **≤3 sizes per slide** (`AGENTS.md §1`). Honor the stricter cap.

### 08 · Body ≥24px
- **Rule:** Body ≥24px on screen (≥28pt projected). Title ≥48px. Caption ≥18px floor.
- **Test:** Check the smallest body and caption sizes.
- **Fails when:** row 10 can't read it.
- **Why:** Reynolds; Duarte; AAP guidelines.
- **Hoffman override:** the Hoffman slide scale is *higher* (body 30–36px, floors quoted px + pt; `AGENTS.md §1`) — use it.

### 09 · Line-height
- **Rule:** Body line-height 1.4–1.6; display 1.05–1.2. (Tighter for big type.)
- **Test:** Check leading against type size band.
- **Fails when:** big headlines float apart; body lines crowd.
- **Why:** Butterick; Bringhurst.

### 10 · Line length
- **Rule:** Line length ≤60 characters (ideal 45–60). Slides shouldn't have paragraphs at all.
- **Test:** Count characters per line on any prose.
- **Fails when:** the eye loses its place jumping to the next line.
- **Why:** Bringhurst; Butterick.

## Color

### 11 · AAA contrast
- **Rule:** Contrast ≥4.5:1 body, ≥3:1 large text; **target 7:1 (AAA)** for projector resilience.
- **Test:** Compute contrast ratio of text vs its background.
- **Fails when:** a washed-out projector kills low-contrast text.
- **Why:** WCAG 2.2; Mayer contrast principle.

### 12 · 60-30-10
- **Rule:** 60% dominant (usually background), 30% secondary, 10% accent. The 10% is where the eye lands.
- **Test:** Estimate area share per color role.
- **Fails when:** the accent covers half the slide and screams.
- **Why:** Itten (interior tradition); codified by Refactoring UI.
- **Hoffman override:** does **not** apply to Hoffman *decks* — a deck moves through the whole palette, one dominant color per slide (`AGENTS.md §7`). Applies on *web / social*.

### 13 · One accent
- **Rule:** One accent color per slide for emphasis. Everything else neutral.
- **Test:** Count distinct emphasis colors. >1 → no accent.
- **Fails when:** three "highlight" colors cancel each other out.
- **Why:** Tufte, smallest effective difference.

### 14 · No hue-only
- **Rule:** Never encode meaning by hue alone. Pair color with shape, weight, label, or icon.
- **Test:** Would the meaning survive in grayscale? If not → fail.
- **Fails when:** red/green states are invisible to 8% of men.
- **Why:** WCAG 1.4.1; ColorBrewer.

## Delivery

### 18 · Data-ink
- **Rule:** Data-ink ratio ≥80% on charts. No 3D, no gradients, no drop-shadows on bars, no chartjunk, no decorative gridlines.
- **Test:** Strip every non-data pixel; measure what remains.
- **Fails when:** a shadowed 3D bar chart hides the numbers.
- **Why:** Tufte, *Visual Display of Quantitative Information*.

### 20 · Mode purity  *(the "worthy vs non-worthy deck" rule)*
- **Rule:** Each deck declares exactly **one** mode. **Presenter** = ≤15 words/slide, image-led, 1 idea/slide. **Document** = denser, hierarchical, short bullets allowed. It's **XOR** — never both in one deck.
- **Test:** Sample slides; if some are ≤15-word image slides and others are six-bullet walls, word-count variance spikes → fail.
- **Fails when:** a sparse hero slide sits beside a bulleted wall; the deck feels schizophrenic.
- **Why:** Tufte (document density) vs Reynolds (presenter sparsity) — both valid, mutually exclusive; mixing is what makes audiences distrust slides.
- **Hoffman note:** elevated to a **hard rule** here, and detail in Presenter mode moves to **speaker notes**. See `AGENTS.md §12` for the Hoffman implementation (both modes still fill the frame, use the slide scale, and use the whole palette — mode changes *depth*, not the visual system) and the infer-state-ask determination behavior.

---

## Add your own philosophy

Copy this block and fill it in. Keep the rule *checkable* — a threshold, a ratio, or an `A XOR B`. If you can't write a test for it, it's not codified yet; rewrite it until you can.

```
### NN · <name>
- **Rule:** <a checkable statement — threshold / ratio / A XOR B>
- **Test:** <how an agent verifies pass/fail>
- **Fails when:** <what the violation looks like>
- **Why:** <the authority / rationale>
```

---

*This file is the portable principles layer. Pair it with any brand's tokens; the rules hold regardless of palette. In the Hoffman system it is the reference layer — try to honor it; where it collides with a house SOP, the precedence block near the top decides.*
