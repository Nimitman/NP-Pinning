# cmp-m-units — "Which configurations are you selling?" card (mobile)

Figma local component `units` 13002:146625 (instance in m3.1: 13002:146916). Size 328 x 775 with 4 rows (967 with 5 rows in m3.5; 817 when one row has a status line, as in m3.8 and m3.10).

## Container
- bg #fff, radius **16**, `overflow: hidden`, padding **16 0** (vertical only), flex column, gap **16**.
- Border 1px:
  - Default: `border/subtle #edebdf`.
  - **Error** (m3.2, submitted with nothing selected): **`semantic_icons/danger #be3f31`**. Everything else is unchanged.

## units-header: padding 0 16, flex column, gap 16
- Title "Which configurations are you selling?": **Medium 500, 16/22**, #0f0e0d.
- "Select all" checkbox row (gap 8): a 16x16 box (unchecked: #fff, 1px #ddd9ce, radius 4; wrapper padding-top 2) + label "Select all" **Medium 500 14/20, `text/brand #4a16d9`**. Tap = select or clear every row. The checked state is not drawn; use the checkbox checked style from cmp-m-config-item.md.

## config-list
- Border-top 1px `border/subtle #edebdf`. Flex column, no gap.
- Contains N × `NP/Mobile/Config item` (cmp-m-config-item.md), each 326 wide, stacked.

## units-footer: padding 0 16, flex column, gap 6
- "Add missing configuration" link (`Unit selector` instance, height 14, gap 4, align center): `assets/ic-plus-brand-16.svg` 16x16 (stroke #4a16d9) + text **Medium 500 12/12, ls 0.1px, #4a16d9**. Tap = Add missing configuration sheet (m3.3).
- Helper "Prices you edit improve pricing accuracy across Housing.com": Regular 400 12px, line-height normal (~15), #666666, wraps to 2 lines at 294 wide ("…across" / "Housing.com").
