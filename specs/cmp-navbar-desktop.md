# cmp: Desktop top navbar (Seller) — "Desktop top Nav - less height"

Figma: instance `Navbar` (e.g. 12709:7311) → inner `Desktop top Nav - less height` (I…;11872:324844). Used by EVERY desktop screen (d1.x, d4.x …). Ref: `ref/d1.2.png` top 67px.

## Box
- Full width 1400 (page width), height **67** (hugs content: logo wrap 16 + 35 + 16).
- Background: `linear-gradient(-83.25deg, rgb(141,113,57) 2.14%, rgb(103,82,51) 97.6%)` (light olive-brown on the RIGHT, darker brown on the LEFT).
- Bottom-left + bottom-right radius **40px**; top corners square. No border, no shadow.
- Padding left 98 / right 97 (≈ centers a 1200px inner row). Content column = `width:1200px; margin:0 auto`.
- Navbar sits at page top (y=0). Page content begins at y=91 (24px gap below navbar).

## Inner row (1200 wide): flex row, `justify-content: space-between`, `align-items: flex-start`
### 1. Logo wrap (left)
- 140 wide, flex column, padding 16 top/bottom.
- `assets/housing-logo-seller-dark.svg` rendered **140x35** (SVG root 140.002x35). Contains yellow house mark + "HOUSING.COM" white wordmark + "Seller" sub-label — do NOT recreate as text.
- Clickable (→ seller dashboard home).

### 2. Menu bar (center): flex row, gap **48**, align center
Each item = `d-web-top-menu-item`: flex column, height **44**, gap 20, `justify-content:flex-end`, align-items center. (So label sits at y=24..44 of the navbar; i.e. label baseline area roughly vertically centered with logo.)
- Font: **Rubik** (brand_font), 16px / line-height 20px, letter-spacing 0, white (#fff).
- Items, left→right (verbatim):
  1. **Dashboard** — ACTIVE: Rubik Medium 500, opacity 1. Above it a 4px-tall white bar (`#fff`, background/neutral/primary), full item width, bottom-left/right radius 8, flush to top of navbar (y=0..4). (Bar + 20 gap + 20px label = 44.)
  2. **Leads** — Rubik Regular 400, **opacity 0.7**.
  3. **Listings** — Regular 400, opacity 0.7.
  4. **Packages** — Regular 400, opacity 0.7.
  5. **More** — Rubik Medium 500, opacity 1, followed (gap 4) by chevron `assets/ic-chevron-down-white-16.svg` 16x16 (white fill) — opens a dropdown (not designed here).
- Inactive items have no top bar (the 44px column just has the label at the bottom).
- Rendered x positions (frame coords) for reference: Dashboard ~417–501, Leads ~549–593, Listings ~642–701, Packages ~749–820, More ~869–927.
- Hover (not designed): suggest opacity 1.

### 3. RHS links (right): flex row, gap **16**, align center, padding-top **14**
- a) Coin balance: flex row gap 4, align center.
  - `assets/ic-coin-16.svg` rendered **15.46 x 16** (gold coin with gradients).
  - Text **890** — Rubik Medium 500, 14px / 16px line-height, white, **underlined** (text-decoration underline, from-font thickness), center. Clickable (→ coins/wallet).
- b) Primary button **Add Property**:
  - bg `#5e23dc` (background/brand/primary), radius 8, height **40** (min/max 40), padding 8px 12px, flex row gap 4, center.
  - Leading plus icon 14x14: `assets/ic-plus-14.svg` — NOTE: the exported SVG path fill is #222222 but the design renders it **white**; render it white (e.g. CSS `mask-image:url(ic-plus-14.svg); background:#fff`, or `filter: brightness(0) invert(1)`).
  - Label "Add Property" — Rubik Medium 500, 14px/16px, white, centered.
  - Rendered position ≈ x 1169–1300, y 14–54 in the 1400 frame.

## Notes
- Text color token: text/grey_inverse/grey_inverse1 = #fff.
- No avatar / profile icon / notification bell appears in this navbar version (the "less height" variant has only logo, 5 menu items, coin balance and Add Property).
- Identical in d1.1, d1.2, d1.2a, d1.2b.
