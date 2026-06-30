# Hoffman Agency — AI Generation Prompts

Copy-paste templates for generating brand-consistent imagery with AI tools (Midjourney, DALL·E, Stable Diffusion, etc.). Use these as your starting prompt and fill in the bracketed values.

---

## Social tile (LinkedIn / IG carousel)

```
A [SOCIAL TILE / CAROUSEL TILE] for The Hoffman Agency with [BACKGROUND COLOR — Deep Navy #182d43, Lime Green #D2EB00, Purple #6103b9, or Teal #145f7b] background.

Typography (CRITICAL — follow exactly):
* Series number "[#]" in [white on dark / navy on lime], Poppins Bold, 48pt, top-left corner, 80px from top edge and 80px from left edge.
* Main headline, centered: "[FULL HEADLINE TEXT]"
  * "[word/phrase]" in Libre Baskerville italic, [Lime Green / Purple / Navy depending on bg], [80–120pt for emphasis words]
  * "[connecting words]" in Poppins Bold, [White / Deep Navy depending on bg], [60–80pt]
  * Continue alternating pattern for the full headline.

Hand-drawn annotation: [ONE OF: lime underline / purple double underline / lime circle / purple cross-out / lime arrow / purple bracket] beneath/around the word "[KEYWORD]".

Storyline squiggle: [OPTIONAL — if used as hero background, anchored top-right, full-bleed on top, right and bottom edges, navy extends left holding the content].

Constraints: NO other wavy lines, NO squiggly arrows beyond the approved annotation set. NO gradients. NO drop shadows. NO stock photography. NO emoji. Clean, premium tech aesthetic. High contrast. Square format 2160×2160 px.
```

### Example (filled)

```
A LinkedIn carousel tile for The Hoffman Agency with deep navy (#182d43) background.

Typography:
* Series number "1" in white, Poppins Bold, 48pt, top-left corner, 80px from top and 80px from left.
* Main headline, centered: "Trust matters more than attention."
  * "Trust" in Libre Baskerville italic, vibrant lime green (#D2EB00), 120pt
  * "matters more than" in Poppins Bold, white, 70pt
  * "attention" in Libre Baskerville italic, lavender (#CB65FF), 90pt

Hand-drawn annotation: a lime green hand-drawn underline beneath "Trust" for emphasis.

Constraints: NO other wavy lines, NO squiggly arrows. NO gradients. NO drop shadows. Clean, premium tech aesthetic. High contrast. Square format 2160×2160 px.
```

---

## Slide (16:9 presentation)

```
A presentation slide for The Hoffman Agency, 1920×1080 px, with [BACKGROUND COLOR] background.

Typography:
* Eyebrow label, top-left, Poppins Bold 22pt, letter-spacing 0.14em, UPPERCASE, color [Lime Green on dark / Navy 500 on light].
* Hero headline, left-aligned, Poppins Bold or Black, 96–120pt, with one or two words in Libre Baskerville italic for emphasis.
* Body subhead, Poppins Regular 28–32pt, max-width 28em.

Layout: asymmetric, content biased to the left 60% of the canvas, negative space on the right.

Chrome:
* Horizontal logo, bottom-left, 36px tall, 120px from left/bottom edges. Variant matches background (2-color on paper, white on navy or secondary, navy on lime).
* Slide number + label, bottom-right, JetBrains Mono 16pt, letter-spacing 0.12em, UPPERCASE.

Optional: one hand-drawn annotation (underline / circle / arrow / bracket / cross-out / double underline) in lime or purple.

Constraints: NO wavy lines outside the Storyline squiggle motif. NO gradients. NO frosted glass. Square corners (0–2px). NO emoji.
```

---

## Hero background block (with Storyline squiggle)

```
A hero block for The Hoffman Agency, with the Storyline squiggle as the background motif.

Composition:
* Background: solid Deep Navy (#182d43) covering the full canvas.
* Storyline squiggle (the boxed lime-on-navy monogram from brand assets), positioned right-aligned, with 0 margin on top, right, and bottom edges (full-bleed on three sides). The square is sized to canvas height (1:1 aspect ratio).
* Navy extends from the left edge of the squiggle to the left edge of the canvas — width variable, holds the content.
* On the navy-extension area: headline in Poppins Bold, 80–120pt, white, with one word in Libre Baskerville italic, lime green.

Constraints: NO other graphics. NO additional wavy lines, NO arrows. The squiggle is the only motif on the canvas.
```

---

## Annotation reference (for AI hand-drawn marks)

When asking an AI to add a hand-drawn mark, use these exact terms:

| Mark | Prompt phrase |
|---|---|
| Underline | "hand-drawn single underline beneath [word], lime green, 4px stroke, slightly imperfect" |
| Double underline | "hand-drawn double underline beneath [word], purple, 3px parallel strokes, slightly imperfect" |
| Circle | "loose hand-drawn ellipse around [word/phrase], lime green, 4px stroke, organic shape — not perfect" |
| Cross-out | "hand-drawn diagonal strike-through across [word], purple, 4px stroke" |
| Arrow | "hand-drawn curved arrow from [point A] to [point B], lime green, 4px stroke, organic curve" |
| Bracket | "hand-drawn pull-out bracket connecting [items], purple, 3px stroke" |

**Banned visual elements** — explicitly exclude these in your prompt:

> "NO wavy decorative lines outside the Storyline squiggle motif. NO squiggly arrows. NO geometric shapes with hard edges as decoration. NO gradients, drop shadows, or glows. NO stock photography. NO emoji or unicode pictograms. NO logos on the body of carousel tiles (cover/closing only)."

---

## Voice guidance for copy

When asking an AI to write headline or body copy for Hoffman:

```
Write in the voice of The Hoffman Agency: Smart, Human, Energetic, Distilled, Bold, Creative, Authentic. Short sentences. Active voice. Lead with the punchline. No agency jargon (no "leverage", "end-to-end", "best-in-class", "at the intersection of", "revolutionary", "disruptive", "storytelling solutions"). No emoji. CTA is a direct verb + object, never "Learn more". Pick one keyword to italicize for emphasis — choose for sound and meaning, not grammar.

Topic: [...]
Format: [headline / pull quote / body paragraph / CTA]
Length: [...]
```

---

## Photography (placeholder `__prompt` seeds)

Every `.tha-placeholder` for a photo carries a `__prompt` — one or two sentences an image generator can run with. Build it from this template:

```
[SHOT TYPE — candid documentary photo / environmental portrait / wide shot / close-up / over-the-shoulder],
[SUBJECT — who is doing what, concretely],
[LIGHT — natural window light / soft directional light / warm ambient],
[WARDROBE/SET — business-casual, lived-in workspace, no staging],
warm color grade, eye-level, documentary style. [ASPECT RATIO].
```

Always exclude: `no suits, no stock-photo posing, no motion blur, no lens flares, no 3D renders, no cool-blue grade.`

### Examples (from the deck, slides 30–30f)

- *Candid documentary photo, comms team mid-conversation around a laptop, natural window light, business-casual, warm color grade, eye-level, no staging. 16:9.*
- *Environmental portrait, tech executive, shoulders up, direct eye contact, soft natural light, warm grade, shallow depth. 4:5.*
- *Black-and-white editorial portrait, CTO seated by a window, soft directional light, direct gaze, honest skin texture, no retouching gloss. 4:5.* (B&W is allowed for case-study portraits only.)
- *Cinematic wide shot, engineering team reviewing work on a glass wall, dusk light through office windows, warm grade, candid, documentary, dark tones that hold white type. 16:9.* (For full-bleed heroes — ask for dark tones so the navy overlay + white type read.)

---

## Files referenced

- `README.md` — full design system
- `DESIGN.md` — portable AI context file (google-labs-code/design.md format)
- `CHECKLIST.md` — pre-ship visual consistency checklist
- `assets/` — logo variants and Storyline squiggle SVGs
