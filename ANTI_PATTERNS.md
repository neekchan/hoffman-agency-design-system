# Hoffman Agency Anti-Patterns

Use this as a quick failure-mode check before shipping an LLM-generated design.

| Anti-pattern | Why it fails | Do instead |
|---|---|---|
| Applying web spacing to slides | Fixed 1920x1080 slides look empty when web whitespace rules are used. | Use `AGENTS.md` slide scale, 72px safe margins, and fill the frame. |
| 16px or 18px slide body text | It is web type, not readable presentation type. | Use 30-36px body, 64-80px titles, 120px+ statement slides. |
| One generic big-type slide repeated across a deck | The deck loses rhythm and looks AI-made. | Pick named layouts from `LAYOUTS.md` and keep composition varied. |
| Mixing Presenter and Document modes | A sparse live slide beside a dense reading slide breaks trust. | Declare one mode and keep word count/bullet density consistent. |
| Leaving out imagery on slides | Hoffman slides expect a graphic, image, or Fluent emoji on most slides. | Use real imagery first, then labelled placeholders, then Fluent emoji as the graphic beat. |
| Raw emoji as bullets or decoration | Platform emoji vary and look casual in the wrong way. | Use Fluent emoji deliberately, usually one per slide or charged word. |
| "NO emoji" in slide guidance | It contradicts the slide SOP. | Ban raw/decorative emoji, but allow Fluent emoji when it carries the story beat. |
| Wrong Storyline version | The motif reads as pasted-on decoration. | Use boxed monogram on light/non-navy; use line variant edge-locked behind content on navy/dark. |
| Floating the Storyline line as a small object | The line variant is a field/background device, not an icon. | Edge-lock it to top/right/bottom at full frame height. |
| Storyline line on many/most slides | The signature bookend becomes wallpaper — every slide reads like a cover and the deck flattens. | Use the full-frame navy line on the cover and closing only (≤2/deck). Content slides use plain surfaces; a navy content slide has no line. |
| Lime text on white | It fails contrast. | Use navy or `--fg-accent` / `#A7BC00` on light surfaces. |
| White text on lime or cyan | It fails contrast. | Use navy/dark text on lime and cyan surfaces. |
| Bare grey image boxes | They give no art direction and look unfinished. | Use `.tha-placeholder` with label, hint, prompt, and exact generate size. |
| Marketing hero layout for an app | Operational UI needs scanning, repetition, and controls, not a sales page. | Use `ui_kits/app/`, compact panels, tables, forms, and restrained navigation. |
| Nested card-heavy dashboards | Cards inside cards reduce scanability and waste space. | Use page sections, panels, dividers, and tables with clear grouping. |
| Too many accent colors on one surface | The palette starts to vibrate instead of structure content. | Pick one dominant color per slide/surface; rotate color across a sequence. |
| Upright Libre Baskerville | The brand uses the serif as an italic accent only. | Keep Poppins as the workhorse and set Baskerville italic for emphasis. |
| Vague placeholders like "image here" | The next agent or designer cannot finish the asset. | Write subject, composition, mood, aspect, and exact generation size. |
| Agency jargon in headlines | It sounds generic and off-brand. | Use short, active, opinionated lines with one clear point. |
