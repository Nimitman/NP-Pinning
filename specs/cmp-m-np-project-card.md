# cmp-m-np-project-card — NP project card, mobile (two forms)

There are two different mobile project cards. The one actually used on the m1.x dashboards is **Form A** (inside "Recommendations / Mobile"). **Form B** is the library master "NP/Project Card mobile" (12515:130876) and is not placed on any of my screens; spec'd for completeness.

---------------------------------------------------------------------------
## Form A — "NP" card used in Recommendations / Mobile (e.g. I12936:259689;12973:263155), 258x127
Ref: `ref/m1.2.png` y≈512–636 (first card, second card peeking at x≈306).

### Container
- bg #fff, border 1px `border/subtle #edebdf`, radius **16**, padding **4 4 0 4** (top/right/bottom/left), flex column, gap 0, width **258**.

### identity row: flex row, gap **12**, align start, full width
- Thumbnail `thumbnail-mobile`: 64x64, radius **12**, overflow hidden.
  - With image: `assets/project-thumb-1.jpg`, `object-fit: cover`, radius 12 (sample data; real data = project photo).
  - Without image: bg `grey_neutral/1 #eee`, centered icon `assets/ic-buildings-24.svg` 24x24 (#9e9e9e outline).
- `names` column: flex 1, min-width 0, max-width 191, gap **4**:
  - Project name: Google Sans Flex **Medium 500, 12/16, ls 0.1px**, #0f0e0d, single line, ellipsis.
  - Config: **Regular 400, 10/12, ls 0.2px**, `text/secondary #444`, single line, ellipsis.
  - Locality: **Regular 400, 10/12, ls 0.2px**, `text/muted #666`, single line, ellipsis.
- `pin-button` (primary, small): bg `surface/brand #4a16d9`, border 1px #4a16d9, radius **12**, padding **8**, flex row, gap **4**, centered. Icon `assets/ic-plus-white-16.svg` 16x16 (white plus) + label "Pin" **Medium 500, 12/16**, #fff. Size ≈ 57x34. Tap = start pinning this project (→ m3.1 confirm project details).

### signals block: flex column, gap **4**, padding-top **4**, radius 8, full width
- Row 1: flex row, space-between, align center, full width:
  - `demand - level-row`: flex 1, centered, gap **8**: demand meter + text.
    - Demand meter: flex row, gap 2, align end, height 8. 3 bars, each **3px wide**, radius 2, fill + 1px border `icon/grey_1 #0f0e0d`, heights **5 / 7 / 9**.
    - Text **Regular 400, 10/12, ls 0.2px**, #0f0e0d.
  - Vertical divider: 1px x 20px, color #edebdf. Asset `assets/divider-vertical-20.svg` (SVG is 20x1 horizontal; rotate 90°) or CSS `border-left:1px solid #edebdf; height:20px`.
  - `competition - level-row`: flex 1, centered; text Regular 10/12 ls 0.2 #0f0e0d.
- Row 2 `developer - level-row`: full width, border-top 1px #edebdf, padding **8 12**, flex row, gap **8**, centered:
  - Active: icon `assets/ic-user-circle-gear-12.svg` 12x12 (green #2f7f49) + text Regular 10/12 ls 0.2, `semantic_text/success #245f36`.
  - Not active: icon `assets/ic-user-circle-gear-muted-12-2.svg` 12x12 (#222) + text color `text/muted #666`.

### Data used in Recommendations (cards in order, horizontal row gap 16)
| # | thumb | name | config | locality | demand | competition | developer |
|---|---|---|---|---|---|---|---|
| 1 | project-thumb-1.jpg | Godrej Meridien | 2, 3 BHK Apartments | Sector 106, Dwarka Expressway | High demand | No competition yet | Developer is active |
| 2 | placeholder | DLF Crest | 2, 3 BHK Apartments | Golf Course Road, Gurugram | High demand | Low competition | Developer is active |
| 3 | placeholder | Lodha Bellezza | 3, 4 BHK Apartments | Sector 71, Gurugram | High demand | Crowded | Developer is not active |
At 360 only card 1 is fully visible ("2, 3 BHK Apartme…", "Sector 106, Dwark…" truncated) and card 2 peeks ~36px at the right edge (clipped by the Recommendations card).

---------------------------------------------------------------------------
## Form B — library master "NP/Project Card mobile" 12515:130876, 288x160
Ref: `ref/cmp-m-np-project-card.png`.
- Container: bg #fff, border 1px #edebdf, radius **16**, padding **4**, flex column, gap **12**, width 288.
- identity row: flex row, gap **8**, align start.
  - Thumbnail 64x64 radius 12, bg #eee, `assets/ic-buildings-24.svg` 24x24 centered.
  - names column: flex 1, gap **8**:
    - text group (gap 2): "Godrej Meridien" Medium 12/16 ls 0.1 #0f0e0d; "2, 3 BHK Apartments" Regular 10/12 ls 0.2 #444; "Sector 106, Dwarka Expressway" Regular 10/12 ls 0.2 #666 (width 162).
    - highlights (column, gap 8):
      - demand row (gap 4): meter bars (3px, h 5/7/9, radius 2) in `soft_butter/6 #8c6900` + "High demand" 10/12 `semantic_text/warning #7a5514`.
      - competition row (gap 4, align center): "No competition yet" + dot `assets/ic-dot-4.svg` 4x4 + "0 sellers tagged", both 10/12 ls 0.2 `lavender_mist/6 #6b3d97`.
      - developer row (gap 4): `assets/ic-user-circle-gear-12-2.svg` 12x12 + "Developer is active" 10/12 #245f36.
- pin-button (outline, full width): bg #fff, border 1px `border/brand #4a16d9`, radius 12, padding **8 12**, gap 4, centered: `assets/ic-push-pin-brand-16.svg` 16x16 + "Pin" Medium 12/16 `text/brand #4a16d9`.
