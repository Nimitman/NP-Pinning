# NP-Pinning

Interactive web prototype of the **New Project (NP) pinning** flow in the Housing.com broker/seller panel, built from the Figma file *Broker Dashboard (Seller) → Broker NP pinning* using the Bricks design system and Bricks iconography.

> **Status: work in progress, not yet tested in a browser.** Desktop markup, styles and interaction logic are written; mobile markup is written but its stylesheet (`mobile.css`) and the scenario switcher (`hooks.js` / `hooks.css`) are not committed yet, so `index.html` currently requests three files that 404. See *Roadmap* below.

## Run it

No build step — plain HTML, CSS and JavaScript.

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. (Opening `index.html` directly from disk also works.)

Fonts load from Google Fonts: Google Sans Flex (UI), Rubik (navbar and CTA labels), Roboto (mobile browser mock).

## What's covered

Desktop (≥ 768 px) and mobile (< 768 px) render from the same state, so a flow can be continued after resizing.

| Figma section | Screens | What works |
|---|---|---|
| 01 · Entry — pinning page | d1.1, d1.2, d1.2a, d1.2b, limit-reached and plan-expired modals | Budget card states (normal, warning, danger/renew), recommendation carousel with filter pills and dropdowns, "Your pinnings" table with tabs, pagination, CSV export, collapse/expand |
| 02 · Select a project — modal | d1.3 – d1.9a, m2.1 – m2.8 | City picker with search and plan-locked cities, multi-select locality picker, project typeahead (keyboard ↑ ↓ Enter), project summary, already-pinned warning, "Request a missing project" form, request-sent confirmation |
| 03 · Create pinning | d3.1 – d3.8b, m3.1 – m3.10 | Start-date calendar limited to package expiry, 30/60/90-day duration, configuration table with select-all, inline price editing (Enter saves, Esc cancels), report-an-issue modal, add-missing-configuration modal with linked price ⇄ rate fields, validation when nothing is selected, submit adds a "Pending approval" pinning to the dashboard |
| 04 · Managed by — sub-broker | d4.1 – d4.9, m4.1 – m4.9 | Manager dropdown, 3-step create-sub-broker flow (phone → OTP with resend timer → details with validation), discard confirmation, success modal and toast; the new sub-broker becomes the manager |

### Demo inputs that trigger designed states

| Input | Result |
|---|---|
| Phone `98111 11111` | "Already your sub-broker" (Rohit Mehra) |
| Phone `98222 22222` | "Number linked to another Housing account" |
| Any other 10-digit phone | Proceeds to OTP; any 4 digits verify |
| Email `ramlal@turboprop.com` | "Already used by another Housing account" |
| Password shorter than 8 characters or without a number | Password error |
| Project "Unitech Escape" | "You already pinned this project" |

## Project structure

```
index.html     page shell, font + script includes
data.js        static data (cities, localities, projects, pinnings, configurations, team) — copy is verbatim from Figma
app.js         state, actions, formatting helpers, render loop (event delegation + focus preservation)
desktop.js     desktop markup (string templates)
mobile.js      mobile markup (string templates, bottom sheets)
styles.css     Bricks tokens + desktop styles
assets/        icons and images exported from Figma (unmodified); MANIFEST.txt maps each file to its Figma layer
specs/         per-screen implementation specs extracted from Figma (d* = desktop, m* = mobile, cmp-* = components)
ref/           Figma reference renders of every screen, used to check fidelity
```

## Design deviations worth knowing

- Figma draws several modal states over an older version of the base page (lavender "Best opportunity" project card). The prototype always uses the current base page.
- Some states are not drawn in Figma and use inferred styles: enabled Send OTP / Verify OTP / Create buttons, filled OTP digits, selected property-type and BHK pills, wrong-input errors on the request form, and the date-picker popover.
- Copy inconsistencies are resolved in favour of live data. For example, the submit bar's "remaining" count is computed, the "₹x Cr" hints recalculate as you type, and the Reported chip goes on the row that was actually reported.

## Roadmap

- [ ] `mobile.css` — mobile layout styles (markup in `mobile.js` is done)
- [ ] `hooks.js` / `hooks.css` — floating "Screens" panel and `#d3.6`-style URL hashes to jump to any Figma state, plus a device toggle (auto / desktop / 360 px frame)
- [ ] Preserve scroll position of horizontal scrollers across re-renders on mobile
- [ ] Run in a browser and fix issues
- [ ] Side-by-side visual check of every screen against `ref/`
