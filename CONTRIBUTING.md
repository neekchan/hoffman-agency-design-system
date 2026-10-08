# Contributing

This repository is a portable design-system bundle. Most changes should edit
source docs, tokens, assets, templates, or JSX components, then validate the
catalog.

## Edit These

- `README.md`, `AGENTS.md`, `DESIGN.md`, `LAYOUTS.md`, `CHECKLIST.md`, and
  `PROMPTS.md` for rules and guidance.
- `colors_and_type.css` for design tokens, base styles, font registration, and
  shared utilities.
- `ui_kits/website/*.jsx` for marketing website-kit component source.
- `ui_kits/app/*.jsx` for product/app UI component source.
- `preview/*.html`, `slides/*.html`, and `templates/**/*.dc.html` for visible
  catalog cards and reusable artifacts.
- `assets/` and `fonts/` when the brand assets themselves change.

## Generated Files

`_ds_bundle.js`, `_ds_manifest.json`, and `_adherence.oxlintrc.json` are
compiler-generated. Prefer regenerating them with the design-system compiler
when it is available.

If the compiler is not available and the current export must be repaired, keep
the generated-file change mechanical: update only stale paths or metadata that
can be derived from source files.

## Validate

The design-system compiler runs on the Claude Design master. It regenerates the
compiled files and reports catalog, manifest, `@dsCard`/`@template` metadata,
UI-kit reference, and deck/layout-count issues on every change. The repo has no
validator of its own (the Node tooling was removed in v2.3.2), so a repo-side
change is validated when it is synced to the master. Fix what the compiler
reports until it is clean, then run the `CHECKLIST.md` gate on anything visual
you changed.

## Adding A Preview Card

1. Create a static HTML file under `preview/`, `slides/`, or another cataloged
   folder.
2. Add a leading comment in this form:

   ```html
   <!-- @dsCard group="Brand" name="Card name" subtitle="What it shows" viewport="700x400" -->
   ```

3. Keep paths relative to the artifact. Regenerate the manifest on the master, or
   sync it mechanically in the repo; the compiler validates it at the next sync.

## Adding A Template

1. Create a template folder under `templates/<slug>/`.
2. Add an entry file named for the template, such as `Thing.dc.html`.
3. Include a leading `@template` comment in the DC file.
4. Include `ds-base.js` or the equivalent loader if the template consumes this
   design system.
5. Regenerate the manifest on the master, or sync it mechanically in the repo; the
   compiler validates it at the next sync.

## Versioning

This system uses [Semantic Versioning](https://semver.org) — `MAJOR.MINOR.PATCH`.

- **MAJOR** — a breaking brand change: a token/color/font is removed or redefined, a
  component's API changes, or a rule reverses such that existing on-brand work would
  now read as off-brand.
- **MINOR** — additive, backward-compatible: new components, templates, layouts,
  assets, or new/clarified rules that don't invalidate existing work.
- **PATCH** — fixes and copy edits: wording, typos, contrast fixes, stale paths,
  metadata sync — no new surface area.

The canonical number lives in **`package.json`** (`"version"`). On every change:

1. Bump `package.json` to the new SemVer number.
2. Prepend a dated, newest-first entry to `CHANGELOG.md` that says **what changed**
   (not just that the version moved) and the `old → new` version in its heading.
3. Update the **Version** line at the top of `README.md` so the current number and a
   one-line "what's new" are the first thing a reader (or agent) sees.

Keep these three in sync — `package.json`, `CHANGELOG.md`, and the README version line
are the version's single source of truth, history, and shopfront respectively.

## Confidential Material

`references/` is private source material. It may be absent from distributable
clones. Never copy it into exports, zips, published URLs, PPTX/PDF handoffs, or
standalone builds.

---

<sub>The Hoffman Agency design system — created by **Nicolas Chan**, Head of Digital &amp; Chief Strategist, AMEA.<br>[neekchan@gmail.com](mailto:neekchan@gmail.com) · [nchan@hoffman.com](mailto:nchan@hoffman.com) · [linkedin.com/in/nicolaschan](https://www.linkedin.com/in/nicolaschan/)<br>This file originated in the fork by **Takeo Apitzsch** ([@takeoap](https://github.com/takeoap)).</sub>
