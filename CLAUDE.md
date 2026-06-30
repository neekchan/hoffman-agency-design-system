# 👋 START HERE — orientation for any AI handed this package

You are looking at **The Hoffman Agency design system**: brand tokens, fonts, logo/illustration assets, a component bundle, reusable templates, and the written rules that govern all of it. Your job is to produce **on-brand** output (decks, web pages, social tiles, documents) — not to invent a new look. Read the files below **in this order** before building anything.

**Read first — orientation & rules (always):**
1. **This file (`CLAUDE.md`)** — the slide/office-doc authority. **§0 is the most important thing in the system:** this brand serves *two media with different physics* (web vs. slides), and §0 tells you which rule set wins. Read §0 before anything else.
2. **`README.md`** — the human read of the brand (voice, content fundamentals, the full annotated file map). Start at its "File structure" block to see where everything lives.
3. **`DESIGN.md`** — the machine-readable single source of truth: every color, type, spacing, radius, shadow token + voice/imagery rules. When a value must be exact, trust `DESIGN.md` over prose.

**Then read by task — what you're being asked to make:**
- **A deck / presentation / any fixed 1920×1080 slide** → `LAYOUTS.md` (the 48-layout library, L01–L51 — pick a named layout, don't free-style) + `CLAUDE.md §§1–8` (slide type scale, "fill the frame," imagery, color, Fluent emoji). Build from `templates/deck/Deck.dc.html`.
- **A web page / marketing site / app UI** → `README.md` web sections + `ui_kits/website/` (real components) + `DESIGN.md` web type scale. Web posture: generous whitespace, sparse imagery, 1240px measure.
- **A social tile / one-pager / keynote** → the matching folder in `templates/` (`social-tile/`, `one-pager/`, `keynote/`).
- **Generating imagery with an AI image model** → `PROMPTS.md` (copy-paste prompt templates that bake in the Hoffman grade/mood).
- **Before shipping anything** → run `CHECKLIST.md` (pre-ship visual-consistency checklist).

**The two runtime files you actually load in code:**
- **`colors_and_type.css`** — all color + type tokens as CSS variables, plus `@font-face` for the self-hosted fonts in `fonts/`. Link this on every page.
- **`_ds_bundle.js`** — the compiled components, exposed on the global `window.HoffmanAgencyDesignSystem_d10f7f`. Load it, then read components off that namespace.

**Assets live in `assets/`:** logos (10 colorways), the Storyline monogram, 76 hand-drawn annotations, and Fluent-emoji (`assets/emoji/`). Use these — don't redraw them.

**Do NOT hand-edit** `_ds_bundle.js`, `_ds_manifest.json`, or `_adherence.oxlintrc.json` — they are compiler-generated. Edit the sources (`*.jsx`/`*.tsx`, `colors_and_type.css`) and let them regenerate.

**Golden rule:** when in doubt, match the existing system — pull real hex values, font stacks, and components from the files above rather than approximating. Less is more; one point per surface; let the brand's own assets carry the emotion.

---

# Hoffman deck SOPs — slide design standards (remember these)

These are the user's tuning rules for building Hoffman **slides** (distinct from web/components). Apply to every deck layout in `templates/deck/` and when copying any new layout the user uploads. The source-of-truth reference deck is the WISE pitch (Hoffman house style); match its *proportions*, not exact pixels.

## 0. MEDIUM PRECEDENCE — read this first
This design system serves **two media with different physics**, and their rules are NOT interchangeable:

- **Web / screen / social** — webpages, the UI kit, social tiles, the brand site. Governed by **`DESIGN.md`** + `colors_and_type.css` (web type scale, `16px` body, 68ch measure, 1240px max-width, "generous negative space," "sparse imagery").
- **Slides / office documents** — PowerPoint/Keynote decks (1920×1080), and other fixed-canvas page documents. Governed by **this file (`CLAUDE.md`)** + **`LAYOUTS.md`**.

**When building a deck or any fixed-canvas slide/office artifact, the slide rules below OVERRIDE the web rules.** Specifically, for slides you IGNORE these web rules:
- ❌ The web **type scale** (16px body etc.) → use the SLIDE type scale in §1.
- ❌ "**Generous negative space** / whitespace is the brand flexing / most slides airy" → use "**fill the frame**" in §2. Restraint on a slide means *few ELEMENTS scaled large*, never small elements floating in empty space.
- ❌ "**Sparse imagery**" → imagery is the **DEFAULT** on slides (§3).
- ❌ Web **max-width / reading-measure** caps (1240px, 68ch) → slides are edge-to-edge 1920×1080; use the full frame.

DESIGN.md still governs **color, fonts, the italic-word move, the Storyline motif, annotations, and voice** — those are brand-wide and apply to both media. It's only the *web layout/scale/density/imagery* posture that slides override.

## 1. Slides use a SLIDE type scale, not a web type scale
Canvas is 1920×1080 → **1pt = 2px**. Translate PowerPoint point sizes accordingly.
- **≤ 3 distinct type sizes per slide.** (A stat's giant number can be a deliberate 4th.)
- **Minimum size on any slide: 20px (10pt).** Captions, eyebrows, mono labels, chips all sit here — never smaller.
- **Body copy: 24–32px (12–16pt).** Default 28px. NEVER the 14–18px web sizes.
- **Subhead: 40px (20pt).**
- **Title: 64–88px (32–44pt).**
- **Hero/display: 96–150px (48–75pt)** — covers & section dividers only.
- Pick ~3 of these per slide (e.g. eyebrow 20 + body 28 + title 72). Don't ladder through five sizes.

## 2. Fill the frame — no dead whitespace
AI slides look uniform but hollow. Big type + imagery fills the canvas. Content should occupy the full frame top-to-bottom, not float in a sea of white. Generous padding is fine; vast empty regions are not. If a slide feels empty, the type is too small or it's missing its image.

## 3. Imagery is the DEFAULT, not optional
Almost every page in a Hoffman deck carries a graphic/image alongside the text. Do not strip images to make a layout "clean." When a real image isn't available, reserve a standardized placeholder (below). Type-only slides are the exception (big statement, pull quote, section divider can be type-led — but even sections often carry a small graphic).

## 4. Standardized image placeholder
Keep the **dotted border** + **aspect-ratio label** (the user likes both). Three lines, in this exact spirit:
- **`__label`** = `Type · Aspect · generate <W×H>px` — e.g. `Portrait · 4:5 · generate 1080×1350px`. The generation resolution is REQUIRED so whoever prompts an AI knows the exact dimensions to make. Resolutions by aspect:
  - 16:9 → 1920×1080 · 4:3 → 1440×1080 · 3:4 → 1080×1440 · 4:5 → 1080×1350 · 1:1 → 1280×1280 · 3:1 → 1800×600 · 2:1 → 1600×800 · 9:16 → 1080×1920
- **`__hint`** = art direction for the human: subject + composition + mood + the Hoffman imagery direction (candid, natural light, warm grade, business-casual).
- **`__prompt`** = a real, *longer* generation prompt (2–3 full sentences) — detailed enough for modern image models. Not a 6-word fragment.
- Placeholders must be **true to size** — large, matching the sample proportions (often a full column or half the slide), never a tiny token.

## 5. Text slots are typed prompts (role + style + word cap)
Label each text region by what it is and how to write it, not a vague description. Examples:
- Title: *one line, ≤8 words, one Baskerville-italic word.*
- Punchy subtitle: *accentuates the slide, ≤14 words.*
- Body: *leads with the punchline, ≤30 words.*
- Bullet/prop: *a trigger not a sentence, ≤6 words, max 3.*
- Stat: *number + ≤4-word label, max 3.*
Put these specs in the `@layout` comment's `slots=` and/or the on-canvas Layout-notes overlay so the writer is prompted, not guessing.

## 6. Restraint (unchanged, still core)
One point per slide; minimum on the page, rest narrated by the speaker; visible hierarchy (one dominant element); one graphic earns the emotion; cut before you add. See `LAYOUTS.md` Part 1.

## 7. Color — use the WHOLE palette; the web 30/30/10… ratio does NOT apply to decks
The web rule that caps each secondary at ~10% exists to keep *webpages* uniform. **On a deck it is the wrong instinct** — it's what makes AI decks look navy-paper-navy-paper and one-tracked. For slides:
- **Move through the full palette deliberately.** Different sections, dividers, audiences, or themes should own their *own* full-color surface (a teal Landscape section, a purple Audience section, a lime Ideas section, a violet About section…). Color carries structure and rhythm.
- **Map color to meaning where you can** — one surface/accent per section or per repeated entity (e.g. each audience persona keeps its accent across every slide it appears on). This is what makes a deck feel multi-dimensional instead of decorative.
- **The only color rules that still bind on slides:** (1) **WCAG contrast** for every type-on-surface pair (≥4.5 body, ≥3 large/bold — lime/cyan surfaces take navy type, navy/purple/teal take white/light); (2) **one dominant color per individual slide** so each slide has a clear mood — *variety lives across slides, not crammed within one*; (3) the 2-color logo still only sits on navy/lime/paper (white logo on any secondary surface).
- Paper/white/sand and navy are still the connective tissue — let color *punctuate* the narrative (cover, sections, key-idea and stat moments), not vibrate on every single slide.

## 8. Fluent emoji — a DEFAULT storytelling device on slides, not a garnish
Hoffman decks use **Microsoft Fluent emoji** (static + animated) as a core visual-storytelling device — this is house style, defined under Brand Voice. On a deck the brand-voice "sparingly" caution is about *decoration*; it is **not** a reason to omit them. **Actively look for the storytelling/emotional beat on each slide and place a Fluent emoji there.** If a slide makes a human point — an aspiration, a tension, a win, a number that should feel big — and carries no other graphic, it is probably *missing its emoji*.
- **Mechanism:** the `<fluent-emoji>` element is auto-loaded by the deck/keynote templates. Use it by name: `<fluent-emoji name="rocket"></fluent-emoji>` inline in a headline/line, or `size="96"`–`160` to use one as the slide's hero graphic. Browse/copy from the **Brand → Fluent emoji picker** card. (Full library resolves by name; curated set is localized.)
- **Where to inject (look for these every deck):** a charged word in a title or pull-quote (emoji rides the baseline next to it); section dividers (one large emoji as the section's motif); persona/audience slides (a face/object that *is* the persona); stat moments (an emoji paired with the giant number); "the idea" / aspiration lines; agenda or list rows (one small emoji per row as the bullet). The cascade/orbit/pill/stat-grid layouts (L33–L38) take emoji in place of, or alongside, the line-icons.
- **Animated** (`variant="animated"`): reserve for the *one* emotional peak — the cover's idea, the hero stat, the closing line. One animated emoji per few slides, never a wall of motion. Static color is the default form.
- **Still true (the guardrails, unchanged):** pair with copy or a clear subject, never emoji *stacks* as decoration (`🎯💡🔥💪`), never two competing heroes, respect the "one graphic earns the emotion" rule — a Fluent emoji **is** that one graphic on many slides. Keep contrast in mind on color surfaces (the emoji art is full-color; give it breathing room on busy grounds).
- **Sizing scale on slides:** inline-in-text ≈ rides font size (1em); list-row bullet 32–44px; stat pairing 64–96px; section/hero motif 120–200px.

---
**Status:** the slide-design SOPs in this file are established across all **48 layouts** in `templates/deck/Deck.dc.html` (codes L01–L51, catalogued in `LAYOUTS.md`). As the user uploads further layouts, copy them against these SOPs and keep `LAYOUTS.md` + the deck count (README, SKILL.md) in sync.
