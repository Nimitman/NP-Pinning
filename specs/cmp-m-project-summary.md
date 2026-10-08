# cmp-m-project-summary — Mobile selected-project card

Figma local component `project-summary` 12991:20514 (instance in m3.1: 13002:146845). Size 328x163, at x16 within the 16px-padded content column.

## Container
- bg #fff, border 1px `border/subtle #edebdf`, radius **16**, padding **8**, flex column, gap **4**.

## prow (top row), flex row, gap 12, align start, position relative
- Thumbnail: 72x72, radius 12, bg `grey_neutral/1 #eeeeee`, centered icon `assets/ic-buildings-28.svg` 28x28 (grey building outline). This is a placeholder; a real project image would use object-fit: cover.
- Text column `pn`: flex 1, column, gap 4:
  1. Tag "Selected": height 20, padding 0 8, radius 4, bg `warm_neutral/900 #211d19`. Text Medium 500 12/16, ls 0.1px, #ffffff.
  2. Project name "Unitech Harmony": Medium 500, 14/20, #0f0e0d, single line, ellipsis (Figma container is 119 wide; let it use the full width with ellipsis).
  3. Meta "2, 3 BHK apartments  ·  ₹1.5 – 2.5 Cr": Regular 400, 12/16, `text/secondary #444444`, single line, ellipsis, **whitespace: pre** (two spaces on each side of the "·"; the dash is an en dash "–").
  4. Address "Nirvana Country, Sector 49, Dwarka Expressway, Gurugram": Regular 400, 12/16, `text/muted #666666`, single line, ellipsis (shows "Nirvana Country, Sector 49, Dwarka E…" at 360).
- External-link icon `assets/ic-arrow-square-out-12.svg` 12x12, absolute, left 298, top 8 within prow (top-right of the card). Tap = open the project page (inferred).

## Signals block, column, gap 4, padding-top 4, radius 8
- Row 1: flex row, space-between, align center:
  - Left half (flex 1, centered, gap 8): demand meter + "High demand".
    - Demand meter: flex row, gap 2, align end, container height 8. Three bars, each 3px wide, radius 2, fill and 1px border `icon/grey_1 #0f0e0d`, heights **5 / 7 / 9** px.
    - Text: Regular 400, **10/12, ls 0.2px**, #0f0e0d.
  - Divider: a vertical 1px line, 20 tall, `assets/divider-vertical-20.svg` (stroke #edebdf; the SVG is drawn horizontally 20x1, rotate it 90°). A CSS `border-left:1px solid #edebdf; height:20px` gives the same result.
  - Right half (flex 1, centered): "No competition yet", Regular 10/12, ls 0.2px, #0f0e0d.
- Row 2 (developer): border-top 1px #edebdf, padding 8 12, flex row, gap 8, centered.
  - Icon `assets/ic-user-circle-gear-12.svg` 12x12 (green #2f7f49).
  - Text "Developer is active": Regular 10/12, ls 0.2px, `semantic_text/success #245f36`.
