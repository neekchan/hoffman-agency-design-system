# Handover — taking this repository on
<!-- Last file Nicolas Chan added to the system. Read it before touching anything else. -->

Written 3 November 2026 by Nicolas Chan, the system's author, on handing it to The Hoffman Agency. v2.26.0 is the last version he ships; everything after it is yours.

## What this is

The Hoffman Agency design system: brand tokens, the 56-layout deck library, the one-pager, social-tile and PowerPoint templates, and the rules an AI needs to build on-brand. `LLM_ENTRYPOINT.md` is where any agent starts; `README.md` is where a person starts; `CHANGELOG.md` says what changed and why, newest first.

## Get a copy

Clone it (needs git; GitHub Desktop works too):

```bash
git clone https://github.com/neekchan/hoffman-agency-design-system.git
```

Or on the repository page, **Code → Download ZIP**. A ZIP is a snapshot and never updates; a clone can be brought current with `git pull`. Before any build, run `git fetch && git status -sb`: if it says `behind`, pull first. A stale clone teaches last quarter's rules (`LLM_ENTRYPOINT.md`, point 3).

## Take ownership

Pick one. The author does them; the recipient only accepts.

1. **Transfer the repository** to a Hoffman GitHub organisation or user. Settings → General → Danger zone → *Transfer ownership*, or:

   ```bash
   gh api -X POST repos/neekchan/hoffman-agency-design-system/transfer -f new_owner=<hoffman-org-or-user>
   ```

   GitHub emails the new owner, who accepts within a day. Old links redirect. History, issues and stars move with it. This is the clean option: one repository, one owner, no fork to keep in step.

2. **Add an admin collaborator** and leave the repository where it is:

   ```bash
   gh api -X PUT repos/neekchan/hoffman-agency-design-system/collaborators/<github-user> -f permission=admin
   ```

   Simpler today, but the repository still sits under a personal account.

3. **Fork it** into a Hoffman organisation. The fork is yours from the moment it is made; the original stays as the author's archive. Two copies drift unless one is retired.

Current collaborators on the repository: `neekchan` (owner), `takeoap`, `neeekchan`. Review them after the transfer.

## Two masters, one truth

Until now the system has been edited in a Claude Design project and mirrored here (`CHANGELOG.md`, top). That project is tied to the author's account and does not transfer with git. From the handover, **this repository is the master**: edit the sources here, follow `CONTRIBUTING.md` for versioning, and add a `CHANGELOG.md` entry with every change. If the Claude Design project is shared with you as well, treat it as a working copy and push the result here.

## What runs where

Audited on 5 November 2026 so nobody discovers these on a deadline.

- **Rendering needs nothing installed and no network.** Fonts, emoji, photography and the three runtime libraries (`vendor/`: React, ReactDOM, Babel) are in the repo; every loader tries the local copy first and the pinned CDN second. Open any `.html` from a clone and it works. The Google Fonts `@import` in `colors_and_type.css` only adds the mono and CJK fallbacks; offline, a system font stands in.
- **The checks need a browser, nothing more.** `tools/title_check.js` and `tools/tile_count.js` are pasted into any browser's console or run under headless Chrome or Edge (Windows lines are in each file's header).
- **Python is optional** and used by three helper scripts only: `tools/title_check.py` (CI runner), `templates/brand-tour/export_standalone.py` (rebuilds the standalone tour) and `assets/readme/build-hero.py` (the README banner). `tools/requirements.txt` lists what each needs. They find Chrome or Edge on Mac and Windows by themselves.
- **No Node.** `package.json` carries the version number and nothing else.
- **Frozen artifacts.** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` and `templates/*/support.js` were produced by a compiler that stayed with the author's Claude Design account. They work as they are; they cannot be regenerated here. Their sources are in the repo (`ui_kits/**/*.jsx`, `colors_and_type.css`) for whoever writes a builder later. Edit them only mechanically and log it.
- **The standalone Brand Tour** (`Hoffman Brand Tour.html`) inlines everything except React, which it fetches from unpkg when mailed on its own; opened from the repo it uses `vendor/`. Rebuilding it needs its previous version as the donor, so do not delete the file. **Known issue:** every export so far shows a slice of runtime source as visible text on the first screen; the template `templates/brand-tour/BrandTour.dc.html` renders correctly, so use that until someone rebuilds the export (`CHANGELOG.md` v2.26.2).
- **Host-only code** (anything mentioning `omelette`, `?slide=`, `__dc_design_mode`) is the Claude Design bridge. It is inert everywhere else and can be ignored.

## Keep it alive

- Every change: a `CHANGELOG.md` entry, a version bump in `package.json` and the **Version** line in `README.md`. Patch for wording, minor for a new rule or layout, major for anything that breaks existing work.
- New layouts: an example slide in `templates/deck/Deck.dc.html`, an entry in `LAYOUTS.md`, a contract in `templates/powerpoint/layout-manifest.json`, and the counts in `AGENTS.md`, `README.md`, `SKILL.md`, `POWERPOINT.md`.
- Nothing generated by an AI leaves the building unreviewed (`AGENTS.md` Section 22).
- The checks in `tools/` run in a browser with nothing installed: `title_check.js` and `tile_count.js` are pasted into the console or loaded under headless Chrome. Only the CI runner `title_check.py` needs Playwright (`tools/requirements.txt`).

## Who to ask

Nicolas Chan · [neekchan@gmail.com](mailto:neekchan@gmail.com) · [linkedin.com/in/nicolaschan](https://www.linkedin.com/in/nicolaschan/)
