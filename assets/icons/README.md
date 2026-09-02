# Icons — the Hoffman symbol vocabulary

**1,595 icons. Use these whenever a design needs an icon.**

Before this folder existed the system had no icon library at all — only 76
hand-drawn annotations, the logos, the Storyline marks, and the emoji. Anything
needing a functional symbol had to invent one. This is that gap closed.

## What these are

The **Flat** style from [`microsoft/fluentui-emoji`](https://github.com/microsoft/fluentui-emoji)
(MIT), localised so offline deliverables work — a self-contained deck, a native
PowerPoint, an embedded PDF. Nothing here needs a network.

Flat is a flat-**colour** style: roughly seven fills per icon, no gradients. The
colours are part of the artwork and are deliberately left intact — do not
recolour an icon to a brand hue. (If you need a mark that takes a brand colour,
use `assets/annotations/` or `assets/storyline-mark.svg`; those are
`currentColor`-driven by design.)

## Naming

Kebab-case, from the Fluent emoji name: `light-bulb.svg`, `magnifying-glass-tilted-left.svg`,
`bar-chart.svg`. Skin-tone variants are not carried — the Default tone is;
the five tone variants remain upstream if ever needed.

## Icons vs emoji — they are different jobs

| Use | Reach for |
|---|---|
| A functional symbol: wayfinding, a list marker, a label, dense UI | **`assets/icons/`** — this folder |
| The emotional beat of a slide: a hero moment, a key stat, a punchline | **`assets/emoji/color/`** or `3d`, per `AGENTS.md §8` |
| Motion at the one emotional peak | **`assets/emoji/animated/`** — check `animated-manifest.json` first; only 24 of the curated set genuinely animate |
| A hand-drawn mark: underline, circle, arrow, tick | **`assets/annotations/`** |

An icon is something you look up because you need the one that means "database".
An emoji is something you choose because a slide needs to feel like something.
Breadth serves the first; restraint serves the second.
