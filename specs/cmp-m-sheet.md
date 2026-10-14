# cmp-m-sheet — Mobile bottom-sheet shell (scrim, radius, handle, header, close, body, actions)

Used by m3.3, m3.4, m3.6, m3.7, m3.9 (and the m4.x sheets, see m4-common.md). Figma layer name `bottom-sheet` (e.g. 12794:230244, 12794:230419), scrim = `Overlay` instance (e.g. 12794:230243).
Viewport frame for overlay screens = 360x800 (m3.3 is 360x932 because its sheet is taller than the viewport, see below).

## Scrim
- Full viewport, 360x800 at (0,0). It covers the status bar and browser chrome too.
- Fill `rgba(0,0,0,0.30)`. No blur.
- The base page underneath is rendered as normal (unscrolled, top of the m3.1 page) and is not interactive. Tapping the scrim closes the sheet (inferred).

## Sheet container
- Position: fixed to the bottom, x=0, width 360 (100%). Height = hug content (per-screen heights are listed in each screen spec).
- Background `surface/white #ffffff`. Radius **20px top-left and top-right**, 0 bottom. `overflow: hidden`. No border, no shadow.
- Layout: flex column (Header, then Body, then Actions), no gap.
- **Top padding 8px** on every sheet except m3.3 (m3.3 has 0 top padding, so its header starts at y=0 of the sheet).
- Grab handle: a 40x4 rounded rect at x=160, y=8 exists in Figma but is **hidden**. **Do not render it.**
- Tall content (m3.3, 822px tall, taller than the 690px left under the browser chrome): give the sheet `max-height: calc(100vh - 110px)`, keep the header and actions fixed, and let the body scroll. In Figma, m3.3's sheet top sits at y=110 and its bottom runs past 800 to y=932.

## Header (`Dialog header`)
- Full width. Padding **16 top / 48 right / 16 bottom / 16 left**. Flex column, gap **4**, justify center. Border-bottom **1px `border/subtle #edebdf`**. `overflow: hidden`.
- Title: Google Sans Flex **Medium 500, 16px / 22px**, ls 0, `text/primary #0f0e0d`. Width fills the space (296 at 360).
- Subtitle (optional), two styles:
  - **Context subtitle** (m3.6, m3.7, m3.9; e.g. "3 BHK · 2,400 sq.ft"): **Regular 400, 14px / 20px**, `text/muted #666666`. Header height = 16+22+4+20+16 = 78.
  - **Description subtitle** (m3.3 only): **Regular 400, 12px / 16px**, color **#656565** (text_colors/grey/600), wraps (2 lines at 296 wide). Header height = 90.
  - With no subtitle (m3.4): header height 54.
- Close control: a **32x32** button, `position:absolute; right:8px; top:10px` (relative to the header), with its icon centered. Icon `assets/ic-x-16.svg`, 16x16 (CSS root size 16x16, stroke #222). Tapping it closes the sheet.

## Body (`Dialog body`)
- Full width, flex column, `overflow: hidden` (scrolls when the sheet is too tall). Inner content width = 312 (360 − 2×24).
- Padding varies by sheet:
  - Form sheets (m3.3, m3.6, m3.9): **24px all sides**.
  - Thank-you / confirmation sheets (m3.4, m3.7): **12 top, 24 right, 24 bottom, 24 left**.
- Inner stack gap: **16px** in every m3 sheet.

## Actions (`Dialog actions`)
- Full width. Padding **24px**. Border-top **1px `border/subtle #edebdf`**. Flex row, centered. Height 96.
- One primary button (`buttons` instance), flex 1 (312 wide), **height 48** (min and max 48), min-width 96, padding 12/20, radius **12**, gap 4, centered.
  - Enabled (the only state drawn in m3 sheets): bg **`surface/brand #4a16d9`**, label Google Sans Flex **Medium 500, 14/20, ls 0.1px**, `text/inverse #ffffff`, centered, nowrap.
  - Disabled (from sticky-cta / m4): bg `surface/disabled #eeeeee`, label `#666666`.
  - Labels used: "Add configuration" (m3.3), "Back to pinning" (m3.4), "Send report" (m3.6), "Done" (m3.7), "Save price" (m3.9).

## Shared body building blocks

### Suffix-addon input (used in m3.3, m3.6, m3.9)
Built on the InputField in `cmp-input-field.md`: label 12/16 Regular #444 ls 0.1, gap 4, field 40 tall, radius 12, border 1px #ddd9ce, padding 8/16, value Regular 14/20 #0f0e0d.
- Required marker: label text + space + `*` in **#8a2b20**, same size (e.g. "Price (₹) *").
- Suffix addon: `position:absolute; right:0; top:-1px; height:40px` (it covers the field's right border; the field's `overflow:hidden` + radius 12 clips its right corners). Bg **`surface/default #f6f4ed`**, padding **4 / 8** (vertical/horizontal), flex row, align center, justify end. **No left border.**
  - Static suffix: text Regular 14/20, **`text/muted #666666`**, right-aligned. Examples: "₹1.7 Cr", "₹1.56 Cr", "/sq.ft.".
  - Dropdown suffix (unit picker): text Regular 14/20 **#0f0e0d** "sq.ft." + gap **10** + 16x16 caret `assets/ic-caret-down-16-3.svg` (stroke #222). Addon width 75.
- Two stacked inputs are grouped in a column with gap **12**.

### Checkbox (Bricks "Checkbox"/"Selection")
- Row: flex, gap **8**, align start. Box wrapper has padding-top **2** so the 16px box lines up with the 20px label line.
- Box 16x16, radius **4**:
  - Unchecked: bg #fff, border 1px `border/default #ddd9ce`.
  - Checked: bg **`lavender_mist/2 #eee4f1`**, border 1px **`border/brand #4a16d9`**, a centered 12x12 check `assets/ic-check-12-brand.svg`.
- Label: 14/20, `text/primary #0f0e0d`. Weight is **Regular 400** in the report sheet (m3.6) and **Medium 500** in config rows. The "Select all" label is Medium in `#4a16d9`.

### Success summary (m3.4, m3.7)
- Hero row: flex row, gap **8**, align start. Icon `assets/ic-check-circle-success-48.svg` 48x48 (green filled check circle). Text column, flex 1 (256 wide), gap **8**:
  - Title: Medium 500, 14/20, #0f0e0d.
  - Body: Regular 400, 12/16, #666666, wraps.
- Key-value list (`summary`): column, radius 10, overflow hidden, full width (312). Each `kv` row: bg #fff, padding **8 0**, flex row, `justify-content: space-between`, align start, 32 tall. Text 12/16, ls 0.1px, nowrap.
  - Key: Regular 400, #666666.
  - Value: Medium 500, #0f0e0d, right-aligned.
  - No dividers between rows.
