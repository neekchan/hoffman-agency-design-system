# Changelog

All notable changes to the Hoffman Agency design system. Newest first. The
canonical source of the system is the Claude Design project (claude.ai/design,
`d10f7f7f-3158-4438-9664-46d071bea8ff`); this repo is a public mirror.

## 2026-07-12 — Impeccable audit fixes (v1.1 → v2.0)

Ran a full `$impeccable audit` (12/20, tagged `v1.1`) and fixed all 23 findings
on a candidate branch, verified live in-browser at each breakpoint and via
keyboard interaction, then merged to `main` as `v2.0`.

- **Contrast (P0)** — the documented "WCAG-safe" lime text color and the
  warning badge/banner both actually failed contrast (2.1:1 and 2.6:1);
  darkened both to clear 4.5:1 AA.
- **Responsive (P0)** — `ui_kits/website/` had zero `@media` breakpoints and
  was missing the viewport meta tag entirely, so nothing about it could ever
  work on a real phone. Added breakpoints to Nav (real hamburger menu now),
  Hero, CaseStudyGrid, and StatsStrip, plus the viewport tag.
- **Keyboard/focus (P1)** — Modal/Drawer now trap focus and close on Escape;
  fixed an unreachable link-styled button in the docs; darkened form input
  borders that were nearly invisible at rest.
- **Cleanup (P2/P3)** — `aria-current` on nav/sidebar, a visible focus ring on
  Toggle, `role="menu"` semantics on MobileMenu, 44px touch targets, font
  preconnect hints, `will-change` on an ambient deck animation, one
  ghost-card border/shadow combo removed, `aria-hidden` on decorative SVGs,
  a few hardcoded colors replaced with tokens.

Full diff pushed to `neekchan/hoffman-agency-design-system` `main` and synced
back into the Claude Design master project.

## 2026-07-03 — Fork extension merged back + integrated into the master (neekchan)

Reviewed Takeo Apitzsch's fork (`takeoap/hoffman-agency-design-system-extension`,
"Extended version of The Hoffman Agency design system"), confirmed it was purely
additive (4 commits ahead, 0 behind — no brand redesign, nothing removed), and
merged it back into the canonical repo with his commit history preserved.

### Merged from the fork → `github.com/neekchan/hoffman-agency-design-system`
- **App/product UI kit — `ui_kits/app/`.** `AppUI.jsx` with ~30 React primitives:
  forms (TextField, Select, Toggle, RadioGroup, Slider…), navigation (Tabs,
  Breadcrumbs, Pagination, Sidebar, MobileMenu), feedback (Alert, Toast, Modal,
  Tooltip, Popover), data display (DataTable, DataList, Avatar, Badge, Divider),
  disclosure (Accordion, Drawer, Menu), progress (ProgressBar, Spinner, Skeleton),
  plus `index.html` dashboard demo, `COMPONENTS.md`, `README.md`. Fills the
  "component library beyond the basics" item DESIGN.md had reserved for future.
- **LLM-consumption guidance** — `LLM_ENTRYPOINT.md` (task-routing table),
  `ANTI_PATTERNS.md`, README LLM-usage + fork-comparison sections.
- **Repo tooling** — `package.json` + `tools/validate-design-system.js` +
  `tools/smoke-html-catalog.js` (`npm run validate` / `test` / `smoke`),
  `CONTRIBUTING.md`.
- **Catalog fixes** — `_ds_manifest.json` matched to real files; stale
  `templates/keynote` entry removed; brand-guidelines deck corrected 52 → 58
  slides; website UI-kit README fixed; font-hosting + `references/` privacy
  clarified. (Detail in the fork entry below.)

### Integrated into the Claude Design master (source of truth)
Pushed the **design substance only** — `ui_kits/app/AppUI.jsx`,
`ui_kits/app/index.html`, `ui_kits/app/COMPONENTS.md`, `ui_kits/app/README.md`,
`LLM_ENTRYPOINT.md`, `ANTI_PATTERNS.md`. Deliberately **not** pushed:
compiler-generated `_ds_manifest.json` / `_ds_bundle.js` (the Claude Design build
regenerates these from source), repo dev-tooling, and edited existing docs (the
master already had newer versions — avoided regressions). Opening the master
project once lets its compiler register the app components + the App UI Kit
preview card.

_Note:_ repo and master are intentionally not in full parity — the master carries
an `app-deck` template + `Hoffman App Deck.html` the repo lacks; the repo carries
the validator/tooling the master lacks.

## 2026-07-03 — Fork "extension" by Takeo Apitzsch (`takeoap`)

_Preserved verbatim from the fork's own CHANGELOG._

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
- Clarified the README's LLM usage section so it works when the README is the only file pasted or attached to Claude/ChatGPT.
- Added a README comparison section that explains how this fork differs from Neekchan's original version.

## 2026-06-30 — Public repo created + full sync from Claude Design (neekchan)

- Created the public repo `github.com/neekchan/hoffman-agency-design-system` and
  synced the full Hoffman Agency design system down from the Claude Design master.
- **Excluded internal source material** (`references/`, `uploads/` — all-hands and
  strategy decks) from the public mirror.
- Fonts: 18 Poppins weights self-hosted (from Google Fonts); Libre Baskerville
  variable fonts (upright + italic) added.
- Full curated Fluent emoji set vendored offline (color + animated), CDN pinned to
  commit SHAs. Logos (10 colorways), storyline marks, 76 hand-drawn annotations,
  deck/one-pager/social-tile templates, the 58-slide brand-guidelines deck, and
  the website UI kit all included.
