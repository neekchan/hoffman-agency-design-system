# Changelog

All notable changes to the Hoffman Agency design system. Newest first. The
canonical source of the system is the Claude Design project (claude.ai/design,
`d10f7f7f-3158-4438-9664-46d071bea8ff`); this repo is a public mirror.

## 2026-07-23 — Route the Brand Mark Studio from the agent docs (v2.4.3 → v2.5.0)

The Brand Mark Studio existed but no router doc mentioned it — an agent asked for "the animated hello as a GIF" had no path to it. Now discoverable from every entry point (`CLAUDE.md` → `AGENTS.md`; `SKILL.md` → `LLM_ENTRYPOINT.md` + `README.md`):

- **`AGENTS.md`** — new "read by task" bullet: animated brand "hello" / animated wordmark or brand-mark GIF → `preview/brand-mark-studio.html`, with the standing rule *point the user at the tool; don't hand-build the animation*.
- **`LLM_ENTRYPOINT.md`** — new "Pick The Medium" row for the same triggers (deck, PowerPoint, social, email signature), start-from the studio, key rule: it's self-serve, client-side.
- **`README.md`** — new LLM-usage routing row (with the "don't hand-animate / don't rebuild the exporter" anti-pattern) + a `preview/` file-map line marking it **TOOL, not a card**, and the Version line updated.

Minor bump per `CONTRIBUTING.md` (additive surface). Doc changes mirrored to the Claude Design master, whose `CHANGELOG.md` also catches up on the 2.4.x series it was missing.

## 2026-07-23 — Brand Mark Studio: one scripted download per page load + on-page diagnostics (v2.4.2 → v2.4.3)

Field report solved the mystery: Chromium permits **one script-initiated download per page load**; every later one is silently dropped (the "multiple automatic downloads" guard never prompts inside a sandboxed frame). That's why the first export always downloaded and every subsequent one didn't — across v3–v2.4.2 — regardless of buttons, links, or synthetic clicks.

- `save()` now spends that budget deliberately: auto-download fires for the **first** export of a session only, then is skipped with an explanatory line, and the UI leads with the unlimited native paths — right-click the rendered preview → "Save image / video as…", the video player's ⋮ → Download, the green link's `showSaveFilePicker` (no download manager at all), or right-click → "Save link as…".
- New **on-page diagnostics strip** (7-line rolling log under the panel): logs export sizes, auto-download attempted/skipped, recorder start/finish/chunks/errors, preview decode failures, and any uncaught error — so sandbox-specific failures are visible in the page instead of guessed at.
- MP4 investigation aid: recorder events now surface in the strip (a 0-chunk recording or MediaRecorder error is reported in plain text).

## 2026-07-23 — Brand Mark Studio: render the export into the page (v2.4.1 → v2.4.2)

Field report: in the claude.ai artifact sandbox even the v2.4.1 download *button* was swallowed, and turning the link into a button had removed the one path that worked (right-click → "Save link as…"). Stop fighting the host: after an export finishes, the finished APNG/GIF now renders **into the page** as a live animated preview (MP4/WebM in a `<video controls>` player), with a note pointing at the always-available saves — right-click the preview → "Save image as…", the player's ⋮ → Download, or right-click the restored green `<a download>` link → "Save link as…". Left-clicking the link now tries a real save dialog first (`showSaveFilePicker`, Chrome) before falling back to the download attribute. No host can intercept right-click saving of visible content, and the preview doubles as proof the encoded file is valid.

## 2026-07-23 — Brand Mark Studio: GIF encoder was corrupt from day one + real download button (v2.4.0 → v2.4.1)

Two field-reported bugs in `preview/brand-mark-studio.html`, both fixed on the master, this mirror, and the shared claude.ai artifact in the same pass.

- **The GIF export never worked — every GIF it ever produced was a broken stream.** The hand-rolled LZW encoder bumped the code width the moment the dictionary filled a power of two ("early change"); GIF decoders (giflib, PIL, Chrome, PowerPoint) expect the width to grow one code *later*. Any image complex enough to reach 511 dictionary codes — i.e. any real text at 2× — desynced the stream, and viewers rendered blank frames (PIL: "broken data stream"). Nobody noticed before because the sandbox download bug shipped the file to nobody. Rewritten `lzwEncode` with the correct giflib-timed late change and numeric dictionary keys (also much faster); verified pixel-exact against PIL on noise/gradient/boundary-engineered streams, a strict reference decoder, and a real-browser end-to-end export (48-frame transparent + solid runs decoded frame-by-frame).
- **The post-export download control is now a `<button>`, not a link.** Hosts that intercept anchor clicks (e.g. the claude.ai artifact viewer, which can't resolve an iframe's `blob:` URL from the parent) swallowed left-clicks on the old visible `<a download>`, forcing right-click → "Save link as". The button re-runs the synthetic-anchor download under its own fresh user activation — the exact mechanism already proven by the fast APNG path — so a plain left click always saves.
- Also hardened the MP4/WebM handler with a try/catch (a `captureStream`/`MediaRecorder` failure could previously leave every export button disabled).

## 2026-07-23 — Brand Mark Studio joins the mirror + sandbox-safe downloads (v2.3.4 → v2.4.0)

- **`preview/brand-mark-studio.html` (new in the mirror).** The animated brand-hello exporter had lived only on the Claude Design master; the mirror now carries it, current with the master's typeface update: Poppins or Libre Baskerville with italic/bold toggles, gradient vs solid (per-letter travelling) colour styles, and the expanded background swatch row (violet, aqua, teal, lime). Exports APNG (transparent, anti-aliased), GIF (transparent, PowerPoint-safe), and MP4/WebM — all encoded client-side. Deliberately not a `@dsCard` (it's a utility studio, not a spec card), matching the master.
- **Fix: exports no longer vanish in sandboxed iframes (both sides).** `save()` relied on a programmatic `a.click()`, which browsers only honour within the user-activation window (~5 s) of the button press. The native-speed APNG encoder finishes in time; the pure-JS GIF encoder does not, so in a sandboxed embed (e.g. a shared claude.ai artifact) the finished GIF silently never downloaded. `save()` now also renders a real "⬇ Download <file>" button (fresh gesture → always allowed), keeps the blob URL alive until the next export, and still auto-clicks for the fast path. Fix applied to the master first, then mirrored here.

Synced from the Claude Design master (`d10f7f7f-…`) after patching the master in the same pass. (Checked with the repo's validate/smoke tooling before its upstream removal in v2.3.2; the file adds no cards, so the 29-card catalog is unchanged.)

## 2026-07-18 — Added a README hero banner (v2.3.3 → v2.3.4)

Embedded `assets/readme/hero.svg` at the top of `README.md` — a self-contained, GitHub-safe hero (system fonts only, no scripts, no external references) built entirely from the system's own material rather than generic decoration:

- The real Storyline mark (line variant, edge-locked right, faded to a background texture — per the once-per-deck/faded-elsewhere rule).
- The actual secondary palette swatches (lavender, purple, cyan, teal, lime).
- A live Poppins/Baskerville-italic type specimen.
- The **white + lime logo reverse** (`logo-horizontal-white-lime.svg`), un-deprecated for navy grounds in the prior patch.

Headline copy is pulled from this README's own value proposition rather than invented marketing copy.

## 2026-07-18 — Un-deprecated the white + lime logo reverse (v2.3.2 → v2.3.3)

`README.md`'s Logo usage "Never" list banned the white+lime reverse (icon in lime, wordmark in white) on any background, calling it deprecated — but `LAYOUTS.md` L31 (the spectrum-bar cover) already specs "white+lime logo" on a navy ground. The rule was stale, not the usage.

- **Removed** the "Never... use the white+lime reverse (deprecated)" bullet.
- **Added** a proper entry for the variant: `logo-horizontal-white-lime.svg` / stacked equivalent, **navy grounds only**, as the accented alternative to the pure-white lockup when a layout wants lime to read in the mark itself — cross-referenced to `LAYOUTS.md` L31. On any other dark/saturated background, pure white remains the rule.
- No asset files changed — both `logo-horizontal-white-lime.svg` and `logo-stacked-white-lime.svg` already existed; only the documented rule around them changed.

## 2026-07-17 — Removed Node repo scripts that broke the compiled bundle (v2.3.1 → v2.3.2)

The compiler bundles project `.js` into `_ds_bundle.js`; `tools/lint-deck.js` began with a `#!/usr/bin/env node` shebang, which is invalid mid-file and broke the bundle's JSX transform (`SyntaxError: Unexpected token`). Validation belongs to the compiler, not a parallel Node toolchain, so the scripts are gone rather than patched.

- **Deleted** `tools/lint-deck.js`, `tools/smoke-html-catalog.js`, and `tools/validate-design-system.js` (the whole `tools/` folder).
- **`package.json`** — removed the `scripts` block (`validate`, `smoke`, `lint:deck`, `test`); the file now carries only name, version, and `private`.
- **Removed dangling pointers** to those scripts / `npm run` commands: `LLM_ENTRYPOINT.md` "Before Shipping" line, the README file-tree entries + "## Validation" section, and the `CONTRIBUTING.md` "## Validate" section and step notes. Each now points to the compiler + manual `CHECKLIST.md` instead.
- Historical CHANGELOG entries mentioning the old scripts are left as-is (accurate record of prior state).

## 2026-07-17 — Deck delivery-format choice + "HTML deck ≠ web page" guardrail + image-prompt fixes (v2.3.0 → v2.3.1)

Same-day follow-up to v2.3.0, tightening the two things that drive the tiny-font failure and the garbled-text-in-images failure.

- **Deck delivery format is now an explicit intake choice.** `INTAKE.md` Q1 gains an HTML-vs-native-PowerPoint decision with the trade-off spelled out: HTML deck = interactive/animated, pixel-exact, best live or as a link, but not editable in PowerPoint; `.pptx` = anyone can edit and hand off, but limited interactivity and more work to hold brand fidelity. Rule of thumb: presenting live / sending a link → HTML; someone else edits it → PPTX. (PDF is an export of either.)
- **"An HTML deck is still a deck, not a web page."** New guardrail in `AGENTS.md §0` (echoed in `SKILL.md`): delivery format is not a medium — HTML and `.pptx` are both slides and both use the slide rules. HTML is only the rendering tech; applying the web type scale / whitespace / `ui_kits/` rules to a 1920×1080 HTML deck is exactly how it ends up with 16px body text. Closes the most common tiny-font path.
- **Stop asking image models to typeset.** `PROMPTS.md` gains a banner and per-block fixes: Midjourney / DALL·E / SD garble real words, so the social-tile and slide blocks now generate *imagery / background only* — headlines, series numbers, and labels are set in the deck (HTML or PPTX), not baked into the picture. The type specs in those blocks are labelled as the code-layer spec.
- **Photo-seed housekeeping.** Flagged that the `__prompt` seeds are photography-only (illustration lives in `IMAGERY.md`), added pixel size alongside aspect in the seed template, and dropped the stale "slides 30–30f" reference.

Synced to the Claude Design master (`d10f7f7f-…`) and the public GitHub mirror (`main`).

## 2026-07-17 — Intake gate, imagery workflow, title rule + rendered-deck linter (v2.2.1 → v2.3.0)

New surface area, all additive — closes the gaps behind the recurring "it doesn't look like the system" failures (tiny type, truncated/half-width titles, dead whitespace, missing imagery, agents skipping the imagery decision). The owner's *writing* voice was deliberately left out — that's personal preference, not a system rule.

- **`INTAKE.md` (new) — a pre-build gate.** A short question set (medium · Presenter/Document mode · audience, tone & language · colour direction · imagery) with a one-line brief restated back, run before any surface or layout. Wired as step 0 from `AGENTS.md`, `LLM_ENTRYPOINT.md` (new §0), `CLAUDE.md`, and `SKILL.md`, so no entry path can skip it.
- **`IMAGERY.md` (new) — the image decision workflow.** Capability check (can this agent generate images at all?) → ask the user (generate / supply / labelled placeholder) → if generating, learn a reusable style from 2–4 samples or fall back to the documented **Hoffman house illustration style** → else a labelled `.tha-placeholder`, never a bare box. Distinguishes illustration from photograph and cross-wires with `PROMPTS.md` (workflow here, prompt templates there). Ships 3 reference samples in `assets/house-style/`.
- **`AGENTS.md §2.5` (new) — titles & headings.** Never truncate/clip a title; break lines at sense boundaries (manual `<br>`, not mid-phrase); fill the width or size up, and treat an empty right margin as a slot for a graphic, not dead space. Plus a "dead space is a bug" note in §2, "chunk, don't dump" in §5, and "colour the emphasis" in §10.
- **`tools/lint-deck.js` (new) — rendered-output linter (`npm run lint:deck`).** Renders a deck in headless Chromium at 1920×1080 and flags type below the slide floor, titles that truncate or under-fill, right-side / lower-band dead space, content slides with no visual, real white-on-white (measured from the actual rendered pixel behind each text run, so layered colour surfaces read correctly), frame overflow, and tokens/bundle not loaded. Degrades gracefully where Playwright/Chromium is absent; not added to `npm test` (needs a browser + a target file).
- **Routing reoriented + checklists updated.** `CHECKLIST.md` gains an intake block and title/visual/chunk/emphasis/image-workflow lines; `ANTI_PATTERNS.md` gains rows for hand-authored chrome, skipped intake, truncated half-width titles, text-only slides, wall-of-text dumps, and mixed image styles.

Mirrored to the Claude Design master (`d10f7f7f-…`).

## 2026-07-15 — Fix reversed-meaning tagline + finish the italic-emphasis reframe (v2.2.0 → v2.2.1)

Post-sync cleanup. Two copy defects that survived the v2.2.0 sync, caught in a
review pass:

- **Corrected the reversed "complexity / clarity" tagline.** The line had crept in
  backwards — *"Complexity in. Clarity out."* (i.e. keep the complexity, lose the
  clarity) — in four places: `README.md`'s examples, the sample lines in
  `docs/portable-brand-brief-social.md`, a cover slide in
  `templates/deck/Deck.dc.html`, and the type specimen (`preview/type-display.html`).
  Fixed all four to say the right thing: **complexity out, clarity in.** The line is
  playful fodder, *not* a fixed hero — either word order is fine as long as the
  meaning holds — so the deck's meaning-correct *"Clarity in. Complexity out."*
  variants were deliberately left alone. (`DESIGN.md` and `preview/brand-voice.html`
  were also nudged to the complexity-first order for local consistency; either order
  is acceptable.)
- **Actually finished the italic-emphasis reframe.** The v2.2.0 entry claimed the
  reframe was fully propagated, but 8 `@layout` slot specs in
  `templates/deck/Deck.dc.html` still read "one italic word" / "w/ italic word"
  (drifting from `LAYOUTS.md`, which had already moved to "the italic emphasis"),
  and `docs/portable-brand-brief-social.md` still said "the italic word in lime."
  Reframed all of them to **"the italic emphasis"** so the deck template and its
  companion doc agree.

No new surface area — wording only. Both fixes mirrored to the Claude Design master.

## 2026-07-15 — Brand Tour template + standalone fix, SemVer policy, italic-rule cleanup (v2.1.0 → v2.2.0)

Follow-through on the v2.1.0 work: made the interactive demo a first-class,
consumer-pickable template, hardened its standalone export, formalized versioning,
and finished propagating the italic-emphasis reframe into the last stale surfaces.

- **Renamed the demo to "Interactive brand tour."** `templates/app-deck/` →
  `templates/brand-tour/`, `AppDeck.dc.html` → `BrandTour.dc.html`, root
  `Hoffman App Deck.html` → `Hoffman Brand Tour.html`; `@template` label
  "App deck (interactive explorer)" → "Interactive brand tour"; Tweaks section
  "App deck" → "Brand tour". Added it to the README templates file-map.
- **Fixed it not registering as a template.** The compiler was tripping on the
  bundler-only `<head>` payload (the `ext-resource-dependency` metas). Moved those
  metas into `<helmet>` and kept only `__bundler_thumbnail` in `<head>` — the tour
  now registers (4 templates: brand-tour, deck, one-pager, social-tile).
- **Fixed + hardened the standalone `Hoffman Brand Tour.html`.** It had loaded
  `colors_and_type.css` only via `ds-base.js`'s runtime injection, which a static
  offline bundle can't execute — so every `var(--tha-*)` collapsed to transparent
  (colorless section cards) and the bundle logged repeating `[bundle] error`s.
  Inlined a compact brand-token block + a slim self-hosted font set into the DC and
  dropped the runtime loader from the tour → correct colors, real Poppins +
  Baskerville italic, and zero console errors offline.
- **Formalized SemVer.** Added `name` + `"version"` to `package.json` (canonical
  number), a Version line at the top of `README.md`, and a Versioning policy to
  `CONTRIBUTING.md` (MAJOR/MINOR/PATCH + the package.json → CHANGELOG → README bump ritual).
- **Italic-emphasis cleanup.** Synced the active print variant
  (`Hoffman Brand Guidelines-print.html`) to the live deck's reframed rule text,
  fixed the "italic word" → "italic emphasis" phrasing in both decks, and softened the
  last bare "one word" instruction in `PROMPTS.md`.
- **Web hero copy.** `ui_kits/website/Hero.jsx`: "Complexity in. / *Clarity* out."
  → "Complexity out. / *Clarity* in."

> **Repo-mirror note:** the regenerated standalone `Hoffman Brand Tour.html` (the
> `BrandTour.dc.html` source IS synced) exceeds the DesignSync 256 KB fetch cap, so it
> could not be mirrored via API this sync — the repo keeps the prior standalone.
> Re-export it from Claude Design to bring the fixed offline build into the repo.

## 2026-07-14 — Storyline-line frequency rule (one full-strength use per deck)

Added a missing guardrail after an external agent (ChatGPT/Codex) built a deck
that used the navy + full-frame storyline-line treatment on ~6 of 26 slides. The
system defined *how* to use the line but never *how often*, so it read as a
general navy surface instead of a signature moment.

New rule, threaded through `AGENTS.md §7`, `DESIGN.md`, `LAYOUTS.md` (Hoffman
signatures), `CHECKLIST.md`, `ANTI_PATTERNS.md`, and
`assets/asset-manifest.json`:

- The bold, full-strength storyline line on navy is a **once-per-deck
  signature** — use it on the **cover OR the closing, never both.** It may still
  appear on other slides, but only **faded to a low-opacity background texture**
  (≈8–15%, receding behind content), never the solid full-strength line. A plain
  navy field with no line is always fine. The boxed corner monogram on light
  surfaces is a separate device, unaffected.

Mirrored into the Claude Design master so both Claude and repo-consuming agents
(ChatGPT/Codex) pick it up.

## 2026-07-13 — Master → repo full-parity sync (native PowerPoint route + italic-emphasis refinement)

Pulled the latest Claude Design master down to the repo and reconciled every
differing file. Two threads:

- **Native PowerPoint route (new).** Added `POWERPOINT.md` (the `.pptx`/`.potx`
  reliability layer — build-the-theme spec, font presence-≠-use rules, logo
  geometry contracts, protected zones, connector rules, layout-as-contract, and
  a finished-file validation checklist), `assets/asset-manifest.json` (machine-
  readable logo/Storyline geometry, ratios, clearspace, protected zones, and the
  surface→logo-variant map), and `templates/powerpoint/layout-manifest.json` (the
  48 layout contracts for python-pptx-style tools that can't consume
  `Deck.dc.html`). Threaded the route into the existing docs: a new **§13 Native
  PowerPoint** in `AGENTS.md`, a **"Finished PowerPoint file"** section in
  `CHECKLIST.md`, native-`.pptx` routing rows/subsections in `LLM_ENTRYPOINT.md`,
  `README.md` (routing table + file map: POWERPOINT.md, asset-manifest.json,
  templates/powerpoint/) and `SKILL.md`, and a full **PowerPoint & Office —
  presence is not use** per-platform font workflow in `fonts/README.md`.
- **Italic-emphasis refinement.** The signature type move is now "the **emphasis**
  — a key word *or* short phrase, chosen by meaning, one per line" (was "one
  italic word"). Synced across `AGENTS.md` (§0/§5/§10), `CHECKLIST.md`,
  `DESIGN.md`, `LAYOUTS.md` (14 slot descriptions + signatures), `SKILL.md`,
  `colors_and_type.css` (`.tha-em-serif` comment), `preview/brand-voice.html`
  (section 2), `templates/deck/Deck.dc.html` (L08 `@layout`) and
  `templates/app-deck/AppDeck.dc.html` (interactive-demo copy).

Deliberately **not** changed: the repo's `CLAUDE.md` stays a "pointer, not canon"
redirect to `AGENTS.md` (the master's `CLAUDE.md` is a full duplicate of the
canon — mirroring it here would break the repo's intentional structure); the
compiler-generated `_ds_bundle.js` / `_ds_manifest.json` are unchanged (no
component source, card metadata, or DC template changed); `references/` and
`uploads/` remain excluded from the public mirror.

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
