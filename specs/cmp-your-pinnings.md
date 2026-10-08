# cmp: "Your pinnings" section — header, tabs, pinnings table, pagination, collapsed banner (desktop)

Figma: `your-pinnings` 12973:262486 (d1.2), 12968:261249 (d1.2b), collapsed `view pinning Banner` 12968:260179 (d1.2a). Font "Google Sans Flex" (wdth 100, GRAD 0, ROND 0).

## Shell (expanded)
- width 1200; bg #fff; border 1px #edebdf; radius 16; padding 24; flex column, gap 24, align flex-start.
- Height 505 (d1.2) / 517 (d1.2b — header row is 34 tall because of the collapse button).

## 1. Header row (width 1150, flex row, space-between, align center)
- Left: **Your pinnings** — 16px/22px SemiBold 600, #0f0e0d.
- Right group (flex row gap 16, align center):
  - Link `view-all`: **Export** 14px/20px Medium 500, #4a16d9 + 16x16 `assets/ic-export-brand-16.svg` (export/share-up icon, brand color), gap 4. → downloads pinnings list (CSV).
  - d1.2b only: collapse button 34x34 (bg #fff, border 1px #ddd9ce, radius 8, padding 8, Elevations/02 shadow) with `assets/ic-caret-up-18.svg` (stroke #222). Click → collapses to banner (§6). d1.2 has no collapse button.

## 2. Tabs (underline tabs) — 472x40
- Container: flex row, gap 2, padding 0 2px, height 40, **border-bottom 1px #ddd9ce**.
- Each tab: height 40, min-width 72, padding-bottom 2, column; inner surface padding 0 12px, centered label 14px/20px Regular.
- Labels (verbatim): **All (12)** | **Active (8)** | **Expired (2)** | **Pending (2)** | **Rejected (0)**
- Selected (All (12)): label #0f0e0d + indicator bar absolute bottom 0, left 0, right 0, height **3px**, bg #211d19 (warm_neutral/900), top-left/top-right radius 4.
- Unselected: label #666, no bar.
- Rendered x of tabs within section (approx): All 2–74, Active 76–162, Expired 164–262, Pending 264–364, Rejected 366–470.

## 3. Table (width 1150, border 1px #edebdf, radius 12, overflow hidden, flex column)
Column widths (inside 16px left padding): Project **320** | Start date **150** | Ends in **124** | Status **210** | Managed by **196** (rest empty).
- `thead`: bg #faf9f5 (surface/subtle), padding 10px 16px, height 36. Labels 12px/16px Medium 500, #666, ls 0.1px: **Project**, **Start date**, **Ends in**, **Status**, **Managed by**.
- Rows: bg #fff, padding 12px 16px, align center, height 62–63; rows 2+ have border-top 1px #edebdf.
  - Project cell: column gap 2 — name 14px/20px Medium 500 #0f0e0d; locality 12px/16px Regular #666.
  - Start date: 14px/20px Regular #0f0e0d.
  - Ends in: 14px/20px Regular #444 (warning rows: #7a5514).
  - Status badge: pill, radius 999, padding 2px 10px, border 1px, text 12px/16px Medium 500 (height 22).
  - Managed by: 14px/20px Regular #0f0e0d.

| Project / locality | Start date | Ends in | Status | Managed by |
|---|---|---|---|---|
| Bestech Sanskriti / Sector 92, Gurugram | 01-06-26 | 12 days | Active | Jitesh Kumar |
| Emaar Digihub / Sector 62, Gurugram | 15-09-26 | 46 days | Active | Jitesh Kumar |
| Godrej Aria / Sector 79, Gurugram | 01-06-26 | 4 days (#7a5514) | Ending soon | Jitesh Kumar |
| M3M Capital / Sector 113, Gurugram | — (SemiBold 600, #0f0e0d) | — (#444) | Pending approval | — (#666) |

Status badge colors:
| status | bg | border | text |
|---|---|---|---|
| Active | #edf8ee (semantic_surface/success) | #bfe3c6 | #245f36 |
| Ending soon | #fff8e8 (semantic_surface/warning) | #f0d79a | #7a5514 |
| Pending approval | #eef4ff (semantic_surface/info) | #b7d0ff | #214ead |
(Expired / Rejected badges not drawn; suggest neutral #eee/#ddd9ce/#666 and danger #fff0ee/#f1b7ae/#8a2b20.)
Dashes are em-dash "—".

## 4. Pagination (centered, 292x32) — component `Pagination` Device=Desktop
- flex row gap 8, align center: prev button + page group + next button.
- Prev / next: 32x32, radius 8, centered 16x16 icon `assets/ic-pagination-prev-16.svg` / `assets/ic-pagination-next-16.svg` (stroke #0f0e0d chevrons). No border/bg.
- Page group: flex row gap 4. Items 32x32, radius 8, label 14px/20px Regular #0f0e0d centered.
  - Selected (1): bg #edebdf (warm_neutral/200), border 1px #ddd9ce, radius 8.
  - Items: **1** (selected) **2** **3** **4** **...** (ellipsis: #666, padding 0 8) **12**.

## 5. Spacing inside shell (d1.2)
header y=25 (h22) → tabs y=71 (h40) → table y=135 (h289) → pagination y=448 (h32) → bottom padding 24.

## 6. Collapsed banner — `view pinning Banner` (d1.2a)
- width 1200, height 96; bg #fff, border 1px #edebdf, radius 16, padding 24; inner row width 1150 space-between, align center.
- Left column (gap 4): **Your pinnings** 16px/22px SemiBold #0f0e0d; **You have total of 8 active, 2 pending and 3 expired pinnings.** 14px/20px Regular #666.
- Right: expand button 34x34 (bg #fff, border 1px #ddd9ce, radius 8, padding 8, Elevations/02 shadow) with `assets/ic-caret-down-dark-18.svg` (stroke #222). Click → expands to §1–4 (d1.2b layout with Export + caret-up).
- Export link hidden in collapsed state.
