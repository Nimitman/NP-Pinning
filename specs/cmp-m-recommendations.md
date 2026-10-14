# cmp-m-recommendations — "Recommendations / Mobile" (Best opportunities module)

Figma component 12938:16773 (instances: m1.1 12936:259508, m1.2 12936:259689). Size **328x359**. Ref: `ref/cmp-m-recommendations.png`; in context `ref/m1.2.png` y 296–655.

## Container
- bg `surface/white #fff`, border 1px `border/default #ddd9ce`, radius **16**, padding **16**, `overflow:hidden` (clips the horizontally overflowing filter row and card row at the card's inner edge).
- Flex column, gap **24**, width 328 (inner 294).

## 1. Heading block (column, gap 8, full width)
- `rec-header` row (space-between):
  - Title group: flex row, gap **6**, align center.
    - Icon `assets/ic-sparkle-fill-20.svg` 20x20 (filled 4-point sparkle, #6b3d97).
    - "Best opportunities": Google Sans Flex **Medium 500, 16/22**, ls 0, #0f0e0d.
  - A "see all" link exists in Figma but is **hidden** — do not render.
- Description "High buyer demand and few sellers in your localities": **Regular 400, 12/16**, ls 0, `text/muted #666`, wraps (2 lines at 294).

## 2. Filter bar (`filter-bar` → `scope-row`): column, gap **8**
All pills: height **40**, padding **12 16**, radius **12**, flex row, gap **8**, align center, `overflow:hidden`, label **Regular 400, 14/20**, nowrap.
- Row 1 (gap 8): the two "scope" pills, **selected style**: bg `surface/subtle #faf9f5`, border **1.5px `border/selected #211d19`**, label #0f0e0d, trailing chevron `assets/ic-caret-down-18.svg` 18x18 (stroke #211d19).
  - "Gurugram" (127 wide) — opens the city picker (bottom sheet, like m2.2).
  - "Sector 71, +2" (142 wide) — opens the locality multi-select (like m2.3).
- Row 2 (gap 8, 310 wide → overflows 294 and is clipped; make it `overflow-x:auto` with hidden scrollbar): **default style**: bg #fff, border **1px `border/default #ddd9ce`**, label `text/muted #666`.
  - "High demand" (122 wide, toggle chip, no icon).
  - "Seller competition" (180 wide) + chevron `assets/ic-caret-down-muted-18.svg` 18x18 (stroke #9e9e9e) — dropdown.
  - "Developer is active" (158 wide, toggle chip, off-screen at 360).
  - Selected/active state of a row-2 chip = the selected style above (inferred from row 1).

## 3. Cards row (`cards (scroll)`)
- Horizontal scroller: flex row, gap **16**, align center; overflow-x auto (no scrollbar), cards do not shrink. Total content 806 wide (3 × 258 + 2 × 16).
- Cards: Form A of `cmp-m-np-project-card.md` (258x127), data rows 1–3 listed there.

## Height check
16 + heading 62 + 24 + filters 88 + 24 + cards 127 + 16 + 2 (border) ≈ 359.
