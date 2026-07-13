# Fonts

Self-hosted brand typefaces for The Hoffman Agency. Drop-in for any project that pulls in `colors_and_type.css`.

---

## What's in this folder

This folder self-hosts the two primary brand families. `colors_and_type.css`
also imports JetBrains Mono, M PLUS 2, and Noto Sans from Google Fonts for
utility and multilingual support. If a deck, document, or client handoff must
render fully offline with mono or CJK text, self-host those families too and
replace the `@import` in `colors_and_type.css`.

### Poppins — sans-serif workhorse

Loaded via `@font-face` in `colors_and_type.css`. Full family: 9 weights × 2 styles (upright + italic), shipped as static `.ttf` files from the official Google Fonts distribution.

| Weight | Upright | Italic |
|---|---|---|
| 100 Thin | `Poppins-Thin.ttf` | `Poppins-ThinItalic.ttf` |
| 200 ExtraLight | `Poppins-ExtraLight.ttf` | `Poppins-ExtraLightItalic.ttf` |
| 300 Light | `Poppins-Light.ttf` | `Poppins-LightItalic.ttf` |
| 400 Regular | `Poppins-Regular.ttf` | `Poppins-Italic.ttf` |
| 500 Medium | `Poppins-Medium.ttf` | `Poppins-MediumItalic.ttf` |
| 600 SemiBold | `Poppins-SemiBold.ttf` | `Poppins-SemiBoldItalic.ttf` |
| 700 Bold | `Poppins-Bold.ttf` | `Poppins-BoldItalic.ttf` |
| 800 ExtraBold | `Poppins-ExtraBold.ttf` | `Poppins-ExtraBoldItalic.ttf` |
| 900 Black | `Poppins-Black.ttf` | `Poppins-BlackItalic.ttf` |

### Libre Baskerville — serif (italic only in practice)

Variable fonts (weight axis 400–700). Two files — one upright, one italic — replace the three legacy static TTFs.

| File | Style |
|---|---|
| `LibreBaskerville-VariableFont_wght.ttf` | upright, weight 400–700 (registered for completeness) |
| `LibreBaskerville-Italic-VariableFont_wght.ttf` | italic, weight 400–700 — **the brand italic** |

In practice, Libre Baskerville is used **italic only**, as one-word emphasis inside a Poppins headline (`<em>` in HTML maps to it via `colors_and_type.css`) or for full pull-quotes.

---

## Web / HTML

This is the only case the `@font-face` blocks in `colors_and_type.css` solve on their own. Link `colors_and_type.css`; the browser loads the `.ttf` files from this folder. Poppins is the workhorse for structure + body; `<em>` maps to Libre Baskerville Italic for the one-word emphasis move. Nothing else to do.

---

## PowerPoint & Office — presence is not use

> **Font files merely being present in the design-system folder does not make PowerPoint use them. Before creating or exporting a `.pptx`, the required fonts must be installed, registered in the generation environment, or embedded in the finished file.** CSS `@font-face` only solves the HTML case.

The fix is per-environment:

**PowerPoint on macOS** — install the families first: Font Book → File → Add Fonts → select the Poppins `.ttf` files and both Libre Baskerville variable fonts. Restart PowerPoint. Set the theme fonts to Poppins (see `POWERPOINT.md §2`). macOS PowerPoint does **not** embed fonts on save — a Mac-authored `.pptx` opened on a machine without Poppins falls back to Calibri, so treat embedding as a Windows step or self-host into HTML for portability.

**PowerPoint on Windows** — install via right-click → *Install for all users* (all Poppins weights + both Libre Baskerville variable fonts). Set the theme fonts to Poppins. Then **embed**: File → Options → Save → *Embed fonts in the file* → *Embed all characters* (safest for downstream editing). Verify the saved package actually contains the embedded font parts.

**AI / automated PowerPoint generation** (python-pptx, Apps Script, conversion tools) — the theme fonts and every text run must declare `Poppins` explicitly; setting a bold flag is not the same as `Poppins SemiBold`. Libre Baskerville Italic only on the emphasis word / pull-quote. The generation host must have the fonts available, or the tool must embed them, or it must **disclose** that it cannot preserve them — never silently substitute. Run the preflight + finished-file test below.

**Embedding & handoff** — a `.pptx` handed to a client who may lack the fonts should have fonts embedded (Windows, above) or be delivered as a PDF / flat-image export. Confirm embedding by inspecting the package for the font parts; don't assume. **Never include `references/` in a handoff.**

**Fallback policy** — an approved fallback is for emergency compatibility only. It must be **disclosed**, not silently substituted. If no fallback has been authorised and the tool cannot preserve Poppins + Libre Baskerville Italic, **stop** rather than ship a Calibri deck.

### Font preflight & finished-file test

**Before generating:** confirm Poppins + Libre Baskerville Italic are available to the authoring tool; render a short specimen if unsure; stop if neither preserved nor an approved fallback.

**After export:** inspect the theme fonts; inspect explicit `typeface` declarations in text runs; detect Calibri / Aptos / Arial fallbacks; confirm embedding when portability requires it; open or render the **actual `.pptx`**, not the source HTML. Full checklist in `POWERPOINT.md §9`.

---

## These are also available on Google Fonts

If you don't want to ship the binary font files — for example, in a public-facing web project where CDN caching across the web is preferred — both families are free and hosted on Google Fonts:

- **Poppins:** <https://fonts.google.com/specimen/Poppins>
  - Full set: `https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100..900;1,100..900&display=swap`
- **Libre Baskerville:** <https://fonts.google.com/specimen/Libre+Baskerville>
  - Italic only: `https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap`

To switch to Google Fonts: replace the `@font-face` blocks at the top of `colors_and_type.css` with the corresponding `@import url(...)` line.

---

## Why self-host

We default to local files because:

1. **Offline support (HTML only)** — HTML decks and documents render correctly with no internet. Note: this holds for the *web/HTML* case. A PowerPoint or other Office file only renders offline with the brand fonts if those fonts are **installed on the opening machine or embedded in the file** — self-hosting the `.ttf`s in this folder does nothing for a `.pptx` on its own (see the PowerPoint section above).
2. **Corporate firewalls** — some client/internal networks block `fonts.googleapis.com`.
3. **Single source of truth** — everything brand-related lives in this project, no external dependency.
4. **Editorial consistency** — no risk of the CDN serving a slightly-updated metric.

---

## How to refresh / re-download these files

Both families come straight from Google Fonts' official "Get font" download — unpack the .zip and drop the `.ttf` files into this folder.

- Poppins: <https://fonts.google.com/specimen/Poppins> → "Get font" → "Download all" → use everything in `static/` (all 18 weight × style files).
- Libre Baskerville: <https://fonts.google.com/specimen/Libre+Baskerville> → "Get font" → "Download all" → use the two variable-font files at the top level (`LibreBaskerville-VariableFont_wght.ttf` and `LibreBaskerville-Italic-VariableFont_wght.ttf`); ignore the `static/` folder.

If you ever need smaller payloads, convert the `.ttf` files to subsetted `.woff2` with a tool like `fonttools` (`pyftsubset`) or `glyphhanger` and update the `src:` URLs in `colors_and_type.css` accordingly.

---

## Licensing

Both families are licensed under the **SIL Open Font License 1.1** — free for commercial use, including embedding in client deliverables. Keep the OFL notice with redistributions of the font files themselves.

- Poppins: © Indian Type Foundry, Jonny Pinhorn, Ninad Kale ([OFL](https://github.com/itfoundry/Poppins/blob/master/OFL.txt))
- Libre Baskerville: © Pablo Impallari, Rodrigo Fuenzalida ([OFL](https://github.com/impallari/Libre-Baskerville/blob/master/OFL.txt))
