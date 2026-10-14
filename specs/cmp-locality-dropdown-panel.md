# cmp-locality-dropdown-panel — "Locality DropdownPanel" (desktop local component, multi-select)

Figma component set 12605:138617: `Property 1=Default` (12597:138483, 362x360) and `Property 1=no results found` (12605:138618, 362x142). Instance in d1.5: 12991:18615 (detached frame), **512x360** at modal-relative (24, 222) = directly under the "Select locality" field (0 gap).

Shell, search row, menu-item geometry, "Not allowed" badge: identical to cmp-city-dropdown-panel.md. Differences below.

## Search
- Placeholder **"Search locality..."** (14/20 #666), leading magnifier `assets/ic-magnifying-glass-16.svg`.

## Items (multi-select with checkboxes) — as used in d1.5
- Each selectable item has a trailing **18x18** slot (`.Trailing icon components`) containing a 16x16 checkbox at offset (1,1). (`assets/checkbox-slot-bg-18.svg` is an empty transparent placeholder vector — no visible pixels; you can skip it and just reserve 18x18.)
  - Unchecked: 16x16, bg #fff, border 1px #ddd9ce, radius 4 (radius-xs).
  - Checked: 16x16, bg **#eee4f1** (lavender_mist/2), border 1px **#4a16d9** (border/brand), radius 4, centered 12x12 tick `assets/ic-check-12-brand.svg` (stroke #4A16D9, 1.5px).
- Selected row: bg #f5f1fe, label #4a16d9, checkbox checked.
- Not-allowed row: label #666, no checkbox, right badge (warning 12 + "Not allowed under your plan").

## Locality list (verbatim, in order)
| # | Label | d1.5 state |
|---|---|---|
| 1 | DLF Phase 1 | unchecked |
| 2 | Sector 49 | **selected/checked** |
| 3 | Sohna Road | unchecked |
| 4 | Golf Course Road | **not allowed** ("Not allowed under your plan") |
| 5 | MG Road | unchecked |
| 6 | Cyber City | unchecked (partly hidden behind sticky CTA) |
| 7 | Sector 56 | hidden behind sticky CTA / scroll |
| 8 | Udyog Vihar | hidden / scroll |
(The library Default variant has the same 8 labels, without checkboxes and without the selected highlight; d1.5's instance adds checkboxes + sticky CTA.)

## Sticky CTA (d1.5 only, "sticky-cta" 12991:18982)
- Absolute at panel bottom (bottom −1, left −1, width 512 → covers the panel border), height 73: bg #fff, **border-top 1px #edebdf**, padding 12 16.
- Button: full width (480) x **48**, **outline/secondary**: no fill, border 1px **#4a16d9**, radius 12, padding 12 20; label **"Select locality"** Google Sans Flex Medium 14/20 ls .1 **#4a16d9**, centered.
- Click → applies checked localities, closes panel; field then shows "Sector 49 + 2" (first + N more) as in d1.6/d1.7.
- Items list scrolls under the sticky CTA.

## Variant: no results found
- Same as city no-results but copy: **No locality match “hubhon”.** + "Clear search" link.
