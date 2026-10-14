# cmp-m-schedule — "When should it run?" card (mobile)

Figma local component `schedule` 12991:20527 (instance in m3.1: 13002:146890). Size 328x257.

## Container
- bg #fff, border 1px `border/subtle #edebdf`, radius **16**, padding **16**, flex column, gap **12**, align start.

## Children, top to bottom
1. Title "When should it run?": Google Sans Flex **Medium 500, 16/22**, #0f0e0d.
2. InputField (select type), full width, column gap 4 (see cmp-input-field.md):
   - Label "Pinning start date": Regular 12/16, ls 0.1px, `text/secondary #444444`.
   - Field: height 40, bg #fff, border 1px #ddd9ce, radius 12, padding 8 16, gap 8. Value "22 Sep 2026" Regular 14/20 #0f0e0d (flex 1). Trailing icon `assets/ic-caret-down-16.svg` 16x16 (stroke #222). Tap = open a date picker (not drawn).
3. "Duration": Google Sans Flex **Medium 500, 13px**, line-height normal (~16), #0f0e0d.
4. Duration options: flex row, gap 8, full width. Three equal cards (flex 1, ~98.67 wide each):
   - Card: column, gap 4, centered, padding **10 18**, radius **12**, border 1px.
   - **Selected** ("30 days"): bg `surface/brand_subtle #f5f1fe`, border **#4a16d9**. Line 1 "30 days": **SemiBold 600, 14/20, #4a16d9**.
   - **Unselected** ("60 days", "90 days"): bg #fff, border `border/default #ddd9ce`. Line 1: **Medium 500, 14/20, #444444**.
   - Line 2 (both states): Regular 400, 12/16, #666666. Text: "1 pinning", "2 pinnings", "3 pinnings".
   - Tap a card to select it (single-select). The helper and sticky-cta summary update to match.
5. Helper "1 pinning for 30 days · 137 will remain": Regular 400, 12px, line-height normal, #666666, full width.
