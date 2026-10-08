# cmp-m-your-pinnings — "Your pinnings — mobile" (mobile local component)

Figma component 13002:152396 (instance in m1.2: 13002:152425). Size **328x926** with 4 cards. Ref: `ref/cmp-m-your-pinnings.png`, in context `ref/m1.2.png` y 671–1597.

## Container
- bg `surface/white #fff`, border 1px `border/default #ddd9ce`, radius **16**, padding **16**, `overflow:hidden`.
- Flex column, gap **16**, align start. Inner width 294.

## 1. Header (flex row, space-between, align center, full width)
- Left: "Your pinnings" — Google Sans Flex **Medium 500, 16/22**, ls 0, `text/primary #0f0e0d`.
- Right group: flex row, gap **16**, align center:
  - `view-all` link (Export): flex row, gap **4**, align center.
    - Text "Export": **Medium 500, 14/20**, `text/brand #4a16d9`.
    - Icon `assets/ic-export-brand-16.svg` 16x16 (export / upload-tray arrow, brand purple). Tap = export pinnings list (inferred: CSV download).
  - Collapse toggle (`next icon`): 36x36 box = padding **8** + 18px icon + 1px border; bg #fff, border 1px `border/default #ddd9ce`, radius **8**, shadow **Elevations/02** = `0 2px 4px -1px rgba(0,0,0,0.07), 0 2px 8px 0 rgba(0,0,0,0.10)` (Figma codegen showed `drop-shadow(0 2px 4px rgba(0,0,0,.1)) drop-shadow(0 2px 2px rgba(0,0,0,.07))`; either is visually fine).
    - Icon `assets/ic-caret-up-18.svg` 18x18 (stroke #222). Tap = collapse the card to just its header (expanded state shown; collapsed state = caret down, see desktop d1.2a for analogous behaviour).

## 2. Status filter tabs (`Status filters`, width 294 visible area, `overflow:hidden`; make it horizontally scrollable, no scrollbar)
- Tab strip: height **40**, border-bottom 1px `border/default #ddd9ce`, padding 0 2, flex row, gap **2**, align start.
- Each tab: height 40, min-width **72**, padding-bottom 2, column; inner surface flex 1, padding 0 **12**, centered. Label **Regular 400, 14/20**, nowrap.
  - Selected: label `text/primary #0f0e0d`; indicator bar absolute bottom 0, left 0, right 0, height **3**, bg `warm_neutral/900 #211d19`, radius 4 4 0 0.
  - Unselected: label `text/muted #666`, no indicator.
- Tabs (verbatim): "All (12)" (selected), "Active (8)", "Expired (2)", "Pending (2)", "Rejected (0)". At 360 the strip is cut after "Pendi…" (the rest scrolls).
- Approx tab widths: All 72, Active 87, Expired 95, Pending 95…

## 3. Pinnings list (`Pinnings list`)
- Flex column, gap **12**, full width. Each item = `cmp-m-pinning-card.md`.
- Card data in order (m1.2 / master):
  1. Emaar Digihub · Sector 62, Gurugram · **Active** · "30 days left" · Duration "30 days" · Managed by "Jitesh Kumar" · Start "15-09-2026" · End "21-12-2026"
  2. Bestech Sanskriti · Sector 92, Gurugram · **Active** · "12 days left" · "90 days" · "Jitesh Kumar" · "01-06-26" · "21-12-2026"
  3. Godrej Aria · Sector 79, Gurugram · **Ending soon** · "4 days left" (red) · "90 days" · "Jitesh Kumar" · "01-07-26" · "01-10-2026"
  4. M3M Capital · Sector 113, Gurugram · **Pending approval** · (no days line) · "60 days" · "—" · "—" · "—" (dash values #666)
- Each card is 174 tall, 186 pitch. Vertical budget: 16 pad + header 36 + 16 + tabs 40 + 16 + list (4×174 + 3×12 = 732) + 16 + pagination 40 + 16 pad ≈ 926 (incl. 1px borders).

## 4. Pagination (`Pagination wrapper`)
- Full width, padding-top **8**, column, centered. Inner row: flex, gap **8**, centered.
- Prev button: 32x32, radius 8, no bg/border, centered icon `assets/ic-pagination-prev-16.svg` 16x16 (caret-left, stroke #0f0e0d).
- Current/total pill: height 32, padding 0 8, bg `warm_neutral/200 #edebdf`, border 1px `border/default #ddd9ce`, radius 8. Text "1 / 12" **Regular 400, 14/20**, #0f0e0d.
- Next button: same as prev with `assets/ic-pagination-next-16.svg` (caret-right).
