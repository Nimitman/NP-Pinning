# cmp-m-config-item — NP/Mobile/Config item (one configuration row)

Figma component set `NP/Mobile/Config item` 13018:18822, with variants `Selected=False` 13006:16845 and `Selected=True` 13018:245171. Size 326 wide (inside the 1px-bordered units card); height **150** without a status line and **192** with one.
Component props (from Figma): selected, showWarning, showReview, showReport, showPriceUpdate, showUnitPrice(+Edit), showTotalPrice(+Edit), unitPriceLabel, unitPrice, priceLabel, totalPrice, shortPrice, and the label/detail text for each status.

## Container
- Flex column, gap **8**, padding **24 12** (vertical, horizontal), width 326, border-bottom **1px**.
  - Border-bottom color: in the m3.1/m3.2 instances it is **`border/default #ddd9ce`**. In the component itself and in the status/selected instances (m3.5, m3.8, m3.10) it is **`border/subtle #edebdf`**. Using #edebdf everywhere is acceptable; the difference is barely visible.
- Background: **#ffffff** when unselected, **`surface/brand_subtle #f5f1fe`** when selected (the whole row tints lavender).

## 1. top row: flex row, gap 8, align start, full width
- Selection (flex 1): checkbox + label, gap 8.
  - Box wrapper padding-top 2. Box 16x16, radius 4.
    - Unchecked: bg #fff, border 1px #ddd9ce.
    - Checked: bg **#eee4f1** (lavender_mist/2), border 1px **#4a16d9**, centered 12x12 `assets/ic-check-12-brand.svg`.
  - Label (the configuration title, e.g. "2 BHK Apartment · 1,500 sq.ft."): Google Sans Flex **Medium 500, 14/20**, ls 0, #0f0e0d, nowrap.
- Warning icon (showWarning, on in every drawn row): `assets/ic-warn-fill-16.svg` 16x16 (filled triangle, #7d7d7d), right-aligned. Tap = "Report an issue" sheet m3.6 (inferred).

## 2. status-line (optional, one at a time): flex row, gap 4, align center, padding **8 0**, 34 tall
- Status chip: pill (radius 999), padding **2 8**, border 1px. Text Google Sans Flex **Medium 500, 10/12, ls 0.2px**, nowrap.
- Detail text: Regular 400, 10/12, ls 0.2px, `text/muted #666666` (flex 1 for the report detail).

| Variant | Chip bg | Chip border | Chip text | Chip label | Detail (verbatim) | Seen in |
|---|---|---|---|---|---|---|
| review (info) | #eef4ff | #b7d0ff | #214ead | "Under review" | "Added by you · verified within 48 hrs" | m3.5 |
| report (warning) | #fff8e8 | #f0d79a | #7a5514 | "Reported" | "30 Sep · RPT-20931 · Housing is reviewing" | m3.8 |
| price update (success) | #edf8ee | #bfe3c6 | #245f36 | "Price updated" | "it was ₹10,000/sq.ft." | m3.10 |

- Status-line borders: in the component default and in the m3.10 instance, the status line has **border-top and border-bottom 1px #edebdf** and is **300px wide** (= 326 − 2×12 padding − 2px). In the m3.5 and m3.8 instances it has **no borders** and is full width. Follow each screen spec.

## 3. prices: column, full width
Two rows, each: flex row, `justify-content: space-between`, align center, padding **4 8**, height 36 (the 28px edit button sets the height).
- Row A (unit price): border-bottom 1px `border/subtle #edebdf`.
  - Left (gap 4, nowrap, line-height normal): label "Price/sq.ft." Regular **12px** #666666 + value (e.g. "₹10,000") **Medium 500 13px** #0f0e0d.
  - Right (`per-unit`, gap 2):
    - Unit selector: height 14, radius 8, gap 4. "sq.ft." Medium 500 **12/12**, ls 0.1px, `text/brand #4a16d9` + 16x16 `assets/ic-caret-down-brand-16.svg` (stroke #4a16d9). Tap = unit dropdown (not drawn).
    - Edit button: 28x28, centered `assets/ic-pencil-simple-16.svg` 16x16 (stroke #5e23dc). Tap = Edit price sheet m3.9.
- Row B (total price): no border.
  - Left: "Price" Regular 12px #666 + total (e.g. "₹1,50,00,000") Medium 13px #0f0e0d.
  - Right (gap 2): short price (e.g. "₹1.5 Cr") Regular 12px, line-height normal, #666666 + edit button 28x28 (same pencil). Tap = m3.9.

## Height check
24 + 20 (top) + 8 + 36 + 36 + 24 + 1 (border) ≈ 150. With a status line: + 8 gap + 34 = 192.

## Row data used across M3 (labels verbatim; note the inconsistent trailing "." after "sq.ft")
| # | Label | Price/sq.ft. | Price | Short |
|---|---|---|---|---|
| 1 | 2 BHK Apartment · 1,500 sq.ft. | ₹10,000 | ₹1,50,00,000 | ₹1.5 Cr |
| 2 | 2 BHK Apartment · 1,800 sq.ft. | ₹9,889 | ₹1,78,00,000 | ₹1.78 Cr |
| 3 | 3 BHK Apartment · 2,000 sq.ft | ₹10,250 | ₹2,05,00,000 | ₹2.05 Cr |
| 4 | 3 BHK Apartment · 2,400 sq.ft | ₹10,417 | ₹2,50,00,000 | ₹2.5 Cr |
| 5 (added, m3.5 only) | 3 BHK Apartment · 1,650 sq.ft | ₹10,424 | ₹1,72,00,000 | ₹1.72 Cr |

Note: the Figma MCP returned the label "2 BHK Apartment · 1,500 sq.ft" for the status rows in m3.5 and m3.8, but the rendered frames show the labels above (row 5 and row 4). Trust the screenshots in ref/.
