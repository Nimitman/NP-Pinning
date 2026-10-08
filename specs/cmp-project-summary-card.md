# cmp-project-summary-card — Desktop selected-project card (create-pinning page)

Two versions exist in section 03. Fonts: Google Sans Flex.

---
## A. Current: `project-summary-card` (component 13024:158725; instances 13024:158726 in d3.1, also d3.2, d3.5, d3.8, d3.8b, d4.x)
Ref: `ref/d3.1.png` y 201–357.

- Box 1200x156: bg #fff, border 1px `border/default #ddd9ce`, radius **16**, padding **8**, flex column, gap 16 (only one child).
- `prow`: flex row, gap 16, align start, full width.
  1. **Thumbnail** 138x138, radius 12, bg `grey_neutral/1 #eeeeee`, overflow hidden, centered icon `assets/ic-buildings-28.svg` 28x28 (grey #9E9E9E outline). Placeholder; a real photo would be `object-fit:cover`.
  2. **pn** (flex 1, column, gap 16):
     - Group (column, gap 8):
       - `pnTop` row gap 8, align center: "Unitech Harmony" SemiBold 600 **18/26** #0f0e0d + Tag "Selected" (height 20, padding 0 8, radius 4, bg `warm_neutral/900 #211d19`, text Medium 500 12/16 ls 0.1 #fff).
       - "2, 3 BHK Apartments  ·  ₹1.5 – 2.5 Cr" Regular 14/20 `text/secondary #444`, `white-space:pre` (two spaces each side of "·", en dash).
       - "Nirvana Country, Sector 49, Dwarka Expressway, Gurugram" Regular 12/16 #666.
     - `signal-strip` (row, bg #fff, radius 12, no border, align start; hugs width ≈ 592): three cells separated by 1px dividers (`#edebdf`, stretch full height 44).
       - Cell: padding 14; inner row gap 6, align center; text Medium 500 12/16 **#0f0e0d**.
       - Cell 1: demand meter 16x16 (flex row, gap 2, align end): 3 bars width 4, heights 8 / 12 / 16, radius 2, bg + 1px border #0f0e0d. Text "High demand".
       - Cell 2: `assets/ic-users-fill-16.svg` 16x16 (#0F0E0D) + "No competition yet • 0 sellers tagged" (bullet "•").
       - Cell 3: `assets/ic-user-circle-gear-16.svg` 16x16 (#0F0E0D) + "Developer is active here".
  3. **Preview button** (`preview`, top-right, shrink 0): bg #fff, border 1px #ddd9ce, radius 12, padding 8 14, gap 6; icon `assets/ic-arrow-square-out-14.svg` 14x14 (#7D7D7D) + "Preview project" Medium 12/16 #444. ≈143x34, sits at card-relative (1047, 9). Click = open project page (new tab, inferred).
- Height check: 8 + 138 + 8 + 2 (border) = 156. Signal strip starts at pn y=94 (78 group + 16 gap).

---
## B. Legacy: `project-summary` frame (e.g. 12709:8169) — used under the modals in d3.3, d3.4, d3.6, d3.6a, d3.7
Ref: `ref/d3.3.png` y 201–377 (dimmed by scrim).

- Box 1200 x **176**: bg #fff, border 1px **#d6bce4** (lavender), radius 16, padding **20**, flex column, gap 16.
- `prow` (row, gap 16, align start, 1160 wide):
  1. Thumbnail **72x72**, radius 12, bg #eee, centered `assets/ic-buildings-28-2.svg` 28x28.
  2. pn (flex 1, column, gap **4**):
     - pnTop row gap 8: "Unitech Harmony" SemiBold 18/26 #0f0e0d + tag `NP/Signal/BestOpportunity`: bg #f6f1f8, border 1px #d6bce4, radius 8, padding 4 8, gap 4; icon `assets/ic-sparkle-16.svg` 16x16 (#6B3D97) + "Best opportunity" Medium 12/16 **#6b3d97**.
     - "2, 3 BHK Apartments  ·  ₹1.5 – 2.5 Cr" Regular 14/20 #444 (pre).
     - "Nirvana Country, Sector 49, Dwarka Expressway, Gurugram" Regular 12/16 #666.
  3. Preview button: same as A (icon `assets/ic-arrow-square-out-14-2.svg`).
- `signal-strip` full width (1160), bg `#faf9f5`, border 1px #edebdf, radius 12, three **equal flex:1** cells (padding 14, row gap 6) with 1px #edebdf dividers:
  - Cell 1: demand meter (bars as A but colour **#8c6900**) + "High demand · top 10% in Gurugram" Medium 12/16 **#8c6900**.
  - Cell 2: `assets/ic-users-fill-16-2.svg` (#6B3D97) + "0 sellers tagged · No competition yet" Medium 12/16 **#6b3d97**.
  - Cell 3: `assets/ic-user-circle-gear-16-2.svg` (#2F7F49) + "Developer is active here" Medium 12/16 **#245f36**.
- Because this card is 20px taller than A, everything below it on those screens is shifted down by 20px (schedule at y=401 instead of 381).
