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
can be derived from source files, then run validation.

## Validate

Run:

```bash
npm run validate
```

The validator is dependency-free. It checks manifest paths, component exports,
`@dsCard` metadata, `@template` entries, UI-kit README file references, the
48-layout deck template, and the live guidelines deck slide count.

When changing catalog HTML, UI kit demos, or generated component exports, also
run:

```bash
npm run smoke
```

`npm test` runs both validation and smoke checks.

## Adding A Preview Card

1. Create a static HTML file under `preview/`, `slides/`, or another cataloged
   folder.
2. Add a leading comment in this form:

   ```html
   <!-- @dsCard group="Brand" name="Card name" subtitle="What it shows" viewport="700x400" -->
   ```

3. Keep paths relative to the artifact, and run validation after regenerating or
   mechanically syncing the manifest.

## Adding A Template

1. Create a template folder under `templates/<slug>/`.
2. Add an entry file named for the template, such as `Thing.dc.html`.
3. Include a leading `@template` comment in the DC file.
4. Include `ds-base.js` or the equivalent loader if the template consumes this
   design system.
5. Regenerate or mechanically sync the manifest, then run validation.

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
