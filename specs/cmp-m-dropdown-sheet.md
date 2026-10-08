# cmp-m-dropdown-sheet — Mobile picker bottom sheet (City / Locality DropdownPanel)

Used by m2.2 (City DropdownPanel 12989:272475, single-select) and m2.3 (Locality DropdownPanel 12991:18340, multi-select with checkboxes + footer CTA). Mobile counterpart of desktop `cmp-city-dropdown-panel.md` / `cmp-locality-dropdown-panel.md`.
NOTE: differs from `cmp-m-sheet.md` (m3 sheets): scrim is 50% (not 30%), radius 24 (not 20), has a 1px border + shadow, no header divider.

## Scrim (`Overlay`)
- Full viewport 360x800 at (0,0), covers browser chrome too. Fill `alpha/black/50 rgba(0,0,0,0.5)`. Tap = close sheet (inferred).

## Sheet
- Position: bottom 0, x 0, width 360, **top at y=263** in the 800 viewport → height **537**.
- bg #fff, border 1px `border/default #ddd9ce`, radius **24 24 0 0**, shadow **Elevations/03** = `0 4px 12px 0 rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.08)`, overflow hidden.
- Flex column, padding **16 top / 8 bottom**, 0 sides.
- **Close control**: 32x32, absolute at sheet-relative right **10**, top **10** (frame coords 318,273), icon `assets/ic-x-16.svg` 16x16 centered (stroke #222). Tap = close without changes.

### 1. Title Bar (height 46): padding **12 16**.
- Title: Google Sans Flex **Medium 500, 16/22**, #0f0e0d. ("Select city" / "Select locality")
### 2. Search row: padding 0 16 → InputField search type (see m2.1.md): 328x40, radius 12, border #ddd9ce, `assets/ic-magnifying-glass-16.svg` + placeholder **Regular 14/20 #666** ("Search city..." / "Search locality...", with three ASCII dots).
### 3. Items: flex column, padding-top **12**, overflow hidden (scrolls).
- Menu item (`.MenuItem`): full width 360, height **40**, padding **8 16**, flex row, gap **12**, align center, position relative.
  - Label: flex 1, **Regular 400, 14/20**, ls 0.
  - Bottom divider: absolute, left 0, right 0, bottom 0, height 1, bg `border/subtle #edebdf` (on every item).
- Item states:
  - Default: bg #fff, label `text/primary #0f0e0d`.
  - Selected: bg **`surface/brand_subtle #f5f1fe`**, label **`text/brand #4a16d9`**.
  - Not allowed (disabled): no bg (white), label **`text/muted #666`**, no checkbox, and a right badge: absolute right **16**, top **14**, flex row, gap **4**, align center: `assets/ic-warning-12.svg` 12x12 (red triangle #be3f31) + "Not allowed under your plan" **Regular 400, 10/12, ls 0.2px**, #666. Not tappable.
- Multi-select only (locality): trailing checkbox slot 18x18 (`assets/checkbox-slot-bg-18.svg` is an empty transparent SVG; can be omitted) holding a **16x16** box at offset (1,1):
  - Unchecked: bg #fff, border 1px `border/default #ddd9ce`, radius **4**.
  - Checked: bg `lavender_mist/2 #eee4f1`, border 1px `border/brand #4a16d9`, radius 4, centered `assets/ic-check-12-brand.svg` 12x12.
### 4. Footer CTA (locality only): absolute, bottom 0, left 0, width 360, height 73 (sheet-relative y 464).
- bg #fff, border-top 1px `border/subtle #edebdf`, padding **12 16**.
- Button 328x48, bg `surface/brand #4a16d9`, radius 12, padding 12 20, label **Medium 500, 14/20, ls 0.1px** #fff centered. Label "Select locality". Tap = apply selection, close sheet, update the field ("Sector 49 + 2").
