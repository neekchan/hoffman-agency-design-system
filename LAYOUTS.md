# Deck Layout Library — selection & best-practice guide

> **MEDIUM:** This guide governs **slides / office documents** (fixed 1920×1080 canvas), NOT web. On slides, the **slide type scale and "fill the frame" rules in `AGENTS.md` override** DESIGN.md's web type scale, "generous negative space," "sparse imagery," and reading-measure caps. DESIGN.md still owns color, fonts, the italic-word move, the Storyline motif, annotations, and voice (brand-wide). See `AGENTS.md §0` for the full precedence rule.

This is the **brain** behind Hoffman decks. It does two jobs:

1. **Teaches restraint** — how to put the *right minimum* on a slide so the slide prompts the speaker instead of replacing them.
2. **Catalogs the layouts** — a named set of **48 reusable slide layouts** (codes **L01–L51**, grounded in real Hoffman decks), each with *when to use it*, *what the one point is*, *what goes in each slot*, and *which brand surfaces it wears*. The codes are intentionally non-contiguous (gaps + a few `b` suffixes like `L24b`) because layouts were ported in waves; the catalog below groups them by *job*, not by number.

The visual, directly-editable gallery of every layout lives in **`templates/deck/Deck.dc.html`** (48 slides, codes L01–L51) — each slide there carries an inline `<!-- @layout … -->` comment repeating its core guidance, so the rules travel with the markup. Read this file to *choose*; open the deck to *build*.

---

## Part 1 — The rules every slide obeys

> A deck is a **teleprompter for the eyes in the room, not the script in the speaker's hand.** The slide carries the headline; the presenter carries the paragraph.

### The five non-negotiables

1. **One point per slide.** Every slide makes exactly one argument. If you can't say what the single takeaway is in one sentence, the slide is doing two jobs — split it. The point becomes the largest thing on the page.

2. **Minimum on the page; the rest is narrated.** Ask: *what is the least that has to be visible for the speaker to talk to the rest?* Put that. A slide is a set of **prompts and key points**, not a transcript. If a sentence only exists to be read aloud, cut it from the slide — the speaker says it.

3. **Hierarchy is visible, not implied.** A viewer should know in <2 seconds what to read first. One dominant headline (the point), then punchy subheads / props in a clearly smaller, quieter tier. Never two things competing to be the hero.

4. **Earn emotion with one graphic.** The headline states the point; **one** image, annotation, or **Fluent emoji** injects the feeling the words leave unsaid. One. Not a grid of stock icons. **Fluent emoji are a default storytelling device on Hoffman slides, not a garnish** — actively find the emotional/storytelling beat on each slide and place one there via `<fluent-emoji name="…">` (inline next to a charged word, or `size="120"+` as the slide's hero motif; `variant="animated"` for the one emotional peak). A slide making a human point with no graphic is usually *missing its emoji*. See AGENTS.md §8 and the **Brand → Fluent emoji picker** card.

5. **Cut before you add — then scale up to fill the frame.** One thousand no's for every yes: remove a stat, a sentence, a colour, a logo before adding one. But restraint means **few ELEMENTS, not small or floating ones.** Once you've cut to the one idea, *scale what remains until it owns the canvas* — big type, a large image, edge-to-edge. A slide with one idea and a sea of empty white has failed both rules. (Slides ≠ web: ignore DESIGN.md's "generous negative space" here — see AGENTS.md §2, "fill the frame.")

### What "key points as prompts" looks like

| ❌ Data-dump (AI default) | ✅ Narrator-first (Hoffman) |
|---|---|
| A 6-line paragraph explaining the market shift | **"Cross-border isn't a use case — it's a lifestyle."** + 3 two-word props the speaker expands |
| 8 bullets, full sentences each | 3 bullets, ≤6 words each — *triggers*, not sentences |
| Headline + 5 supporting stats | Headline + **the one** stat that proves it; the rest go in the appendix |
| Title: "Q3 Performance Overview" | Title: **"We tripled earned reach. Here's the one that mattered."** |

### Density tiers (pick one per slide)

- **Airy** — cover, section, statement, quote, big-idea. One headline, maybe a line of support. Most slides should be here.
- **Standard** — 2–3 columns, persona, idea detail. A headline + a small, parallel set of supporting blocks.
- **Dense** — matrix, scope table, roster. *Only* when the artefact itself is the point (a plan-on-a-page, a deliverables table). Dense is a deliberate choice, never an accident. Cap at one or two per deck.

### Word budgets (hard caps, not targets)

- Headline: **≤ 8 words**, one line where possible, editorial not descriptive (see "Headline voice" below).
- Eyebrow: **2–4 words**, UPPERCASE.
- Supporting body: **≤ 30 words** total on the slide.
- Bullet / prop: **≤ 6 words**. Max **3** per group.
- Stat: a number + a ≤4-word label. Max **3** across a slide.
- **No micro-text.** Nothing ≤10pt (20px) except a functional eyebrow / mono label. On-slide sources, footnotes, placeholder captions and repeated sub-labels are cut — sources go to speaker notes. Aim for **3–5 large elements** per slide (see `AGENTS.md §9`).

### Headline voice — editorial, not descriptive

The headline is the slide's one job — make it a line with a point of view, not a label.

- **≤ 8 words with an angle** — a question, a two-beat ("Tech. We're it."), the Baskerville-italic emphasis (its key word or short phrase), a strikethrough swap, or a single giant word. Descriptive / summary titles ("Korea: a widening mandate", "Q3 overview") are the AI-default tell — rewrite them.
- One voice move per headline. Land it, don't decorate it. (See `AGENTS.md §10`.)

### Presenter vs Document mode (choose before layouts)

Choose the deck's **mode** first — it sets how much goes on every slide. **Presenter** (presented live) = ≤1 idea, ≤15 words/slide, image-led, the detail in **speaker notes**; **Document** (leave-behind that stands alone) = denser, hierarchical, short bullets allowed, a fuller argument per slide. **XOR — never mix the two in one deck.** Both still fill the frame and use the Hoffman scale/palette; mode changes *depth*, not appearance. Infer the mode from context and state the assumption; ask only if genuinely ambiguous. Full rule: `AGENTS.md §12` (Power Design rule 20); the deck library (`templates/deck/`) carries the **Mode** tweak, and the full worked demonstration is the brand-guidelines deck (`slides/Hoffman Brand Guidelines.html`).

### The Hoffman signatures (use, don't overuse)

- **The italic emphasis** — the line's key word *or* short phrase, set in Baskerville italic inside a Poppins headline. Once per slide, on the emphasis that carries the weight — usually one word, sometimes a phrase; chosen by meaning, never scattered.
- **Stretched letters** (`helllllo 2026`) — cover & section dividers only, never body.
- **Strikethrough swap** (`~~doubling~~ tripling`) — once per *deck*.
- **One annotation** — an underline, circle, arrow, tick or cross from `assets/annotations/`, coloured by contrast. 1–2 marks per surface, counting the highlight.
- **Surface as mood** — lead a section with one dominant brand colour; rotate the colour across sections so consecutive slides never look identical.

---

## Part 2 — Choosing a layout

**Match the layout to the job, then pick a surface that contrasts with the slide before it.** Variety comes from `function × surface × composition` — the same function should never appear twice in the same colour back to back.

Quick router:

| The slide needs to… | Reach for |
|---|---|
| Open the deck | **Cover** (L01) · **Cover, spectrum bar** (L31) |
| Break into a new part | **Section divider** (L02) · **Section, spectrum bar** (L32) |
| Open a section with warmth / a rally cry | **Centered motif opener** (L47) · **Script + acronym opener** (L50) |
| Lay out what's coming | **Agenda** (L03) |
| Land one bold claim | **Statement + support** (L08) · **Big-idea split** (L09) |
| Land one hinge word, loudest moment | **Punchline / giant word** (L45) · **Two-beat statement** (L46) |
| Frame the whole strategy on one page | **Plan-on-a-page matrix** (L10) |
| Show a model as one core + parts | **Orbit / ring** (L34) |
| Show a before → after / mechanism | **Highlight box + arrows** (L35) |
| Compare 2–3 parallel things | **Columns** (L11 / L12 / L13) · **Numbered points** (L37) |
| Make an audience feel real | **Persona profile** (L14) · **Three audiences** (L13) |
| Introduce the team | **Roster** (L15) · **Bio** (L16) |
| Walk through one idea | **Idea detail** (L17) · **Story idea + role + image** (L40) |
| Run two stories beside each other | **Two-story** (L18) · **Ongoing story engagement** (L39) |
| Prove it with numbers | **Stat strip** (L19) · **Cascade stat boxes** (L33) · **Stat grid** (L38) |
| Show survey / KPI data-viz | **Data dashboard** (L41) |
| Show a process or journey | **Timeline** (L20) · **Process diagram** (L21) |
| List capabilities or benefits | **Icon benefit grid** (L22) · **Capability grid** (L23) |
| List 3–5 supported points | **Pill rows** (L36) |
| Lay out a content-rich update | **Photo + numbered lists** (L48) · **Three photo + bullets** (L49) |
| Map pain to solution | **Pain ↔ Solutions** (L24b) |
| Show the SOW / deliverables | **Scope table** (L24) |
| Show reach / footprint | **Map + narrative** (L25) |
| State a partnership / value set | **Values statement** (L26) |
| Let an image carry the slide | **Full-bleed** (L27) · **Split 50/50** (L28) |
| Lay out 4–7 photos as one object | **Bento collage** (L42 / L43 / L44) |
| Quote a client | **Pull quote** (L29) |
| Close & hand off | **Closing** (L30) · **Q&A / hands closer** (L51) |

---

## Part 3 — The layouts

Each entry: **BEST FOR** (when to pick it) · **THE ONE POINT** (what must dominate) · **SLOTS** (what goes where) · **SURFACES** (which brand backgrounds it wears) · **KEEP IT HONEST** (the restraint trap to avoid).

### Covers & dividers

**L01 · Cover**
- BEST FOR: opening any deck.
- THE ONE POINT: the deck's single idea, as a huge headline (stretched-letter treatment welcome).
- SLOTS: eyebrow (client · engagement · date) → giant headline w/ the italic emphasis → one-line subtitle → logo. Optional full-bleed image band or storyline line on navy.
- SURFACES: navy + storyline line (default), or lime with navy type.
- KEEP IT HONEST: no agenda, no body copy. A cover is a title and a feeling.

**L31 · Cover (spectrum bar)**
- BEST FOR: an alternative cover when you want the multicolor edge device instead of the storyline line.
- THE ONE POINT: one idea, huge. The spectrum bar carries the brand energy; the type carries the idea.
- SLOTS: eyebrow pill (client · engagement · year) → title (≤8 words, the italic emphasis, 130px+) → subtitle (≤14 words).
- SURFACES: navy ground; full-height spectrum bar flush left; white+lime logo.
- KEEP IT HONEST: the bar is the only ornament. No body copy.

**L02 · Section divider**
- BEST FOR: entering a numbered part of the deck.
- THE ONE POINT: the section name, set huge; the number is the second voice.
- SLOTS: part number (`01`) → big section title w/ the italic emphasis → optional small graphic. Page chrome.
- SURFACES: rotate the colour per section (lime, purple, teal, lavender, cyan) so each act feels distinct.
- KEEP IT HONEST: one or two words. Never a sentence, never bullets.

**L32 · Section divider (spectrum bar)**
- BEST FOR: entering a numbered part with the edge-bar device instead of a colour flood.
- THE ONE POINT: the section name, huge; the mono number is the second voice.
- SLOTS: number (`01`) → title (1–2 words w/ the italic emphasis).
- SURFACES: navy ground + spectrum bar; or rotate the ground colour per section.
- KEEP IT HONEST: same as L02 — one or two words, never a sentence.

**L03 · Agenda**
- BEST FOR: a short, scannable table of contents.
- THE ONE POINT: the shape of the journey — usually 3–5 numbered items.
- SLOTS: eyebrow → numbered list (number + ≤4-word label) → optional big "AGENDA" wordmark.
- SURFACES: paper with navy type, or a colour block.
- KEEP IT HONEST: titles only, no descriptions. 3–5 items; if more, the deck has too many parts.

### Statements

**L08 · Statement + support**
- BEST FOR: landing one point of view.
- THE ONE POINT: the claim, set 72–96px, the italic emphasis.
- SLOTS: eyebrow → headline → ≤30-word support → optional one annotation.
- SURFACES: paper, navy, or a colour block.
- KEEP IT HONEST: the support extends the headline, never restates it. Resist a second paragraph.

**L09 · Big-idea split** *(signature)*
- BEST FOR: a campaign idea or strategic "what if" that needs a feeling beside it.
- THE ONE POINT: a provocative question or claim headline (left), an emotive image (right).
- SLOTS: eyebrow/audience tag → big headline w/ the italic emphasis → ≤30-word setup → a **role box** (one highlighted line: "Wise's role / our role: …"). Right: full-height image. Bottom: idea name strip.
- SURFACES: paper or sand left panel; the image carries the colour. Role box in lime or a secondary.
- KEEP IT HONEST: the role box is ONE line. The setup paragraph is the only body — don't stack three.

**L45 · Punchline (giant word)** *(signature)*
- BEST FOR: an internal/culture beat or a single hinge word — the deck's loudest moment.
- THE ONE POINT: the one word, set ENORMOUS; the setup is a whisper before the shout.
- SLOTS: setup (≤5 words, small) → hero word (1 word, ~3-letter sweet spot) → optional footnote aside → one Fluent emoji.
- SURFACES: navy or a colour; hero word in lime; emoji bottom-right.
- KEEP IT HONEST: one word is the whole slide. A footnote/emoji can wink — nothing else.

**L46 · Two-beat statement**
- BEST FOR: a setup → turn on one coloured surface — two short phrases that play off each other.
- THE ONE POINT: the pivot between the two lines (often a "not"). Emphasise the hinge word; let the emoji react.
- SLOTS: beat 1 (≤6 words, top-left) → beat 2 (≤6 words, lower-right). Hinge word in white; rest in lime/aqua. 2 emoji max.
- SURFACES: a full secondary surface (purple/teal); type in lime + white + aqua.
- KEEP IT HONEST: two short beats, nothing in between. The hinge word is the point.

**L47 · Centered motif opener**
- BEST FOR: a light section opener or rally cry — one Fluent emoji (or a row) centred above a big headline.
- THE ONE POINT: the emoji sets the mood; the headline lands the line.
- SLOTS: optional setup (≤6 words) → motif (1 Fluent emoji, size 120–200, or a short row) → headline (≤4 words, huge).
- SURFACES: navy or colour; headline in lime; emoji centred.
- KEEP IT HONEST: one emoji or one tight row — never a wall. Headline stays to a few words.

**L50 · Script + acronym opener**
- BEST FOR: a playful section/region opener — a small multicolor cursive word above a huge acronym, expansion below.
- THE ONE POINT: the big acronym IS the slide; the script word adds warmth, the expansion decodes it.
- SLOTS: script word (≤9 letters, middle letters multicolor) → acronym (3–5 letters, huge) → expansion (one word/phrase per letter-group below).
- SURFACES: a full lime (or navy) surface; acronym in navy; script multicolor; expansion in purple.
- KEEP IT HONEST: the script move is the house "stretched" voice — use once. The acronym carries everything.

**L10 · Plan-on-a-page matrix** *(signature, dense)*
- BEST FOR: the strategic spine — audiences × workstreams on one page.
- THE ONE POINT: the strategy line in the banner; the grid proves it's coherent.
- SLOTS: banner strategy line → column headers (audiences) → row labels (workstreams) → terse cells (≤8 words). Full-width "strategy" footer row.
- SURFACES: paper page, lime or navy banner, hairline grid.
- KEEP IT HONEST: cells are labels, not sentences. This is a *reference* artefact — exactly one per deck. The speaker walks it; the slide doesn't explain it.

**L34 · Orbit / ring overview**
- BEST FOR: a product, model or offer made of 6 parts that orbit one core idea.
- THE ONE POINT: the whole at a glance — one centre, six equal parts, each an icon above a label.
- SLOTS: centre (the core mark/word) → 6 items: icon + ≤3-word label, colour-coded.
- SURFACES: paper; items colour-coded across the secondaries.
- KEEP IT HONEST: six parts, equal weight. Labels ≤3 words — the diagram is the point, not the captions.

**L35 · Highlight box + arrows (before → after)**
- BEST FOR: a shift, a mechanism, or a before→after where one box is the turning point.
- THE ONE POINT: the flow reads left-to-right; the highlighted middle box is the idea.
- SLOTS: eyebrow + title → 3 boxes: plain start → HIGHLIGHT (the key concept) → plain end, each icon + ≤4-word title + one line.
- SURFACES: paper; the highlight box takes the accent border + lime tint.
- KEEP IT HONEST: exactly one box is highlighted. Three boxes, one line each — not a flowchart.

### Columns (comparison / parallel structure)

**L11 · Three-column image cards** *(signature)*
- BEST FOR: 2–3 parallel insights, each with a face/photo and a couple of contrast chips.
- THE ONE POINT: the pattern across the columns (stated in the eyebrow/title); each column is one beat.
- SLOTS: title w/ the italic emphasis → 3 columns: image → bold lead (≤6 words) → ≤24-word body → up to 2 chips (e.g. SG / MY).
- SURFACES: paper; chips in two contrasting secondaries.
- KEEP IT HONEST: 3 columns max. Each column says ONE thing. Equal weight — no column is the hero.

**L12 · Three-column textured icon cards** *(signature)*
- BEST FOR: three parallel insights, each with its own painterly icon card and a market-split read (e.g. SG / MY).
- THE ONE POINT: the pattern across the three verticals; each column is one insight, proven with two market bullets.
- SLOTS: title (≤10 words, the italic emphasis) → ≤30-word subtitle → per column: textured icon card → heading (≤7 words) → 2 bullets with a bold market lead-in (≤22 words each).
- SURFACES: paper; cards carry the colour (tex-a / -b / -c); icons navy on white.
- KEEP IT HONEST: three columns, equal weight. Two market bullets per column — not three. The card colour rotates; the insight doesn't compete.

**L13 · Three audiences ("we want them to…")**
- BEST FOR: introducing 2–3 audience segments and the shift you want in each.
- THE ONE POINT: the set of audiences and the *behaviour change* per audience.
- SLOTS: title → 3 columns: segment name → ≤24-word description → a highlighted "we want them to…" card (the desired shift).
- SURFACES: paper or colour block; the "want" card in lime/secondary.
- KEEP IT HONEST: the "want" card is the payload — keep it to one sentence.

**L37 · Numbered points (vertical rules)**
- BEST FOR: 3–4 parallel points with a lighter touch than cards — separated by thin rules.
- THE ONE POINT: the set, read across; the big mono number paces it. One line each.
- SLOTS: eyebrow + title → 3–4 columns: big number + ≤4-word title + one ≤14-word line.
- SURFACES: paper (navy type) or a colour/navy block.
- KEEP IT HONEST: rules, not boxes — keep it light. One line per point.

### People

**L14 · Persona profile** *(signature)*
- BEST FOR: making one audience member real.
- THE ONE POINT: who they are and the one job they need done.
- SLOTS: segment tag → portrait → name, age, location → 2 short context bullets → 1–2 verbatim quote cards → a highlighted "we want her to…" footer.
- SURFACES: paper with a colour accent per persona; portrait 4x5.
- KEEP IT HONEST: two quotes max, in their voice. Bullets are context, not biography.

**L15 · Team roster**
- BEST FOR: showing the whole team at once, grouped by role/market.
- THE ONE POINT: the shape and seniority of the team.
- SLOTS: title → grouped columns (Senior Counsel / Market A / Market B) → small portrait + name + role + ≤6-word remit each.
- SURFACES: paper; group headers in navy.
- KEEP IT HONEST: name + role + one remit line. No bios here — that's L16.

**L16 · Single bio**
- BEST FOR: one senior person who needs a paragraph.
- THE ONE POINT: why this person earns the room's trust.
- SLOTS: "Your team · role" eyebrow → portrait → name + title → 2–3 short paragraphs.
- SURFACES: paper, sand card.
- KEEP IT HONEST: appendix territory. Lead the bio with the most credible fact, not a date.

### Ideas & stories

**L17 · Idea detail**
- BEST FOR: unpacking one campaign idea — the what, the activation, the outputs.
- THE ONE POINT: the idea name + its single mechanic.
- SLOTS: idea title → image → ≤30-word setup → a short "content / engagements" list (≤3 items) → optional brand lockup card.
- SURFACES: paper or colour; one image.
- KEEP IT HONEST: lists are ≤3 items, ≤6 words each. The speaker details each; the slide names them.

**L18 · Two-story side-by-side**
- BEST FOR: two related story angles / pitches that share a frame.
- THE ONE POINT: that there are two distinct angles serving one theme.
- SLOTS: optional vertical section label → 2 story cards each: story title → ≤30-word premise → target media line.
- SURFACES: a colour block with two cards; or paper with two bordered cards.
- KEEP IT HONEST: two stories, equal weight. Don't let one balloon.

**L39 · Ongoing story engagement**
- BEST FOR: two press/story angles for one audience, with the section title and an illustration on the left rail.
- THE ONE POINT: two parallel story pitches, equal weight; each names a story, a premise and its target media.
- SLOTS: segment (1 word UPPERCASE) → section title, huge → per card: "Story" pill + headline (≤10 words) + ≤55-word premise + Targets line.
- SURFACES: lime ground; one white card + one navy card; illustration on the rail.
- KEEP IT HONEST: two cards, equal weight. Each names its target media — don't let one balloon.

**L40 · Story idea + role + image** *(signature)*
- BEST FOR: unpacking one hero story idea — the angle, the brand's role, and a captioned image carrying the name.
- THE ONE POINT: the angle headline + the one-line role; the image names the idea.
- SLOTS: segment (1 word UPPERCASE) → headline (≤12 words, the italic emphasis) → body (≤45 words) → role box (≤30 words) → image caption (the idea name, ≤4 words).
- SURFACES: paper; navy role box; image with a lime caption bar.
- KEEP IT HONEST: the role box is one line of role, not a second paragraph. The caption is the idea's name only.

### Data & process

**L19 · Stat strip**
- BEST FOR: proving outcome with numbers.
- THE ONE POINT: the result. The biggest number is the one that matters most.
- SLOTS: eyebrow → short headline → up to 3 stats (huge number + mono label), divided by hairlines.
- SURFACES: paper or navy; mono labels in a secondary.
- KEEP IT HONEST: max 3 stats. If everything's a number, nothing is. Prefer one hero stat + two context.

**L33 · Cascade stat boxes**
- BEST FOR: proof points or product detail where 3 numbers need to feel like a confident, designed object.
- THE ONE POINT: three results, stacked as one cascading form. Stat top-left, icon bottom-left of each box.
- SLOTS: eyebrow → title (≤8 words, the italic emphasis) → ≤24-word intro → ≤3 bullets (≤6 words) → each box: big number + ≤4-word label.
- SURFACES: paper left; cascade RAINBOW by default (toggle to solid navy via Tweaks).
- KEEP IT HONEST: three boxes, three numbers. The cascade is the design — don't add a fourth.

**L38 · Stat grid (light slide)**
- BEST FOR: a board of figures when several numbers share equal weight — the deck's one light data moment.
- THE ONE POINT: the spread of evidence; the grid reads as a rhythm. One icon + number + label per cell.
- SLOTS: eyebrow + optional title → 6–8 stat cards: outlined icon-circle + big mono number + ≤4-word label, icons colour-coded.
- SURFACES: light ground; white cards; icons across the secondaries.
- KEEP IT HONEST: equal weight across cells — no hero here (that's L19). Labels ≤4 words.

**L41 · Data dashboard**
- BEST FOR: survey / results / KPIs where several figures share one story — donut + horizontal bars + stat callouts.
- THE ONE POINT: the headline finding, big; the breakdown supports it. Charts read at a glance, not studied.
- SLOTS: eyebrow + title → donut (one headline % + label) → bars (3–5 categories, value + ≤3-word label) → callouts (3 figures + ≤4-word label).
- SURFACES: paper; chart segments across the secondaries; navy type.
- KEEP IT HONEST: one headline finding leads; the charts support it. No chart junk, no legend essays.

**L20 · Timeline / measurement arc**
- BEST FOR: a sequence, phases, or a set of measures read left-to-right.
- THE ONE POINT: the progression or the set of dimensions.
- SLOTS: title → the storyline arc (rising squiggle) → 4–6 nodes beneath: icon + label + ≤15-word note.
- SURFACES: paper with the lime/teal squiggle; or navy with the line.
- KEEP IT HONEST: 4–6 nodes. Notes are captions, not paragraphs.

**L21 · Process / journey diagram**
- BEST FOR: a methodology or customer journey with stages around a centre.
- THE ONE POINT: the model's name and its cyclical/holistic shape.
- SLOTS: title + ≤25-word framing → a ring/row of stages (stage name + ≤4-word "voice of customer" line) → central label.
- SURFACES: lime or paper; stages bordered.
- KEEP IT HONEST: name each stage; don't explain it on the slide. The diagram is the point.

**L24 · Scope / deliverables table** *(dense)*
- BEST FOR: the SOW — deliverables × markets with counts/ticks.
- THE ONE POINT: the breadth and cadence of what's committed.
- SLOTS: title → table: deliverable rows (with sub-bullets) × market columns → counts or ticks.
- SURFACES: paper, hairline grid, navy header row.
- KEEP IT HONEST: a true reference table — the one place dense text is correct. Still trim sub-bullets to phrases.

### Capability & about

**L22 · Icon benefit grid**
- BEST FOR: the agency's differentiators — 6–8 reasons-to-believe.
- THE ONE POINT: the *sum* — "here's why us." Each cell is a beat, not an essay.
- SLOTS: grid of 6–8 cards: icon → bold ≤4-word title → ≤18-word line. Rotate 2 surface colours across cards.
- SURFACES: navy with two secondaries; or paper.
- KEEP IT HONEST: titles ≤4 words. The grid reads as a rhythm; long copy kills it.

**L23 · Capability grid**
- BEST FOR: named frameworks / "secret sauces."
- THE ONE POINT: the breadth of proprietary tools.
- SLOTS: title + ≤25-word intro → grid of named capabilities: bold name + ≤12-word descriptor.
- SURFACES: navy or colour block.
- KEEP IT HONEST: the names are the stars; descriptors are one line.

**L36 · Pill rows + icon-circles**
- BEST FOR: a scannable list of 3–5 points where each deserves a line of support.
- THE ONE POINT: the set of moves; each row is one. Outlined icon-circle leads, title + one line.
- SLOTS: eyebrow + title → 3–5 pill rows: icon + ≤5-word title + one ≤16-word line. Highlight one row.
- SURFACES: paper; rows white with a hairline; one row in the accent border.
- KEEP IT HONEST: one line per row. Highlight exactly one row, not all of them.

**L48 · Photo + numbered lists**
- BEST FOR: a content-rich update — a full-height image with the title overlaid, beside 2–3 numbered sections of bullets. The workhorse "here's the plan" slide.
- THE ONE POINT: the themes (numbered) and their proof (bullets). The photo grounds it; the highlight box teases what's next.
- SLOTS: title (overlaid on photo, ≤6 words) → 2–3 numbered sections: heading + ≤3 bullets (≤7 words each) → highlight box (one ≤14-word line).
- SURFACES: paper; photo with a dark overlay + white title; lime highlight box.
- KEEP IT HONEST: a content slide, but still capped — ≤3 bullets per section, ≤7 words each. The photo is half the slide.

**L49 · Three photo + bullets**
- BEST FOR: three parallel programmes/initiatives, each with a photo, an emoji-marked heading, and a short bullet list — the "what we're building" update.
- THE ONE POINT: three efforts, equal weight; the photo makes each real, the bullets give the proof.
- SLOTS: title + optional emoji → 3 columns: photo (4:3) + heading (Fluent emoji ok) + ≤4 bullets (≤8 words each).
- SURFACES: paper; photos in rounded cells; navy headings.
- KEEP IT HONEST: three columns, equal weight. Bullets are triggers — ≤8 words.

**L24b · Pain ↔ Solutions**
- BEST FOR: mapping client pains to your offers.
- THE ONE POINT: that every pain has a matching answer.
- SLOTS: two columns — left: italic pain quotes (≤10 words); right: solution labels/chips. Footer reassurance line.
- SURFACES: navy; pains in light italic, solutions as lime/secondary chips.
- KEEP IT HONEST: pair them 1:1. Keep pains in the client's voice, short.

**L25 · Map + narrative**
- BEST FOR: footprint / network reach.
- THE ONE POINT: "the right network, not the biggest."
- SLOTS: dotted map → office list in regional columns → ≤40-word narrative + a punch line.
- SURFACES: navy with lime dots.
- KEEP IT HONEST: the city list is a texture, not a reading task. The narrative carries the argument.

**L26 · Values statement**
- BEST FOR: partnership principles / ways of working.
- THE ONE POINT: the relationship you're promising.
- SLOTS: stacked title (left) → 3–4 value statements (right), each one line.
- SURFACES: colour block or paper.
- KEEP IT HONEST: 3–4 values, one line each. No nested bullets.

### Image & quote

**L27 · Full-bleed image + overlay**
- BEST FOR: a single emotive beat carried by one photo.
- THE ONE POINT: the headline over the image; the image is the emotion.
- SLOTS: full-bleed image → 60–75% navy overlay → eyebrow + short headline w/ the italic emphasis.
- SURFACES: image + navy overlay; white logo.
- KEEP IT HONEST: one line of type. If it needs a paragraph, it's not a full-bleed.

**L28 · Split 50/50**
- BEST FOR: an idea that needs a claim and an image with equal weight.
- THE ONE POINT: the claim (one half); the image (other half).
- SLOTS: half image → half: eyebrow + headline + ≤30-word body + optional one CTA/line.
- SURFACES: paper/navy type half; image half.
- KEEP IT HONEST: don't fill the type half to the edges — keep the air.

**L29 · Pull quote**
- BEST FOR: a client voice that proves the work.
- THE ONE POINT: the quote; one phrase highlighted.
- SLOTS: eyebrow → Baskerville-italic quote (one highlighted phrase) → attribution (name + role).
- SURFACES: teal/purple/navy block; aqua or lime accents.
- KEEP IT HONEST: one quote, ≤20 words. Highlight one phrase, not the whole line.

**L42 / L43 / L44 · Bento collage (4 / 5 / 7)**
- BEST FOR: laying out 4, 5 or 7 photos/images as one composed object — moments, work, people, places. Pick the variant by image count.
- THE ONE POINT: the set as a single textured collage, not N separate pictures. The largest cell carries the hero image.
- SLOTS: eyebrow + title → image cells (4 / 5 / 7), mixed aspects — fill the biggest first.
- SURFACES: paper or navy; images bled into rounded cells; tight gaps.
- KEEP IT HONEST: mixed cell sizes give the rhythm — one cell leads, the rest support. Don't make every cell equal.

**L30 · Closing**
- BEST FOR: the sign-off / hand to conversation.
- THE ONE POINT: the invitation — a short imperative ("Let's tell your story.").
- SLOTS: big headline w/ the italic emphasis → contact line → logo. Storyline line on navy.
- SURFACES: navy + storyline line, or lime.
- KEEP IT HONEST: a verb + a way to reach you. No recap, no bullets.

**L51 · Q&A / hands closer**
- BEST FOR: the discussion / questions moment near the end.
- THE ONE POINT: an invitation to talk. Almost no text — the emoji carry the energy.
- SLOTS: label (Q&A / Discussion / Over to you) → emoji row (raised hands or faces).
- SURFACES: a full colour surface; label in white + accent; emoji along the base.
- KEEP IT HONEST: one short label and a row of emoji. No agenda recap.

---

## Part 4 — Surface rotation (so decks don't feel flat)

Lead each section with one dominant colour and **change it between sections.** A working rhythm for a 5-part deck:

`Cover navy → Sec 1 lime → Sec 2 purple → Sec 3 teal → Sec 4 lavender → Close navy`

Within a section, keep content slides mostly on **paper** (white/sand cards) so the coloured dividers and the occasional colour-block statement do the punctuating. Lime and cyan are *light* surfaces — navy type only. Navy, purple, teal, lavender are *dark* surfaces — white or light-accent type. Every pair must clear WCAG (see `preview/brand-color-pairings.html`).

**Deck shape (new-relationship decks).** Don't apply "lean / one-point" to the *whole* deck: the **creds/about** section earns a real multi-slide run (breadth is the argument for a first meeting), the **content** section stays lean, and the deck **ends on a dedicated giant-word close** (L45 / L30), never a compressed sign-off. See `AGENTS.md §11`.

---

## Part 5 — Note on the source deck

The layouts here are reverse-engineered from a real Hoffman new-business deck (the WISE pitch). That deck was the **Hoffman house style recoloured to the client's green** — so the *compositions* are pure Hoffman; only the palette differs. This library restores them to Navy + Lime + the four secondary moods. When a client deck needs the client's colours, swap the surface tokens — the layouts hold.

---

## Part 6 — Margins, bleed & the font floor (deck-wide standards)

**Safe area vs. full-bleed (a decision, applied consistently).**
- **Standard slides keep a ~0.5″ safe margin** — the slide's `padding` (**≈72px all round**; the base `.slide` in the deck template sets this). **All text and all non-bleed images stay inside it; nothing eats to the edge.** Page chrome (page number, logo) lives in that margin. (This replaces the old ≈88px side inset — pack the frame tighter.)
- **Full-bleed is the DEFAULT for the image-led layouts** — covers (L01/L31), section dividers with the spectrum bar (L32), Statement (L08), Big-idea split (L09), Persona photo panel (L14), Full-bleed (L27), Split 50/50 (L28), Story-idea image (L40), Photo + numbered lists (L48). These use `padding:0` (or a flush edge device — the spectrum bar) and let an **image** touch one or more edges; the **type half still respects the safe area**. Bento collages (L42–L44) bleed images *into rounded cells* but keep the cell grid inside the safe margin — framed, not edge-bled. Don't inset a hero image by 0.8–0.9″ "to be safe" — bleed it. If a layout isn't on this list, its imagery is framed, not bled.

**Font floor (the slide type scale, enforced as FLOORS — bias to the top).** Per `AGENTS.md §1` (1pt = 2px): eyebrow / label / caption **20–24**; body **30–36** (default 32, never 28); subhead **40–52**; content title / case headline **64–80**; statement & divider title **120–132**; cover / hero **176+ (size-to-fit)**; closing giant word **~240**. Captions, eyebrows, mono labels and chips sit at the **20px** floor and stay small as everything else grows. Don't reintroduce 14–28px "web" body on a slide — it reads as broken at 1920×1080. Placeholder labels run at **22px** on slides (the slots are large), hints at 17px.
