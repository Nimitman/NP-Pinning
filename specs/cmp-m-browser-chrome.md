# cmp-m-browser-chrome + top-panel — Mobile page chrome (360 wide)

Used at the top of every mobile M3 (and M4) frame. Frame background below it = `surface/subtle #faf9f5`.
The browser chrome is a device mock (Android status bar + Chrome toolbar). Render it only if the prototype is meant to show the device frame; the in-app part starts at the top-panel (y=106).

## browser (instance 12793:16507), 360x106, flex column
### Status bar (0–40)
- bg #ffffff, height 40, padding 0 16, flex row, space-between, align center.
- Left: "9:30", Google Sans Regular 14/20, ls 0.25px, color #1d1b20. Container 128 wide.
- Right: `assets/sb-wifi-16.svg` 16x16 (margin-right −2px), `assets/sb-signal-16.svg` 16x16, `assets/sb-battery-16.svg` 16x16 (gap 2).
### Chrome toolbar (40–106), height 66
- bg #ffffff, border-bottom 1px #ebebeb, position relative.
- Home icon `assets/chrome-home-24.svg` 24x24: absolute, left 12, vertically centered (+0.5px).
- Address field: absolute, left 44, right 84, top 16. bg rgba(51,51,51,0.10), radius 17, padding 9 11, flex row, gap 8, align center (~34 tall).
  - Lock: a 16x16 box holding `assets/chrome-lock-8x11.svg` (8x11.35) at x4, y3.
  - URL text "https://seller.housing.com/neo": Roboto Medium 10/13, #333333.
- Tabs counter: absolute, right 52, centered vertically, 16x16 box with a 1.5px #333 border, radius 5. "1" Roboto Bold 10px #333, centered.
- More: `assets/chrome-more-24.svg` 24x24, absolute, right 12, centered vertically.

## top-panel (instance 12793:16508), 360x74 (y 106–180)
- Background: transparent (the page's #faf9f5 shows through). No border.
- Header row: padding **12 16**, flex row, gap 16, align center.
  - Leading elements: flex row, gap 8, align center, flex 1.
    - Back button: 24x24 `assets/ic-back-24.svg` (left arrow). Tap = go back to the previous step (project selection).
    - Headline block: padding-left 8, padding-y 4, flex 1. Column, gap 4:
      - Title "Confirm the project details": Google Sans Flex **SemiBold 600, 16/22**, color **#222222** (text/grey/grey1), single line, ellipsis.
      - Subtitle "138 of 150 pinnings left · valid till 12 Oct": **Regular 400, 14px, line-height 16px**, color **#767676** (text/grey/grey4), single line, ellipsis.
- Toasts (m3.2, m3.10) are drawn at y=118 and cover most of this panel (see cmp-m-toast.md).
