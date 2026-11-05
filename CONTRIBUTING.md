# Contributing
<!-- Versioning as Nicolas Chan runs it: patch for words, minor for rules, major for breakage. -->

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
compiler-generated, and so is every `templates/*/support.js` (from a
`dc-runtime` that is not in this repository). **After the November 2026
handover the compiler is gone with the author's Claude Design account**, so
treat all of them as frozen artifacts: no regenerator exists here, and oxlint
is neither installed nor required. Their sources (`ui_kits/**/*.jsx`,
`colors_and_type.css`, the `@dsCard`/`@template` comments) are in the repo for
whoever writes a builder later.

If the compiler is not available and the current export must be repaired, keep
the generated-file change mechanical: update only stale paths or metadata that
can be derived from source files.

## Validate

The repo has no compiler or validator of its own (the Node tooling was removed
in v2.3.2; the Claude Design compiler left with the author). What you can run,
with nothing installed: open the changed template or page in a browser and look;
`tools/title_check.js` for headings; `tools/tile_count.js` for tiles; then the
`CHECKLIST.md` gate on anything visual you changed. Keep the layout counts in
`AGENTS.md`, `README.md`, `SKILL.md`, `POWERPOINT.md` and
`templates/powerpoint/layout-manifest.json` in step by hand.

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
