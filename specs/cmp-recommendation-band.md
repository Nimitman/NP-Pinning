# cmp: "Best opportunities for you" recommendation band + filter pills + filter dropdowns (desktop)

Figma: `recommendation-band` 12909:236309 (d1.2), 12909:236628 (d1.1), 13024:159932 (d1.2a), 13024:160288 (d1.2b). Font: "Google Sans Flex" (wdth 100, GRAD 0, ROND 0).

## Shell
- width 1200; bg #fff; border 1px #edebdf; radius 16; flex column.
- d1.2 / d1.2a / d1.2b: padding **24**, gap **24** → height 337.
- d1.1: padding **20**, gap **20** → height 321 (inner width 1158).

## 1. Header `rh` (column gap 4)
- Row `rt` (gap 8, align center): `assets/ic-sparkle-fill-20.svg` 20x20 (#6b3d97) + title **Best opportunities for you (24)** — 16px/22px SemiBold 600, #0f0e0d.
- Subtitle **We recommend high buyer demand, few sellers tagged projects in your selected locality** — 14px/20px Regular, #666.
- (Hidden "See all 24 >" link exists in Figma; not shown.)

## 2. Filter bar (height 38 → pills are 40 so effectively 40; full width; flex row, `justify-content:space-between`)
### Left `scope-row` (flex:1, flex-wrap, gap 8, align center)
1. Label **Filters:** — 12px/16px **Bold 700**, #666, letter-spacing 0.4px.
2. Pill **Gurugram** (selected/active select) — 127x40.
3. Pill **Sector 71, +2** (selected/active select) — 142x40.
4. Vertical divider: 1px x 38px, #ddd9ce (`assets/line-divider-v-38.svg` is a 38x1 horizontal line → rotate 90°, or use a 1x38 div).
5. Pill **High demand** (default, no chevron) — 122x40. Opens demand dropdown (D2 below).
6. Pill **Seller competition** (default, with chevron) — 180x40. Opens competition dropdown (D1).
7. Pill **Developer is active** (default toggle, no chevron) — 158x40.
(City pill opens city list, Sector pill opens locality multi-select — see cmp-city-dropdown-panel.md / cmp-locality-dropdown-panel.md.)

### Pill `.Pill` spec — height 40, padding 12px 16px, gap 8, radius 12, overflow hidden, label 14px/20px Regular, ls 0
| state | bg | border | label color | trailing icon 18x18 |
|---|---|---|---|---|
| selected (Gurugram, Sector 71, +2) | #faf9f5 (surface/subtle) | **1.5px #211d19** (border/selected) | #0f0e0d | `assets/ic-caret-down-18.svg` (stroke #211d19) |
| default (High demand, Seller competition, Developer is active) | #fff | 1px #ddd9ce (border/default) | #666 | `assets/ic-caret-down-muted-18.svg` (stroke #9e9e9e) — only on "Seller competition" |
| disabled (13002:147464, e.g. "Developer is active" when not allowed by plan) | #eee (surface/disabled) | 1px #9e9e9e (border/disabled) | #666 | — |

### Right: carousel arrows (flex row gap 8) — each 34x34 icon button
- bg #fff, border 1px #ddd9ce, radius 8, padding 8; shadow (Elevations/02) `0 2px 4px -1px rgba(0,0,0,.07), 0 2px 8px 0 rgba(0,0,0,.10)` (Figma code shows drop-shadow 0 2 4 rgba(0,0,0,.1) + 0 2 2 rgba(0,0,0,.07)).
- prev: `assets/ic-caret-left-18.svg` (stroke #767676), button **opacity 0.4** (disabled at first page).
- next: `assets/ic-caret-right-18.svg` (stroke #222), opacity 1.
- Click scrolls the card row by one card (376px = 360 + 16 gap).

## 3. Cards viewport (full width, overflow hidden, height 155)
- Row: flex row, gap 16, align center; 4 cards × 360 (row width 1488 > 1150 → 4th card clipped). Cards: see cmp-np-project-card.md §A.
- Card 1 and 4 are 151 tall (vertically centered, y=2); cards 2 & 3 are 155 tall.

## D1. Competition dropdown panel (12968:261710) — opens under "Seller competition" pill
- 188 x 168; bg #fff; border 1px #ddd9ce; radius 12; overflow hidden; padding 8px 0; shadow (Elevations/03) `0 4px 12px 0 rgba(0,0,0,.12), 0 4px 6px -2px rgba(0,0,0,.08)`.
- Items (each 188x40, padding 8px 16px, gap 12, align center; 14px/20px Regular; bottom divider 1px #edebdf absolutely positioned at bottom, full width):
  1. **No competition yet** — bg #fff, text #0f0e0d
  2. **Low competition** — SELECTED: bg #f5f1fe (surface/brand_subtle), text #4a16d9 (text/brand)
  3. **Moderate competition** — default
  4. **Crowded** — default
- Ref: `ref/d1.2-competition-dropdown.png`. Placement: directly below the pill (suggest 4px gap), left-aligned with pill.

## D2. Demand dropdown panel (Figma name "City DropdownPanel", 12973:261985) — opens under "High demand" pill
- 188 x 100; same shell as D1.
- Items:
  1. **High demand** — DISABLED: text #666 at opacity 0.6 (Figma annotation: "this is disabled state").
  2. **Moderate demand** — default (#0f0e0d).
- Disabled tooltip (12973:262475, annotation "Show disabled tooltip on hover of high demand option"): 53x16 dark chip, bg #0f0e0d, radius 4, padding 2px 4px, text **Disabled** 10px/12px Regular, #fff, ls 0.2px. Shown on hover of the disabled item (Figma places it ~14px below the panel's bottom-left).
- Ref: `ref/d1.2-demand-dropdown.png`.
