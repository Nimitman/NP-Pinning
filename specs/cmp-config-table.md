# cmp-config-table — "NP/Config table" (desktop, Which configurations are you selling?)

Figma section 12719:13077 "Components · Config table (NP pinning)". Ref: `ref/cmp-config-table.png`.
- Header component `NP/Config table/Header` 12719:13078 (1160x40).
- Row component set `NP/Config table/Row` 12720:13349, variants **Selected (No|Yes) × Status (Default | Under review | Reported | Price updated | Editing price | Sold out)** — 12 symbols, each 1160x56.
- Section caption (verbatim): "Header + Row (Selected × Status). Stack: config-table (vertical, 12 radius, border/subtle, clip) → Header → Row instances, all FILL width."
- Figma description of Row: "One configuration row. Selected = checkbox state (Sold out ignores it). Status covers: Default, Under review (config added by the seller), Reported (issue raised), Price updated (seller edited price), Editing price (inline edit with Save/Cancel), Sold out (disabled). Status chip + note sit under the configuration name so the action column only holds one action."

All text = Google Sans Flex (`font-variation-settings: "wdth" 100, "GRAD" 0, "ROND" 0`).

## Table wrapper (`table`)
- Width = container (1158 incl. border inside the 1160 units card content area), flex column, no gap.
- Border 1px `border/subtle #edebdf`, radius **12**, `overflow: hidden`.
- Error variant (d3.2 only): border colour **#f1b7ae** (semantic_border/danger).
- Children: Header, then N Rows; every child fills width. Last row keeps its 1px bottom border (it sits right on the wrapper border; visually fine).

## Column grid (shared by header and rows)
- Row = flex row, `align-items:center`, **gap 16**, **padding 0 16** (rows: padding 12 16).
- Columns: select **40** fixed · configuration **flex 1** (min-width 1) · total price **240** · price/unit **200** · action **160**. All columns `overflow:hidden`.
- At 1156 inner width: config column = 1156 − 32 − 40 − 240 − 200 − 160 − 4×16 = 420 wide. Column x-offsets inside the row: select 16, config 72, price 508, unit 764, action 980.

## Header (12719:13078)
- Height **40**, bg `surface/subtle #faf9f5`, border-bottom 1px #edebdf, padding 10 16.
- Labels: Medium 500, 12/16, ls 0.1px, `text/muted #666`, nowrap:
  - select col: empty (40x16 spacer)
  - "Configuration · built-up area"
  - "Total price"
  - unit col (flex row gap 8): "Price /" + unit selector button
  - "Report an issue"
- Unit selector button (`buttons`, 12720:13350): flex row gap 4, height 14 (min/max 14), no padding, radius 8. Label "sq.ft." Medium 500, **12px / line-height 12px**, ls 0.1px, colour `text/brand #4a16d9`, **underline** (text-underline-position from-font), centered. Trailing icon `assets/ic-caret-down-brand-16.svg` 16x16 (stroke #4A16D9). Click = switch unit (sq.ft / sq.m etc. — inferred; no menu designed).

## Row (base geometry, all variants)
- Height **56** (min-height 56), padding **12 16**, gap 16, border-bottom 1px `#edebdf`.
- Background: Selected=Yes → `surface/brand_subtle #f5f1fe`; Selected=No → `#ffffff`. Exception: **Sold out is always white**, even with Selected=Yes.

### c-select (40 wide, flex, align center)
Checkbox 18x18, radius 4:
- Unchecked: bg #fff, border **1.5px** `border/default #ddd9ce`.
- Checked: bg `surface/brand #4a16d9`, no border, centered tick `assets/ic-check-white-12.svg` 12x12 (white stroke).
- Sold out (both Selected values): bg `grey_neutral/1 #eeeeee`, border 1.5px #ddd9ce, no tick (disabled, not clickable).

### c-config (flex 1, flex column, gap 4, align start)
- Line 1 configuration name, e.g. "2 BHK Apartment · 1,500 sq.ft": Medium 500, 14/20, ls 0, `text/primary #0f0e0d`, nowrap. Sold out: colour `text/muted #666`.
- Line 2 `status-line` (only for Under review / Reported / Price updated / Editing price / Sold out): flex row, align center, gap 8 (Editing price: no chip, gap 0), full width.
  - Status chip: padding 2 8, radius 999, border 1px, text Medium 500 **10/12, ls 0.2px**, nowrap:
    | Status | chip text | bg | border | text |
    |---|---|---|---|---|
    | Under review | "Under review" | #eef4ff | #b7d0ff | #214ead |
    | Reported | "Reported" | #fff8e8 | #f0d79a | #7a5514 |
    | Price updated | "Price updated by you" | #edf8ee | #bfe3c6 | #245f36 |
    | Sold out | "Sold out" | #eeeeee | #edebdf | #666666 |
  - Note text: flex 1, Regular 400, 12/16, ls 0.1px, #666. Verbatim per status:
    - Under review: "Added by you · verified within 48 hrs"
    - Reported: "30 Sep · RPT-20931 · Housing is reviewing"
    - Price updated: "Was ₹10,000/sq.ft · your listing only"
    - Editing price: "Total updates as you type · Enter to save, Esc to cancel"
    - Sold out: "Marked sold out by the developer · can’t be selected" (curly apostrophe)
  - Two-line content (20 + 4 + 16 = 40) still fits the 56 row (12+40+... → row content box 32, it overflows padding symmetrically; Figma keeps h56 with items centered; implement `min-height:56px; padding:8px 16px` if you prefer no overflow — rendered result identical: name at y≈8, note at y≈32).

### c-price (240, flex row, gap 8, align center)
- Total price e.g. "₹1,50,00,000": Medium 500, 14/20, #0f0e0d.
- Short price e.g. "₹1.5 Cr": Regular 400, 12/16, ls 0.1px, #666.
- Edit button (Default / Under review / Reported / Price updated, when `showEdit`): 24x24, radius 6, centered `assets/ic-pencil-simple-16.svg` 16x16 (stroke #5E23DC). Click → Editing price.
- Editing price: no edit button. Sold out: no edit button, both texts #666.

### c-unit (200, flex row, gap 4, align center)
- Unit price e.g. "₹10,000": Medium 500, 14/20, #0f0e0d. Unit "/sq.ft": Regular 12/16, ls 0.1px, #666. Then edit button (24x24 as above) — note gap here is 4, so pencil sits 4px after "/sq.ft".
- Sold out: no edit button; unit price #0f0e0d when Selected=No, #666 when Selected=Yes (both drawn; use #666 for disabled consistency if unsure — Figma Selected=No shows #0f0e0d).
- **Editing price**: column holds one `unit-input` (flex 1 → 200 wide, ~39 tall):
  - bg #fff, border **1.5px `border/brand #4a16d9`**, radius 8, padding 8 8 8 **32**, flex row gap 4, overflow hidden.
  - Value "10,000" (in d3.8b "10,424"): Medium 14/20 #0f0e0d (editable, caret here).
  - Prefix addon: absolute left −1.5, top −1.5, height 39, bg `surface/default #f6f4ed`, padding 4 8; "₹" Regular 14/20 #0f0e0d. (sits under the border; visually a beige box at the left inside the purple border)
  - Suffix addon: absolute right −0.5, top −1.5, height 39, bg #f6f4ed, padding 4 8, right aligned; "/sq.ft." Regular 12/16 ls 0.1px #666.
  - Total price in c-price updates live as you type.

### c-action (160, flex row, align center)
- **Report** (Default, Price updated, Sold out): outlined button, min-height 32, padding 6 12 6 10, gap 6, radius 8, bg #fff, border 1px #ddd9ce. Icon `assets/ic-warn-fill-16.svg` 16x16 (grey #7D7D7D warning triangle) + "Report" Medium 500 14/20 ls 0.1px `text/secondary #444`. Rendered ≈ 92x32. Click → Report modal (d3.6).
- **Remove** (Under review): text button, padding 6 12 6 0, radius 8; "Remove" Medium 14/20 ls 0.1px #666. Click → removes the seller-added config (inferred).
- **Reported** (Reported): text button "Reported" same style as Remove (#666). Click → view report (hotspot 89x28 in d3.8; inferred to show report details / d3.7).
- **Save / Cancel** (Editing price): gap 8; each padding 6 12 6 0; "Save" Medium 14/20 ls 0.1 **#4a16d9**; "Cancel" same, #666.

## Variant matrix (rendered example data: "2 BHK Apartment · 1,500 sq.ft", ₹1,50,00,000, ₹1.5 Cr, ₹10,000, /sq.ft)
| Status | Selected=No (node) | Selected=Yes (node) | name colour | chip+note | pencils | action |
|---|---|---|---|---|---|---|
| Default | 12720:13070 | 12720:13202 | #0f0e0d | — | yes | Report |
| Under review | 12720:13093 | 12720:13228 | #0f0e0d | Under review | yes | Remove |
| Reported | 12720:13115 | 12720:13253 | #0f0e0d | Reported | yes | Reported (text) |
| Price updated | 12720:13137 | 12720:13278 | #0f0e0d | Price updated by you | yes | Report |
| Editing price | 12720:13162 | 12720:13306 | #0f0e0d | note only | no | Save · Cancel |
| Sold out | 12720:13181 | 12720:13328 | #666 | Sold out | no | Report |
Row bg: brand_subtle #f5f1fe for Selected=Yes except Sold out (white).

## Side notes in the section (sticky "Notes" cards, verbatim content — documentation, not UI)
- COLUMNS: "Select 40 · Configuration fill · Total price 240 · Price/sq.ft 200 · Action 160. 16 px gap, 16 px side padding, min row height 56."
- STATUS: "Status chip + note sit under the configuration name, never in the action column. One action per row: Report · View report · Remove · Save/Cancel."
- REPORT AFFORDANCE: "Outlined 32 px button with warning icon + label replaces the bare 16 px icon. Tertiary text links are used only for secondary actions."
- EDITING: "Instance props: Configuration, Total price, Price short, Unit price, Unit, Show edit. Status notes are per-variant text overrides."

## Instance props
configuration, totalPrice, priceShort, unitPrice, unit (default "/sq.ft"), showEdit (default true), selected, status.

## Assets
| file | size | where |
|---|---|---|
| assets/ic-check-white-12.svg | 12x12 | checked checkbox tick |
| assets/ic-pencil-simple-16.svg | 16x16 in 24x24 button | price + unit edit |
| assets/ic-warn-fill-16.svg | 16x16 | Report button icon |
| assets/ic-caret-down-brand-16.svg | 16x16 | header "sq.ft." unit selector |
