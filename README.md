# The Hoffman Agency — Design System

An integrated communications agency for tech brands. Hoffman helps companies turn complex business challenges into clear, compelling stories across earned, digital, social, content, creative and AI-enabled communications.

The brand voice is **smart, human and energetic** — professional without feeling stiff, bold without becoming noisy.

> ### ⚠ Two media, two rule sets — read before building
> This system serves **web** and **slides/office docs**, which have different layout physics. Most of this README (type scale, spacing, "generous whitespace," "more air," 1240px max-width, sparse imagery) describes the **WEB / social** posture.
>
> **When you build a PowerPoint/Keynote deck or any fixed 1920×1080 slide, the slide rules in `CLAUDE.md` + `LAYOUTS.md` OVERRIDE the web rules here** — specifically: use the **slide type scale as FLOORS, biased high** (20–24px labels · 30–36px body / default 32 · 40–52px subhead · 64–80px title · 120–132px statement & divider · 176px+ cover · ~240px closing word — never 16px, never the old 28px "safe" body), **"fill the frame"** (no dead whitespace — the opposite of "more air"), **imagery by default on every slide**, and the **full edge-to-edge canvas** (no 1240px / 68ch caps). What stays shared across both media: **color, fonts, the italic-word move, the Storyline motif, annotations, emoji rules, and voice.** See `CLAUDE.md §0` for the precise precedence.

---

## File structure

The design system is organized so every file name corresponds to how it's used. Drop any of these into a project and the names tell you what they are.

```
─ Docs (root) ─────────────────────────────────────────────
CLAUDE.md               · slide/deck SOPs — the authority for slides & office docs (precedence: see §0)
LAYOUTS.md              · deck layout library (48 layouts, L01–L51) + slide best-practice guide
DESIGN.md               · Google design.md spec — machine-readable single source of truth
README.md               · this file (the human read of the brand: content, visual, iconography)
SKILL.md                · agent-skill manifest
CHECKLIST.md            · pre-ship visual consistency checklist
PROMPTS.md              · AI generation prompt templates
POWER-DESIGN-PRINCIPLES.md · portable craft-rules layer (reference, try, don't stick) + the Presenter/Document deck-mode rule
colors_and_type.css     · all color + type tokens as CSS variables (the compiled token source)
_ds_bundle.js · _ds_manifest.json · _adherence.oxlintrc.json   · COMPILER-GENERATED — never hand-edit

docs/                   · portable exports + demos — self-contained, NOT part of the compiled system
  portable-brand-brief-social.md      · paste-into-Lovart brand brief for social tiles
  portable-living-deck-recipe.md      · prompt to rebuild a living guidelines deck elsewhere
  demos/                              · standalone proof-of-concept animations (reference only)
    Procedural Animation Demo.html    · 5 code-driven slide-animation techniques
    Character Animation Demo.html     · rigged, code-drawn character (no video)

assets/
  logo-horizontal-{navy-lime,navy,white,white-lime,black}.svg   · 5 horizontal colorways
  logo-stacked-{navy-lime,navy,white,white-lime,black}.svg      · 5 stacked equivalents
  mark-square-lime.png · mark-square-lime-alt.png   · favicon / app icon / social avatar
  storyline-navy-lime.svg           · Storyline — boxed corner monogram, on light/non-navy bg (Use 1)
  storyline-line-lime.svg           · Storyline — line as background layer on navy/dark fields (Use 2)
  storyline-navy-white.svg          · mono storyline variant
  emoji/                            · Fluent-emoji injector (visual storytelling — see CLAUDE.md §8)
    fluent-emoji.js                 · <fluent-emoji> web component; local-first, CDN fallback
    color/                          · localized static color SVGs (offline hero set)
    animated/                       · localized animated APNGs (offline hero set)
  annotations/                      · 76 hand-drawn marks across 6 categories
    underline·circle·arrow·tick·cross·accent   · 13·15·14·11·11·12

fonts/                  · self-hosted. Poppins (full 100–900 weight + italic TTFs, all @font-face-registered)
  Poppins-*.ttf                     · 18 roman+italic weight files
  LibreBaskerville-VariableFont_wght.ttf · LibreBaskerville-Italic-VariableFont_wght.ttf  (italic used in practice)
  README.md                         · font installation + Google Fonts equivalents

preview/                · Design System tab — one @dsCard per token/brand group (loads ../colors_and_type.css + _card.css)
  colors-*.html         · primary, secondary, navy scale, lime scale, semantic
  type-*.html           · display, scale, utility
  spacing-*.html        · scale, radii, shadows
  components-*.html     · buttons, forms, cards, annotations, placeholders
  brand-*.html          · logo horizontal/stacked, storyline, surfaces, voice, color-pairings, contrast-matrix, emoji-typography
  fluent-emoji-gallery.html  · browse + click-to-copy the Fluent emoji set

templates/              · reusable DC starting points consuming projects copy (each <slug>/<Slug>.dc.html + ds-base.js)
  deck/                 · Deck.dc.html — the 48-layout presentation library (L01–L51) (+ deck-stage.js, ds-base.js, support.js)
  keynote/              · Keynote.dc.html — editorial keynote
  one-pager/            · OnePager.dc.html — print, Letter
  social-tile/          · SocialTile.dc.html — square social

slides/                 · the CI/VI demonstration deck (not a template)
  Hoffman Brand Guidelines.html              · the live brand guidelines deck
  Hoffman Brand Guidelines-print.html        · auto-print variant
  Hoffman Brand Guidelines v1 (archive).html · previous version, kept for reference
  deck-stage.js · image-slot.js              · deck shell + drag-to-fill placeholder component

ui_kits/website/        · marketing-site UI kit — index.html + JSX components
  Hero · Nav · Services · CaseStudyGrid · QuoteBlock · StatsStrip · CTABand · Footer
  Button · Em · Eyebrow · Circle · PaletteStrip · Scribble · README.md
  (15 components exposed — StorylineDivider ships from QuoteBlock.jsx, so there are 14 files.)

references/             · 🔒 CONFIDENTIAL — owner's private source material. NEVER export, bundle, download, publish, or copy into any deliverable. Read-for-context only
  agency-profile.md      · the agency's positioning, services & voice brief (source for DESIGN/README)
  2026-strategy-deck.pdf · deck-layout-and-visual-storytelling.pdf
  deck-layout-preferences.md · deck-layout-recipes-portable.md   · the porting briefs (now baked into CLAUDE/LAYOUTS)
  source-decks/         · original client decks the layouts were adapted from

uploads/                · scratch — transient user uploads (review screenshots etc.); safe to clear
```

---

## CONTENT FUNDAMENTALS

> **Voice: Smart, Human, Energetic, Distilled, Bold, Creative, Authentic.**

Seven attributes, applied together. Smart leads with substance, Human keeps it grounded, Energetic adds momentum, Distilled cuts the noise, Bold takes a stance, Creative finds the unexpected angle, Authentic refuses corporate-speak.

### Cadence & length
- **Short sentences. Then longer ones to breathe.** Copy leads with the punchline, explains second.
- Headlines are **one line where possible**, two max. Prefer a confident claim over a clever pun.
- Subheads do real work — they extend the headline, they don't restate it.

### Person & address
- Default to **"we"** for the agency, **"you"** for the reader. No "one", no royal plural.
- Okay to drop pronouns entirely when it sharpens the line ("Built for tech. Human at heart.").

### Tone by surface
| Surface | Tone |
|---|---|
| Hero headline | Distilled, bold, slightly unexpected. Serif italic for emphasis. |
| Body copy | Plain-spoken. Active voice. No hedging. |
| CTA | Direct verb + object ("See the work", "Tell us your story"). Not "Learn more". |
| Case study | Narrative, past-tense, human POV. Lead with the problem, not the client. |
| Social | Playful, opinionated, sharp. Okay to ask questions. |

### Casing
- **Sentence case** for headings and UI. Title Case only on proper nouns and the logo.
- UPPERCASE is reserved for **eyebrows** (category labels, tags) with wide tracking (0.14em).
- Never shout. All-caps paragraphs are out.

### Punctuation
- Em-dashes for rhythm, not periods for emphasis. ("Smart — not smug.")
- Oxford comma on.
- Ellipses ("…") sparingly; never as "keep reading" filler.

### Emoji, jargon, clichés
- **Emojis are part of the brand** — used sparingly *with* text for visual storytelling, not as decoration. Rule: **no more than 3 emojis per page/slide**. Paired with copy: "Goodbye client rosters. Hello ecosystems 🪐" / "Available to 📂 download here". Cross-platform variance (Apple / Google / Microsoft / Samsung) is fine — they'll look slightly different on each system, that's expected.
- **No agency jargon:** "synergies", "leverage", "at the intersection of", "best-in-class", "storytelling through the lens of…". Say what you mean.
- No "revolutionary", "game-changing", "disruptive". We help clients *not* sound like that.

### Examples

**Good (brand-true):**
- *Complexity in. Clarity out.*
- *Hello, ecosystems 🪐* / *Goodbye, client rosters.*
- *We turn hard business problems into stories people actually remember.*
- *Built for tech. Human at heart.*
- *Less noise. Sharper signal.*
- *The work we do is earned — in every sense.*
- *For companies with something to prove, and a narrow window to prove it.*
- *In 2026 we're leaning in / more / more / more / into our influence in tech.*
- *We're ~~doubling~~ tripling down on video.*

### Signature voice patterns

The brand has three distinct copy moves used to keep slides feeling distinctively Hoffman:

1. **Stretched letters** — `hellllllo 2026`, `gooooodbye 2025`, `HAvvvvve you met HAcademy?`. Use on cover and section slides only. Never in body copy. Stretches a hello / goodbye / surprise; signals casual confidence.
2. **The ladder** — step a word up or down in scale across stacked lines to make commitment visible. *"In 2026 we're leaning in / more / more / more / into our influence in tech."* Repetition is the point.
3. **Strikethrough humor** — cross out the safer word, replace with the bolder one. *"We're ~~doubling~~ tripling down on video."* Treats the slide like a live draft. Use sparingly — once a deck.

### Casing
- **Sentence case** for headings and UI. Title Case only on proper nouns and the logo.
- **lowercase first words** are an accepted casual signal — *"hoffman has always been a challenger brand"*, *"hellllllo 2026"*. Use intentionally, not by accident.

**Off-brand (avoid):**
- ~~Unlocking next-generation communications for tomorrow's tech leaders.~~
- ~~We deliver end-to-end storytelling solutions across the full marketing funnel.~~
- ~~Let's synergize your narrative. 🚀~~

---

## VISUAL FOUNDATIONS

### Color
- **Primary:** Navy `#182D43` and Lime `#D2EB00`. Navy does the structural work (backgrounds, type, rules). Lime is the accent — used in short bursts: underlines, highlights, the storyline squiggle, a single CTA button, an eyebrow dot.
- **Secondary:** Lavender `#CB65FF`, Purple `#6103B9`, Cyan `#86FFF1`, Teal `#145F7B`. Lead each layout with **one dominant secondary as its "mood"**, then bring a second color in as accent or type. **Cross-pollination is now allowed** — any two brand colors may be combined, *including across the warm/cool pairs* (e.g. lavender type on teal, cyan on purple) — **so long as the combination clears WCAG** (≥ 4.5 for body, ≥ 3 for large/bold). The old "never cross the pairs" ban was a taste rule; it's retired — **contrast is the gate, not pairing.** See `preview/brand-color-pairings.html` for every validated combination. Token names remain `--tha-violet` / `--tha-aqua` for stability; display names are Lavender and Cyan.
- **Color as a surface:** the whole palette can carry a section as a **bold color block**, not just navy and paper. Set a brand color as the background and a WCAG-passing brand color as the headline (white or navy do the heavy lifting; cross-pollinated accents like cyan-on-purple are encouraged). The pairings card lists, for each surface, exactly which colors work as type and at what size. Lime and cyan are *light* surfaces — pair them with navy/dark type, never white.
- **Neutrals & surfaces:** two valid light models. **Default** — a warm **paper page** (`--bg-1` `#FAFAF7`) with **white cards** (`--bg-2`). **Alternative** — a **pure-white page** with **warm sand cards** (`--tha-sand` `#F1EFE7`): add `class="tha-theme-white"` to a section and its cards remap automatically. Always step page → card one notch; never paper-on-paper or white-on-white (the ~1.5% delta is too faint to read as elevation). See `preview/brand-surfaces.html`.
- **Contrast rule:** lime is an *accent*, not a text color on white (fails WCAG). For text/accent-on-light use `--fg-accent` (#A7BC00) or navy. Lime text is fine on navy. The full pair-by-pair scoring lives in `preview/brand-contrast-matrix.html` — reliable text pairs are navy/lime, navy/cyan, navy/paper, white/navy, white/purple; lime and cyan are background colors only.
- No gradients. If a "gradient" is needed, use a 2-color split or a hand-drawn overlay instead.

### Type
- **Sans:** **Poppins** — the brand workhorse. Used for headlines, body, UI. Geometric, friendly, wide weight range (300–800). Set display sizes in 700/800 with tight letter-spacing (-0.02em).
- **Serif:** **Libre Baskerville — italic only.** Never set upright. Used strictly as italic emphasis: one word or phrase inside an otherwise Poppins headline, and for pull-quotes. This is where Hoffman gets expressive. In CSS, use `<em>` or the `.tha-em-serif` utility — both resolve to Baskerville italic.
- **Japanese:** **M PLUS 2** — ホフマンジャパン. Same weight range as Poppins.
- **Other CJK / multilingual:** **Noto Sans** family (Noto Sans KR for Korean, Noto Sans SC for Simplified Chinese, Noto Sans TC for Traditional Chinese). Use the CSS vars `--font-jp` and `--font-cjk` so the stack falls back gracefully.
- **Mono:** JetBrains Mono — captions, tiny metadata, case-study stats.
- **Hierarchy rule:** one hero idea per screen, set huge (up to 120px Poppins). Everything else shrinks hard. Generous vertical space between blocks (80–128px section padding on desktop).
- **Signature move:** `Bold Poppins headline with one <em>italic</em> word` → the `<em>` renders in Baskerville italic. Contrast does the heavy lifting. Do NOT use Baskerville upright as a text serif.
- **Playful flourishes:** Repeated-letter emphasis on headers ("hellllllo 2025", "goooodbye APAC") is *part* of the brand voice — used on cover/section slides, never in body copy. Strikethrough as humor ("doubling ~~doubling~~ tripling down") is also a recognised pattern — see the cross-out annotation.
- **Emoji typographic storytelling:** an emoji can stand in for one charged word inside a Poppins line — `We turn opinion into 📈 influence`, `counsel without conviction is just 🤷`. Wrap the glyph in `.tha-emoji` so it rides the baseline (not above the line), and always add `role="img" aria-label="<the word it replaces>"` for screen readers. **In place of a word only** — never as bullets, icons, or decoration — and ≤ 3 per surface (the voice rule). The sentence must still read perfectly if you swapped the word back in. See `preview/brand-emoji-typography.html`.

### Spacing
- 4px base scale (`--s-1` through `--s-32`).
- Preferred rhythm on layouts: `24 / 48 / 96` — content gutters, block padding, section padding.
- Generous whitespace is non-negotiable on **web**. When in doubt, more air. **(Slides are the opposite — see CLAUDE.md §2 "fill the frame": scale type and imagery to occupy the full canvas, no empty regions.)**

### Backgrounds
- **Two light models:** (1) warm **paper page** with **white cards** (default), or (2) **white page** with **warm sand cards** (`.tha-theme-white`). Pick one per surface and stay in it. See `preview/brand-surfaces.html`.
- **Hero:** navy (`--bg-dark`) with lime type accents, or lime (`--bg-accent`) with navy type.
- **No stock photo floods.** When imagery is used, it's a single, intentional image — candid, natural-light, team/office/human. See photography direction below.
- **No full-bleed gradients.** No repeating geometric patterns. The hand-drawn squiggle is the only "texture" the brand uses.

### Imagery & placeholders
**Images are not optional.** If a layout calls for an image, it gets one — priority order: **(1) a real image** (project assets, user uploads, anything actually placeable) always wins; **(2) a curated stock stand-in** (`images.unsplash.com`, matched to the imagery direction and flagged for swap with campaign photography) when no asset exists; **(3) a labelled placeholder** only when neither is possible — e.g. the shot must be a specific person, product, or event that can't be stood in for. Never design imagery out of a layout because no asset is handy.

When you do fall back, **never leave a bare grey box** — reserve a *labelled* placeholder that art-directs the human who fills it in later, using `.tha-placeholder`:

```html
<div class="tha-placeholder tha-placeholder--16x9" data-slot="hero-01">
  <svg class="tha-placeholder__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"> … </svg>
  <div class="tha-placeholder__label">Hero photo · 16:9</div>
  <div class="tha-placeholder__hint">Candid, natural light. Team in the Taipei office.</div>
  <div class="tha-placeholder__prompt">Candid documentary photo, comms team at work in a Taipei office, natural window light, business-casual, warm color grade, eye-level, no staging. 16:9.</div>
</div>
```

- Ratio modifiers: `--16x9`, `--4x3`, `--1x1`, `--4x5`, `--3x1`, or `--icon` (a 56px square for one Lucide icon, not a photo).
- `.on-dark` switches the dashed frame + label to the navy-tinted set for dark slides. `--accent` makes a solid lime hero frame.
- **Three lines of anatomy.** The **`__label`** says what it is; the **`__hint`** is the art direction for the *human* sourcing the shot; the **`__prompt`** is a paste-ready seed for an *image generator* — one or two sentences that bake in the imagery direction (candid, natural light, warm grade, business-casual) plus the aspect ratio. Write all three on every photo placeholder; templates live in `PROMPTS.md`.
- **Drop-to-fill.** Add `data-slot="<unique-id>"` and the brand-deck script makes the frame accept a dragged (or double-click-to-browse) image; it persists locally and a hover ✕ clears it. Prompts become click-to-copy. See the script tail of `slides/Hoffman Brand Guidelines.html`.
- **Image-forward layout templates** are demonstrated in the deck (slides 30b–30f): placeholder anatomy, full-bleed image + navy overlay, split 50/50, portrait + pull quote, and the case-study montage. Start from those instead of inventing new image layouts. See `preview/components-placeholders.html`.

### The Storyline squiggle
This is the brand's signature graphic device — a hand-drawn waveform that peaks up to the right. It's a *story arc*, not a chart. **Which version you use is decided by the background.** Two uses, two assets:

1. **Corner monogram — on light / non-navy backgrounds.** `assets/storyline-navy-lime.svg`: the boxed square version (lime square with navy squiggle). It carries its own navy + lime, so it's a *self-contained lockup* — fix it to a corner on white, paper, or a light surface, like a logo. This is the version you reach for when the background **isn't** navy.
2. **Line as a background layer — on navy / dark fields.** `assets/storyline-line-lime.svg`: the inverted line variant only (just the squiggle, no box). The line is **part of the dark field**, not a foreground object: it sits as the **bottom layer, directly above the navy fill and behind your content** (stack order: navy fill → storyline line → headline/content). Always lime; works on any brand color except lime itself (navy, lavender, purple, cyan, teal).
   **Edge-lock it to the frame.** The line is drawn inside a 1920×1080 artboard so its two sharp terminals sit *exactly on the artboard's top and bottom edges*. Scale it to the **full height** of the panel and anchor it **flush to the top, right and bottom edges with no bleed** — the angled ends are absorbed by the frame and the line reads as continuous, the way it did when it was enclosed in the square. (Left alignment is free; the waveform lives on the right.) Implementation: `position:absolute; top:0; right:0; bottom:0; height:100%; width:auto; z-index:0` with content above it.

**Never** float the boxed monogram adrift in the middle of a navy field — on a dark field the line-as-background is what belongs. **Never** float the line as an object or shrink it into a corner — that strands its two sharp diagonal cut-ends in open space (the original misuse). And never use the square as a hero, recolor the line away from lime, place the line on a lime background, use it as an inline divider, tile or rotate it, or replace the wordmark with it.

### Hand-drawn annotations
The brand uses a library of **76 hand-drawn marks across 6 categories**, living in `assets/annotations/`:

| Category | Count | Color | Use |
|---|---|---|---|
| Lines &amp; underlines | 13 | Contextual | Beneath a word or phrase for emphasis |
| Circles | 15 | Contextual | Around a single word or short phrase |
| Arrows | 14 | Contextual | Callouts, direction, connections |
| Ticks | 11 | Contextual | Approval next to a do / good example |
| Crosses | 11 | Contextual | Negation next to a don't / bad example |
| Accents | 12 | Contextual | Decorative flourishes, scribbles, splashes |
| Highlights | (CSS) | Contextual (brand palette) | Marker-pen highlight applied OVER body text |

**Use 1–2 marks per surface**, max. These are editorial punctuation on top of type, not icons.

Every SVG uses `fill="currentColor"` so any mark can be tinted to any brand color via CSS. **Color is contextual** — there are no fixed per-category defaults. Pick whichever brand color (lime, lavender, purple, cyan, teal, navy, paper) contrasts best with both the text *and* the background where the mark sits, so the mark reads clearly. A cross-out should be the opposite color of the word it strikes through. Stroke 3–5px, slightly imperfect.

### Highlights (text-overlay annotation)
A seventh annotation technique — not an SVG asset, but a CSS overlay applied **over** body text. Use a brand color as a highlighter background behind the text you want to emphasize, the way a marker pen would.

**Rules:**
- The highlight color must come from the brand palette (lime, lavender, purple, cyan, teal, navy, or paper). Any of the primary or secondary brand colors are fair game.
- The text color and highlight color must form a **safe-for-the-eyes contrast pair** (WCAG AA, contrast ≥ 4.5:1 for body, ≥ 3:1 for large text). Common pairs: navy text on lime, white text on purple, navy text on cyan, paper text on teal.
- Apply to a **word or short phrase only**, not a whole sentence.
- Max one highlight per surface (counted in the "1–2 marks per surface" budget alongside the SVG categories).

**CSS pattern:**
```html
<p>The story is <mark>always</mark> there.</p>
<!-- or -->
<span style="background:var(--tha-lime); color:var(--tha-navy); padding:0 .15em;">always</span>
```

### Italic emphasis vocabulary
When choosing which word to italicize in a Poppins headline, prefer words that carry weight: *Trust, Influence, Adaptability, AI, judgment, strategic, intelligence, leadership, geopolitics, culture, society, relationships, people, clarity, complexity, attention, visibility, proximity, uncertainty.* Pick for sound and meaning, not grammar.

**No other decorative line work.** Wavy lines, squiggly arrows, decorative flourishes outside the 5-category annotation library are banned. The Storyline squiggle is the only "wavy" element — and it has its own two strict uses (see above).

### Animation
- **Rare and intentional.** No parallax, no scroll-jacking, no decorative loops.
- Entrances: 420ms ease-out (`--dur-slow / --ease-out`), subtle 12–16px y-translate + fade. That's it.
- The squiggle may "draw itself" once, on first view — never loops.
- Hover transitions: 140ms, tight.

### Hover states
- **Buttons (solid navy):** background shifts to navy-600 (lighter), lime "underline" bar animates in beneath.
- **Buttons (lime):** background shifts to lime-400, navy text stays.
- **Links:** color shifts from purple → lavender; underline thickens from 1.5px to 2px.
- **Cards:** no lift, no shadow bump. Instead, the card's internal accent rule (lime or lavender) extends 8px to the right. Understated.

### Press states
- Buttons darken one step and take a 1px inset shadow (`--shadow-press`).
- No scale-down. No bounce.

### Borders
- **Rules are hairlines**, 1px, in `--border-2` (navy-200) — or 1.5px solid navy for intentional division.
- Section dividers are hairlines or solid navy rules. Never the Storyline squiggle.
- No double borders, no dashed borders.

### Shadows
- Shadows are **navy-tinted**, never grey. See `--shadow-1/2/3`.
- Cards usually get no shadow — they sit flat on paper, bordered if needed. Elevated cards only in modals or floating UI.
- No glows, no inner glows, no colored shadows.

### Radii
- **Default is square (0px) or near-square (2px).** This is a deliberate brand posture — clean, intentional, editorial.
- 6–10px only for form controls and interactive chips.
- `--radius-pill` for tag chips and single-word badges. Never on buttons.

### Cards
- Flat on paper background, with a hairline border (`--border-2`) or no border at all — relying on spacing to separate.
- No shadow unless elevated.
- Corner radius: 0–2px.
- Optional hand-drawn circle or arrow as annotation, NOT a badge.

### Transparency & blur
- Almost never. No frosted glass, no translucent nav bars.
- One exception: a semi-transparent navy overlay (60–75%) on hero photography, to guarantee type legibility.

### Imagery direction
- Candid, natural-light, **business-casual** (no suits-and-ties). Diverse, collaborative, human.
- Warm color grade — skin tones natural, slightly saturated. No cool-blue fintech stock palette.
- **Human-first.** If it has to be abstract, it's the squiggle, not a 3D chrome mesh.
- B&W is okay for portraits in case studies for gravitas; color everywhere else.
- No motion blur, no lens flares, no "shot on iPhone at golden hour" clichés.

### Layout rules
- Asymmetric grids over centered symmetrical ones. A 12-col grid with content biased to 7 or 8 cols, with intentional negative space in the remainder.
- Overlap is encouraged: an annotation can sit outside a card; the Storyline line variant can run behind content on any non-lime brand color — edge-locked to the top, right and bottom of the frame (never floated).
- Max content width: 1240px. Long-form reading measure: 68ch.

---

## ICONOGRAPHY

Hoffman's brand does **not** ship with a proprietary icon set. The most distinctive "icon" is the **Storyline squiggle** — it functions as a boxed corner monogram on light backgrounds and as a background layer (the line) on navy/dark fields. See the background-decides-the-version rule above.

### Approach
- **Outline icons, 1.75px stroke, square caps/joins, on a 24px grid.** This matches the modern-editorial posture of the brand.
- **Lucide** is the default icon library for this system (CDN-loaded). It's outline-first, evenly weighted, wide coverage, and open-licensed. Substituted in the absence of a Hoffman-specific set — **flag to client for review.**
- Use icons **sparingly** as wayfinding (nav, list markers, button affixes). Never as decoration.
- Icon color defaults to `currentColor` so they inherit from their context (navy on paper, paper on navy, lime for accent).

### Hand-drawn marks (separate from icons)
The brand's *real* iconographic language is the library of **76 hand-drawn annotations across 6 categories** (lines &amp; underlines, circles, arrows, ticks, crosses, accents) plus a 7th technique, **Highlights** (CSS marker-pen overlay). SVGs live in `assets/annotations/` and use `fill="currentColor"` — pick the color at use site so each mark contrasts with the text and background where it sits. Stay within the brand palette (lime, lavender, purple, cyan, teal, navy, paper).

### Emoji / unicode
- **Emojis are allowed**, used sparingly with copy. Rule: **3 per page/slide max.** Paired with text for visual storytelling ("Hello ecosystems 🪐", "📂 download here"). Cross-platform variance is expected and fine.
- **Unicode pictograms in text:** Symbols like →, ↑, ✓, ★, ·, — are *encouraged* when used as in-line text glyphs (a typographic arrow at the end of a link, a checkmark in a sentence, an em-dash). Distinct from emojis: they inherit text color and weight, they're not pictorial illustrations. Don't use them as standalone icons — use real SVGs from `assets/annotations/` for that.
- **Emojis vs unicode pictograms:** emojis are pictorial and platform-rendered (🪐 looks different on Apple vs Google vs Microsoft). Pictograms are text glyphs (→ always looks like an arrow at whatever color and weight your CSS sets). Use both, deliberately and differently.
- Arrows in copy: use the typographic `→` (rightwards arrow) sparingly as a link affordance.

### Logo usage
- **Horizontal color** — default sign-off on light backgrounds.
- **Stacked color** — social avatars, square formats, posters.
- **1-color black** — for light/mono print where lime is unavailable.
- **1-color pure white** — for **navy AND any secondary-color background** (lavender, purple, cyan, teal). When the background is dark or saturated, always use white.
- **1-color solid navy** — for lime backgrounds.
- **Square mark (lime bg with white squiggle)** — favicon, app icon, social avatar.
- **Never:**
  - Recolor beyond the supplied variants.
  - Stretch, skew, or rotate.
  - Use the white+lime reverse on any background (deprecated).
  - Place on busy photography without a navy overlay.
  - Reproduce smaller than 24 px tall (horizontal) or 32 px (stacked).

---

## Caveats & Asks

- **Type is confirmed and self-hosted.** Brand fonts are **Poppins** (sans — self-hosted from `fonts/Poppins-*.ttf`, 18 weight×style files, `@font-face`-registered in `colors_and_type.css`) and **Libre Baskerville** (serif — self-hosted variable fonts from `fonts/LibreBaskerville-*.ttf`). Baskerville is used in **italic only** in practice; regular/bold are registered for completeness. JetBrains Mono, M PLUS 2 and Noto Sans are the only families loaded from Google Fonts (utility/multilingual faces). A Google-Fonts fallback for Poppins is documented in `fonts/README.md` if a project prefers CDN delivery.
- **No codebase or website** was attached, so the `ui_kits/website/` interpretation is derived from the brand guidelines — not a 1:1 recreation of a live property.
- **Iconography is Lucide** as a safe default. If Hoffman has a custom icon set, flag and I'll integrate.
- **Photography placeholders** — I've used unsplash-style placeholders in UI kit mocks. Swap with real talent/campaign photography.
- Color accessibility: **lime on white fails WCAG for text.** I've already gated `--fg-accent` to the darker lime-600 for this reason. Design flags lime-on-white warnings in future QA.

---

## Reserved for future definition

This system is a **Brand & Communications Design System** — it's complete for everything that ships off a Hoffman desk today (decks, social, web hero, marketing collateral). The list below is what would need to be added to make it a **full product / UI design system**, e.g. if Hoffman ever ships hoffman.com, a client portal, the IMPACT training surface, or a Techfluence Index dashboard.

Items are acknowledged but **not yet defined**. The deck, preview cards, and DESIGN.md all carry these as placeholders so the backlog stays in one place. Don't infer or invent these — when in doubt, ask.

### Tier 1 · Product / UI extensions

- [ ] **Component library beyond the basics** — form controls, navigation, feedback (toast / modal / tooltip / popover), data display (table / list / avatar / badge), disclosure (accordion / drawer / menu), progress (bar / spinner / skeleton).
- [ ] **Interaction states catalog** — formal spec for `default · hover · focus · active · selected · disabled · loading · error · success`.
- [ ] **Accessibility (WCAG) commitments** — focus indicators, keyboard nav, screen reader, `prefers-reduced-motion`, full contrast matrix, 44 × 44 px touch targets.
- [ ] **Responsive breakpoints** — `sm / md / lg / xl / 2xl` named breakpoints.
- [ ] **Dark mode / theme variants** — token mapping for light ↔ dark themes.
- [ ] **Functional icon system** — distinct from the annotation library. Lucide as default is noted, not formally adopted.

### Tier 2 · Communications outputs (highest leverage for Hoffman)

- [ ] **Marketing motion system** — easing curves, duration tiers, choreography rules. For video bumpers, social animation, web hover states.
- [ ] **Data visualization palette + rules** — for case-study stats and the future Techfluence Index.
- [ ] **Forms anatomy** — label, helper, error, success states.
- [ ] **Empty / error / loading state patterns**.
- [ ] **Imagery / illustration library** — rules exist; a curated library of approved photos does not.
- [ ] **Templates for non-deck collateral** — email, business card, letterhead, LinkedIn carousel, IG square, IG story, proposal cover, case-study cover, video bumpers + end cards, email signature.

### Tier 3 · Governance & operations

- [ ] **Naming + governance** — component naming convention, semver, contribution model, status badges (`draft · beta · stable · deprecated`).
- [ ] **Internationalization beyond fonts** — RTL, date/number/currency formats, pluralization.
- [ ] **Content design / microcopy** — error tone, confirmation patterns, button labels, tooltip writing, empty state copy.
- [ ] **Performance / asset budgets**.
- [ ] **Code implementations** — Storybook-style component docs, React / Vue / plain HTML samples, npm-publishable token export.

When any of these get defined, move the item out of this list and into the appropriate section of `DESIGN.md` / `README.md`.
