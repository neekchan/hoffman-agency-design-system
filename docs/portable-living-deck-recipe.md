# Portable Prompt — "Build a Living Brand Guidelines Deck"
*Paste everything below into a Claude design window that already has access to a design system (its tokens, CSS, component notes, README/DESIGN docs, logo + asset files). It tells Claude to turn that system into a single deck that BOTH documents the rules AND demonstrates them. It is design-system-agnostic — it never assumes Hoffman's specific colors, fonts, or motifs; it reads whatever system is present.*

---

## THE TASK
Build me a single HTML slide deck that is the **living embodiment** of this design system: simultaneously the **specification** (every rule, token, and component written down) and the **demonstration** (real, on-brand slides that look exactly like work made *with* the system). A reader should be able to learn the entire system by paging through it, and also see it performing. This is the canonical artifact of the brand — treat it as the highest-fidelity thing you will make.

## STEP 0 — INGEST THE SYSTEM FIRST (do not skip)
Before designing anything, read everything available: the global stylesheet / token file, any README / DESIGN / guidelines docs, component previews, and the asset folders (logos, motifs, icons, fonts). Extract and write down for yourself:
- The exact color palette (hex values, names, primary vs. secondary, and any "surface" roles).
- The type system (families, weights, the signature type move if any, the scale).
- The voice & copy rules (tone, banned words, sample lines, CTA style).
- Any signature graphic motif, logo variants, annotation style, iconography.
- Spacing, grid, corner-radius, shadow posture, and imagery direction.
- The contrast / pairing rules (which colors are legal on which backgrounds).
Use the REAL tokens and REAL assets throughout. Never invent a color or font the system doesn't define. If an asset (logo SVG, motif) exists, embed it — don't redraw it.

## THE CORE PRINCIPLE — every rule is shown twice
This is what makes the deck "living" rather than a static spec. Most topics get a **rule pair**:
1. A **specification slide** — the rule stated plainly, with do/don't columns, swatches, scales, anatomy diagrams, or measured values (e.g. computed contrast ratios). This is the documentation.
2. One or more **demonstration slides** — labelled with a small "Demonstration ·" eyebrow — that are actual finished, on-brand slides using that rule for real content. These prove the rule produces good work, and double as copy-paste templates.
Alternate spec → demo throughout, so the deck teaches by telling *and* showing.

## STRUCTURE — sections, each opening with a divider
Open with a **cover** (use the signature motif / dark hero surface) and a **contents** slide. Then group content into numbered PARTS, each starting with a full-bleed **section-divider slide** (big part number + title, often on a colored surface for rhythm). A proven part order — adapt to whatever the system actually contains:

- **Part 1 · Foundation / Why** — the brand's reason for being, the voice do/don't, plus 1–2 demo slides showing voice as a headline and as a pull quote.
- **Part 2 · Logo** — variants, logo-on-backgrounds, clearspace & minimum size, a misuse grid (the "N ways to break the brand"), and the signature graphic motif with its usage rules.
- **Part 3 · Color** — primary palette, secondary palette, **color-as-surface** (the idea that every brand color is a usable full-slide background), real demo slides built *on* two or three different color surfaces, color proportions (e.g. a 30/30/10… ratio bar with hex+RGB), **contrast & accessibility** (show measured WCAG ratios), **bold pairings** (a per-surface chart of which type colors qualify as body ≥4.5:1 vs. large/bold ≥3:1), light-surface models, color do/don't, and a stats-strip demo putting the whole palette in action.
- **Part 4 · Typography** — the families, multilingual coverage if relevant, the signature type move, the type scale, type do/don't, and a "type as rhythm" demo.
- **Part 5 · Expression** — annotation / illustration style, emoji or ornament rules, voice patterns, buttons & UI, spacing & grid, and **imagery**: imagery direction, the **media-placeholder anatomy**, and a set of **image-forward layout templates** (full-bleed image + overlay, split 50/50, portrait + pull quote, case-study montage).
- **Part 6 · In practice** — several full demo slides (a framework layout, a bold concept reveal, the whole brand system "stack" at a glance) and a **closing** slide that mirrors the cover.

Number slides so inserts are easy to reason about (01, 02, … and 16b / 16c for later additions). Put a `data-screen-label` on every `<section>` (e.g. "16c Demo lavender surface") so slides are referenceable.

## IMAGES ARE NOT OPTIONAL
Wherever a layout calls for an image: (1) place a **real image** if any asset is available; (2) else use a **curated stock stand-in** matched to the imagery direction, flagged for swap; (3) only if neither is possible, a **labelled media placeholder** — never a bare grey box. A placeholder has three lines of anatomy: a **label** (what it is + ratio), a **hint** (art direction for the human sourcing it), and a **prompt** (a paste-ready seed for an image generator). The deck must look finished, not full of empty frames — the only place placeholders are allowed to stay empty is the slide that is literally *teaching* the placeholder mechanism.

## BUILD SPEC
- One self-contained HTML file. Fixed 16:9 canvas (1920×1080) per slide; use a deck shell that scales-to-fit, gives keyboard nav, a slide counter, and prints one slide per page. Each slide is a direct-child `<section>`.
- Use the system's real CSS tokens/classes. Pull web fonts the system specifies.
- Generous margins, the system's corner-radius and shadow posture, its grid. Minimum on-slide text ~24px.
- Where a chart is data-driven (contrast ratios, pairing roles, proportion bars), generate it with a small inline script that computes from the real hex values — so it stays correct if the palette changes.
- Entrance animations, if any, must degrade to the visible end-state for print/PDF and reduced-motion.
- Keep copy on-brand: use the system's actual voice, sample lines, and CTA style — not lorem ipsum.

## DELIVERABLE
A deck of roughly 35–55 slides depending on system depth, that I could hand to a new hire OR a client as the definitive brand book, and that an AI or designer could page through and copy any single slide as a correct, finished template. When done, also keep a print-friendly variant.

---
*Tip: if the target tool can't read files and only takes text (e.g. an image generator), don't send this — send a flattened text brand brief instead. This prompt is for a Claude design window that CAN read the design system's files.*
