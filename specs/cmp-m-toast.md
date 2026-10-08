# cmp-m-toast — Mobile top toasts (error and success)

Both are layers named `toast:success`, drawn as absolute overlays at **x=16, y=118, width 328** on the page frame. That puts them over the top-panel, just under the browser chrome. They do not push content down. Suggested: `position: fixed; top: 12px` below the app header area, left and right 16.

## Error toast (m3.2), node 13002:146613, 328x48
- bg `semantic_surface/danger #fff0ee`, border 1px `semantic_border/danger #f1b7ae`, radius **12**, padding **14 18**, shadow `0 8px 24px 0 rgba(0,0,0,0.12)`.
- Flex row, space-between, align center.
- Text "Select at least 1 configuration to pin": Google Sans Flex **SemiBold 600, 14px**, line-height normal (~18), `semantic_text/danger #8a2b20`, nowrap.
- Close: `assets/ic-x-danger-16.svg` 16x16 (stroke #be3f31) at the right. Tap = dismiss.

## Success toast with Undo (m3.10), node 12794:17736, 328x59
- bg `semantic_surface/success #edf8ee`, border 1px `semantic_border/success #bfe3c6`, radius **12**, padding **12 14**, shadow `0 6px 18px 0 rgba(0,0,0,0.12)`.
- Flex row, gap 12, align center.
- Text column (flex 1, gap 2, line-height normal, color `semantic_text/success #245f36`):
  - "Thanks — price updated": **SemiBold 600, 13px**.
  - "₹10,400/sq.ft for 2 BHK · 1,500 sq.ft": **Regular 400, 12px**.
- Link "Undo": **SemiBold 600, 13px**, `text/brand #4a16d9`, underline (text-underline-position: from-font). Tap = revert the price edit.
- Auto-dismiss timing is not specified.
