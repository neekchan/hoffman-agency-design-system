# Changelog

## 2026-07-03

### What these changes improve

This fork is easier to use because the catalog now matches the files people can
actually open. It no longer points to a missing keynote template, and the brand
guidelines deck is listed with the correct 58-slide count.

End users should see fewer broken links and less confusion. The previews,
templates, and README files now describe what is really included in this repo.

For Neekchan, the original repo owner, this is not a redesign or a change to the
Hoffman brand system. It is cleanup around the fork: stale generated metadata,
old file names, and missing validation have been corrected so future changes are
easier to review and compare with upstream.

The repo is also easier to maintain because `npm run validate` can catch these
small catalog mistakes before they reach users again.

### Fixed

- Made `_ds_manifest.json` match the current files in this fork.
- Removed the old `templates/keynote` catalog entry because that folder is not included here.
- Updated the brand guidelines deck listing from 52 slides to 58 slides.
- Fixed the website UI kit README so it lists the files that actually exist.
- Made the image-placeholder checklist clearer: placeholders should say what image is needed, how to frame it, and what size to generate.
- Clarified that `references/` is private source material and may not be present in shared copies of the repo.
- Documented that Poppins and Libre Baskerville are self-hosted, while JetBrains Mono, M PLUS 2, and Noto Sans still load from Google Fonts unless they are self-hosted later.

### Added

- Added `CONTRIBUTING.md` so maintainers know what to edit, what is generated, and how to check their work.
- Added `npm run validate` and `npm test`.
- Added a dependency-free validator that checks common sources of repo drift: missing files, stale catalog entries, wrong slide counts, and README links that point nowhere.
- Added `ui_kits/app/`, a product/app UI kit with React primitives for forms, navigation, feedback, data display, disclosure, and progress states, plus a dashboard demo card.
- Added `LLM_ENTRYPOINT.md`, `ANTI_PATTERNS.md`, and `ui_kits/app/COMPONENTS.md` so Claude, ChatGPT, and similar agents can route tasks, avoid common design failures, and use the product UI primitives correctly.
- Added `npm run smoke` for dependency-free catalog HTML and bundle export smoke checks.
