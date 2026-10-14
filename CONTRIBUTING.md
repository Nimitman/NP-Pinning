# Contributing to NP-Pinning

Thank you for your interest in contributing to the NP-Pinning prototype! This document outlines how to get started, propose changes, and maintain quality standards.

## Code of Conduct

Please review [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing. We're committed to creating a welcoming, respectful environment.

## Getting Started

### Prerequisites
- Node.js 16+ (for running a dev server, though not required)
- Git
- A text editor or IDE
- Modern browser (Chrome, Firefox, Safari)

### Setup

```bash
# Clone the repository
git clone https://github.com/Nimitman/NP-Pinning.git
cd NP-Pinning

# Run the dev server (any port works)
python3 -m http.server 8765

# Open in browser
open http://localhost:8765
```

### Project Structure Quick Reference
- `index.html` — Entry point
- `app.js` — State management, ~500 lines
- `desktop.js` / `mobile.js` — UI templates, ~1600/1400 lines
- `styles.css` / `mobile.css` — Styling
- `hooks.js` — Screen switcher (66 Figma states)
- `data.js` — Static data from Figma
- `assets/` — Exported icons/images (do not edit; re-export from Figma)

## Making Changes

### Principles

1. **Single source of truth**: All state lives in `NP.S` object. Never maintain parallel state.
2. **Event delegation**: Use `[data-a]` attributes for click handlers, `[data-bind]` for input binding.
3. **No build step**: Keep it plain HTML/CSS/JS—open `index.html` and it works.
4. **Render from state**: The `render()` function is pure; same input = same output.
5. **Preserve focus**: Input focus and text selection persist across re-renders.

### Workflow

1. **Create a branch** from `np-pinning-prototype`:
   ```bash
   git checkout np-pinning-prototype
   git pull origin np-pinning-prototype
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Edit files locally
   - Test in browser (F12 for console; check for errors)
   - Test both desktop and mobile (toggle in Screens switcher)

3. **Test your changes**:
   - Verify affected screens render correctly
   - Check console for errors or warnings
   - Test edge cases (empty states, long text, validation errors)
   - Compare visually against `ref/` screenshots

4. **Commit with clear messages**:
   ```bash
   git add .
   git commit -m "Fix: correct alignment in config table on mobile

   - Adjusted padding to match Figma specs
   - Verified on 360px viewport
   - No visual regressions on desktop"
   ```

5. **Push and create a pull request**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Open a PR on GitHub with a description of changes and testing notes.

## Coding Standards

### JavaScript

- **Variables**: `camelCase` for variables, `UPPER_CASE` for constants
- **Functions**: Named functions, no anonymous unless short callback (< 1 line)
- **Comments**: Only when *why* is non-obvious; don't explain what the code does
- **Formatting**: 2-space indentation, no semicolons (ASI)
- **Error handling**: Validate at system boundaries (user input, Figma exports); trust internal APIs

### CSS

- **Tokens**: Define colors and sizing as CSS variables in `:root`
- **BEM-lite**: `.component__element--modifier` for clarity; no nesting
- **Mobile-first**: Write mobile styles first, then desktop overrides
- **Avoid over-specificity**: Use class selectors, not IDs
- **Theme-aware**: Every color must work in both light and dark modes

### HTML

- **Semantic**: Use `<button>`, `<input>`, `<label>` correctly
- **Accessibility**: Label form fields, use ARIA where needed (roadmap item)
- **Data attributes**: Use `[data-a]` for actions, `[data-v]` for values, `[data-bind]` for binding

## Common Tasks

### Adding a New State / Screen

1. Add screen spec to `specs/` (copy & rename from similar screen)
2. Add screen to `hooks.js` flat array with setup function
3. Add UI template to `desktop.js` or `mobile.js`
4. Wire state bindings in `app.js` render function
5. Test via Screens switcher: `NP.goto('new-code')`
6. Compare against Figma reference in `ref/`

### Fixing a Bug

1. Identify the screen(s) affected (use Screens switcher to find the state)
2. Read the relevant code section (`app.js` for logic, `desktop.js`/`mobile.js` for UI)
3. Make the fix (typically a 1–3 line change)
4. Test the fix on that screen and adjacent states
5. Check console for new errors
6. Commit with a clear "Fix:" message

### Updating Styles

1. Edit `styles.css` (desktop) or `mobile.css` (mobile)
2. Test in browser (F12 → Styles tab to debug)
3. Verify both light and dark themes (if applicable)
4. Check responsive behavior (resize viewport or toggle device mode)
5. Compare against `ref/` for visual parity

### Exporting Assets

1. Open Figma file (Broker Dashboard → Broker NP pinning)
2. Select component or layer to export
3. In Figma's export panel, set format (SVG, PNG) and scale (2x for icons)
4. Download and place in `assets/` folder
5. Update `MANIFEST.txt` with layer name → filename mapping
6. Test in app (ensure image loads and displays correctly)

## Testing Checklist

Before submitting a PR, verify:

- [ ] Code runs without console errors or warnings
- [ ] All affected screens render correctly
- [ ] Desktop and mobile layouts both work
- [ ] Form inputs validate as designed
- [ ] Navigation between screens works
- [ ] Visual changes match Figma reference (`ref/`)
- [ ] Focus and text selection preserved on input changes
- [ ] No performance degradation (scrolling, interactions smooth)
- [ ] Commit messages are clear and follow conventions

## Pull Request Process

1. **Title**: Start with a verb (Fix, Add, Update, Refactor, etc.)
   ```
   Fix: alignment issue in configuration table on mobile
   ```

2. **Description**: Include
   - What changed and why
   - Screens affected
   - Testing notes
   - Reference to related issues (if any)

   ```
   ## Summary
   Fixed config table padding that didn't match Figma on mobile.
   
   ## Testing
   - [x] Tested on m3.5 (create pinning with configs)
   - [x] Verified desktop d3.1 unaffected
   - [x] No console errors
   - [x] Visual parity with ref/m3.5.png confirmed
   ```

3. **Review**: A maintainer will review within 2 business days. Respond to feedback and push updates to the same branch.

4. **Merge**: Once approved, your PR will be merged into `np-pinning-prototype` and included in the next release.

## Release Process

Maintainers follow these steps:

1. Update `CHANGELOG.md` with all merged changes since last release
2. Bump version in `package.json` or top comment in `index.html` (SemVer)
3. Tag the commit: `git tag v0.2.0`
4. Push: `git push origin np-pinning-prototype && git push origin v0.2.0`
5. Open release on GitHub with changelog

## Reporting Issues

Found a bug? Have a suggestion? Open an issue on GitHub with:

- **Description**: What's happening vs. what should happen
- **Steps to reproduce**: How to trigger the issue
- **Screenshots**: Visual comparison if it's a styling issue
- **Environment**: Browser, device, screen size
- **Figma state**: Which state code exhibits the problem

See [SECURITY.md](SECURITY.md) for reporting security issues.

## Questions?

- **Design questions**: Review `specs/` folder and Figma file
- **Code structure**: See README Architecture section
- **Feature ideas**: Open a discussion or issue on GitHub
- **Urgent issues**: Contact the team directly

Thank you for contributing!
