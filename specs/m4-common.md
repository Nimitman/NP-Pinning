# m4.x common — Mobile sub-broker flow sheets (shared notes for m4.1–m4.8)

Applies to frames m4.1–m4.8 (360x800). Base page under every overlay = **m3.1** ("Create pinning — confirm details", mobile), unscrolled (browser chrome 0–106, top-panel 106–180, content from 180). Sheet shell = **cmp-m-sheet.md** (if present); everything needed is also restated here.

## Scrim
- `Overlay` 360x800 at 0,0, covers status bar + browser chrome too. Fill `rgba(0,0,0,0.30)`. Clickable (tap = close sheet; for m4.2–m4.6 a dirty flow should route to m4.7 discard dialog — inferred).

## Bottom sheet shell (all m4.x sheets except m4.7)
- Anchored to bottom, x=0, width 360, height = hug content (per-frame heights below). Background `surface/white #fff`. Radius top-left/top-right **20px**, bottom 0. `overflow:hidden`. Padding-top **8px** (hidden 40x4 grab-handle at x160,y8 — NOT visible; do not render). No shadow.
- Column: Header → Body → Actions (optional).

### Header ("Dialog header")
- Full width; padding 16 left / **48 right** / 16 top / 16 bottom; column gap 4; border-bottom 1px `border/subtle #edebdf`.
- Title: Google Sans Flex Medium 500, 16/22, ls 0, `text/primary #0f0e0d`. Header height with title only = 54px (+1 border inside).
- Optional subtitle (m4.1 only): 12px regular, line-height normal (~15px), `#666`.
- Close control: 32x32 box, absolute right 8, top 10 (relative to header), centered icon `assets/ic-x-16.svg` 16x16 (stroke #222-ish). Tap = close.

### Body ("Dialog body")
- Steps sheets (m4.2–m4.6): padding 24 all sides; inner column width 312, gap **24** between blocks.
- Step eyebrow: Google Sans Flex SemiBold 600, 12px, line-height normal (~15px), color `text/brand #4a16d9`, uppercase as written, nowrap.
- Intro paragraph: 14/20 regular, `text/primary #0f0e0d`, width 312.

### Actions ("Dialog actions")
- Full width; padding 24; border-top 1px `border/subtle #edebdf`; flex row centered, gap 12. Height 96 (48 button + 48 padding).
- Primary button full width (flex 1), height 48 (min/max 48), min-width 96, padding 12/20, radius 12, label Google Sans Flex Medium 14/20 ls .1 centered.
  - Disabled (shown in m4.2–m4.6): bg `surface/disabled #eee`, label `text/muted #666`.
  - Enabled (m4.8 "Continue"): bg `surface/brand #4a16d9`, label `#fff`. (Enabled variants for Send OTP / Verify OTP / Create sub-broker not drawn — use same brand style.)

## Phone number input (see cmp-input-field.md)
- Label row → Field 40px → supporting row; vertical gap 4.
- Field: h40, bg #fff, border 1px `border/default #ddd9ce`, radius 12, padding 8/16, row gap 8, items centered.
  - Country selector: "+91" (14/20 regular) + `assets/ic-caret-right-12.svg` rendered at 12x12 and rotated 90deg (points DOWN), gap 4. "+91" color `text/secondary #444` when field empty (m4.2), `text/primary #0f0e0d` when filled (m4.3+).
  - Divider: 1x20, `#ddd9ce`, fully rounded.
  - Value/placeholder: flex 1, 14/20 regular. Placeholder "10-digit mobile number" `text/muted #666`; value `#0f0e0d`.
  - Value display format: **5 digits, space, 5 digits** e.g. `98998 97898`. Elsewhere shown with code as `+91 98998 97898`.
- Error state: field border `semantic_border/danger #f1b7ae`; supporting row = 16x16 `assets/ic-warning-circle-danger-16.svg` + 4 gap + text 12/16 ls .1 `semantic_text/danger #8a2b20` (wraps).
- Info state (m4.3): supporting text 12/16 `semantic_text/info #214ead`, no icon, border stays default.
- Success state (m4.6): supporting text "✓ Verified just now" 12/16 color `#247840` (check is a text glyph, no icon file).

## Flow map (inferred from frame names)
- m3.1 sticky-cta "Managed by" selector tap → **m4.1** (choose manager sheet).
- m4.1: tap a person → select as manager, close sheet (back to m3.1 with that name). "Create new sub-broker" → **m4.2**.
- m4.2 enter 10 digits → Send OTP enabled → **m4.5**. If number is already a team member → **m4.3** (blocked). If number belongs to an outside Housing account → **m4.4** (blocked).
- m4.5 enter 4-digit OTP → Verify OTP → **m4.6**. "Change number" → back to m4.2 with number prefilled.
- m4.6 → Create sub-broker → **m4.8**. Closing the sheet (X/scrim) after phone verified → **m4.7** discard dialog.
- m4.7 "Keep editing" → back to m4.6; "Discard"/X → close everything, back to m3.1 (nothing saved).
- m4.8 "Continue" → **m4.9** (page with new sub-broker set as manager + success toast). "Manage team" → team management page (not in this set).
