# cmp-city-dropdown-panel — "City DropdownPanel" (desktop local component)

Figma component set 12605:138526: variants `Property 1=Default` (12597:138482, 362x360) and `Property 1=no results found` (12605:138527, 362x142). Instance in d1.4: 12909:243586, resized to **512x360**, at modal-relative (24, 138) = directly under the "Select city" field (0 gap).

## Panel shell (shared by City/Locality panels)
- bg #fff; border 1px #ddd9ce (border/default); radius 12 (radius-m); `overflow: hidden`.
- Shadow (Elevations/03): `0 4px 12px 0 rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.08)`.
- Padding: top 16, bottom 8 (Default) / bottom 24 (no-results). Flex column.
- Height: fixed **360** in Default (list scrolls/clips), hug (142) in no-results.

## Search row
- Wrapper padding 0 16 → field width = panel width − 32 (480 in d1.4).
- Field = InputField without label (see cmp-input-field.md): h40, border 1px #ddd9ce, radius 12, padding 8/16, gap 8; leading `assets/ic-magnifying-glass-16.svg` 16x16; placeholder **"Search city..."** 14/20 #666.

## Items list
- Container: padding-top 12; flex column; `overflow: hidden` (implement as `overflow-y:auto` within the 360 height).
- Menu item: height **40**, padding 8/16, gap 12, flex row align center, full width; label 14/20 Regular, flex 1.
  - Bottom divider: absolute 1px line #edebdf (border/subtle) across full width at bottom.
  - **Default**: bg #fff, label #0f0e0d.
  - **Selected**: bg **#f5f1fe** (surface/brand_subtle), label **#4a16d9** (text/brand). No check icon for city (single select).
  - **Not allowed (plan-locked)**: bg transparent/white, label **#666666** (text/muted); right badge absolutely positioned **right 16, top 14**: flex row gap 4 → `assets/ic-warning-12.svg` (12x12, red outline triangle) + text **"Not allowed under your plan"** Google Sans Flex Regular **10px/12px, ls 0.2px, #666666**, nowrap. Not clickable.
  - (A trailing 18x18 icon slot exists in the base MenuItem but is hidden for cities.)

## City list (verbatim, in order) — Default variant / d1.4
1. New Delhi — default
2. Gurugram — **selected** (brand_subtle bg, brand text)
3. Noida — default
4. Mumbai — **not allowed** ("Not allowed under your plan")
5. Pune — default
6. Bangalore — default
7. Ahmedabad — default
8. Hyderabad — default (8th item; clipped below the 360px panel edge — only visible on scroll)

Visible at 360 height: search + items 1–7 (7th row partly reaches bottom; 8th hidden).

## Variant: no results found (12605:138527)
- Search field shows typed text **"hubhon|"** in #0f0e0d (the "|" is the drawn caret).
- Items area: padding 24 16 0, flex column, align center, gap 8:
  - Text 12/16 ls .1 #666 centered: **No city match “hubhon”.** — the query word `hubhon` in #0f0e0d; curly quotes “ ” .
  - Link button **"Clear search"**: Google Sans Flex Medium 12px / 12px line-height, ls .1, #4a16d9, underline; height 14. Click → clears search text, restores full list.
- Panel bottom padding 24.

## Behaviour (inferred)
- Opens on click of the "Select city" select field (d1.3 → d1.4). Field shows placeholder "Choose a city" while open.
- Selecting a city closes panel, writes the city into the field (note: field displays "Gurgaon" while list item says "Gurugram" — copy inconsistency in Figma, keep verbatim per screen).
- Typing filters the list; no matches → no-results variant.
