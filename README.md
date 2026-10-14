# NP-Pinning

Interactive web prototype of the **New Project (NP) pinning** flow in the Housing.com broker/seller panel, built from the Figma file *Broker Dashboard (Seller) → Broker NP pinning* using the Bricks design system and Bricks iconography.

> **Status: working prototype.** Desktop and mobile flows run in the browser with no console errors; every Figma state can be opened from the Screens switcher. Visual fidelity has been spot-checked against `ref/`, not yet screen-by-screen.

## Features

- **Full-stack prototyping**: Desktop (1400px) and mobile (360px) layouts from a single state object
- **66 interactive states**: All Figma states accessible via screen switcher, URL hash, keyboard shortcuts, or console API
- **Form validation**: Phone, OTP, email, password validation matching Figma specifications
- **Interactive flows**: Dashboard → Project selection → Create pinning → Sub-broker management
- **Responsive scaling**: Desktop layout scales down between 768–1280px; "Mobile 360" preview on desktop
- **No build step**: Plain HTML, CSS, JavaScript—open and run immediately

## Quick Start

```bash
# Run the dev server
python3 -m http.server 8765

# Open in browser
open http://localhost:8765
```

Or open `index.html` directly from disk (fonts load from Google Fonts).

## Navigation

### Jump to any Figma state

- **Screens switcher** — the dark pill in the bottom-left corner. Open it to pick any of 66 states (desktop d1.1–d4.9, mobile m1.1–m4.9), toggle layout (Auto/Desktop/Mobile 360), or step with ‹ › buttons.
- **URL hash** — `#d3.6`, `#m4.5`, etc. Deep-link to any state.
- **Keyboard** — `[` and `]` step through states in order.
- **Console** — `NP.goto('d4.9')` and `NP.screens()` list all states.

Every state is a live starting point; click through the flow from anywhere.

## What's Covered

Desktop (≥ 768 px; scaled 768–1280 px) and mobile (< 768 px) render from the same state, so flows continue across resize. Wide screens show "Mobile 360" in a phone frame with Chrome mock from Figma.

| Figma Section | Screens | Features |
|---|---|---|
| **01 · Entry — Pinning Page** | d1.1, d1.2, d1.2a, d1.2b | Budget card (normal/warning/danger), recommendation carousel with filters, Your Pinnings table (tabs, pagination, CSV export, collapse) |
| **02 · Select Project — Modal** | d1.3–d1.9a, m2.1–m2.8 | City picker (search, locked cities), multi-select localities, project typeahead, project summary card, already-pinned warning, request missing project form |
| **03 · Create Pinning** | d3.1–d3.8b, m3.1–m3.10 | Date picker (capped to expiry), 30/60/90-day durations, config table (select-all, inline edit), report issue modal, add missing config, validation, submit to dashboard |
| **04 · Sub-Broker Setup** | d4.1–d4.9, m4.1–m4.9 | Manager dropdown, 3-step flow (phone → OTP + timer → details), discard confirmation, success modal/toast |

### Demo Inputs

| Input | Result |
|---|---|
| Phone `98111 11111` | "Already your sub-broker" |
| Phone `98222 22222` | "Linked to another Housing account" |
| Any other 10-digit phone | Proceeds to OTP (any 4 digits verify) |
| Email `ramlal@turboprop.com` | "Already used by another Housing account" |
| Password < 8 chars or no number | Password error |
| Project "Unitech Escape" | "You already pinned this project" |

## Project Structure

```
index.html              Page shell, font/script includes
data.js                 Static data (cities, localities, projects, configs, team)
app.js                  State management, actions, render loop, focus preservation
desktop.js              Desktop UI templates (navbar, modals, tables, forms)
mobile.js               Mobile UI templates (sheets, pickers, phone frame)
styles.css              Bricks tokens + desktop styles
mobile.css              Mobile styles + device frame preview
hooks.js                Screen switcher (66 states, keyboard navigation, URL hashing)
hooks.css               Screen switcher styling
assets/                 89 icons/images exported from Figma (MANIFEST.txt maps files)
ref/                    Figma reference screenshots (visual verification baseline)
specs/                  Per-screen implementation specs from Figma
```

## Architecture

### State Object (`NP.S`)
Single source of truth containing:
- `route` — current page (dashboard, select, create, sb-phone, sb-otp, sb-details, sb-done)
- `budget` — used/total pinnings and coins
- `sel` — project selection (city, localities, project, query)
- `create` — pinning form (duration, selected rows, errors)
- `sb` — sub-broker flow (phone, otp, name, email, password, step)
- `toast` — notifications with optional undo/change actions
- `modal` — currently open modal (select, report, etc.)
- `pinnings` — array of user's pinned projects

### Event Flow
1. HTML `[data-a]` attributes trigger action handlers
2. Handlers update `NP.S` and dispatch `NP.action()`
3. Render loop updates DOM from state
4. Focus is preserved on text inputs across renders

### Formatting
- Phone: `9898989898` → `98989 89898`
- Price: `15000000` → `₹1,50,00,000`
- Dates: `2026-12-21` → `21-Dec-2026`

## Design Notes

- **Figma divergences**: Some states drawn over outdated base page; prototype uses current version.
- **Inferred states**: Send OTP/Verify buttons, filled OTP, selected pills, request form errors, date picker—not in Figma, styled to match design language.
- **Live data**: Submit bar counts, price hints, Reported chips computed from real data, not hardcoded.

## Testing

### Visual Verification
- Compare `ref/` screenshots to app at each state
- Check alignment, spacing, colors against Figma specs
- Verify all asset images load correctly

### Flow Testing
- Desktop: dashboard → select project → create → sub-broker → success
- Mobile: same flow at 360px width
- Edge cases: demo phone/email inputs, validation errors, modal interactions

### Browser Compatibility
- Modern Chrome, Firefox, Safari (ES2020+, CSS Grid/Flex)
- Mobile devices: iOS Safari, Chrome Android

## Roadmap

- [ ] Screen-by-screen visual comparison with `ref/` and pixel fixes
- [ ] Date-picker and unit (sq.ft / sq.m) switcher designs (awaiting Figma)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Integration tests for state transitions
- [ ] Design tokens export to code

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, contribution guidelines, and code standards.

## License

© 2026 Housing.com. All rights reserved.

## Contact

For questions about this prototype, contact the design team or see [SECURITY.md](SECURITY.md) for reporting issues.
