# Hoffman Agency Design System - LLM Entrypoint

Use this file when Claude, ChatGPT, or another agent is handed the repo as
design guidance. Route the task first, then read only the files needed for that
route.

## 1. Pick The Medium

| User asks for | Read | Start from | Key rule |
|---|---|---|---|
| Presentation, pitch, deck, slide, PowerPoint, Keynote | `AGENTS.md`, then `LAYOUTS.md` | `templates/deck/Deck.dc.html` | Slides override web spacing/type. Fill the 1920x1080 frame. |
| Marketing website, landing page, brand page | `README.md`, `DESIGN.md` | `ui_kits/website/index.html` | Web can breathe. Use website components and real imagery/placeholders. |
| Product app, dashboard, admin, portal, workflow tool | `DESIGN.md`, `ui_kits/app/COMPONENTS.md` | `ui_kits/app/index.html` | Dense, calm, scannable UI. Use app primitives, not marketing heroes. |
| Social tile or carousel | `README.md`, `PROMPTS.md` | `templates/social-tile/SocialTile.dc.html` | One idea per tile, big type, fixed safe zone. |
| One-pager or print leave-behind | `README.md`, `CHECKLIST.md` | `templates/one-pager/OnePager.dc.html` | Print has its own size constraints; keep hierarchy clear. |
| Image generation prompt | `PROMPTS.md` | The matching prompt block | Keep the Hoffman photo grade and placeholder resolution rules. |

## 2. Universal Brand Rules

- Use Poppins for structure and body.
- Use Libre Baskerville italic only, usually one word or phrase inside a Poppins headline.
- Use navy `#182D43` and lime `#D2EB00` as the structural pair.
- Lavender, purple, cyan, and teal are allowed as full surfaces when contrast passes.
- Never use lime text on white; use `--fg-accent` / `#A7BC00` or navy.
- Use the Storyline mark correctly: boxed monogram on light/non-navy, line variant as a background layer on navy/dark.
- Use real imagery first. If unavailable, use labelled `.tha-placeholder` blocks with exact generate dimensions.
- Keep copy smart, human, energetic, distilled, bold, creative, and authentic. No agency jargon.

## 3. Medium-Specific Rules

**Slides**

- Decide Presenter or Document mode before writing slides.
- Use slide type floors from `AGENTS.md`: body 30-36px, content titles 64-80px, statements 120px+.
- Use imagery by default.
- Use one Microsoft Fluent emoji as a storytelling device when it is the slide's graphic beat.
- Never use web max widths or 16px body type.

**Marketing Web**

- Use `ui_kits/website/` components.
- Generous whitespace is acceptable.
- Use asymmetric grids, bold editorial headlines, and restrained cards.
- Avoid product-dashboard density.

**Product/App UI**

- Use `ui_kits/app/` primitives.
- Prefer native controls, compact panels, dense tables, restrained status color, and predictable navigation.
- Do not start app UI with a marketing hero.
- Do not nest cards inside cards.

## 4. Before Shipping

- Check `ANTI_PATTERNS.md` for common LLM design failures.
- Run `CHECKLIST.md` manually for visual consistency.
- Run `npm run validate` for catalog and manifest consistency.
- Never export `references/`; it is confidential source material.
