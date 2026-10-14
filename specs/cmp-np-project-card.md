# cmp: NP project cards (desktop) + thumbnail + level-row signals

Font everywhere: "Google Sans Flex" (variation "wdth" 100, "GRAD" 0, "ROND" 0).
Figma component set `NP` (12561:135281): `Property 1=Project Card desktop` (312x220, legacy, unused in final screens) and **`Property 1=v2` (12561:135282, 360 wide)** ← the one used in the "Best opportunities" carousel on d1.1/d1.2/d1.2a/d1.2b. A separate symbol `NP/Project Card desktop - v2` (12561:135280) is a chip-style variant (section B).

---------------------------------------------------------------------
## A. Recommendation card — `NP` Property 1=v2 (used on dashboard)
Ref: `ref/d1.2.png` (cards at y≈379–533).

### Shell
- width **360**, height hugs (151 with 1-line signals; 155 when competition text has 4px vertical padding — see below).
- bg #fff, border 1px #edebdf, radius 16, padding **8px 8px 0 8px**, flex column, gap 8.

### Row 1 `identity` (flex row, gap 12, align flex-start, full width)
1. Thumbnail 64x64 (see C).
2. `names` column: width 191 (max 191), gap 4, word-break:
   - Project name **Godrej Meridien** — 14px/20px Medium 500, #0f0e0d.
   - Config **2, 3 BHK Apartments** — 12px/16px Regular, #444 (text/secondary), ls 0.1px.
   - Locality **Sector 106, Dwarka Expressway** — 12px/16px Regular, #666, ls 0.1px.
3. `pin-button` (top-right, auto width ≈57x34): bg #4a16d9, border 1px #4a16d9, radius 12, padding 8, gap 4, align center.
   - icon `assets/ic-plus-white-16.svg` 16x16 (white stroke) + label **Pin** 12px/16px Medium 500, #fff.
   - → starts pinning this project (opens project summary / pinning dialog flow, see d1.7).

### Row 2 signals block (flex column, gap 8, padding-top 8, full width)
- 2a. Signal row: flex row, `justify-content:space-between`, align center, full width (344):
  - Left half `demand - level-row` (flex:1, justify center, gap 8, padding 0):
    - demand meter: flex row gap 2, height 8, align-items flex-end; 3 bars each 3px wide, radius 2, border 1px + bg **#0f0e0d** (icon/grey_1); heights 5 / 7 / 9 (visually the 9px bar overflows the 8px box upward — keep exact sizes).
    - label **High demand** 12px/16px Regular, #0f0e0d, ls 0.1px.
  - Divider: vertical line 20px tall, 1px, #edebdf → `assets/divider-vertical-20.svg` (SVG is horizontal 20x1; rotate 90°) or simply a 1x20 #edebdf element.
  - Right half `competition - level-row` (flex:1, justify center, gap 8): text only, 12px/16px Regular, #0f0e0d, ls 0.1px. Padding: 0 for "No competition yet"; **4px 12px** for "Low competition"/"Crowded" (that's why those cards are 155 tall instead of 151).
- 2b. `developer - level-row`: full width, border-top 1px **#edebdf** (card 3 "not active" uses #ddd9ce), padding 8px 12px, flex row center, gap 8:
  - icon 12x12: active → `assets/ic-user-circle-gear-12.svg` (#2f7f49); inactive → `assets/ic-user-circle-gear-muted-12.svg` (#7d7d7d).
  - text 12px/16px Regular, ls 0.1px: active **Developer is active** #245f36 (semantic_text/success); inactive **Developer is not active** #666.

### Carousel data (d1.2 order; same on d1.1/1.2a/1.2b)
| # | thumb | name | config | locality | demand | competition | developer |
|---|---|---|---|---|---|---|---|
| 1 | image (`assets/project-thumb-1.jpg`) | Godrej Meridien | 2, 3 BHK Apartments | Sector 106, Dwarka Expressway | High demand | No competition yet | Developer is active |
| 2 | no image (placeholder) | Godrej Meridien | 2, 3 BHK Apartments | Sector 106, Dwarka Expressway | High demand | Low competition | Developer is active |
| 3 | image | Godrej Meridien | 2, 3 BHK Apartments | Sector 106, Dwarka Expressway | High demand | Crowded | Developer is not active |
| 4 | no image | Godrej Meridien | … | … | High demand | No competition yet | Developer is active |
(Card 4 is cut off by the carousel's overflow:hidden; only its left ~22px shows.)

---------------------------------------------------------------------
## B. `NP/Project Card desktop - v2` (12561:135280) — chip variant (library component)
- width 360, hug height (146); bg #fff, border 1px #edebdf, radius 16, padding 8, flex column gap 12.
- `identity` row identical to A, EXCEPT button: outline **Add** button — bg #fff, border 1px #4a16d9, radius 12, padding 8, gap 4; icon `assets/ic-plus-circle-brand-16.svg` 16x16; label "Add" 12px/16px Medium, #4a16d9. Thumbnail = no-image variant.
- Chips row: flex-wrap, gap 4. Each chip: bg **#f6f4ed** (surface/default), radius 8, padding 4px 12px, flex row gap 8, 12px/16px Regular ls 0.1px:
  1. demand chip: meter bars colored **#8c6900** (soft_butter/6), heights 5/7/9; text **High demand** #7a5514.
  2. competition chip: text **0 sellers tagged** #6b3d97 (lavender_mist/6).
  3. developer chip: icon `assets/ic-user-circle-gear-12.svg` + **Developer is active** #245f36.
- Ref image: see Figma render (chips wrap to 2 lines: demand + competition on line 1, developer on line 2).

---------------------------------------------------------------------
## C. Thumbnail `thumbnail-mobile` (component set 12520:132303) — 64x64, radius 12, overflow hidden
| variant | look |
|---|---|
| `img - desktop` / `img - mobile` | project photo, `object-fit:cover`, radius 12 → sample `assets/project-thumb-1.jpg` (data-driven in real app) |
| `no img - desktop` / `no image - mobile` | bg #eee (grey_neutral/1), centered `assets/ic-buildings-24.svg` 24x24 (#9e9e9e) |

---------------------------------------------------------------------
## D. Level-row library components (Desktop Local components) — compact 10px versions
These are the master components; on dashboard cards they are overridden to 12px/#0f0e0d as in A. Masters:
- **demand - level-row** (12515:130894): flex row gap 4, align center. Meter (gap 2, height 8, bars 3px wide, radius 2, border 1px #8c6900): heights 5/7/9. Text 10px/12px Regular, ls 0.2px, #7a5514.
  - High: all 3 bars filled #8c6900 → "High demand"
  - Steady: bars 1–2 filled, bar 3 outline only → "Steady demand"
  - Low: bar 1 filled, bars 2–3 outline only → "Low demand"
- **competition - level-row** (12515:130910): flex row gap 4, align center; text 10px/12px Regular ls 0.2px #6b3d97; middle separator dot `assets/ic-dot-4.svg` 4x4 (SVG fill #7d7d7d).
  - No competition: "No competition yet" • "0 sellers tagged"
  - Low: "Low competition" • "1 seller tagged"
  - moderate: "Moderate competition" • "3 sellers tagged"
  - Crowded: "Crowded" • "6 sellers tagged"
- **developer - level-row** (12515:130924): flex row gap 4; icon 12x12; text 10px/12px Regular ls 0.2px.
  - Active: `ic-user-circle-gear-12.svg`, "Developer is active", #245f36
  - Inactive: `ic-user-circle-gear-muted-12.svg`, "Developer is not active", #666

## E. `NP/Signal/BestOpportunity` (12515:131081) — tag 130x22
- bg #f6f1f8 (lavender_mist/1), border 1px #d6bce4 (lavender_mist/3), radius 4, padding 4, flex row gap 4, align center.
- `assets/ic-sparkle-12.svg` 12x12 (#6b3d97) + text **Best opportunity** 10px/12px Regular ls 0.2px #6b3d97 + `assets/ic-info-lavender-12.svg` 12x12 (info, tooltip trigger).
- Not visible on d1.x dashboard frames; library only.
