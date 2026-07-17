# IMAGERY — generating, sourcing, and placeholding images

How any agent handles images in a Hoffman artifact. The recurring failure is either skipping images entirely (a text-only slide) or dropping a bare grey box. Both are wrong: on slides, imagery is the **default** (`AGENTS.md §3`), and a placeholder is a finished, actionable slot, never an empty rectangle. This file is the decision procedure — run it as part of `INTAKE.md`.

> **This file is the *workflow* (whether to source an image at all, how, and the house illustration style). The copy-paste *generation prompts* — social tile, 16:9 slide, hero block, photography seeds, annotation phrasing — live in [`PROMPTS.md`](./PROMPTS.md). Decide here, then prompt from there.**

## The workflow

**1. Check your own capability first.**
Work out whether you can actually generate images in this session — an image-generation skill, an MCP image tool, or an image-model API key the user provides (for example a Gemini / Imagen key). State plainly what you have. Never promise images you can't produce.

**2. Ask the user** (this is intake question 5):
Generate images · the user supplies them · labeled placeholders for now. Only offer "generate" if step 1 says you can.

**3. If generating — learn the style before you generate.**
- Ask the user for **2–4 sample images** in the look they want.
- Study them and write a **reusable style prompt**: a subject-agnostic description of medium, palette, character / object treatment, texture, composition, and mood. Save it and reuse it for every image in the piece so the set stays consistent.
- Generate each image at the **correct aspect and resolution** (the table in `AGENTS.md §4`), one clear subject per image, composed to **fill the frame or bleed to an edge** (`AGENTS.md §2`).
- For the prompt scaffold itself (slide / social / hero blocks) start from `PROMPTS.md` and prepend your reusable style prompt.

**4. If generating with no samples (or the user says "use ours") — fall back to the house style.**
Use the **Hoffman house illustration style** documented below. It is the default so a build never stalls for lack of references.

**5. If you can't generate, or the user declines — use placeholders, never bare boxes.**
Drop a labeled `.tha-placeholder` where each image belongs (`AGENTS.md §4`): `Type · Aspect · generate W×Hpx`, an art-direction hint, and a full two-to-three-sentence generation prompt. A placeholder is a real slot the next person can act on — not a grey box, and not an excuse to leave the slide text-only.

## Two kinds of image — don't confuse them
- **Illustration** (the house style below) — flat editorial illustration for a **concept or metaphor**: "why now," "the choice," a tension, an idea. This is what the AI generates by default.
- **Photograph** — candid, natural-light, warm-grade, business-casual real people and places (`AGENTS.md §3` imagery direction) — for real teams, offices, events. Use a photo placeholder when a real photo is needed; never illustrate a real, named person. Build photo prompts from the photography seeds in `PROMPTS.md`.

## The Hoffman house illustration style
The documented default when the user hasn't supplied their own samples.

**Look.** Flat vector editorial illustration with a subtle paper-grain, gouache texture. One clear conceptual metaphor, generous negative space, soft small drop shadows. Whimsical, intelligent, calm, dry-witted — high-end conceptual magazine illustration.

**Palette (maps to the Hoffman secondaries).** Coral-salmon red, petrol teal-blue, mustard / golden yellow, cream off-white, plum purple, muted slate-blue and grey. One or two dominant colours per image over a flat textured ground.

**Characters.** Simple and stylised — rounded or elongated heads, small round dot eyes, a prominent angular nose in profile, thin minimal limbs, flat solid-colour clothing, warm terracotta skin. Naive and warm, never rendered or photoreal.

**Never.** No text, letters, numbers, words, logos, watermarks, or signatures inside the image.

**Reusable style-prompt prefix** — paste this before the per-image subject:

> Flat vector editorial illustration with a subtle paper-grain, gouache-textured finish. Warm muted editorial palette: coral-salmon red, petrol teal-blue, mustard golden-yellow, cream off-white, plum purple, and muted slate-blue and grey. Stylised human characters with simple rounded or elongated heads, small round dot eyes, a prominent angular nose in profile, thin minimal limbs, flat solid-colour clothing, warm terracotta skin tones. One clear conceptual metaphor, generous negative space, a flat single-colour textured background, soft small drop shadows. Whimsical, intelligent, calm, dry-witted business-editorial mood. Absolutely no text, letters, numbers, words, logos, watermark, or signature.

**Reference samples** (`assets/house-style/`) — three that show the range:
- `robot-handoff.jpg` — a robot handing finished documents to a worker (character + object).
- `toolbox-choice.jpg` — a figure choosing a full toolbox over a single shiny gem (metaphor carried by a figure).
- `iceberg.jpg` — a small iceberg tip over a hidden mass (pure object metaphor, no character).

## Consistency
Whatever the source — the user's samples or the house style — keep **one** image style across a single artifact. A photo-real image beside a flat illustration beside a 3D render reads as three design languages. One look per piece.
