# PowerPoint route — building a native, editable Hoffman `.pptx`

> **Read this whenever the requested output is `.pptx` / `.potx` / PowerPoint / Keynote-for-Office.** It sits on top of the slide rules (`AGENTS.md §§0–12`, `LAYOUTS.md`) and adds the PowerPoint-native reliability layer the HTML system doesn't cover by itself. The two machine-readable companions to this file are `assets/asset-manifest.json` (logo geometry + protected zones) and `templates/powerpoint/layout-manifest.json` (the 48 layout contracts).

The visual system does not change in PowerPoint. Fonts, palette, the italic-emphasis move, the Storyline motif, "fill the frame," the slide type scale, imagery-by-default — all still apply exactly as in the HTML deck. What changes is that a `.pptx` is made of **fixed objects with no CSS, no grid, and no `@font-face`**, so every relationship the HTML system expresses in layout code has to be placed by hand and then **verified in the finished file**. A screenshot that "looks about right" is not proof: the diagnostic deck looked plausible while its logo geometry, theme fonts and layer order were all wrong.

---

## 1. Pick the path

There are two reliable ways to get a native, editable Hoffman `.pptx`. **Prefer Path A.**

### Path A — export the HTML deck to PPTX (primary, most reliable here)

Build the deck as HTML from `templates/deck/Deck.dc.html` following all slide rules, then export to **editable** PPTX. This is the most reliable native path in this environment because the layout, type scale, palette, logo geometry and image proportions are already correct on the canvas, and the export emits native PowerPoint text boxes, shapes and images.

- Author the deck; decide Presenter XOR Document mode first (`AGENTS.md §12`).
- Export with the "Export as PPTX (editable)" flow. Supply Poppins + Libre Baskerville so the exporter reflows with the real metrics (font swaps / Google-font import), set the slide size to **1920×1080**, and hide deck chrome (nav arrows, progress) before capture.
- Then run the **finished-file validation** in §9 on the exported `.pptx` — the export is not the finish line.

Screenshots-mode export (a PNG per slide) is pixel-perfect but **not editable** and embeds no fonts to preserve; use it only when the client explicitly wants flat images.

### Path B — hand-build the `.pptx` (python-pptx, Apps Script, etc.)

When an agent builds the file object-by-object (the ChatGPT/Codex case), the HTML deck is the **visual and structural reference**, but the implementation source is this file plus the two manifests. Do not rebuild the theme, brand chrome or common layouts from scratch and from memory — read the coordinates, ratios and the theme spec below. If the tool cannot preserve the fonts or the theme, it must **say so** rather than silently approximating.

---

## 2. The native PowerPoint theme (build the theme, don't just paint shapes)

The most common structural failure is a deck that is *painted* to resemble Hoffman (hard-coded hex on individual shapes) while the underlying Office theme stays generic (`ChatGPT` / `Calibri`). Any new text box a user adds then defaults to Calibri, off-palette. **Set the theme itself.**

Theme font scheme — **major and minor Latin both `Poppins`**:

```
<a:majorFont><a:latin typeface="Poppins"/></a:majorFont>
<a:minorFont><a:latin typeface="Poppins"/></a:minorFont>
```

Theme colour scheme (map Office slots → Hoffman tokens):

| Office slot | Hoffman token | Hex |
|---|---|---|
| `dk1` (text 1) | navy | `182D43` |
| `lt1` (bg 1) | white | `FFFFFF` |
| `dk2` (text 2) | navy | `182D43` |
| `lt2` (bg 2) | paper | `FAFAF7` |
| `accent1` | lime | `D2EB00` |
| `accent2` | violet | `CB65FF` |
| `accent3` | purple | `6103B9` |
| `accent4` | aqua / cyan | `86FFF1` |
| `accent5` | teal | `145F7B` |
| `accent6` | lime-600 (AA text on light) | `687600` |
| `hlink` | teal | `145F7B` |
| `folHlink` | purple | `6103B9` |

Slide size: **13.333in × 7.5in** (16:9, = 1920×1080 at 96 dpi). Put logos and recurring page furniture on **slide masters / locked background layers**, not re-placed per slide. Ship example slides that demonstrate correct use, not empty placeholders — including one **mixed-font headline** (Poppins with a single Libre Baskerville Italic word).

If you are producing the binary `.potx`/`.pptx`/`.thmx` outside this environment, the table above plus `assets/asset-manifest.json` and `templates/powerpoint/layout-manifest.json` are the complete spec to build from.

---

## 3. Fonts — presence is not use

**Font files being present in this repository does not make PowerPoint use them.** Before creating or exporting a `.pptx`, the required fonts must be **installed, registered in the generation environment, or embedded in the finished file**. CSS `@font-face` only solves the HTML case. See `fonts/README.md` for the per-platform workflow.

Requirements:

- **Poppins is the default for all PowerPoint text** — set it as the theme major+minor font, and use the correct family/weight (e.g. `Poppins SemiBold`) rather than only a bold flag where the tool allows.
- **Libre Baskerville Italic is used only for the approved emphasis word or pull-quote.** Never upright Libre Baskerville for body or display.
- A fallback is allowed only for emergency compatibility, and it must be **disclosed, never silently substituted**.

**Preflight (before generating):** confirm Poppins and Libre Baskerville Italic are available to the authoring tool; render a short specimen if availability is uncertain; **stop** if the tool cannot preserve the fonts and no fallback has been authorised.

**Finished-file test (after export):** inspect the theme fonts; inspect explicit `typeface` declarations in text runs; detect Calibri / Aptos / Arial or other unintended fallbacks; confirm fonts are embedded when portability requires it; and **open or render the actual `.pptx`**, not just the source HTML.

---

## 4. Logos — geometry is a contract

Every ratio lives in `assets/asset-manifest.json`. Verified intrinsics:

| Asset | Intrinsic | Ratio W:H |
|---|---|---|
| horizontal wordmark | 417.21 × 89.8 | 4.645991 : 1 |
| stacked wordmark | 311.39 × 162.49 | 1.916364 : 1 |
| boxed Storyline mark | 99.72 × 99.72 | 1 : 1 |
| full-frame Storyline line | 1920 × 1080 | 16 : 9 |

**Never set a logo's width and height independently.** Set **one** dimension and derive the other:

```
height = width / ratio          width = height * ratio
horizontal: 330px wide → 330 / 4.645991 = 71.03px tall   (NOT 86px)
```

The diagnostic deck placed the 330px-wide horizontal logo at 86px tall — a 3.837:1 ratio, ~21% too tall. In PowerPoint, enable **Lock aspect ratio**. **Any placed logo whose ratio differs from the manifest by more than 1% fails review.** For page chrome, use one approved size + position per layout family (e.g. 240px wide → 51.66px tall in a corner inside the 72px margin) — don't leave the chrome logo's dimensions to each slide.

**Surface → variant** (from `asset-manifest.json > surfaceToLogo`, never a generic light/dark binary):

- paper / white / sand → **2-colour** logo (`navy-lime`)
- **lime → 1-colour NAVY** logo (`navy`). The 2-colour logo is forbidden on lime — the lime accent disappears. This is the single most-missed rule.
- navy / purple / teal / lavender / dark image overlay → **1-colour pure white** (`white`; `white-lime` allowed on navy if the accent clears contrast)
- aqua / cyan → light surface → **navy** logo

---

## 5. Protected areas

Wordmarks and the **boxed Storyline monogram** are protected page elements. **No text, panel, image, card, chip, bar, diagram, arrow or decoration may enter the asset's bounding box plus its clearspace.** Compute the protected rect as the placed asset grown by its clearspace on all sides, and keep every other element out of it. Lock these on the master where the format allows.

Two Storyline treatments, two different rules:

- **Boxed monogram** on a light/non-navy surface behaves like a **corner lockup → protected**. (The diagnostic agenda deck put a third agenda bar over it — a 54×150px collision. Don't.)
- **Full-frame line** on a dark slide is a **background layer** — it sits above the fill and **behind content, which may overlap it**. It is not a protected zone. **Bookend only:** use it on the cover and closing (≤2 slides per deck), never as a content-slide background — a navy content slide is a plain field with no line.

Protected zones should be visible as guides during layout and hidden in final output.

---

## 6. Layouts are contracts, and arrows must connect

**A layout code is a contract, not a descriptive label.** If a slide is labelled L03, L20, L35, L37 (or any code), preserve that layout's slot roles, hierarchy, element relationships and defining visual behaviour from `templates/powerpoint/layout-manifest.json`. If the content doesn't fit the layout, **choose a different layout** — never invent a new composition under the old code. (The diagnostic deck labelled workflow holding slides L02 (a one-word section divider) and a workflow slide L02 again; it called a three-circle diagram L20 (which wants 4–6 nodes on the arc) and rounded cards L37 (which wants vertical rules). Those are compliance failures the manifest is meant to prevent.)

**Workflow / live-demo slides (source → AI tool → output)** use **L35**: three horizontal nodes, source left, tool highlighted centre, output right, arrows anchored **between node edges**, one consistent geometry reused across every demo/holding slide.

**Connector rules:**

- Every arrow **connects two named elements**, starting at the source boundary and terminating at the target boundary or centreline. It may **not** terminate in open space.
- Use real connectors or grouped arrow components — **not an oversized arrow glyph floating between text boxes**.
- Build arrows in the **same layout pass** as their nodes so endpoints track the visible node/text, not an oversized textbox bounding box (the diagnostic down-arrow landed in the empty right half of a very wide "PowerPoint deck" text box — the visible words weren't under it).
- Reuse one shared workflow component across repeated demo slides.

---

## 7. Images — quality gates

- Preserve the original aspect ratio unless a deliberate crop is specified; **never stretch** an image to fill a frame. Use crop-to-fill or contain-with-space **explicitly**.
- Don't upscale a low-resolution image beyond a sane threshold; inspect the exported deck for pixelation.
- If no suitable approved image exists, use the **Hoffman placeholder** (`AGENTS.md §4`) — never insert a weak, stretched or irrelevant image to avoid a placeholder. Placeholders keep their label, aspect, generation size, art direction and prompt.
- Test: compare each image's source pixel dimensions against its displayed dimensions in the exported deck.

---

## 8. Full-size visual review (every slide)

A contact sheet shows rhythm; it does not prove compliance. **Render every slide from the finished `.pptx` and inspect each at full size** — logos, fonts, alignment, image quality, text wrapping, arrows. Compare representative slides against the layout reference, re-open in PowerPoint when possible, and record pass/fail for every hard check below. "The file opened" and "nothing spilled off-canvas" are not proof the system was followed.

---

## 9. Finished-`.pptx` validation checklist

Run against the **finished file**, not the source used to make it. (These are also in `CHECKLIST.md` under "Finished PowerPoint file".)

**Hard checks — fail the deck:**

1. File opens; slide count is as expected.
2. Slide size is 16:9 (13.333in × 7.5in / 1920×1080).
3. Theme colours match the Hoffman palette (§2).
4. Theme fonts are Poppins (major + minor).
5. No unintended fallback font (Calibri / Aptos / Arial) in any slide text run.
6. Only approved logo files are used.
7. Every logo's aspect ratio is within 1% of the manifest ratio.
8. Logo variant matches the slide surface (lime → navy logo, etc.).
9. No content overlaps a protected logo / boxed-Storyline zone.
10. No element extends unintentionally beyond the slide.
11. No image is stretched (displayed ratio ≈ source ratio).
12. No low-resolution image enlarged beyond tolerance.
13. Every diagram arrow connects to a visible target (not open space, not an oversized textbox edge).
14. No unresolved image placeholder or production note remains (unless intentionally requested).
15. Speaker notes are present when Presenter mode requires them.

**Advisory — warn, review, don't auto-fail:**

- More than 3 distinct type sizes on a slide.
- Presenter-mode visible word count above 15.
- More than ~7 visual groups on a slide.
- Excessive rounded rectangles (square corners are the default).
- A headline with no Libre Baskerville Italic emphasis word.
- A layout code whose structure doesn't match its manifest contract.

> A `validate-pptx` script was scoped but deferred — these checks are run as a manual/agent checklist for now. When automated, it should inspect the OOXML package (theme fonts/colours, `<a:off>/<a:ext>` on logo pictures vs. the manifest ratios, picture source vs. displayed size, connector geometry) and report per-check pass/fail.

---

## 10. Copy-ready rule block (mirrored in `AGENTS.md` / `CLAUDE.md`)

> **Native PowerPoint rule.** When the requested output is `.pptx`, prefer exporting the HTML deck (`templates/deck/Deck.dc.html`) to editable PPTX; when hand-building, use this file + the two manifests as the implementation source. Do not rebuild the theme, brand chrome or common layouts from scratch. Confirm Poppins + Libre Baskerville Italic are available to the creation environment before authoring — font files in this repo is not sufficient — and set the PowerPoint **theme** fonts to Poppins. Use logos only through the asset manifest or master elements: preserve the approved ratio, lock it, choose the variant the background requires, and keep content outside the protected clearspace. Named layouts are contracts — preserve the structure or pick another layout. Every arrow must visibly connect a source and target. If no approved image is available, use the Hoffman placeholder — never stretch or pixelate. Validate and render the finished `.pptx`; do not deliver with fallback fonts, distorted logos, a wrong logo variant, protected-area collisions, stretched images or disconnected arrows.

---

## 11. Confidentiality

`references/` is confidential source material. **Never include it** in any `.pptx`, `.potx`, zip, published URL, PDF or handoff. Read it for context only; exclude it from everything that leaves the project.
