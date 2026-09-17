# 3D Fluent emoji — the default storytelling style

**67 files. The curated set, in the style this system calls its default.**

Until these landed, `AGENTS.md` Section 8 said "3D style first" while this repo
vendored only 2D colour and animated. So the documented default was CDN-only:
any offline deliverable — a native PowerPoint, an embedded PDF, a self-contained
HTML deck — physically could not use it and silently fell back to 2D colour.

## Source and licence

The **3D** style from [`microsoft/fluentui-emoji`](https://github.com/microsoft/fluentui-emoji),
© Microsoft Corporation, released under the **MIT Licence**. Vendored here so
offline deliverables work, pinned to commit `62ecdc0d7ca5c6df32148c169556bc8d3782fca4`
— the same commit the injector pins for every other static style.

Base skin tone only. The five toned variants stay upstream, per Section 8.

## Using them

You don't reference these directly. `<fluent-emoji name="rocket" variant="3d">`
resolves to `assets/emoji/3d/rocket.png` automatically, and falls back to the CDN
for anything not vendored here.

---

<sub>The Hoffman Agency design system — created by **Nicolas Chan**, Head of Digital &amp; Chief Strategist, AMEA.<br>[neekchan@gmail.com](mailto:neekchan@gmail.com) · [nchan@hoffman.com](mailto:nchan@hoffman.com) · [linkedin.com/in/nicolaschan](https://www.linkedin.com/in/nicolaschan/)</sub>
