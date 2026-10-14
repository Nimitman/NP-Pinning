# cmp: NP pinning page header + pinning-budget card (desktop)

Figma: `page-header` 12709:7412 (d1.2), 12709:7210 (d1.1), 12968:261177 (d1.2b). Sits at top of the 1200px content column (content x=100, y=91 in a 1400 frame).

All text font: "Google Sans Flex" (font-variation-settings "wdth" 100, "GRAD" 0, "ROND" 0).

## Container
- flex row, gap 24, `align-items:center`, width 1200. Height = tallest child (106 in d1.2; 86 in d1.1; 126 in d1.2b).
- d1.1 exception: header is 86 tall and the left block is top-aligned (y=0), i.e. `align-items:flex-start` there (left block is 50 tall, budget 86).

## Left block `hL` (flex:1, row, gap 12, align flex-start)
1. Back button 32x32 circle: bg #fff, border 1px #edebdf (border/subtle), radius 999, centered icon `assets/ic-caret-right-16.svg` 16x16 **rotated 180°** (points left; fill #0f0e0d). → navigates back (to seller dashboard).
2. Text column (width 579, flex column, gap 16):
   - `hT` column gap 2:
     - Title **New project pinning** — 20px/28px, SemiBold 600, #0f0e0d.
     - Subtitle **Spend your pinnings where buyers are already searching and few sellers have shown up** — 14px/20px, Regular 400, #666 (text/muted), single line.
   - Outline button **Pin a project** (d1.2, d1.2a, d1.2b only; hidden in d1.1):
     - 171x40 (min/max-h 40, min-w 80), padding 12px 32px, radius 12, border 1px #4a16d9 (border/brand), transparent bg.
     - Leading icon `assets/ic-plus-brand-16.svg` 16x16 (stroke #4a16d9), gap 4.
     - Label 14px/20px Medium 500, #4a16d9, letter-spacing 0.1px.
     - → opens the "select project" dialog (d1.3).

## Right: `pinning-budget` card (width 340, shrink 0)
- bg #fff, border 1px #edebdf, radius 12, padding 12px 16px, flex column gap 8. Height 86 (126 with Renew button).
- Row `b1` (308 wide, flex row gap 6, align center):
  - Used count e.g. **12** (d1.1: **0**) — 16px/22px **Bold 700**, #0f0e0d.
  - **of 150 pinnings used** — 12px/16px Regular, #666.
  - flex spacer.
  - Remaining e.g. **138 left** (d1.1: **150 left**) — 12px/16px SemiBold 600, #245f36 (semantic_text/success).
- Progress track: 308x6, bg #e0e0e0 (grey_neutral/2), radius 999, overflow hidden. Fill `used`: height 6, bg #4a16d9 (surface/brand), radius 999, width = used/total × 308 (12/150 → **25px**; 0 → 1px sliver).
- Row `b3` (flex row gap 6, align center): 14x14 calendar icon + 12px/16px Regular text. Three states:
  | state | card bg / border | icon | text color | text |
  |---|---|---|---|---|
  | normal (d1.1) | #fff / #edebdf | `assets/ic-calendar-dot-14.svg` (#0f0e0d) | #0f0e0d | Package valid till 12 Oct 2026 · 90 days left |
  | warning (d1.2, d1.2a) | #fff / #edebdf | `assets/ic-cal-x-fill-warning-14.svg` (#b07f25) | #7a5514 (semantic_text/warning) | Package valid till 12 Oct 2026 · 20 days left |
  | danger / expiring (d1.2b) | **#fff0ee** (semantic_surface/danger) / **#f1b7ae** (semantic_border/danger) | `assets/ic-cal-x-fill-danger-14.svg` | **#8a2b20** (semantic_text/danger) | Package valid till 12 Oct 2026 · 6 days left |
- Danger state only: full-width button **Renew now** below b3 (gap 8): 306x32 (min/max-h 32, min-w 64), bg #fff, no border, radius 8, padding 8px 12px; label 14px/20px Medium 500, #4a16d9, ls 0.1px, centered. (→ renew package flow / account manager request; likely shows d-plan-expired-thanks style confirmation.)
- In d1.2/d1.2a the card is vertically centered against the 106px left block (card y=10 in header).
