# Hoffman Agency — AI Generation Prompts

Copy-paste templates for generating brand-consistent imagery with AI tools (Midjourney, DALL·E, Stable Diffusion, etc.). Use these as your starting prompt and fill in the bracketed values.

> **Deciding *whether and how* to source an image — generate vs. ask the user vs. labelled placeholder, the capability check, and the Hoffman house *illustration* style — is [`IMAGERY.md`](./IMAGERY.md). This file is the prompt library you reach for once you've decided to generate.**

> **⚠ Image models can't typeset.** Midjourney / DALL·E / Stable Diffusion garble real words — never ask them to render your headline, series number, or labels. Generate the **imagery / background only**, then set ALL type in the deck (HTML or PPTX). The type specs in the blocks below describe what to set in the **deck layer** — they are not instructions to bake text into the picture.

> **Sizes are given in both px and pt** (1pt = 2px on a 1920×1080 slide). Use whichever unit your tool expects — pixel-based generators (Midjourney / DALL·E / SD, browsers) take px; point-based tools (PowerPoint, Keynote, print layouts) take pt. When you add a size to any prompt, write both.

---

## Social tile (LinkedIn / IG carousel)

```
A [SOCIAL TILE / CAROUSEL TILE] for The Hoffman Agency with [BACKGROUND COLOR — Deep Navy #182d43, Lime Green #D2EB00, Purple #6103b9, or Teal #145f7b] background.

Type — set these IN THE DECK layer, do NOT render them in the image (CRITICAL):
* Series number "[#]" in [white on dark / navy on lime], Poppins Bold, 96px / 48pt, top-left corner, 80px from top edge and 80px from left edge.
* Main headline, centered: "[FULL HEADLINE TEXT]"
  * "[word/phrase]" in Libre Baskerville italic, [Lime Green / Purple / Navy depending on bg], [160–240px / 80–120pt for emphasis words]
  * "[connecting words]" in Poppins Bold, [White / Deep Navy depending on bg], [120–160px / 60–80pt]
  * Continue alternating pattern for the full headline.

Hand-drawn annotation: [ONE OF: lime underline / purple double underline / lime circle / purple cross-out / lime arrow / purple bracket] beneath/around the word "[KEYWORD]".

Storyline squiggle: [OPTIONAL — if used as hero background, anchored top-right, full-bleed on top, right and bottom edges, navy extends left holding the content].

Constraints: NO other wavy lines, NO squiggly arrows beyond the approved annotation set. NO gradients. NO drop shadows. NO stock photography. NO raw emoji or decorative emoji stacks. NO text, letters, or numbers rendered by the model — set all type in the deck. Clean, premium tech aesthetic. High contrast. Square format 2160×2160 px.
```

### Example (filled)

```
A LinkedIn carousel tile for The Hoffman Agency with deep navy (#182d43) background.

Typography:
* Series number "1" in white, Poppins Bold, 96px / 48pt, top-left corner, 80px from top and 80px from left.
* Main headline, centered: "Trust matters more than attention."
  * "Trust" in Libre Baskerville italic, vibrant lime green (#D2EB00), 240px / 120pt
  * "matters more than" in Poppins Bold, white, 140px / 70pt
  * "attention" in Libre Baskerville italic, lavender (#CB65FF), 180px / 90pt

Hand-drawn annotation: a lime green hand-drawn underline beneath "Trust" for emphasis.

Constraints: NO other wavy lines, NO squiggly arrows. NO gradients. NO drop shadows. Clean, premium tech aesthetic. High contrast. Square format 2160×2160 px.
```

---

## Slide (16:9 presentation)

```
A presentation slide for The Hoffman Agency, 1920×1080 px, with [BACKGROUND COLOR] background.

Type — set these IN THE DECK layer, do NOT render them in the image:
* Eyebrow label, top-left, Poppins Bold 22px / 11pt, letter-spacing 0.14em, UPPERCASE, color [Lime Green on dark / Navy 500 on light].
* Hero headline, left-aligned, Poppins Bold or Black — 64–80px / 32–40pt for a content title, up to 120–176px / 60–88pt for a statement or cover — with one or two words in Libre Baskerville italic for emphasis.
* Body subhead, Poppins Regular 30–36px / 15–18pt (default 32px / 16pt), max-width 28em.

Layout: asymmetric, content biased to the left 60% of the canvas, negative space on the right.

Chrome:
* Horizontal logo, bottom-left, ~32px tall, 72px from the left/bottom edges (inside the 0.5″ safe margin). Variant matches background (2-color on paper, white on navy or secondary, navy on lime).
* Slide number + label, bottom-right, JetBrains Mono 22px / 11pt, letter-spacing 0.12em, UPPERCASE.

Optional: one hand-drawn annotation (underline / circle / arrow / bracket / cross-out / double underline) in lime or purple.
Optional: one Microsoft Fluent emoji as the slide's single storytelling graphic, following `AGENTS.md Section 8`. In code, use `<fluent-emoji name="[NAME]" size="[96-160]"></fluent-emoji>`. In raster image prompts, request a Fluent-style emoji illustration only when the emoji is the intended hero graphic.

Constraints: NO wavy lines outside the Storyline squiggle motif. NO gradients. NO frosted glass. Square corners (0–2px). NO text, letters, or numbers rendered by the model — set all type in the deck. NO raw unicode emoji, emoji stacks, or decorative emoji. Fluent emoji are allowed only as the deliberate single graphic/story beat.
```

---

## Hero background block (with Storyline squiggle)

```
A hero block for The Hoffman Agency, with the Storyline squiggle as the background motif.

Composition:
* Background: solid Deep Navy (#182d43) covering the full canvas.
* Storyline squiggle — the LINE variant (`storyline-line-lime.svg`), because the field is navy. It sits as a background layer directly above the navy fill and behind the content, edge-locked to the top, right and bottom edges at full canvas height (no bleed; the sharp diagonal ends are absorbed by the frame). Lime. (The boxed monogram is only for light / non-navy grounds — never floated on a navy field.)
* The navy fill holds the content to the left of the waveform — width variable.
* On the navy-extension area: headline in Poppins Bold, 176–240px / 88–120pt, white, with the emphasis — the key word or short phrase — in Libre Baskerville italic, lime green.

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

> "NO wavy decorative lines outside the Storyline squiggle motif. NO squiggly arrows. NO geometric shapes with hard edges as decoration. NO gradients, drop shadows, or glows. NO stock photography. NO raw/decorative emoji or unicode pictograms unless a named Fluent emoji is the intentional storytelling device. NO logos on the body of carousel tiles (cover/closing only)."

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

> These are **photography** seeds (real people, teams, offices). For flat-editorial **illustration** — concepts and metaphors — use the **Hoffman house illustration style** in `IMAGERY.md`, not these.

Every `.tha-placeholder` for a photo carries a `__prompt` — one or two sentences an image generator can run with. Build it from this template:

```
[SHOT TYPE — candid documentary photo / environmental portrait / wide shot / close-up / over-the-shoulder],
[SUBJECT — who is doing what, concretely],
[LIGHT — natural window light / soft directional light / warm ambient],
[WARDROBE/SET — business-casual, lived-in workspace, no staging],
bright high-key, clean NEUTRAL white balance, eye-level, documentary style. [ASPECT RATIO + pixel size from `AGENTS.md Section 4`, e.g. 16:9 · 1920×1080px].
```

Always exclude: `no stock-photo posing, no motion blur, no lens flares, no 3D renders, no dark moody grade, no heavy amber grade.`

> ⚠️ **Corrected in v2.14.0.** This template used to say *"warm colour grade… no cool-blue
> grade."* **That was wrong**, and it is why generated imagery kept coming back amber and
> murky. The official Visual Identity deck's reference photography is **bright, high-key
> and clean, on a neutral white balance** — windows blown out to white, open shadows.
> **Colour comes from saturated wardrobe and solid backdrops, not from a grade.**
Add `no suits` **only when business-casual genuinely suits the subject** — it is the house lean, not a rule, and a formal sector or a formal moment can carry a suit.

### Examples

- *Bright high-key photo, comms team mid-conversation around a laptop, natural window light, business-casual in saturated colours, clean neutral white balance, eye-level, unposed. 16:9.*
- *Environmental portrait, tech executive, shoulders up, direct eye contact, soft natural light, warm grade, shallow depth. 4:5.*
- *Black-and-white editorial portrait, CTO seated by a window, soft directional light, direct gaze, honest skin texture, no retouching gloss. 4:5.* (B&W is allowed for case-study portraits only.)
- *Cinematic wide shot, engineering team reviewing work on a glass wall, dusk light through office windows, warm grade, candid, documentary, dark tones that hold white type. 16:9.* (For full-bleed heroes — ask for dark tones so the navy overlay + white type read.)

### The four official categories (VI deck, slides 25–28)

The brand's own photography guide defines **four**, each with its own technical
spec. A moodboard that only shows one of them is not showing the brand.

| Category | What it is | Technical |
|---|---|---|
| **Digging Stories** | The work. 2–5 people, diverse, discussion in the office. Professional but approachable. | Medium shot · eye level · **f/4–f/5.6** · natural lighting |
| **HA Moments** | The culture. "We're sharing our lives, having fun together." Office activity, celebration, family. **Phone-shot is explicitly allowed.** | Natural lighting · candid |
| **Storyteller · Business** | Portrait. Emotion, confidence. Different coloured clothes encouraged. | **50–80mm · f/5.6 · loop lighting** · eye level · **solid studio backdrop** |
| **Storyteller · Creative** | Portrait. Fun, personality, accessories, posing differently. | Same, with creative posing |

**"No suit and tie" is official policy**, stated on three of those four slides. It
is the house lean, not an absolute — a formal sector or a formal moment can carry
one — but the default is business casual.

**The treatment, in one line:** bright, high-key, clean neutral white balance,
open shadows, windows blown to white, **saturated wardrobe and solid backdrops
carrying the colour.** Never a dark or amber grade.

### In situ, not "candid" — the four moves that actually do it

Writing *candid* and *no staging* in a prompt does not produce a candid photo. It
produces the stock-library version of one: people walking abreast, evenly spaced,
turned toward each other, smiling, dead-centre, nothing in the way. That is a
pose of candidness. Four concrete moves break it, and they have to be spelled out:

1. **Give them a task, not a verb.** Not "walking and talking", not "collaborating"
   — a specific thing with a purpose and an awkward bit. Stowing a helmet under a
   scooter seat. Taking a bag of kopi across a counter. Shaking rain off a
   collapsed umbrella. Threading a bike lock while a backpack pulls you off
   balance. The awkwardness is what sells it.
2. **Say nobody is aware of the camera.** Explicitly: *"Nobody looks at the
   camera. Taken by a bystander who did not stop the scene."* A subject who knows
   they are being photographed stands differently, and the model draws that.
3. **Put something in the way.** *"Shot past the out-of-focus [scooter / shoulder /
   vending machine / handlebars] in the near foreground."* A clear, unobstructed
   view is the signature of a photographer who was allowed to set up. An
   obstruction says someone was just standing there.
4. **Break the composition on purpose.** *"Off-centre imperfect framing, the frame
   clipping objects at its edges."* Symmetry reads as art direction.

Then name the failure modes as negatives, because they are the defaults:

```
no stock-photo posing, no smiling at the lens, no group walking abreast,
no arranged huddle, no symmetrical clean framing
```

Also: **let people be ordinary.** Varied ages and builds, unglamorous posture,
honest skin texture, a crooked lapel mic, ink on a finger. And let the place be
cluttered — the stuff of a room (mismatched mugs, a cardigan on a chair back,
crossings-out on a page) does more for believability than the room itself.

### Market shots — the per-city notes

`AGENTS.md Section 3.5` sets the rule: if a slide is about a market, the image has
to be recognisably that market. These are the notes that make it work. Add a
**MARKET** line to the template — city and district, street texture, local
wardrobe, climate — and the shot comes back looking like the place.

**Specify the wardrobe, not the race.** Asking a model for an ethnicity gets a
caricature; asking it how people in that city dress for work gets you the city.

| Office | Street texture that reads as home | How people actually dress for work |
|---|---|---|
| **Taipei** · Da'an, Dunhua S. Rd | Banyan and camphor over the pavement, a rank of parked scooters, tiled mid-rises with rooftop water tanks | Relaxed and comfortable — oversized soft shirts, wide-leg trousers, muted earth tones, canvas tote, white sneakers, a sun umbrella |
| **Seoul** · Yongsan, Hangang-daero | Wide swept pavement, glass towers, Namsan's wooded slope behind, ginkgoes | The most fashion-forward — oversized monochrome tailoring in cream/charcoal/beige, cropped trousers, immaculate white sneakers, structured tote |
| **Tokyo** · Kyobashi, Chuo-ku | Narrow immaculate streets, vending machines, tidy utility poles, vertical signage | The most conservative — navy and grey, precise fit, leather briefcase, restrained and low-contrast |
| **Hong Kong** · Central, Queen's Rd | Steep pavements, dense vertical signage, trams, bamboo scaffolding | Sharp and fast — fitted dark tailoring, crisp shirts, good leather, moving at pace |
| **Beijing** · Jianguomenwai CBD | Wide boulevards, ginkgoes, tall glass, dry northern light | Status-aware — structured blazers even off-duty, darker sharper palette, polished shoes |
| **Singapore** · North Bridge Rd | Shophouses with five-foot ways, rain trees, glass behind | Tropical and unfussy — short sleeves, **no jackets ever**, office pass on a lanyard. Genuinely multiracial: Chinese, Malay (incl. tudung) and Indian Singaporean |
| **Kuala Lumpur** · Jalan Sultan Ismail | Monorail line, angsana and palms | Smart-casual tropical, modern tudung common. Malay, Chinese and Indian Malaysian |
| **Jakarta** · Sudirman / SCBD | Wide boulevard, glass towers, pedestrian overpasses, palms | **Batik is real office wear**, not costume. Modern hijab common |
| **Bangkok** · Wireless Rd, Lumpini | The Skytrain line overhead, orange motorcycle-taxi vests at the kerb | Brighter and well-pressed — smart blouses, soft silk-like textures |
| **San Jose** · The Alameda | Low-rise Californian commercial, palms, wide dry sky, golden light | The most casual anywhere — fleece vest, jeans, company tee, backpack. **No ties at all** |

Two things that give a fake away instantly: **a blazer on a tropical pavement at
noon**, and **legible signage** — generated lettering is always gibberish, so ask
for script *distant and out of focus*.

The finished shots are in `assets/photography/cities/`, one per office.

---

## Files referenced

- `README.md` — full design system
- `DESIGN.md` — portable AI context file (google-labs-code/design.md format)
- `CHECKLIST.md` — pre-ship visual consistency checklist
- `assets/` — logo variants and Storyline squiggle SVGs

---

<sub>The Hoffman Agency design system — created by **Nicolas Chan**, Head of Digital &amp; Chief Strategist, AMEA.<br>[neekchan@gmail.com](mailto:neekchan@gmail.com) · [nchan@hoffman.com](mailto:nchan@hoffman.com) · [linkedin.com/in/nicolaschan](https://www.linkedin.com/in/nicolaschan/)</sub>
