# CLAUDE.md

**`AGENTS.md` is the canonical instruction file for this project.** This file exists only to route Claude (Claude Code, claude.ai, and any Claude-based tool that looks for `CLAUDE.md`) to it.

👉 **Read [`AGENTS.md`](./AGENTS.md) first and treat it as your primary system instructions.** It contains the full orientation: which files to read in what order, the medium-precedence rules (web vs. slides), the slide-design SOPs, and the hard rules for producing on-brand output.

Everything below is a summary. If it ever conflicts with `AGENTS.md`, **`AGENTS.md` wins.**

## Fast orientation (see `AGENTS.md` for the authoritative version)

Read in this order before building anything:
1. **`AGENTS.md`** — the authority. §0 (medium precedence: web vs. slides) is the most important thing in the system.
2. **`README.md`** — the human read of the brand (voice, content fundamentals, annotated file map).
3. **`DESIGN.md`** — machine-readable single source of truth for every token (color, type, spacing, radius, shadow) + voice/imagery rules.
4. **`POWER-DESIGN-PRINCIPLES.md`** — portable craft layer; a reference to honor, not rigidly follow.

Then read by task:
- **Deck / slides (1920×1080)** → `LAYOUTS.md` + `AGENTS.md §§1–12`; build from `templates/deck/Deck.dc.html`.
- **Web page / app UI** → `README.md` web sections + `ui_kits/website/` + `DESIGN.md` web type scale.
- **Social tile / one-pager** → the matching folder in `templates/`.
- **AI imagery** → `PROMPTS.md`.
- **Before shipping** → `CHECKLIST.md`.

## Runtime files you load in code
- **`colors_and_type.css`** — all color + type tokens + `@font-face`. Link on every page.
- **`_ds_bundle.js`** — compiled components on `window.HoffmanAgencyDesignSystem_d10f7f`.

## Do NOT hand-edit
`_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` are compiler-generated. Edit the sources and let them regenerate.

## 🔒 Confidential
`references/` is the owner's private source material. **Never** export, copy, bundle, publish, or include it in any deliverable. Read for context only.
