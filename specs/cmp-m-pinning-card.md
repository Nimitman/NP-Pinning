# cmp-m-pinning-card — "Pinning card" (mobile local component)

Figma component 13000:16826 (section "Mobile local components" 13002:158633). Size 328x174 as master; inside "Your pinnings — mobile" it is full width of the 294px content column. Ref: `ref/cmp-m-pinning-card.png`.
Component props (Figma): projectName, locality, duration, managedBy, startDate, endDate, daysRemaining, showDaysRemaining, showExternalLinkIcon, status (nested Status chip variant).

## Container
- bg `surface/white #fff`, border 1px `border/subtle #edebdf`, radius **12**, padding **14** all sides, `overflow:hidden`.
- Flex column, gap **12**. Height hugs (174 with default data).

## Row 1 — title + status (flex row, gap 8, align start, full width)
- Left `title` column: flex 1, min-width 0, gap **2**, overflow hidden.
  - Name line: flex row, gap **4**, align center.
    - Project name: Google Sans Flex **Medium 500, 14/20**, ls 0, `text/primary #0f0e0d`, single line, ellipsis.
    - External-link icon `assets/ic-arrow-square-out-16.svg` 16x16 (stroke #222). Tap = open the project page (inferred). Hidden when showExternalLinkIcon=false.
  - Locality: **Regular 400, 12/16**, ls 0, `text/muted #666`, single line, ellipsis, width 220.
- Right column: flex column, gap **4**, align end (right-aligned), no shrink.
  - Status chip: height **20**, padding 0 8, radius **999**, border 1px, gap 4, align center. Text **Regular 400, 12/16, ls 0.1px**, nowrap.
  - Days remaining: **Regular 400, 10/12, ls 0.2px**, right-aligned, nowrap. Hidden when showDaysRemaining=false.

### Status variants (seen in m1.2)
| Status text | chip bg | chip border | chip text | days-left text color |
|---|---|---|---|---|
| Active | `semantic_surface/success #edf8ee` | `semantic_border/success #bfe3c6` | `semantic_text/success #245f36` | `text/muted #666` |
| Ending soon | #fff0ee | #f1b7ae | #8a2b20 | **#8a2b20** |
| Pending approval | `semantic_surface/warning #fff8e8` | `semantic_border/warning #f0d79a` | `semantic_text/warning #7a5514` | (hidden) |

## Row 2 — "Secondary details" and Row 3 — "Primary details"
Each: full width, border-top 1px `border/subtle #edebdf`, padding-top **12**, flex row, gap **16**, align start, overflow hidden.
Each row has two `Detail` cells, each flex 1 (equal halves, 139px each at 294 inner), column, gap **2**:
- Label: **Medium 500, 10/12, ls 0.2px**, `text/muted #666`.
- Value: **Regular 400, 12/16, ls 0.1px**, `text/primary #0f0e0d`.
- Row 2 cells: "Duration" / "Managed by". Row 3 cells: "Start date" / "End date".
- Empty values are rendered as "—" (em dash). When the pinning is pending, the value text color of "Managed by", "Start date", "End date" is `text/muted #666` (the whole cell/row inherits #666; "Duration" value stays #0f0e0d).

## Default data (master)
Emaar Digihub · Sector 62, Gurugram · Active · 30 days left · Duration 30 days · Managed by Jitesh Kumar · Start 15-09-2026 · End 21-12-2026.
