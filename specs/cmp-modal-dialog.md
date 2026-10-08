# cmp: Modal dialog shell (desktop, 560 wide)

Used by d4.2–d4.8 (and probably other desktop modals). Example Figma node: 12709:10660.

## Scrim
- `Overlay` instance: full frame 1400x1235, fill rgba(0,0,0,0.5) (alpha/black/50). Checked against the render: page bg #faf9f5 shows as ~#7d7c7a.
- Page content, including any open dropdown, stays rendered under the scrim.

## Panel
- width 560; height hugs content; x=420 (centered in 1400), top y=160 (d4.8 sits at y=180).
- bg #fff; radius 16 (radius-l); overflow hidden.
- shadow (Elevations/04): `0 6px 16px 0 rgba(0,0,0,.14), 0 6px 8px -3px rgba(0,0,0,.09)`.
- flex column.

## Dialog header (height 54 incl. border)
- padding 16; border-bottom 1px #edebdf.
- Title: 16/22, weight 500, #0f0e0d, left aligned, single line.
- Close control: 32x32 hit area, absolute top 10 / right 10; holds the 16x16 X icon `assets/ic-x-16.svg`, centered.

## Dialog body
- padding 24; inner column gap 24 (step screens) or 12/16 (discard/success).

## Dialog actions (height 96 incl. border)
- border-top 1px #edebdf; padding 24; flex row, gap 12; buttons flex:1.
- Button: height 48 (min/max 48), min-width 96, padding 12 20, radius 12; label 14/20 weight 500, letter-spacing 0.1px, centered.
  - Disabled primary: bg #eee (surface/disabled), label #666.
  - Primary: bg #4a16d9, label #fff.
  - Secondary (outline): border 1px #4a16d9, no fill, label #4a16d9.
  - Destructive: bg #be3f31 (error/600), label #fff.

## Step eyebrow (sub-broker modal)
- e.g. "STEP 1 OF 3 · VERIFY PHONE": 12px, weight 600, #4a16d9, line-height normal (~15), uppercase as written.

## Differences in d1.3–d1.9a ("select project dialog", e.g. 12909:242860) — added by d1.3–d1.9a spec
- Same shell. Top is **y=69** (2px below the 67px navbar), x=420. Heights: 426 (d1.3–d1.6), 605 (d1.7), 530 (d1.8), 762 (d1.9), 400 (d1.9a, body fixed 250 tall → blank space under text).
- Scrim instance there is 1400x1215 inside a 1400x1264 frame (bottom 49px uncovered in Figma — artifact; implement full-viewport `position:fixed; inset:0`). Navbar is dimmed by the scrim too.
- Header: implement as `box-sizing:border-box; height:54px; padding:16px 16px 15px; border-bottom:1px solid #edebdf`. Close icon = `assets/ic-x-16.svg` (stroke #222).
- Actions hold a single full-width button (512x48). Disabled primary used in d1.3–d1.6 ("Start pinning this project").
- Dropdown panels (cmp-city/locality/project-dropdown-panel) open flush under their field and are allowed to overflow below the dialog's bottom edge (rendered above the dialog, not clipped).

---
## Mobile differences (m4.7 centered dialog; added by m4 agent)
- Panel width 328, left 16, top 256 in a 360x800 viewport (vertically centered, height hugs ≈288). Radius 16, bg #fff, **no shadow** in Figma.
- Scrim rgba(0,0,0,0.30) (not 0.5), covers status bar + browser chrome.
- Close control at top 10 / **right 8**; header padding 16 / 48 right.
- Mobile bottom sheets (m4.1–m4.6, m4.8) share header/body/actions styles but differ in shell: full width 360, bottom-anchored, top radii 20, padding-top 8, no shadow — see `m4-common.md`.

## Status / alert modal variant (560x272) — added by d1.x dashboard spec
Used by d-limit-reached (12973:261792), d-limit-reached-thanks (12973:261940), d-plan-expired (12973:261874), d-plan-expired-thanks (12973:261906). Same shell (header 54 / actions 96).
- Body: padding 24; single row `gap 16, align flex-start` (512 wide, 74 tall):
  - 48x48 status icon: `assets/ic-warning-fill-danger-48.svg` (red #be3f31 filled triangle w/ white "!") or `assets/ic-check-circle-success-48.svg` (green #2f7f49 filled circle w/ white check).
  - Text column (flex 1 = 448, gap 12): heading 18px/26px SemiBold 600 #0f0e0d; body 14px, line-height normal (~18px; 2 lines = 36), Regular, #666.
- Actions: one full-width primary button 512x48 (#4a16d9, white label 14/20 Medium ls 0.1).
- These frames are drawn standalone in Figma (no scrim); render them centered over the dashboard with the standard rgba(0,0,0,.5) scrim above.
