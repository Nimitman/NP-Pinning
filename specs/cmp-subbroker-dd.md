# cmp: subBroker dd ("Who manages this pinning?" dropdown panel)

Figma: local component `subBroker dd` 12689:151489 (desktop). Instances: d4.1 12709:10374, d4.2–d4.8 (open under modal scrim), d4.9 hidden.
Ref image: ref/cmp-subbroker-dd.png (component default), ref/d4.1.png (instance in context).

## Container
- width 362, height hugs content (~304), max-height 360, overflow hidden (scroll list if more people).
- bg #fff; border 1px #ddd9ce (border/default); radius 12.
- shadow (Elevations/03): `0 4px 12px 0 rgba(0,0,0,.12), 0 4px 6px -2px rgba(0,0,0,.08)`.
- padding-top 16, padding-bottom 8, flex column, no gap.

## Title bar
- padding 0 16 12 16; border-bottom 1px #edebdf (border/subtle); flex column, gap 4.
- "Who manages this pinning?" — 16/22, weight 500, #0f0e0d.
- "Leads from this pinning go to the manager" — 12px, line-height normal (~15), 400, #666.
- Title bar total height ≈ 53.

## Person row (repeat)
- flex row, align center, gap 12, padding 10 16, border-bottom 1px #edebdf. Row height 56 incl. border.
- Avatar 32x32 circle (radius 999), centered initials 12px semibold.
  - Current/selected user: bg #4a16d9 (surface/brand), initials #fff. In the d4.1 instance the avatar is a photo instead: assets/avatar-jitesh-kumar.png (JPEG data, 600x675 source; render 32x32 object-fit cover, circular).
  - Others: bg #e0e0e0 (grey_neutral/2), initials #0f0e0d.
- Text column flex 1, gap 2: name 14px 400 #0f0e0d (line-height normal ~18); meta 12px 400 #666 (~15).
- Selected row bg #f5f1fe (surface/brand_subtle). Hover (not in design): suggest same tint.

Row data (the component default uses "•" separators; the screen instances use "·", so use "·" on screens):
| initials | name | meta | state |
|---|---|---|---|
| JK (or photo) | Jitesh Kumar | You · Admin · 4 pinnings | selected (bg #f5f1fe) |
| AJ | Aakriti Jain | Sub-broker · 4 pinnings | default |
| RM | Rohit Mehra | Sub-broker · 2 pinnings | default |

## Create row (last, no bottom border)
- flex row, align center, gap 10, padding 12 16. Height ≈ 59.
- "+" glyph: 18px semibold #4a16d9 (text, not an icon asset).
- Column (gap 2, bg #fff): "Create new sub-broker" 14px semibold #4a16d9; "3 of 5 sub-brokers used · verify by OTP" 12px 400 #666.
- Click → opens "Create a sub-broker" modal step 1 (d4.2).

## Placement on the page (desktop)
- Opens upward from the submit-bar "Managed by" selector; right edge aligned to the selector's right edge (dropdown x = selector right − 362).
- d4.1: frame coords x=701, y=811 (content coords 601,720); its bottom (≈1115) overlaps the selector top (1105) by ~10px.
- No scrim for the dropdown.
- Selecting a person row sets the manager and closes; clicking outside closes.
