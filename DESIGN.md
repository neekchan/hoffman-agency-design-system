---
version: alpha
name: The Hoffman Agency
description: >
  Integrated communications agency for tech, built on the idea that counsel
  without conviction is just consulting. We help leaders and brands turn
  opinion into Techfluence — the influence that moves markets, not just
  products. Bold Poppins headlines with the emphasis — the key word or
  phrase — set in Libre Baskerville italic. Navy + lime as structural pair, with four secondary moods
  (lavender, purple, cyan, teal). A hand-drawn Storyline squiggle as the
  signature mark. Marker-pen annotations chosen by contrast to whatever
  they sit on. Short sentences. Real opinions. We speak tech.

colors:
  # Primary — structural
  primary:      "#182D43"   # Navy — backgrounds, body type, rules
  on-primary:   "#FAFAF7"   # Paper, when type sits on navy
  primary-accent: "#D2EB00" # Lime — the hero accent

  # Lime as a discipline
  accent:       "#D2EB00"
  on-accent:    "#182D43"
  accent-strong: "#687600"  # WCAG-safe lime for text on light bg (5.0:1 on white, 4.8:1 on paper)

  # Secondaries — each gets ~10% of any WEB layout (ratio does NOT apply to slides/decks — see Colors section)
  secondary:    "#CB65FF"   # Lavender
  on-secondary: "#182D43"
  tertiary:     "#6103B9"   # Purple
  on-tertiary:  "#D2EB00"
  quaternary:   "#86FFF1"   # Cyan
  on-quaternary: "#182D43"
  quinary:      "#145F7B"   # Teal
  on-quinary:   "#86FFF1"

  # Neutrals
  neutral:      "#FAFAF7"   # Paper — primary surface (warm off-white)
  neutral-strong: "#FFFFFF" # Elevated surface
  neutral-sand: "#F1EFE7"   # Warm sand — the raised surface when the PAGE is pure white
  neutral-muted: "#F3F2ED"  # Stone tint
  ink:          "#0E1C2B"   # Body text on light
  ink-muted:    "#35526F"   # Secondary text
  ink-faint:    "#5A7591"   # Tertiary / meta

  # Status (used sparingly — brand leans navy-monochrome for system color)
  success:      "#147A4B"   # Darkened for WCAG AA (white text contrast ≥ 4.5:1)
  warning:      "#E08A00"
  danger:       "#C43D3D"
  info:         "#145F7B"   # = teal — informational (used rarely)

  # Borders
  border:       "#C8D2DD"   # Hairline divider (navy-200)
  border-strong: "#182D43"  # Solid rule

typography:
  display-1:
    fontFamily: "Poppins"
    fontSize: 7.5rem        # 120px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  display-2:
    fontFamily: "Poppins"
    fontSize: 5rem          # 80px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Poppins"
    fontSize: 4.5rem        # 72px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Poppins"
    fontSize: 3.25rem       # 52px
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Poppins"
    fontSize: 2.125rem      # 34px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  h4:
    fontFamily: "Poppins"
    fontSize: 1.25rem       # 20px
    fontWeight: 600
    lineHeight: 1.25
  body-lg:
    fontFamily: "Poppins"
    fontSize: 1.25rem       # 20px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: "Poppins"
    fontSize: 1rem          # 16px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Poppins"
    fontSize: 0.875rem      # 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Poppins"
    fontSize: 0.875rem      # 14px
    fontWeight: 600
    lineHeight: 1.2
  eyebrow:
    fontFamily: "Poppins"
    fontSize: 0.75rem       # 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
  emphasis:
    fontFamily: "Libre Baskerville"
    fontSize: 1em           # inherits from parent
    fontWeight: 400
    fontStyle: "italic"
  quote:
    fontFamily: "Libre Baskerville"
    fontSize: 2.75rem       # 44px
    fontWeight: 400
    fontStyle: "italic"
    lineHeight: 1.15
  mono:
    fontFamily: "JetBrains Mono"
    fontSize: 0.875rem      # 14px
    fontWeight: 500
    lineHeight: 1.5

rounded:
  none: 0px
  xs:   2px
  sm:   6px
  md:   10px
  pill: 9999px

spacing:
  xs:  4px
  sm:  8px
  md:  16px
  lg:  24px
  xl:  32px
  2xl: 48px
  3xl: 64px
  4xl: 80px
  5xl: 96px
  6xl: 128px

motion:
  # Primitive tokens (in colors_and_type.css). Named-intent choreography is still backlog.
  ease-out:    "cubic-bezier(0.2, 0.8, 0.2, 1)"
  ease-in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
  dur-fast:    140ms
  dur:         220ms
  dur-slow:    420ms

shadows:
  # Navy-tinted only, never grey (see Elevation & Depth).
  shadow-1:     "0 1px 0 rgba(24,45,67,0.08)"
  shadow-2:     "0 4px 14px -4px rgba(24,45,67,0.12), 0 1px 0 rgba(24,45,67,0.06)"
  shadow-3:     "0 18px 40px -18px rgba(24,45,67,0.28), 0 2px 0 rgba(24,45,67,0.06)"
  shadow-press: "inset 0 2px 0 rgba(14,28,43,0.18)"

components:
  # ---------- Buttons ----------
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "#233E58"           # navy-600, one step lighter
    textColor: "{colors.accent}"
  button-lime:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-lime-hover:
    backgroundColor: "#DFEF4B"           # lime-400
    textColor: "{colors.primary}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.tertiary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0"
  # ---------- Inputs ----------
  input:
    backgroundColor: "{colors.neutral-strong}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
  input-focus:
    backgroundColor: "{colors.neutral-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"

  # ---------- Card ----------
  card:
    backgroundColor: "{colors.neutral-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xs}"
    padding: "24px"
  # ---------- Tag / chip ----------
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  tag-filled:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  # ---------- Eyebrow ----------
  eyebrow:
    textColor: "{colors.ink-muted}"
    typography: "{typography.eyebrow}"

  # ---------- Section variants (one per palette token) ----------
  section-light:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    padding: "120px 48px"
  section-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: "120px 48px"
  section-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    padding: "120px 48px"
  section-secondary:                       # Lavender bg
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    padding: "120px 48px"
  section-tertiary:                        # Purple bg
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    padding: "120px 48px"
  section-quaternary:                      # Cyan bg
    backgroundColor: "{colors.quaternary}"
    textColor: "{colors.on-quaternary}"
    padding: "120px 48px"
  section-quinary:                         # Teal bg
    backgroundColor: "{colors.quinary}"
    textColor: "{colors.on-quinary}"
    padding: "120px 48px"
  section-muted:                           # Stone tint surface
    backgroundColor: "{colors.neutral-muted}"
    textColor: "{colors.ink}"
    padding: "120px 48px"
  # ---------- Text variants (consume ink + accent tokens) ----------
  text-meta:
    textColor: "{colors.ink-faint}"
    typography: "{typography.body-sm}"
  text-secondary:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-md}"
  text-accent-on-light:                    # WCAG-safe lime text on paper
    textColor: "{colors.accent-strong}"
    typography: "{typography.label}"
  text-lime-on-dark:                       # Pure lime on navy
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-accent}"
    typography: "{typography.label}"
  text-on-accent:                          # Navy text on a lime block
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"

  # ---------- Status chips (consume success / warning / danger) ----------
  chip-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.neutral-strong}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.ink}"                # Navy text on amber for WCAG AA
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.neutral-strong}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  # ---------- Dividers (consume border tokens) ----------
  divider-soft:
    backgroundColor: "{colors.border}"
  divider-strong:
    backgroundColor: "{colors.border-strong}"

  # ---------- Surface elevated (consumes neutral-strong) ----------
  surface-elevated:
    backgroundColor: "{colors.neutral-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "24px"
---

## Overview

The Hoffman Agency is an integrated communications agency for tech — founded on a simple idea: counsel without conviction is just consulting. We help leaders and brands turn opinion into **Techfluence** — the kind of influence that moves markets, not just products.

The brand reads as **Smart · Human · Energetic · Distilled · Bold · Creative · Authentic**. Our typography is bold Poppins headlines with the emphasis italicized in Libre Baskerville — usually one word, sometimes a short phrase, always the part that carries the line. The contrast does the work. Our color is navy and lime doing the structural work, with four secondary moods (lavender, purple, cyan, teal) used one at a time. Our signature mark is the Storyline squiggle — a hand-drawn waveform that's a story arc, not a chart. We mark up our slides the way an editor marks up a draft: underlines, circles, ticks, crosses, accents, and highlights, all chosen by *contrast* to whatever they sit on.

Short sentences. Real opinions. We *speak* tech. *Clarity in. Complexity out.*

Three commitments override every other rule:

1. **Restraint.** One hero idea per screen. Remove a color or a heading before adding one.
2. **The italic emphasis.** Setting the line's emphasis — its key word or phrase — in Libre Baskerville italic inside a Poppins headline is the brand's signature type move. One emphasis per line, chosen by meaning, not a fixed word count.
3. **Hand-drawn over decorative.** A scribbled underline beats five icons.

## Principles layer & deck modes

Two decision rules sit **above** the tokens:

**1 · The Power Design principles (`POWER-DESIGN-PRINCIPLES.md`) are a reference layer.** Twenty brand-agnostic craft rules (one-idea, chunks, 8pt grid, one grid, proximity, type-scale rhythm, contrast, one accent, no hue-only encoding, data-ink, F-pattern, mode purity). **Reference them and try to honor them — don't rigidly stick.** Precedence is *hybrid*: universal craft (contrast, grid, one-idea, proximity, data-ink, mode purity) **wins as written**; the density / whitespace / palette-breadth / margin calls follow the **Hoffman house SOPs** for the medium (on slides: "fill the frame" over ≥40% whitespace, the whole palette over 60-30-10, 72px over 96px margins, the higher slide type scale over ≥24px body — see `AGENTS.md §0, §1, §2, §7`). Full mapping lives in that file's precedence block.

**2 · Every deck is exactly ONE mode — Presenter XOR Document** (principles rule 20, a hard rule here):
- **Presenter** — presented live. ≤1 idea, ≤15 words/slide, image-led; **the detail lives in speaker notes.**
- **Document** — a stand-alone leave-behind / read-ahead. Denser, hierarchical, short bullets allowed, a fuller argument per slide; still no paragraphs.
- Never mix the two in one deck. Both modes keep the full Hoffman visual system (fill-the-frame, slide type scale, whole palette, 72px, imagery) — **mode changes *depth*, not appearance.**
- **The agent infers the mode from context, states its assumption, and asks only if genuinely ambiguous.** The 48-layout `templates/deck/` library carries the **Mode** tweak (Presenter/Document) as the reference mechanism, and the worked full-deck demonstration of the whole system is `slides/Hoffman Brand Guidelines.html`. See `AGENTS.md §12`. (One-pagers and social tiles are inherently Document-mode.)

## Colors

The palette has **two primaries doing structural work** and **four secondaries used as layout "moods."**

**Color proportions are MEDIUM-DEPENDENT:**
- **Web / social** — keep it disciplined so pages read as one voice: intended page-level proportions are **Navy 30% · Lime 30% · Lavender · Purple · Cyan · Teal at ~10% each.** Lead with one dominant secondary mood; don't scatter all six across one page.
- **Slides / office docs** — **the 30/30/10… ratio does NOT apply.** A deck moves through the *whole* palette deliberately: each section/divider, audience, or theme can own its own full-color surface (teal section, purple section, lime section, violet section…), so color carries structure and the deck never looks navy-paper-uniform. The only color rules that still bind on slides are **WCAG contrast** and **one dominant color per individual slide** (so each slide still has a clear mood — variety lives *across* slides, not within one). See `AGENTS.md §0`.

- **Primary (`{colors.primary}` — Navy)** is the structural color: section backgrounds, body type, hairline rules. Pair with `{colors.on-primary}` for type.
- **Primary accent (`{colors.accent}` — Lime)** is the hero accent. Used in short bursts: underlines, highlights, the storyline squiggle, a single CTA button, the eyebrow dot. **Lime fails WCAG as text on white** — for lime-toned text on light backgrounds, use `{colors.accent-strong}` (#687600).
- **Secondary (`{colors.secondary}` — Lavender)** and **tertiary (`{colors.tertiary}` — Purple)** are the warm accent pair. Lavender on navy is high-energy; purple as a full-bleed section is a confident editorial pause. They may sit on each other — and, now, on the cool pair too (see Rules).
- **Quaternary (`{colors.quaternary}` — Cyan)** and **quinary (`{colors.quinary}` — Teal)** are the cool accent pair. Teal makes a credible alternate section background; cyan reads well on teal and vice versa. Every secondary is a viable **surface**, not just an accent — see `preview/brand-color-pairings.html`.
- **Neutral (`{colors.neutral}` — Paper)** is the default surface — a warm off-white, never `#FFFFFF`. Pure white reads clinical against this palette.

**Two-surface model (pick one per surface, don't mix).** Elevation comes from a *page vs. raised* pairing, not from shadow: (a) the **default** — page is warm **Paper** (`{colors.neutral}`), raised cards are pure **White** (`{colors.neutral-strong}`); or (b) the **white theme** (`.tha-theme-white`) — page is pure **White**, raised cards are warm **Sand** (`{colors.neutral-sand}` #F1EFE7). Never sit a paper card on a paper page — the ~1.5% delta is too faint to read as elevation. See `preview/brand-surfaces.html`.

**Rules.** No gradients — a "gradient" is two colors split hard. **Any two brand colors may be combined as surface + type — across the warm/cool pairs included — wherever the pair clears WCAG** (≥ 4.5 for body, ≥ 3 for large/bold; check `preview/brand-color-pairings.html`). The old "never cross the pairs" rule is retired: contrast is the gate, not pairing. Lead a layout with one dominant secondary "mood", then add a second color as accent/type. **Color as surface:** every brand color can be a section background as a bold color block — pair lime/cyan surfaces with navy type, navy/purple/teal surfaces with white or a light accent. The 2-color (navy + lime) logo sits on navy, lime, or paper only; on any secondary-color background, use the 1-color white logo.

## Typography

> **Type SCALE below (the `fontSize` px values) is the WEB scale.** On slides / office docs use the slide type scale in `AGENTS.md §1` — enforced as FLOORS, biased high (1pt = 2px on 1080p): **20–24px** labels · **30–36px** body (default 32) · **40–52px** subhead · **64–80px** title · **120–132px** statement/divider · **176px+** cover (size-to-fit) · **~240px** closing word — never the 16px web body. The *families, weights, italic-word move, and letter-spacing* here apply to both media.

The system uses **two families.**

- **Poppins** is the workhorse — every headline, every line of body, every UI label. Weight range 300–800. Tight letter-spacing at display sizes (`-0.02em` to `-0.03em`).
- **Libre Baskerville — italic only.** Used strictly as inline emphasis inside a Poppins headline, and for pull-quotes. Never set Baskerville upright. The token `{typography.emphasis}` is sized at `1em` so it inherits from its parent and drops cleanly inside any heading.

The **signature type move** is a bold Poppins headline with its **emphasis set in Baskerville italic**. The emphasis is the keyword(s) that carry the line — **usually one word, but a two-word phrase or a short run of words when *that* is the real emphasis**. It's about meaning, not a mechanical count. The one hard limit is **one emphasis per line** — don't scatter italics across several unrelated words, and don't force a single word if the point lives in a phrase.

```html
<h1>Clarity in. <em>Complexity</em> out.</h1>
<h1>We don't chase reach. We earn <em>the room</em>.</h1>
```

The `<em>` tag is wired to render `{typography.emphasis}` automatically. Choose the emphasis for sound and sense, not for grammar — pick the word (or phrase) with the most consonant texture, or the one that carries the emotional weight of the line.

**Hierarchy.** One hero idea per screen, set huge (`{typography.display-1}`, up to 120 px). Everything else shrinks hard. Sentence case for headings and UI; **UPPERCASE only on eyebrows** (`{typography.eyebrow}`) with `0.14em` tracking. JetBrains Mono is reserved for stat units, metadata, and case-study run-time numbers — never for body.

**Multilingual.** Japanese copy uses **M PLUS 2** (ホフマンジャパン). Korean / Chinese / other CJK uses **Noto Sans** (Noto Sans KR, SC, TC variants). Use the CSS vars `--font-jp` and `--font-cjk` so the stack falls back gracefully across systems.

**Playful flourishes.** Three signature voice patterns:
- **Stretched letters** (`hellllllo 2026`, `gooooodbye 2025`, `HAvvvvve you met HAcademy?`) — cover/section slides only, never body copy.
- **The ladder** — step a word up/down in scale across stacked lines (*"In 2026 we're leaning in / more / more / more / into our influence in tech."*) — repetition is the point.
- **Strikethrough humor** — cross the safer word, replace with the bolder one (*"~~doubling~~ tripling down on video"*) — once per deck.

Lowercase first words are an accepted casual signal (*"hoffman has always been a challenger brand"*). Use intentionally, not by accident.

## Layout

> **MEDIUM: web / screen / social only.** This section's scale and density (1240px max-width, 68ch measure, "generous negative space," web type sizes) govern webpages, the UI kit, and social tiles. **For slides / office documents (1920×1080 decks), these are overridden** by `AGENTS.md` + `LAYOUTS.md` — slide type scale, "fill the frame," imagery by default, edge-to-edge canvas. Brand fundamentals (color, fonts, italic-word, Storyline, annotations, voice) below apply to both media.

The layout system is **asymmetric, generous, and square-cornered.**

- **Max content width** `1240px`. **Reading measure** 68ch.
- **Section padding** is the primary rhythm: `{spacing.4xl}` (80px) minimum, `{spacing.6xl}` (128px) on hero blocks. Inside a section, content blocks gap by `{spacing.2xl}` (48px) or `{spacing.5xl}` (96px) for editorial pauses.
- **Asymmetric grid.** A 12-column grid with content biased to 7–8 columns and intentional negative space in the rest. Centered symmetrical compositions are reserved for quote blocks and CTAs.
- **Hairline borders.** `1px` in `{colors.border}` for soft division, `1.5px` solid `{colors.border-strong}` for intentional rules. No dashed, no double, no rounded-rectangle card syndrome.
- **No frosted glass.** No translucent nav bars. The one exception is a 60–75% navy overlay on hero photography for legibility.

The **Storyline squiggle** has two uses, chosen by background: the boxed square **monogram** on light / non-navy backgrounds (self-contained corner lockup), and the **line** on navy / dark fields. The line is *part of the dark field* — the bottom layer above the navy fill, behind content, edge-locked to the top/right/bottom (full frame height, no bleed). Never float the monogram adrift on navy; never float the line as an object. It is *not* a divider. **Frequency — a bookend, not a background:** the full-frame line on navy is a signature opener/closer, so use it on the **cover and the closing only** (≤2 slides per deck) — never behind a content slide (statements, agendas, columns, personas, data, tables, quotes). When a content slide needs a navy ground, use a **plain navy field with no line.** Repeating the line across slides makes every page read like a cover and flattens the deck. See §4.

## Elevation & Depth

Elevation is **rare and navy-tinted.**

Most cards are flat on paper with a hairline border or no border at all — separation comes from spacing, not shadow. Shadows are reserved for floating UI (modals, menus, dropdowns). When a shadow is used, it is **navy-tinted, never grey**, with three steps:

- **`shadow-1`** — `0 1px 0 rgba(24,45,67,0.08)` — barely-there hairline shadow.
- **`shadow-2`** — `0 4px 14px -4px rgba(24,45,67,0.12), 0 1px 0 rgba(24,45,67,0.06)` — default elevated card.
- **`shadow-3`** — `0 18px 40px -18px rgba(24,45,67,0.28), 0 2px 0 rgba(24,45,67,0.06)` — floating menu or modal.
- **`shadow-press`** — `inset 0 2px 0 rgba(14,28,43,0.18)` — the inset a button/control takes on `:active`.

No glows, no inner glows, no coloured shadows.

## Shapes

**Square corners are the brand posture.** This is intentional — clean, editorial, intentional. The radius scale is restrained:

- `{rounded.none}` (0px) — buttons, sections, cards, dividers. The default.
- `{rounded.xs}` (2px) — large cards where a pure-square corner reads too brutal.
- `{rounded.sm}` (6px) — form inputs, search fields.
- `{rounded.md}` (10px) — interactive chips (rare).
- `{rounded.pill}` — single-word tags and category chips only. Never on buttons.

The **hand-drawn shape vocabulary** is a library of **76 marks across 6 SVG categories** plus a 7th technique — *Highlights*. SVG categories: 13 lines & underlines, 15 circles, 14 arrows, 11 ticks, 11 crosses, 12 accents, living in `assets/annotations/` (every SVG uses `fill="currentColor"` for free recoloring). **Highlights** are a CSS overlay applied *over* body text — a brand-color background behind a word, the way a marker pen would. Highlight color must come from the brand palette and form a WCAG-safe pair with the text color. **Color is contextual** — no category has a fixed default; pick whichever brand color (lime, lavender, purple, cyan, teal, navy, paper) contrasts best with the text and background where the mark sits. The cross-out only reads as a cross-out if it stands out from the word it strikes through. 1–2 marks per surface. Editorial punctuation on top of type, not icons.

## Components

Tokens above define the strict component values. A few application notes:

- **Buttons** are square (`{rounded.none}`). Primary is **navy with lime type** — that lime-on-navy combination is the brand's most-recognised affordance. Lime button (navy type) is the same energy inverted, used as a destination CTA. Ghost is for secondary actions. Link buttons use purple (`{colors.tertiary}`) with a 1.5px purple underline.
- **CTAs** use direct verbs: *See the work*, *Tell us your story*, *Start a conversation*. Never *Learn more*.
- **Cards** are flat on paper with a hairline border. The dark variant (`card-dark`) sits on navy with lime eyebrow tags. A card may carry a single hand-drawn annotation (an underline, circle, arrow, tick, or cross) from `assets/annotations/` sitting outside its bounds — overflow is encouraged.
- **Inputs** use `{rounded.sm}` (6px) — the one place softness is allowed, to read as inviting. Focus state is a 1.5px solid navy border (no glow).
- **Tags** are pill-shaped. `tag-filled` uses lime for the active/selected state; `tag` is an outlined version with a navy hairline.
- **Eyebrow** is the system's category label: 12px / 700 / UPPERCASE / `0.14em` tracking. Often prefixed with a small lime dot.
- **Images are not optional.** If a layout calls for an image, it gets one. Priority order: (1) a **real image** — project assets, user uploads, anything actually placeable — always wins; (2) no asset available? use a **curated stock stand-in** (`images.unsplash.com`, chosen to match the imagery direction: candid, natural light, warm grade) and flag it for swap with campaign photography; (3) only when neither is possible, a **media placeholder** holds the space. Never design the image out of a layout, and never ship an empty placeholder when a usable image exists. Exception: layout *templates* that teach the placeholder mechanism keep their placeholders on purpose.
- **Media placeholders** (`.tha-placeholder` + ratio modifier) reserve space for imagery the agent can't place. Three lines of anatomy, always: `__label` (what it is + ratio), `__hint` (art direction for the human sourcing the shot), `__prompt` (a paste-ready seed for an image generator — bake in candid / natural light / warm grade / business-casual and the aspect ratio). `.on-dark` for dark slides, `--accent` for the one hero image. Optional `data-slot="<id>"` makes the frame drop-to-fill in the brand deck. Never ship a bare grey box. Image-forward layout templates (full-bleed + navy overlay, split 50/50, portrait + pull quote, case-study montage) are demonstrated in the brand guidelines deck, slides 30b–30f.

**Iconography.** The system offers **two** symbol vocabularies; pick one treatment per context and stay consistent within a set.
1. **Lucide line-icons** — the default for restrained / functional UI (outline, 1.75px stroke, square joins, 24px grid, `currentColor`). Use sparingly for wayfinding (nav, list bullets, button affixes).
2. **Fluent emoji as symbols** — the open Microsoft Fluent set, via the `<fluent-emoji>` injector, is broad and varied enough to stand in for almost any concept, and (unlike raw unicode emoji) renders the **same image on every platform**. So it is sanctioned as a full pictorial **symbol vocabulary** — not just storytelling: use a Fluent emoji wherever a symbol clarifies — list/agenda bullets, stat markers, feature/service icons, persona markers, step numbers — as an alternative to a Lucide icon. Don't mix the two styles within one set (a row of Lucide icons OR a row of Fluent emoji, not both). Keep them purposeful, not decorative; mind contrast on busy grounds.

Still banned: **raw unicode emoji** as icons/bullets (platform-inconsistent — use the injector instead), and **unicode pictograms** (`✓`, `★`, `➜`) as icon substitutes — use a real SVG or a Fluent emoji. The only typographic arrow allowed in copy is `→`.

**Fluent emoji (decks).** For the heavy emoji-led *visual storytelling* in decks we use the open-source **Microsoft Fluent Emoji** set (static + animated) via the `<fluent-emoji>` injector at `assets/emoji/fluent-emoji.js` — loaded automatically by the deck and keynote templates. Use it by name: `<fluent-emoji name="rocket"></fluent-emoji>` (inline, rides the baseline), `variant="animated"` for motion, or `size="120"` to use one as a graphic. It resolves a **local copy first** (curated set in `assets/emoji/`, works offline) and falls back to the jsDelivr CDN for the full library — see the **Brand → Fluent emoji picker** card (`preview/fluent-emoji-gallery.html`) to browse and copy tags. This is distinct from the `.tha-emoji` unicode-glyph-in-a-word move (still used for a single charged word in running copy); Fluent emoji cover the bigger storytelling beats, animated moments, **and double as the system's pictorial symbol/icon vocabulary** (see Iconography above). Static art © microsoft/fluentui-emoji, animated © Tarikul-Islam-Anik/Animated-Fluent-Emojis (both MIT).

## Component library & templates

`DESIGN.md` defines the tokens and rules; two collections *apply* them, and both are indexed here so nothing built is invisible to this file.

**Website UI kit** (`ui_kits/website/`) — 15 production React components, compiled into `_ds_bundle.js` and exposed on `window.HoffmanAgencyDesignSystem_d10f7f`: `Button`, `Nav`, `Hero`, `Services`, `StatsStrip`, `CaseStudyGrid`, `QuoteBlock`, `CTABand`, `Footer`, `Eyebrow`, `Em`, `Circle`, `Scribble`, `PaletteStrip`, `StorylineDivider`. These are **marketing-site** components.

**App UI kit** (`ui_kits/app/`) — product-interface primitives for dashboards, admin tools, workflow surfaces, client portals, and campaign trackers. The app kit is compiled into `_ds_bundle.js` and exposed on `window.HoffmanAgencyDesignSystem_d10f7f`: `AppButton`, `TextField`, `TextareaField`, `SelectField`, `DateField`, `FileField`, `SliderField`, `Checkbox`, `RadioGroup`, `Toggle`, `Tabs`, `Breadcrumbs`, `Pagination`, `Sidebar`, `MobileMenu`, `AlertBanner`, `Toast`, `Modal`, `Tooltip`, `Popover`, `DataTable`, `DataList`, `Avatar`, `Badge`, `Divider`, `Accordion`, `Drawer`, `Menu`, `ProgressBar`, `Spinner`, `Skeleton`. These are **product/app** components: quiet, dense, scannable, token-driven, and built around native controls wherever possible. Use them for operational UI; use the website kit for editorial marketing pages.

**Templates** (`templates/`) — starting points a consuming project copies:
- `deck/` — the **48-layout** presentation library (codes L01–L51) — the ONE deck template; carries the Presenter/Document **Mode** toggle + the balloon cover. Slide medium — governed by `AGENTS.md` + `LAYOUTS.md`, not the web rules above.
- `one-pager/` — print, US Letter.
- `social-tile/` — square social post.

Live spec/preview cards for every token group and component live in `preview/*.html` (surfaced in the Design System tab).

## Do's and Don'ts

**Do.**

- Lead with one bold Poppins headline and italicize one word in Baskerville.
- Use one secondary color as the "mood" of a layout, or rotate secondaries across cards in a 4–6 item grid.
- Set section padding at `{spacing.4xl}` or larger. Give the design room to breathe.
- Square the corners. Default to `{rounded.none}`.
- Replace decorative icons with hand-drawn marks from `assets/annotations/` (lines, circles, arrows, ticks, or crosses) in lime, lavender or purple.
- Write CTAs as direct verb + object: *See the work*, *Tell us your story*.
- Reserve imagery with a labelled placeholder — `__label` + `__hint` + `__prompt` — never a bare grey box. But a placeholder is the *fallback*: when a real, usable image is available, place the real image.
- Use the Storyline squiggle in the form the background calls for: on **light / non-navy** backgrounds, the boxed square as a self-contained corner monogram; on **navy / dark fields**, the line as a background layer (bottom layer above the fill, behind content, edge-locked to the top/right/bottom, full frame height, no bleed).

**Don't.**

- Set Libre Baskerville upright as body or display type. Italic only.
- Use lime as text on white. Use `{colors.accent-strong}` instead.
- Apply gradients, frosted glass, parallax, or scroll-jacking.
- Reach for agency clichés: *unlocking, leveraging, end-to-end, at the intersection of, best-in-class, disruptive, revolutionary, storytelling solutions*.
- Use emoji *sparingly*, with copy. Max 3 per page/slide. Cross-platform variance is expected. Unicode pictograms (→, ✓, ★, ·, —) are allowed *in text* as typographic glyphs (they inherit text color and weight), but not as standalone icons.
- Place the 2-color (navy + lime) logo on a secondary background. Use the 1-color white variant instead.
- Add filler sections, ornamental stats, or decorative imagery. One thousand no's for every yes.
- Leave an image out of a layout that needs one — or ship a placeholder when a real, usable image is available to place.

## Reserved for future definition

The following areas are **acknowledged but not yet defined**. Placeholders are kept here so the system has a single backlog and so any AI consuming `DESIGN.md` knows what is *intentionally* absent vs. an oversight. None of these should be inferred or invented by an agent — when in doubt, ask.

### Tier 1 · Product / UI extensions

- [ ] **Interaction states catalog** — formal spec for `default · hover · focus · active · selected · disabled · loading · error · success` across every interactive component.
- [ ] **Accessibility (WCAG) commitments** — focus indicators, keyboard navigation, screen reader support, `prefers-reduced-motion`, color contrast minimums codified per token pair, touch target minimum (44 × 44 px).
- [ ] **Responsive breakpoints** — `sm / md / lg / xl / 2xl` named breakpoints with px values.
- [ ] **Dark mode / theme variants** — token mapping for light ↔ dark themes (system runs navy-structural already; a real dark mode is a separate spec).
- [ ] **Functional icon system** — distinct from the annotation library. Lucide as default fallback is noted but not formally adopted. Size, stroke, grid, naming.

### Tier 2 · Communications outputs

- [ ] **Marketing motion _choreography_** *(primitive tokens already ship — `{motion.ease-out}`, `ease-in-out`, `dur-fast/dur/dur-slow` in `colors_and_type.css`)* — still undefined: named easing intents (entrance, exit, decision, drama), duration tiers mapped to intent, and choreography/stagger rules.
- [ ] **Data visualization palette + rules** — chart palettes (sequential, divergent, categorical), grid, labels, "no chart junk" guidance. Used in case-study stats.
- [ ] **Forms anatomy** — label, helper, required indicator, error message, validation states, character count, autocomplete, success confirmation.
- [ ] **Empty / error / loading state patterns** — empty data, no search results, 404 / 500 / network error, skeleton vs. spinner vs. progress.
- [ ] **Imagery / illustration library** — rules exist; a curated DAM of approved photos does not. Plus: a rule on whether bespoke illustration is allowed at all.
- [ ] **Collateral templates** *(shipped: `templates/deck/` 48-layout deck with Presenter/Document modes, `templates/one-pager/` print Letter, `templates/social-tile/` square — see "Component library & templates")* — still undefined: email (newsletter, transactional, signature), business card, letterhead, other social formats (LinkedIn carousel, IG story/portrait), document templates (proposal, case study, report cover), staff portfolio template, video bumpers + end cards.

### Tier 3 · Governance & operations

- [ ] **Naming + governance** — component naming convention, semver versioning, contribution model, component status badges (`draft · beta · stable · deprecated`).
- [ ] **Internationalization beyond fonts** — RTL support, date/number/currency formats, pluralization rules, vertical Japanese if needed.
- [ ] **Content design / microcopy** — error message tone, confirmation patterns, button labels, tooltip writing, empty state copy.
- [ ] **Performance / asset budgets** — max image weight, total page weight, time-to-interactive targets, component bundle size.
- [ ] **Code implementations** — Storybook-style component docs, React / Vue / plain HTML samples, npm-publishable token export.

---

When any of these get defined, move the item out of this list and into the appropriate canonical section (or a new top-level section if it's broad enough — e.g. `## Motion`, `## Accessibility`).
