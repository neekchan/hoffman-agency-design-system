# Changelog

Everything that's changed in the Hoffman design system, newest first. The system
really lives in the Claude Design project
(`d10f7f7f-3158-4438-9664-46d071bea8ff`) — this repo is the public copy of it.

## 2026-09-17 — The deck that says "photography encouraged" was borrowing its photography (v2.10.3 → v2.11.0)

The brand guidelines spend a whole section arguing that we are **not** a
no-photography brand — candid, natural, human first, real rooms and real people.
Then the imagery pages showed **four hotlinked Unsplash photos** and **six empty
grey placeholder boxes.**

Three things wrong with that, in rising order of embarrassment:

1. **It wasn't ours.** Stock photos of strangers, illustrating a rule about
   showing real work.
2. **It needed wifi.** Hotlinked images load from someone else's server. Present
   from a hotel conference room, export to PDF on a plane, open the file in two
   years after Unsplash reorganises its CDN — grey boxes.
3. **The crops were bad.** `object-fit` was doing whatever it liked, so a couple
   of them cut heads off. That was the actual thing that got noticed.

**So the deck now carries its own photographs.** Twelve of them, in
`assets/photography/`, generated from the **photography seed prompt already
written in `PROMPTS.md`** — used verbatim, not improvised, which is the entire
point of having the seed written down. Candid documentary, natural window light,
warm grade, eye level, no stock-photo posing. Team conversation, spokesperson
portrait, office environment, product in context, the glass wall at dusk,
presenting to a room, a portrait by a window, a notebook close-up, a laugh in the
kitchen, a video call, the office at dusk, an open-plan discussion.

- **All four Unsplash hotlinks are gone**, replaced with local files. The deck is
  now genuinely offline-safe: zero external image requests.
- **Six placeholder slots are filled** — the full-bleed, the split, the portrait
  and the three-up montage. Their placeholder chrome (the little icon, the
  caption stub, the prompt hint) is stripped out with them, because a filled slot
  that still shows its own instructions looks like a mistake.
- **One placeholder is deliberately left in.** Slide 46 is the page that *teaches*
  what a placeholder is and how to fill it. Filling it would have deleted the
  lesson.
- **2.7MB for twelve**, averaging 232KB — optimised, so the deck stays a file you
  can email.

### And a page for the illustration half, with the prompt on it

Photography shows real people and places. **Illustration carries the concept** —
the tension, the choice, the why-now — and the deck had no page explaining the
one we actually use. So there's a new slide, **45b**, and it does three things:

- Names the look: flat vector, paper-grain texture, small warm palette, figures
  with dot eyes and an angular nose in profile, one clear metaphor, lots of air.
- Credits where it comes from: **storytelling.hoffman.com**, our own editorial
  illustration. Not a style we invented for a slide.
- **Prints the master prompt in full, on the slide.** Not a link to it, not "see
  the docs" — the actual paragraph, in mono, in a navy block, so anyone can read
  it off the screen or copy it out of the file and paste it into whatever image
  AI they have open. Add one subject line to the end and you get something that
  matches. Twelve worked examples live in `assets/house-style/` for anyone who
  wants to see it land before they try.

The deck is **59 slides**, in both the presenting build and the print build.

### Three counts that had gone stale

Caught while updating the asset tree. v2.10.0 added the media-and-press emoji and
never went back to update the tallies, so the docs said **67** where the folders
hold **75** — `AGENTS.md`'s vendored line (twice) and `assets/emoji/3d/README.md`.
`README.md` also still described `house-style/` as **3 reference samples** when it
has held **12 worked examples** since v2.10.0. All corrected. The two *historical*
mentions of 67 in `AGENTS.md` — "it was 67 for two months" and "43 of the original
67 were silently stills" — are statements about the past and are still true, so
they stay.

Minor — a new asset family, a new page, and a brand book that now practises what
it preaches.

## 2026-09-17 — The playground's contrast lab was arguing with its own maths (v2.10.2 → v2.10.3)

The contrast lab read **white on navy, 13.43:1, PASS** while rendering **black
text on no background.** A demo whose whole job is proving a rule, disproving
itself.

**The cause is one line in the template engine.** `compileAttr()` has two paths.
If an attribute is *exactly* `{{ x }}` it returns the raw value — so a style
**object** arrives as an object and is applied properly. If the attribute mixes a
binding with static CSS, it falls through to `.join("")`, and an object
stringifies to **`"[object Object]"`**:

```html
style="{{ cSample }} display:flex; …"   →   "[object Object] display:flex; …"
```

That is not valid CSS, so the browser discards the lot. It explains all three
symptoms at once — no background, no colour, and a panel that never became a
flexbox.

- **Four elements were written that way**, and all four are now the binding
  alone, with their static CSS merged into the bound object: the contrast
  specimen, the type-scale rows, the whitespace pad and the copy button. The
  other **74** style bindings were already whole-attribute and were never
  affected — the blast radius was 4, not 78.
- **Worth knowing for anything built on this engine:** a style **object** must be
  the entire attribute. Mix it with static CSS and it silently stringifies. It
  fails quietly, and it only fails outside Claude Design, where the template is
  compiled ahead of time rather than hydrated live.

**Also brought two screens up to date.** The tour predates several releases and
had simply never been told:

- **The ship-it checklist gained the title rule** — *"Titles state the point, not
  the topic (Soundcheck)"*, first in the list, which is where it belongs.
  `CHECKLIST.md` has gated this since v2.8.1; the playground never did.
- **The emoji screen now says 3D is the default form**, and that a functional
  symbol comes from the 1,595-icon set rather than an emoji.

**Known and not fixed:** four `src="{{ … }}"` bindings fire a request for the
literal placeholder before hydration — four 404s per load. The images recover, so
this is wasted requests rather than broken output. Fixing it needs an engine
change, not a template one.

Patch — one real bug with a wide lesson, and two screens caught up.

## 2026-09-17 — Every preview card was unscrollable on the published site (v2.10.1 → v2.10.2)

The Fluent emoji gallery could not be scrolled. Its content is 4,550px tall in a
1,066px window, and `html` and `body` both carried `overflow: hidden`.

Not the gallery's bug — **`preview/_card.css`**, which all **28 preview cards**
share. It sets `width: 700px` and `overflow: hidden` on `html, body`, and that is
right for the Design System pane, where a card renders inside a fixed-size frame
and is meant to be a cropped thumbnail.

It stopped being right in **v2.8.7**, when GitHub Pages went live and every one of
those cards also became a standalone page. In a real browser tab those two rules
mean: you cannot scroll, and the page is pinned to 700px however wide your screen
is. Self-inflicted, and it applied to all 28 — the gallery is just the tallest, so
it is where it showed.

- **`overflow: hidden` → `overflow-x: hidden`.** Vertical scrolling now works
  everywhere. Horizontal clipping, which is what the rule was actually for, is
  kept.
- **The 700px width now only applies below 760px.** Opened in a tab, a card uses
  the real viewport; inside the pane the frame is the card's own declared
  viewport, so a card that declares a wider one (the gallery is 980, the
  illustration library 1100) finally fills it instead of being pinned narrow.

Patch — one shared stylesheet, 28 cards fixed.

## 2026-09-17 — The site has a front door again, and it opens links in new tabs (v2.10.0 → v2.10.1)

**Two problems, one fix.**

### The Pages homepage was a 404 — and v2.8.7 caused it

Adding `.nojekyll` stopped Jekyll from silently dropping `_card.css`. It also
stopped Jekyll rendering `README.md` into the site root, which is the only reason
that root ever worked. So since v2.8.7 the homepage of the published site has
been GitHub's **"Page not found"**. Every deep link kept working, which is
exactly why nobody noticed.

### And `target="_blank"` cannot work in a GitHub README

Asked to make the README's links open in new tabs. It is not possible, and worth
recording so nobody tries again. GitHub's HTML sanitiser strips it. Sent through
their own markdown API:

```html
<!-- in  -->  <a href="https://example.com" target="_blank" rel="noopener">test</a>
<!-- out -->  <a href="https://example.com" rel="nofollow">test</a>
```

`target` and `rel` are both removed and replaced with `rel="nofollow"`. No
markdown or HTML syntax gets around it, on any README, for anyone.

**So: `index.html`.** A real landing page at the site root, which fixes the 404
and is a page we control — so every one of its **31 links opens in a new tab**,
which is what was actually wanted. It carries the same index as the README
(start here · checking a decision · tokens · components), is built from the
system's own tokens and fonts rather than describing them, and every link was
verified against a real file before shipping.

**[neekchan.github.io/hoffman-agency-design-system](https://neekchan.github.io/hoffman-agency-design-system/)**

Patch — a missing page restored and a platform limit documented.

## 2026-09-17 — A press vocabulary, an illustration library, and a rule that was stated too hard (v2.9.0 → v2.10.0)

### The emoji set had no press in it

Asked why the curated set was 67, the honest answer turned out to be: **because
that is how many entries someone typed into the registry.** No criterion was
recorded anywhere — not in a doc, not in the manifest, not in the commit. The
number got quoted back for two months as though it meant something.

Worse, checking what it covered: **no newspaper, no microphone, no camera, no
television, no satellite.** A communications agency whose emoji set could draw a
wrench but not a press interview.

- **Eight added:** newspaper, rolled-up newspaper, studio microphone, television,
  movie camera, camera, satellite antenna, speaking head. Both 3D and 2D colour,
  same MIT source and pinned commit. 372 KB.
- **The criterion is now written down** in Section 8, next to the vendoring
  principle: the vocabulary an agency deck needs, in four groups — **the work**,
  **the outcome**, **the people**, and **the medium we work in**. That last group
  is the one that was missing. Add against the groups, not by taste. **The count
  is a consequence of the criterion, never a target.**
- **Five miscategorised entries fixed.** Brain and Eyes were filed under "Hand
  gestures", Speech and Thought balloon under "Smilies", Seedling under
  "Animals". The gallery groups by category, so those were visibly wrong.

### The illustration style had a prompt but no evidence

`IMAGERY.md` already documented the house style properly and carried a reusable
prompt prefix. What it lacked was anything to look at — three legacy samples and
no worked examples.

- **`assets/house-style/examples/` — twelve illustrations, each with the exact
  subject line that made it**, generated *with the documented prefix* so the
  library doubles as proof the prompt works. Concepts an agency deck actually
  reaches for: the myth, the audience, finding the story, the proof, the choice,
  signal in the noise, complexity into clarity, partnership, the obstacle, reach,
  time, the detail that matters.
- **[A live library card](https://neekchan.github.io/hoffman-agency-design-system/preview/brand-illustration-library.html)**
  with the prefix at the top and a **copy-the-full-prompt button** on every
  example — paste straight into any image AI.
- **`prompts.json`** alongside, so the set is machine-readable too.
- **The source is credited at last:** the look is Hoffman's own editorial
  illustration from [storytelling.hoffman.com](https://storytelling.hoffman.com)
  and *The Great Myth of Storytelling in Business Communications*.

Two of the twelve — the fork and the noise field — came out more painterly than
the flat-vector house look. Kept, because a reference library that only shows
perfect hits teaches nothing about the edge of the style.

### And a rule that was stated too hard

"Business-casual (**no** suits-and-ties)" read as a ban across `README.md`,
`PROMPTS.md` and the guidelines deck's DON'T list. It was never meant as one.
Business-casual is the **lean, because we work in tech** — a suit is fine when
the subject or the sector calls for one, and illustration is looser still since
those are caricatures rather than photographs of real people. Corrected in all
five places.

Minor bump — new assets and clarified rules; nothing invalidated.

## 2026-09-17 — Titles stop wrapping into empty space, and the default emoji style finally exists locally (v2.8.9 → v2.9.0)

**Two things, both cases of the system contradicting itself.**

### Titles wrapped while half the slide sat empty

"Six ways to *break* the brand." broke after "the" and dropped "brand." onto its
own line, with roughly 730px of slide doing nothing to its right. Not a copy
problem — a `max-width:20ch` cap on the heading. Measured: the line needs 1102px
and was capped at 1043px. **It wrapped 59px short.**

That cap is one of 146 across the system, set in `ch` between 9 and 26, clearly
eyeballed per slide. Measuring every one of them: **19 wrapped, and 11 of those
missed by 15% or less** — one by 16px. Those are accidents, not design.

- **`text-wrap: balance` on every heading**, in both brand-book builds and the
  deck template. Where a title genuinely needs two lines, the break now lands
  evenly instead of orphaning one word. This is the part that keeps working when
  the copy changes.
- **The marginal caps raised to what their own text needs.** Titles that were
  deliberately multi-line — the voice list, the Storyline explainer — are left
  wrapping, because that is a design choice rather than an accident.
- **The deck template's caps had a floor put under them.** They ran as tight as
  9ch, which cannot hold the ≤8-word title Section 5 asks for; 24 of them are now
  at least 20ch. This is why new decks inherited the problem. Raising a
  `max-width` is safe — it can never push a title past its own container.
- **`AGENTS.md` Section 2.5** now says it outright: a `ch` cap is a reading
  *measure*, never a line-break control. If a title wraps while the right of the
  slide is empty, the cap is wrong, not the copy.

### The default emoji style wasn't in the building

Section 8 has said **"3D style first"** since v2.6.0. This repo vendored 2D
colour and animated — and **no 3D at all**. So the documented default was
CDN-only, and every offline deliverable silently fell back to 2D colour without
anyone being told.

- **`assets/emoji/3d/` — the curated 67, 2.2 MB**, from `microsoft/fluentui-emoji`
  (MIT, © Microsoft), pinned to the same commit the injector already uses for
  every other static style. Base skin tone only. The injector needed no changes;
  it was already looking in that folder.
- **Attribution in `assets/emoji/3d/README.md`** and provenance recorded in
  `animated-manifest.json`, alongside the other asset families.

### And the rule that should have prevented both

> **Vendor what an offline deliverable needs at the documented default.
> Everything else stays upstream with a documented fetch path.**

Written into Section 8. An offline deliverable cannot reach a CDN, so what it
needs must already be in `assets/`. Anything a browser renders can come from the
CDN. That test is why 3D belongs here (2 MB) and the full animated library does
not (746 emoji, 550 MB–1 GB, which would make this repo 25–45× bigger for
everyone who clones it). **Animated GIFs do work in PowerPoint** — an offline
deck can absolutely use motion; fetch the one you need and embed it.

Minor bump — a new asset family and a new rule; nothing existing is invalidated.

## 2026-09-17 — Brand Mark Studio: five fixes, including letters that turned invisible (v2.8.8 → v2.8.9)

- **Letters can no longer vanish into the background.** Pick a lime background
  and the rotation would cheerfully cycle a letter to lime, on lime. The palette
  is now built *against* the chosen background: any colour too close to it is
  dropped from both the gradient and the letter-by-letter mode, and the gradient
  re-closes its loop around what's left. Paper drops two — itself and navy-100,
  which is near-white and was almost as bad.
- **CJK typefaces.** M PLUS 2 (the brand's Japanese face), plus Noto Sans JP, TC,
  SC and KR. They already load from the shared stylesheet; the Studio just never
  offered them. Italic is disabled for those faces rather than fake-slanted,
  because none of them have a true italic.
- **Libre Baskerville now selects italic and un-bolds itself.** That is how the
  brand actually uses it — italic only, never upright as display. Both toggles
  still work; it just starts where you were going to put it anyway.
- **The custom-colour control stopped pretending to be a swatch.** It was an
  eleventh square in the row, indistinguishable from a preset, so nobody knew it
  opened a picker. It is now its own labelled control — a dashed chip reading
  **+ Custom colour** with the current hex beside it — and it lights up when it
  is the active background.
- **Two background swatches were misnamed.** `#182D43` was labelled "Navy 700"
  when it *is* the brand navy (`--tha-navy` and `--tha-navy-700` are the same
  hex), and `#0E1C2B` was "Navy hero" when it is navy-900, the ink. Both are real
  palette colours; only the labels were wrong.

Patch. Fixes to one tool; no rules, tokens or templates changed.

## 2026-09-17 — An index of everything you can open, and the brand tour actually works offline (v2.8.7 → v2.8.8)

**The README now has a front-page index of every live page**, ordered by how
often you'd want it rather than by folder. Start here (the guidelines deck, the
interactive tour, the Brand Mark Studio) · checking a decision (colour pairings,
contrast matrix, surfaces, emoji gallery) · tokens · components and brand assets.
Each row says what the thing is *for*, not just what it's called. Thirty-one
links, every one verified against a real file.

**And `Hoffman Brand Tour.html` is finally a real standalone.** The old one had
been broken in public since July — a pre-v2.2.0 export whose colours resolved to
nothing, whose fonts fell back to serif, and which logged a wall of errors. The
v2.2.0 fix never reached it because the rebuilt file was too big for the sync API
and nobody re-exported it by hand.

Rebuilt from the source template, which was healthy all along:

- **7 fonts subset and inlined as base64 woff2.** Subsetting is what makes this
  possible at all — Poppins Regular goes from 160 KB to 8 KB, a 95% cut, with no
  visible loss.
- **30 logos and marks inlined as data URIs**, plus a `window.__resources` map
  carrying all **76 annotations and 10 logo colourways** that the tour looks up
  at runtime.
- **Both scripts inlined.** No bundler wrapper, so there is no JSON-unpacking step
  left to fail — which is exactly how the old one died.
- **Verified from an isolated directory** with no `assets/` and no `fonts/`
  alongside it: renders correctly, real Poppins, real palette. Nothing relative
  can resolve there, so it is genuinely self-contained.

1.2 MB, which is the honest price of one file that needs no network. It is
**larger than the 256 KB sync limit, so it lives in this repo only** — that
constraint is what broke the file in the first place, and it is better named than
worked around.

Patch. A README index, and a broken artifact replaced with a working one.

## 2026-09-17 — The preview cards are now live pages, not source files (v2.8.6 → v2.8.7)

The Brand Mark Studio link went to GitHub's source view, which is a wall of HTML
and not a tool. Fixed properly: **GitHub Pages is on**, so every static surface in
this repo now has a real URL.

- **[The Brand Mark Studio](https://neekchan.github.io/hoffman-agency-design-system/preview/brand-mark-studio.html)**
  opens and runs. Exports work natively, because a real browser allows the save
  dialog that a sandboxed embed does not. This is the third attempt at making
  that export reliable (see v2.4.0–v2.4.3) and the first one that didn't have to
  fight a host for it.
- **All 28 preview cards** — the contrast matrix, the colour pairings, the emoji
  gallery, every token card — plus the brand guidelines deck, are live at the
  same base URL.
- **`.nojekyll` added**, and it matters. Pages runs Jekyll by default, and Jekyll
  silently drops anything whose name starts with an underscore. That would have
  taken out `preview/_card.css` — which every preview card loads — and
  `_ds_bundle.js`, the compiled components. The cards would have rendered
  unstyled with no error anywhere.

**Considered and rejected: publishing the Studio as a Claude artifact.** That
sandbox blocks page-initiated downloads, including blob URLs, so all three export
buttons would render, look clickable, and do nothing. Artifacts are also private
by default, so a public README couldn't link one. The v2.4.x series is the record
of fighting that exact sandbox; no reason to re-enter it.

Patch. Hosting and links; no rules, assets or templates changed.

## 2026-09-17 — Brand Mark Studio gets a front door, and a housekeeping sweep (v2.8.5 → v2.8.6)

**The Brand Mark Studio has a section on the README now.** It was mentioned in a
routing table and a line of the file tree, which is not the same as being
findable. It types any word into the animated brand hello and exports it as APNG,
GIF (the PowerPoint-safe one) or MP4/WebM, all encoded in your own browser. The
section says what each format is for and how to open it — GitHub renders the
source, not the tool, so you download the repo and open the file.

**Then a lint pass over the whole system.** Most of it came back clean: every
internal link resolves, every relative asset path resolves, and the counts for
icons, annotations, emoji, fonts, logos and deck slides all match the filesystem.
What didn't:

- **Two dead `npm run` references.** v2.3.2 deleted the Node scripts and its own
  entry claims it removed "every dangling `npm run` reference in the docs." It
  missed two — one in `README.md` and one in `AGENTS.md`. Both now point at the
  compiler, which is what actually does the validating.
- **`SKILL.md` still had yesterday's misleading emoji line.** v2.8.5 corrected
  the "24 of 67" framing in three places and missed the fourth.
- **The checklist never gated the AAA rule.** v2.7.2 raised display type to AAA
  (ratio ≥ 7) and threaded it into `AGENTS.md` Section 7 — but `CHECKLIST.md`,
  the file whose entire job is stopping things shipping, still only tested AA. A
  rule nothing checks is a suggestion.
- **One wrong number.** Section 14 said `Deck.dc.html` labels "all 48 slides." It
  has 50 — 48 layout codes, with L01 Cover appearing three times as variants.

Patch. Corrections and one new README section; no rules changed.

## 2026-09-17 — The animated emoji library is huge; we were describing our own cupboard (v2.8.4 → v2.8.5)

"Only 24 of the 67 curated emoji actually animate." True, and badly misleading —
it reads as though almost nothing animates. What it actually described was *our
local cache*, not the library.

Microsoft animates **746 emoji** in `microsoft/fluentui-emoji-animated`. This
repo carries 24 of them, vendored for offline work. Those are wildly different
numbers doing wildly different jobs, and the rule was quoting the small one as if
it were the ceiling. Anyone reading it would reasonably conclude the animated set
was a lost cause and stop looking.

- **The rule now leads with the library, not the cupboard.** If the emoji you
  want isn't in `assets/emoji/animated/`, that is a gap in our cache, not proof
  it doesn't move — go and fetch it from upstream. The manifest still does its
  real job: telling you which *local* files genuinely animate, after 43 silent
  stills were removed in v2.7.0.
- **Softened the list of "does not move" emoji** to say those are stills *in the
  local set*, and to check upstream before concluding any given emoji has no
  animated version.
- Corrected in `AGENTS.md`, `README.md`, and both brand-book builds.

**Also: icons are now stated as the default, not just the option.**
`assets/icons/` — 1,595 Fluent **Flat** SVGs from `microsoft/fluentui-emoji`,
localised — is what you reach for whenever a design needs an icon or a functional
symbol, unless the brief names a different set. The rule existed; it just read as
a suggestion rather than the default it is.

Patch. Corrections to how two existing rules are stated; nothing new, nothing
invalidated.

## 2026-09-17 — Credits, and the brand book stops teaching a rule we reversed in July (v2.8.3 → v2.8.4)

**The demo surfaces had drifted, and badly.** The brand book — the 58-slide thing
you hand someone to explain this system — was still teaching *"static colour is
the default form"* for emoji. We reversed that in v2.6.0. In July. So for two
months the document explaining the system has been confidently contradicting it,
to an audience with no way of knowing. The interactive tour had the same bug in
its code, falling back to 2D colour where canon says 3D.

- **Brand book, slide 39.** 3D is the default form, 2D colour the fallback, Flat
  for functional icons and never for the storytelling beat. Plus the caveat that
  only 24 of the 67 curated emoji genuinely animate — check the manifest before
  you promise anyone motion.
- **Brand book, slide 33.** Titles state the point (Soundcheck), added to the
  type rules where it belongs.
- **Interactive tour.** The emoji cast falls back to 3D now, not 2D colour.
- **Both closing surfaces** carry a colophon.

**Credits.** The system has an author and now says so: a small line at the foot
of each document, the standard `author` field in `package.json`, and a header
comment on the token file. Where a file came out of Takeo Apitzsch's fork, it
says that too — his work, his name on it.

**Known, and not fixed here.** The standalone `Hoffman Brand Tour.html` in this
repo is a pre-v2.2.0 export. Its colours resolve to nothing, its fonts fall back
to serif, and it logs a wall of bundle errors — the exact bug v2.2.0 fixed in the
source template. The fix never reached the export, because the rebuilt file was
too large for the sync API's 256 KB limit and nobody ever re-exported it by hand.
The source template is correct and always was. **Re-export from Claude Design to
fix the standalone** — a hand-patch cannot do it.

Patch. Credits and corrections to demo surfaces; no rules changed, no new surface.

## 2026-09-17 — Got rid of the § symbol (v2.8.2 → v2.8.3)

`§` is the section sign. It comes out of medieval manuscripts and it lives today
in statutes, contracts and academic citation — German law is absolutely covered in
it. It is not a software convention and never has been. Nobody writing code types
`§16`; they write "section 16", or they just link to the thing.

Which meant this design system — read by designers, account people, and whoever
needs to build a deck by Thursday — was punctuated like a tenancy agreement.

So all 146 of them, across 25 files, are now "Section 10" and "Sections 1–12".
The numbers stay, because the numbers are the useful part: they're stable anchors
that survive a section being retitled, and anyone (or anything) can jump straight
to one. It was only ever the glyph doing nobody any favours.

Patch. Notation only — every reference still points at exactly the section it
pointed at before.

## 2026-09-17 — Rewrote this whole changelog in English (v2.8.1 → v2.8.2)

The old one was technically perfect and unreadable. Every fact in place, every
version accounted for, and sentences like *"the missing layer was the argument
underneath the design"* — which sounds profound right up until you ask what it
actually means.

It also assumed you'd already read the code. "Out-of-flow elements." "The `acTL`
chunk." All fine if you wrote the thing. Useless if you're a designer trying to
work out whether last week's update breaks your deck.

So all 23 of our own entries are rewritten. Same facts, same versions, same
decisions, same level of detail — just in words a person would say out loud.

Takeo Apitzsch's fork entry is left exactly as it was. It's his writing about his
own work, and putting it in someone else's voice would be a strange thing to do.

Patch. Only the words changed.

## 2026-09-14 — Turns out "default" means you have to wire it up everywhere (v2.8.0 → v2.8.1)

Shipped Soundcheck in the morning. By the afternoon it was the default for
exactly two kinds of work and nothing else.

Here's what "published but not actually the default" looked like. A one-pager
never loaded it. The pre-ship checklist said "Slides only." Section 10 said
"presentation," so documents were arguably out. And `LAYOUTS.md` — the file the
deck route sends you to *by name* — was still teaching the rule Soundcheck had
just replaced, only more firmly.

So the method sat in the repo being ignored by three of the four doors into it.
Now:

- **Section 10 says it outright.** Soundcheck is how titles get written here. Decks,
  one-pagers, print leave-behinds, anything else that lives on a fixed page.
- **One-pagers route through it**, with their own rule attached: headings state
  the point, not the topic.
- **The checklist covers decks *and* documents**, not slides only.
- **`LAYOUTS.md` stops arguing with Section 10.** Its old "editorial, not descriptive"
  block now teaches what Section 10 teaches. The worse conflict was the quieter one: it
  filed the headline under "hard caps, not targets" while Section 10 had just made ≤8
  words a budget you're allowed to negotiate with. The headline is a budget now.
  Eyebrow, body, bullet and stat are still hard caps, which they always were.

Patch. Nothing new — just the wiring that should have gone in the first time.

## 2026-09-14 — The system finally has an opinion about what a title is *for* (v2.7.2 → v2.8.0)

Until today this system could tell you your headline was too long, in the wrong
font and missing its italic — then wave through a deck where every slide was
called "Q3 Overview."

That's because Section 10 only ever described the moves. Ask a question. Do a two-beat.
Italicise the good word. Nobody wrote down the bit where the title is supposed to
*say something*. So you could follow every rule in here and still ship a deck
with the strategic clarity of a horoscope.

**New: `SOUNDCHECK.md`** — seven principles for the argument underneath the deck,
not just the words sitting on top of it. The one rule: don't use the title to
describe what's on the slide, use it to state the point the slide is making.

- **Work in two passes.** Sort out who's in the room and what the argument is,
  draft the titles as a run, *then* pretty them up. Polishing sentences cannot
  fix a wrong argument. You will find this out on a Sunday.
- **Evidence can come from your own material, from research, or from what the AI
  already knows.** Check anything uncertain, recent, or that someone might quote
  back at you in a meeting.
- **≤8 words is a layout budget, not a gag order.** If the true title doesn't fit
  the box, say so and offer a shorter line or a different layout. Don't quietly
  amputate the point to make it fit.
- **"One point per slide" counts ideas, not clauses.** "And" was never the test.

Written brand-neutral on purpose — no Hoffman examples, no house references — so
it travels to whoever needs it.

Minor bump. Nothing you've already built is suddenly wrong: every voice move Section 10
taught is still fine, it just can't do the whole job on its own any more.

## 2026-09-02 — Built the cards the rules kept pointing at, and one rule didn't survive it (v2.7.1 → v2.7.2)

v2.7.0 added three rules that each said "check this against the card" — and then
didn't ship the card. Building them was meant to be housekeeping. One of them
turned around and proved its own rule wrong.

- **The colour-pairing card gets a top tier: Display (AAA, ratio 7+).** Section 7 said
  passing contrast is the floor, while this card was still marking teal on cyan
  as simply fine. It now shows the real numbers and — the good part — applies its
  own rule to itself when picking an emphasis colour. On cyan it now picks purple
  (7.92) where it used to pick teal (5.96).
- **Section 7 was giving bad advice.** It told you to choose the pair with the widest
  luminance gap. That number separates nothing: teal-on-cyan and purple-on-cyan
  sit at 0.73 and 0.77, which is to say identical, and one of them reads like a
  rumour when projected. Their contrast *ratios* are 5.96 and 7.92. So the rule
  is now AAA for display type — an actual standard rather than a number we made up.
- **Two new cards.** Chips (ghost vs solid, each shown on a background it's
  genuinely for, with the caveat that the white fill separates from lime by hue
  alone). And tappable cards — hover one and watch, with the banned version
  sitting right next to it so you can see exactly what it did wrong.

Patch. New cards, one corrected threshold, nothing you've built needs redoing.

## 2026-09-02 — The motion rule was asking the wrong question (v2.7.0 → v2.7.1)

Wrote the motion rules on Tuesday. Broke them on Wednesday.

Section 16 said: animate position and fade, don't animate width and height, because
resizing a thing shoves everything around it. Fair enough. Then the linter
started flagging four animations that were completely fine — a sweeping
underline, a progress bar — and we spent an afternoon arguing with our own
rulebook about working code.

The rule was checking the wrong thing. It asked *which property are you
animating*. The real question is *can anything else move when you do*. If an
element floats above the layout rather than sitting inside it, you can resize it
all day and nothing shifts.

Patch. A clarification, not a new rule — if your animation already worked, it
still works, and now the linter agrees with you.

## 2026-09-02 — Thirteen things we only found out by actually building something (v2.6.0 → v2.7.0)

Built a real interactive deck against this system. It went fine, in the way a
house inspection goes fine. Thirteen findings, and they land in two piles: places
the rulebook said nothing so the build invented something, and places the
rulebook and the working code flatly disagreed. The code was right every time.

**New**

- **1,595 icons (`assets/icons/`).** This system had no icon set. None. It had 76
  hand-drawn marks, logos, storyline marks and emoji — and nothing at all for "I
  need a small symbol that means database." So every build made one up. Taken
  from Microsoft's Fluent set (MIT) and stored locally so offline files work.
  They're flat *colour*, not monochrome — about seven fills each, and those
  colours are the artwork. Don't repaint them.
- **A corner mark that survives a dark background (`assets/storyline-mark.svg`).**
  `storyline-navy-white.svg` is named after the mark and its box, not the thing
  you put it on — every path in it is navy. Put it on a navy slide and it
  vanishes. Which it did, silently, across five slides of a deck that shipped.
  The new file takes its colour from whatever you set, so one file covers every
  surface.
- **A manifest of which emoji actually move** (`assets/emoji/animated-manifest.json`),
  with licences and provenance for every asset family.

**Corrected**

- **Two-thirds of the "animated" emoji were stills.** 43 of the 67 files in
  `assets/emoji/animated/` were ordinary static images. The loader accepted them
  without a word, so a deck could ship a frozen hero emoji and nobody would find
  out until it was on a wall in front of a client. They weren't broken exports —
  Microsoft simply doesn't animate those ones. All 43 removed; the 24 that
  genuinely move stayed.
- **The instructions pointed at a repo with no animated files in it.** v2.6.0
  told you to fetch animated emoji from `microsoft/fluentui-emoji`, which ships
  none. They live in `microsoft/fluentui-emoji-animated`. Our own loader already
  knew this. The documentation was arguing with the code again.
- **"Prefer animated" vs "one moving thing every few slides" — settled.** They
  were never in conflict; they answer different questions. First decide *which*
  slots move at all (still roughly one every few slides, at the emotional peak).
  Then, inside a slot you've already chosen to animate, prefer the animated file
  if one exists. A deck that animates everything it can has misread this.

**New rules**

- **Section 14 — every slide names itself in the markup.** All 48 layouts sit at
  identical coordinates on a 1920×1080 canvas, so a review comment pinned to a
  spot on screen has no idea which slide it belongs to. A 15-slide deck came back
  from review with every comment floating free of its slide. Every slide now
  carries `data-screen-label="07 Action titles"` — plain HTML, survives a diff, a
  screenshot, a PDF and a comment thread.
- **Section 15 — tappable cards stay quiet until you point at them.** The system covered
  static slides in forensic detail and said nothing about interactive ones, so a
  build invented an affordance that broke four existing rules at once. One mark
  per card, faint at rest, and on hover the mark moves while the card itself
  stays exactly where it is.
- **Section 16 — a motion vocabulary.** Everything else here was specified; motion
  wasn't. So every build made up its own, and the linter and the rulebook had the
  same argument five separate times. Durations, stagger, where overshoot is
  allowed (small marks yes, paragraphs never), nothing loops, and
  `prefers-reduced-motion` is honoured.
- **Check your copy is current before you build.** Someone built an entire deck
  against a clone three versions old and got every single emoji wrong, with no
  warning at any point. Second time this has happened; the first is in the log
  from July.
- **A mark on an emphasised word takes a different colour from the word.** Both
  default to lime, so the underline erases itself.
- **An emoji next to a headline sits on the headline's line**, not floating
  beside it like a stray asset.
- **Passing contrast is the floor, not the goal.** Teal on aqua clears AA and
  still reads flat at display size.
- **Solid chip fills**, because the ghost chip disappears on a saturated
  background.

Minor bump. All additive — nothing that already worked stops working.

## 2026-07-23 — Emoji are brand assets, so here's how to actually use them (v2.5.0 → v2.6.0)

The docs said "static colour is the default form" and then stopped. No rule for
which style to use when, and nothing at all about what happens when your file has
to work without internet. `POWERPOINT.md` didn't mention emoji once.

- **Style order.** For storytelling moments — the hero beat, the big stat — 3D
  first, animated 3D where it earns it, 2D colour as the fallback. For functional
  symbols, Flat.
- **Offline files: download the file and embed it.** Native PowerPoint, Keynote,
  a PDF someone opens on a plane — anything that has to render without a
  connection gets the actual file, never a link. Web deliverables can use the CDN.
  Raw Unicode emoji as icons stays banned everywhere, forever.
- **`POWERPOINT.md`** gains a check for this in its finished-file validation,
  because "it looked fine on my machine" is how emoji go missing in a client
  meeting.
- **`ANTI_PATTERNS.md`** gains the obvious pair: hotlinked emoji in an offline
  file, and the wrong Fluent style for the job.
- **Also repaired some quiet drift.** The master had three wording fixes the repo
  never received — the tagline order, and the italic rule that allows the emphasis
  to be a phrase rather than one word. Adopted rather than overwritten; both sides
  match again.

Minor bump.

## 2026-07-23 — The Brand Mark Studio existed. Nobody could find it. (v2.4.3 → v2.5.0)

We built a tool that turns any word into an animated brand "hello," put it in
`preview/`, and then mentioned it in exactly zero of the files an agent actually
reads. Ask any AI for the animated wordmark and it would cheerfully hand-build
you one from scratch, badly.

It's now routed from every entry point — `AGENTS.md`, `LLM_ENTRYPOINT.md`,
`README.md` — with one standing instruction attached: **point the user at the
tool, don't hand-build the animation.**

Minor bump. New surface, nothing changed.

## 2026-07-23 — Chrome only lets you download one file per page load (v2.4.2 → v2.4.3)

That's the whole mystery, solved. Every version since v3 had the same symptom:
your first export downloads, every one after it silently doesn't. No error, no
prompt, nothing. Chromium permits exactly one script-triggered download per page
load and quietly bins the rest — and inside a sandboxed frame, the usual "allow
multiple downloads?" prompt never appears to tell you that's what happened.

So the Studio now spends that one download deliberately. The first export of a
session downloads itself; after that it stops pretending and shows you the routes
that have no limit — right-click the preview and save the image, use the video
player's menu, or use the green link's real save dialog.

Also added a **diagnostics strip** under the panel: a rolling seven-line log of
what was exported, how big it was, whether the download fired or was skipped, and
any error. Sandbox problems are now visible on the page instead of being guessed
at over WhatsApp.

## 2026-07-23 — Stop fighting the host (v2.4.1 → v2.4.2)

Field report: inside the claude.ai artifact sandbox, even the shiny new download
*button* from v2.4.1 was getting swallowed. And turning the link into a button
had quietly removed the one method that always worked — right-click, save link as.

New approach: when an export finishes, the finished file simply appears in the
page. APNG and GIF render as a live preview; MP4 and WebM get a real video
player. Then you save it the way you save any image on the internet, because no
host on earth can intercept a right-click on visible content.

The preview doubles as proof the file isn't corrupt — which, see the next entry,
turned out to matter rather a lot.

## 2026-07-23 — Every GIF this thing ever made was broken (v2.4.0 → v2.4.1)

Not "some GIFs." Every single one, from the day the Brand Mark Studio shipped.

The encoder squeezes an image down using a dictionary that grows as it works.
When the dictionary fills up it needs more room per entry — and our code made
that switch one step too early. Every decoder on the planet (Chrome, PowerPoint,
Preview, all of them) expects it one step later. So the moment your artwork got
busy enough to fill the dictionary — which is any real word at any real size —
the file quietly turned to static. PowerPoint's review: a blank rectangle.

Nobody spotted it because the download was *also* broken, so not one corrupt file
ever reached a human being. Two bugs covering for each other for a month. I'm not
even angry, I'm impressed.

Fixed, and checked pixel-for-pixel against a reference decoder plus a real
browser export decoded frame by frame. The download control is a proper button
now too — some hosts swallow clicks on links, and a fresh click on a real button
always gets through.

## 2026-07-23 — Brand Mark Studio joins the repo, and its exports stop vanishing (v2.3.4 → v2.4.0)

The animated brand-hello exporter had been living only on the Claude Design
master. It's in the repo now and current with the master: Poppins or Libre
Baskerville, italic and bold toggles, gradient or travelling per-letter colour,
and the full background swatch row. Exports APNG (transparent), GIF (transparent,
survives PowerPoint) and MP4/WebM, all encoded in your own browser.

**Plus a fix on both sides: exports were disappearing inside sandboxed frames.**
Browsers only honour a scripted download for about five seconds after you click
something. The APNG encoder finishes inside that window. The GIF encoder doesn't
— so in a shared artifact, the GIF was being encoded perfectly and then thrown
away by the browser without a word. There's now a real "⬇ Download" button that
appears once the export is done, which counts as a fresh click and is therefore
always allowed.

## 2026-07-18 — The README has a proper banner now (v2.3.3 → v2.3.4)

Built from the system's own material rather than generic decoration: the real
storyline mark (line variant, faded, obeying its own rule), the actual secondary
swatches, a live Poppins and Baskerville-italic specimen, and the white+lime logo
reverse that had stopped being deprecated about ten minutes earlier.

Self-contained — system fonts, no scripts, nothing loaded from anywhere else — so
GitHub will actually render it. The headline is this README's own words, not
invented marketing copy.

## 2026-07-18 — The rule was wrong, not the logo (v2.3.2 → v2.3.3)

`README.md` had the white+lime logo reverse on the "never do this" list, marked
deprecated. `LAYOUTS.md` L31 specs that exact logo on a navy ground for the
spectrum-bar cover. Both files had been sitting there contradicting each other.

The layout was right. The white+lime reverse is a real variant — navy grounds
only, for when you want lime to read in the mark itself rather than just on the
slide behind it. On any other dark or saturated background, pure white is still
the rule.

No asset files changed. Both logos already existed. We just stopped telling
people not to use one of them.

## 2026-07-17 — Deleted the Node scripts that were breaking the build (v2.3.1 → v2.3.2)

`tools/lint-deck.js` began with a `#!/usr/bin/env node` line. Harmless in a
standalone script, invalid in the middle of a bundled file — and the compiler
bundles every `.js` in the project into one. So a single line at the top of a
linter nobody was running broke the entire component bundle.

Validation is the compiler's job, not a second toolchain running alongside it.
So the scripts are gone rather than patched: the whole `tools/` folder, the
`scripts` block in `package.json`, and every dangling `npm run` reference in the
docs, which now point at the compiler and `CHECKLIST.md` instead.

Old changelog entries mentioning those scripts are left alone. They were accurate
at the time.

## 2026-07-17 — An HTML deck is still a deck (v2.3.0 → v2.3.1)

Same-day follow-up to v2.3.0, closing the two failures that kept coming back:
tiny fonts, and image models writing gibberish into pictures.

- **Pick your delivery format at intake.** `INTAKE.md` now asks HTML or
  PowerPoint up front, with the trade-off stated plainly. HTML is interactive,
  pixel-exact and great as a link, but nobody can edit it in PowerPoint. A `.pptx`
  is editable by anyone and fights you on fidelity. Rule of thumb: presenting
  live, send HTML; someone else has to edit it, send PPTX. PDF is an export of
  either.
- **And the guardrail that matters: HTML is a rendering technology, not a
  medium.** A 1920×1080 deck that happens to be HTML is a *deck*. Apply web rules
  to it — 16px body, generous whitespace, a 1240px max-width — and you get body
  copy the size of a footnote projected onto a wall. This is the single most
  common route to the tiny-font failure.
- **Stop asking image models to typeset.** Midjourney, DALL·E and Stable Diffusion
  cannot spell. The social and slide prompt blocks now generate imagery and
  backgrounds only; headlines, numbers and labels get set in the deck, where
  letters are letters.

## 2026-07-17 — Ask before you build (v2.2.1 → v2.3.0)

New surface area, all additive, all aimed at the same recurring complaint: "it
doesn't look like the system." Tiny type, truncated titles, half-empty slides, no
imagery, and agents guessing at a brief instead of asking about it.

- **`INTAKE.md` (new) — a gate before anyone builds anything.** A short set of
  questions: what medium, presenter or document mode, audience and language,
  colour direction, and what's happening with images. Then restate the brief back
  in one line. Wired in as step zero from every entry point so no route can skip
  it. Guessing the brief and rebuilding is the most expensive mistake in here.
- **`IMAGERY.md` (new) — settle images before you lay anything out.** Can this
  agent generate images at all? Then ask: generate, supply, or a labelled
  placeholder? If generating, learn a style from a few samples or fall back to the
  house illustration style. Never a bare grey box. Ships three reference samples.
- **`AGENTS.md Section 2.5` (new) — titles.** Never truncate one. Break lines where the
  meaning breaks, not where the box ends. Fill the width or size up — and treat
  the empty half of a slide as a slot for a graphic, not a margin. Plus: dead
  space is a bug, chunk don't dump, and colour the italic emphasis.
- **A linter that looks at the rendered deck**, not the source. Opens it in a
  headless browser at full size and flags type below the floor, titles that
  truncate or under-fill, dead space on the right and along the bottom, content
  slides with no visual, real white-on-white (measured off the actual pixel behind
  the text, so layered colour surfaces read correctly), and overflow.
- **Checklists updated to match**, and `ANTI_PATTERNS.md` gains rows for
  hand-rolled chrome, skipped intake, half-width titles, text-only slides,
  wall-of-text dumps and mixed image styles.

The owner's *writing* voice was deliberately left out of all this. That's taste,
not a system rule.

## 2026-07-15 — We'd been printing the tagline backwards (v2.2.0 → v2.2.1)

*"Complexity in. Clarity out."* In four places. Which, read literally, promises to
take your clarity away and hand you complexity — an honest description of some
agencies, but not this one.

Fixed in the README examples, the portable social brief, a cover slide in the deck
template and the type specimen. The line is playful fodder rather than a fixed
lockup, so either word order is fine as long as it means the right thing; the
deck's correctly-ordered variants were left alone.

Also: **the italic-emphasis reframe was not, in fact, finished.** The v2.2.0 entry
said it was fully propagated. Eight slot specs in the deck template still said
"one italic word," and the portable brief still said "the italic word in lime."
All of them now say "the italic emphasis," which is what `LAYOUTS.md` had been
saying on its own for a week.

Wording only. No new surface.

## 2026-07-15 — The interactive tour becomes a real template (v2.1.0 → v2.2.0)

- **Renamed it to what it is.** "App deck" → "Interactive brand tour," folders and
  files to match, and added to the README map. Nobody knew what an app deck was,
  including us.
- **Fixed it not registering as a template at all.** The compiler was choking on
  some bundler-only metadata in the `<head>`. Moved it, and the tour now registers
  properly — four templates, as intended.
- **Fixed the standalone version, which was colourless.** It pulled the brand
  tokens in through a script, and a static offline file can't run the script. So
  every colour variable resolved to nothing, the whole tour rendered in greyscale,
  and the console filled with errors. Tokens and a slim font set are now inlined
  directly: real colours, real Poppins and Baskerville, no errors.
- **Formalised versioning.** `package.json` holds the canonical number, the README
  carries it at the top, and `CONTRIBUTING.md` explains what counts as major,
  minor and patch. Three places, one ritual, stop guessing.
- **Finished the italic cleanup** across the print deck, both decks' rule text,
  and the last bare "one word" in `PROMPTS.md`.
- **Web hero copy** turned the right way round (see above).

> **One thing didn't make it across:** the rebuilt standalone
> `Hoffman Brand Tour.html` is too big for the sync API's 256 KB limit, so the repo
> still has the old one. Re-export it from Claude Design when you get a chance.

## 2026-07-14 — The storyline line is a signature, not wallpaper

An outside agent built a 26-slide deck and used the full-strength navy storyline
treatment on six of them. Not really its fault: the system explained in detail
*how* to use the line and never once said *how often*. Used six times, it stops
being a signature and becomes the background.

New rule, threaded everywhere it needs to be. The bold full-strength line on navy
is **once per deck — the cover or the closing, never both.** It can appear
elsewhere, but only faded right back to a background texture at 8–15%, sitting
behind the content. A plain navy slide with no line is always fine. The boxed
corner monogram on light surfaces is a different device and is unaffected.

## 2026-07-13 — Native PowerPoint gets a proper route

Pulled the master down and reconciled every file that differed. Two threads.

- **PowerPoint is now a first-class output rather than an afterthought.** A
  `.pptx` has no CSS, no grid and no web fonts, so everything HTML does for free
  has to be placed by hand and then verified in the actual file. New:
  `POWERPOINT.md` (theme setup, the fact that having a font installed is not the
  same as using it, logo geometry, protected zones, connector rules, and a
  validation pass on the finished file), `asset-manifest.json` (every logo's real
  ratio, clearspace, and which variant belongs on which surface), and a layout
  manifest carrying all 48 layout contracts for tools that can't read the HTML
  deck. Threaded in as `AGENTS.md Section 13`, a checklist section, and routing rows
  everywhere.
- **The italic emphasis can be a phrase.** It was written as "one italic word,"
  which is wrong about half the time — sometimes the point lives in two words.
  Now: a key word *or* a short phrase, chosen by meaning, one per line. Synced
  across nine files.

**Deliberately not changed:** the repo's `CLAUDE.md` stays a pointer to
`AGENTS.md` rather than becoming a second copy of the canon; the
compiler-generated files are left to the compiler; `references/` and `uploads/`
stay out of the public copy.

## 2026-07-12 — Audited our own work and it scored 12/20 (v1.1 → v2.0)

Ran a full audit against the system. Twenty-three findings. Fixed all of them on a
branch, checked every one live in a browser at each breakpoint and with a
keyboard, then merged.

- **Contrast (critical).** The lime we had documented as the "WCAG-safe" text
  colour was 2.1:1. The warning badge was 2.6:1. Both were failing the standard we
  had written down ourselves, in the file where we wrote it down. Darkened until
  they pass.
- **Responsive (critical).** `ui_kits/website/` had no breakpoints and no viewport
  tag. Not "poor mobile support" — no mobile support, structurally impossible, in
  a website kit we were shipping to people who would obviously open it on the
  device everyone actually fucking uses. Added breakpoints to the nav (with a real
  hamburger), the hero, the case-study grid and the stats strip, plus the tag.
- **Keyboard and focus.** Modals and drawers now trap focus and close on Escape.
  Fixed a button styled as a link that you could not reach by keyboard at all.
  Darkened form borders that were effectively invisible until clicked.
- **The long tail.** `aria-current` on navigation, a visible focus ring on
  toggles, proper menu semantics, 44px touch targets, font preconnects, one
  ghost-card border-and-shadow combination removed, decorative SVGs hidden from
  screen readers, and a handful of hardcoded colours swapped for tokens.

## 2026-07-03 — Merged Takeo's fork back in

Takeo Apitzsch forked this and extended it. Reviewed the whole thing — four
commits ahead, nothing behind, no brand redesign, nothing removed, purely
additive — and merged it back with his commit history intact, because it was good
work and his name should stay on it.

**What came across**

- **A product/app UI kit (`ui_kits/app/`).** Around 30 React primitives — forms,
  navigation, feedback, data display, disclosure, progress — plus a dashboard demo
  and docs. This fills the "component library beyond the basics" line `DESIGN.md`
  had been carrying as a to-do.
- **Guidance for AI agents** — `LLM_ENTRYPOINT.md` and `ANTI_PATTERNS.md`.
- **Repo tooling** — a validator, smoke checks, `CONTRIBUTING.md`.
- **Catalog fixes** — the manifest now matches the files that actually exist, a
  dead keynote entry removed, and the guidelines deck corrected from 52 slides to
  58.

**What went up to the master:** the design substance only. Not the generated files
(the master's compiler rebuilds those) and not the edited docs, where the master
already had newer versions and pushing ours would have gone backwards.

Repo and master are deliberately not identical after this: the master has a
template the repo doesn't, the repo has tooling the master doesn't.

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


## 2026-06-30 — Day one

Created `github.com/neekchan/hoffman-agency-design-system` and synced the whole
system down from Claude Design.

- **Internal material stayed behind** — `references/` and `uploads/`, which hold
  all-hands and strategy decks. Those aren't going on the public internet.
- **Fonts:** 18 Poppins weights self-hosted, plus Libre Baskerville variable,
  upright and italic.
- **Everything else:** the curated Fluent emoji set vendored offline with the CDN
  pinned to specific commits, 10 logo colourways, the storyline marks, 76
  hand-drawn annotations, the deck, one-pager and social-tile templates, the
  58-slide brand guidelines deck, and the website UI kit.

---

<sub>The Hoffman Agency design system — created by **Nicolas Chan**, Head of Digital &amp; Chief Strategist, AMEA.<br>[neekchan@gmail.com](mailto:neekchan@gmail.com) · [nchan@hoffman.com](mailto:nchan@hoffman.com) · [linkedin.com/in/nicolaschan](https://www.linkedin.com/in/nicolaschan/)</sub>
