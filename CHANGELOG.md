# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- [ ] Screen-by-screen visual comparison with `ref/` and pixel fixes
- [ ] Date-picker and unit (sq.ft / sq.m) switcher designs (awaiting Figma)
- [ ] Accessibility audit and WCAG 2.1 AA compliance
- [ ] Integration tests for state transitions
- [ ] Design tokens export to code

---

## [0.2.0] - 2026-10-08

### Added
- Mobile stylesheet (`mobile.css`) with bottom sheets, picker sheets, sticky bars
- Mobile device frame preview showing Android/Chrome mock from Figma
- Screens switcher panel (`hooks.js` / `hooks.css`) for jumping between 66 Figma states
- Keyboard navigation: `[` and `]` to step through states in order
- URL hash deep-linking: append `#d3.6` or `#m4.5` to jump to any state
- Desktop layout scaling between 768–1280px viewport width
- Scroll position preservation for named scrollable elements during re-renders
- Auto-layout fallback for screens narrower than min-width requirement

### Fixed
- Body class name collision between scroll-lock (`lock`) and "Not allowed" badge styling
- Missing stylesheet references in index.html
- Viewport scaling issue on tablets (was requiring horizontal scroll)

### Changed
- Updated README with navigation guide and state jump instructions
- Reorganized project structure documentation
- Improved error handling in render loop

### Technical
- Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

---

## [0.1.0] - 2026-10-07

### Added
- Complete NP pinning prototype (WIP designation)
- Desktop layout (1400px fixed width)
  - Navbar with logo, navigation, coin balance, Add Property button
  - Dashboard: budget card, recommendation carousel, Your Pinnings table
  - Select Project modal: city/locality pickers, project typeahead, summary card
  - Create Pinning flow: date picker, 30/60/90 day pills, config table with inline edit
  - Sub-broker management: 3-step flow (phone → OTP → details), manager dropdown
  
- Mobile layout (360px fixed width)
  - Browser chrome mock: status bar, Chrome toolbar, address bar
  - Top panel: back button, headline, subtitle
  - Dashboard: budget card, recommendation carousel, Your Pinnings table
  - All flows responsive to 360px viewport
  
- State management
  - Single `NP.S` state object with complete app state
  - 60+ action handlers in `NP.actions`
  - Event delegation via `[data-a]` attributes
  - Input binding via `[data-bind]` attributes
  - Focus preservation across renders
  
- Form validation
  - Phone formatting: `9898989898` → `98989 89898`
  - Price formatting: `15000000` → `₹1,50,00,000`
  - OTP validation (4 digits)
  - Email validation
  - Password requirements (8+ chars, contains number)
  - Demo inputs triggering designed states
  
- Interactive features
  - Project selection with city/locality/project search
  - Configuration table with select-all checkbox, inline price editing
  - Report issue modal with expandable reasons
  - Add missing configuration modal with linked price/rate conversion
  - Sub-broker creation with OTP resend timer (24-second countdown)
  - Toast notifications with optional undo/change actions
  
- Navigation
  - 66 Figma states (desktop d1.1–d4.9, mobile m1.1–m4.9)
  - Route-based page rendering
  - Smooth transitions between states
  - Scroll to top on route changes
  
- Assets and Design
  - 89 icons and images exported from Figma (unmodified)
  - Bricks Design System tokens (colors, typography, spacing, radii)
  - Google Sans Flex font with CSS variation settings
  - Rubik font for navbar and CTA labels
  - Complete design specs in `specs/` folder
  - Figma reference renders in `ref/` folder
  
- Documentation
  - README with feature overview, navigation guide, demo inputs, roadmap
  - Project structure documentation
  - Asset manifest mapping Figma layers to files
  - Per-screen implementation specs

### Known Limitations
- Visual fidelity spot-checked against `ref/`, not screen-by-screen
- Some states inferred (not drawn in Figma): OTP buttons, property type pills, request form errors
- Date picker and unit switcher designs not yet in Figma
- No accessibility features implemented (roadmap item)
- No backend integration; data is in-memory only

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

### Technical Details
- No build step required
- Plain HTML, CSS, JavaScript (ES2020+)
- Zero npm dependencies
- Fonts from Google Fonts
- ~500 lines app.js, ~1600 lines desktop.js, ~1400 lines mobile.js, ~2000 lines styles.css

---

## Versioning

This project uses [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes or complete redesigns
- **MINOR**: New features, new Figma states, new flows
- **PATCH**: Bug fixes, styling corrections, documentation

## Release Schedule

Releases are made as features are completed:

- **0.1.0** - Initial prototype with core flows
- **0.2.0** - Mobile support and state navigation
- **0.3.0** - Visual parity and bug fixes (roadmap)
- **1.0.0** - Production-ready (future)

---

## Contributing

To contribute changes, see [CONTRIBUTING.md](CONTRIBUTING.md).

For security issues, see [SECURITY.md](SECURITY.md).

---

[Unreleased]: https://github.com/Nimitman/NP-Pinning/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Nimitman/NP-Pinning/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Nimitman/NP-Pinning/releases/tag/v0.1.0
