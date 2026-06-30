# Fonts

Self-hosted brand typefaces for The Hoffman Agency. Drop-in for any project that pulls in `colors_and_type.css`.

---

## What's in this folder

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

1. **Offline support** — decks and documents render correctly with no internet.
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
