# cmp-m-bottom-nav — Mobile app bottom navigation + dashboard "Add new project pinning" bar

Used on the mobile dashboards m1.1 / m1.2. Both are fixed to the bottom of the viewport (CTA bar directly above the nav). In Figma they are drawn after the content (m1.2: sticky-cta at y 1621, nav at y 1694 of a 1749 frame).

## A. Dashboard sticky CTA (`sticky-cta`, 12788:227917 / 12788:227502), 360x73
- bg #fff, border-top 1px `border/subtle #edebdf`, padding **12 16**, `overflow:hidden`.
- Button (`buttons`): full width (328), height **48** (min/max 48), min-width 96, padding 12 20, radius **12**, bg `surface/brand #4a16d9`, flex row, gap **4**, centered.
  - Leading icon `assets/ic-plus-white-18.svg` 18x18 (white plus).
  - Label "Add new project pinning": Google Sans Flex **Medium 500, 14/20, ls 0.1px**, #fff, centered.
  - Tap → m2.1 "Select a project to pin".

## B. Bottom nav (`bottom-nav`, Nav Bar 9298:95876), 360x55
- bg #fff, shadow `0 0 4px rgba(0,0,0,0.16)` (shadow/shadow_medium_soft uses 8px radius: `0 0 8px rgba(0,0,0,0.16)`; codegen gave 4px — use 4px), padding **8 16 0 16**, flex row, gap **8**, align center.
- 5 items, each **59.2 wide x 47 tall**, flex column, gap **4**, align center:
  - Icon 24x24.
  - Label: **Rubik**, 10px / 12px line-height, centered, 12px tall box.
  - Active item only: a 59.2x3 selection indicator under the label `assets/nav-selection-indicator-59x3.svg` (brand #5e23dc bar; use the SVG as-is).
- Items (verbatim labels, left → right):
  1. "Dashboard" — **active**: icon `assets/nav-dashboard-active-24.svg` (flag, brand #5e23dc); label Rubik **Medium 500**, ls 0.27px, `text/cta_links/brand #5e23dc`; indicator shown.
  2. "Leads" — `assets/nav-leads-24.svg` (bell, #7f7f7f).
  3. "Listings" — `assets/nav-listings-24.svg` (stack, #7f7f7f).
  4. "Packages" — `assets/nav-packages-25x24.svg`; the SVG is 25.2x24, placed in a 24x24 box with `inset: 0 -1.67% 0 -3.33%` (i.e. it overflows 0.8px left, 0.4px right).
  5. "More" — `assets/nav-more-24.svg` (three dots, #b2b2b2).
  - Inactive labels: Rubik **Regular 400**, ls 0.6px, `text/grey/grey4 #767676`.
