# INTAKE — ask before you build

Run this short intake **before** applying any surface, layout, or rule. It exists because the number-one cause of off-brand output is an agent guessing the brief instead of confirming it, then rebuilding. Infer what you can safely infer from context; ask only what you genuinely can't. Keep it to a handful of questions, restate a one-line brief, then build.

> **Routing:** this is step 0 of the system. `AGENTS.md`, `CLAUDE.md`, and `LLM_ENTRYPOINT.md` all point here first. Do intake → then route by medium → then build from the template.

## When to run it
Any time you're asked to make a branded artifact — a deck, a native PowerPoint, a one-pager, a social tile, a web page, or an app UI. Skip it only for a trivial edit to an existing on-brand file where the brief is already settled.

## The questions
Fold in anything the user already told you — never re-ask what you already know.

1. **What are we making, and where does it live?**
   Deck (1920×1080 HTML) · native PowerPoint (`.pptx`) · one-pager · social tile · web page · app UI. This sets which rule set governs (`AGENTS.md §0`: slides and web are two media with different physics) and which template you start from.

   **If it's a deck, also settle the delivery format — ask, and give the trade-off:**
   - **HTML deck** (the `deck-stage` engine) — interactive and animated (click-to-reveal, hover, transitions, live charts, embedded media), pixel-exact to brand, best presented live on a big screen or sent as a link. *Trade-off: not editable in PowerPoint — a non-technical colleague can't open and tweak it; needs a browser.*
   - **Native PowerPoint (`.pptx`)** — anyone can edit it in PowerPoint / Keynote, easy to co-edit and hand off, fits corporate workflows. *Trade-off: no real interactivity, limited animation, and brand fidelity (fonts, exact layouts) takes more care.*
   - Rule of thumb: **presenting live or sending a link → HTML; someone else will edit it → PPTX.** (PDF is an export of either, for a fixed read-only leave-behind.)
   - **Whichever they pick, it is still a DECK.** An HTML deck is **not a web page** — it uses the slide rules (`AGENTS.md §1` slide type scale, `§2` fill-the-frame), never the web/UI type scale. The moment an "HTML deck" is built with web/UI rules you get 16px body text on a 1920×1080 canvas — the #1 tiny-font failure.

2. **Presenter or Document mode?** (decks)
   Presented live → **Presenter** (sparse, ≤15 words a slide, detail in speaker notes). Read alone / leave-behind → **Document** (denser, each slide self-contained). Infer from signals ("I'll present this" vs "send it over"); ask only when genuinely ambiguous (`AGENTS.md §12`).

3. **Who's the audience, and any tone or language constraint?**
   Internal · client · public; client-safe or the owner's own voice; any market or language (for example Traditional Chinese for a Taiwan audience). **Voice and wording stay the user's call — do not impose a house writing style.**

4. **Colour direction.**
   Default is to move through the full palette by section (`AGENTS.md §7`). Or the user names one dominant mood colour for the whole piece.

5. **Imagery — the question that gets skipped most.** Ask it explicitly:
   - **Generate images** (only offer this if you actually can — run the capability check in `IMAGERY.md`), **the user supplies images**, or **labeled placeholders for now**?
   - If generate: **do you have a few sample images to match, or should I use the Hoffman house illustration style?** (`IMAGERY.md`)

## Then restate the brief and build
Before laying anything out, echo one line back:

> "Building a **[medium]** in **[mode]** for **[audience]**, **[colour direction]**, with **[imagery choice]** — starting from `[template]`."

Let the user correct it, then build. This twenty-second confirmation prevents almost every "that's not what I wanted."

## Non-negotiable, whatever the answers
Intake sets the *brief*; the system sets the *build*. After intake you still: load `colors_and_type.css` + `_ds_bundle.js`, start from the medium's template, pick named layouts from `LAYOUTS.md`, and **never hand-author bespoke slide chrome.** If the adherence linter says the bundle isn't loaded, stop and fix it before continuing.
