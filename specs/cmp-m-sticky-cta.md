# cmp-m-sticky-cta — Mobile bottom submit bar

Figma local component `sticky-cta` 13002:147130 (instance in m3.1: 13002:147131). Size 360x185.
Behaviour: `position: sticky; bottom: 0` (stays fixed at the bottom of the viewport while the page scrolls). In the Figma frames it is drawn after the content.

## Container
- bg #fff, border-top 1px `border/subtle #edebdf`, padding **16**, flex column, gap **16**, `overflow: hidden`.
- Shadow (Elevations/04): `0 6px 16px 0 rgba(0,0,0,0.14), 0 6px 8px -3px rgba(0,0,0,0.09)`.

## 1. summary: column, gap 2, 12/16, ls 0.1px, nowrap
- Line 1: **Medium 500**, #0f0e0d: "Unitech Harmony · 30 days from 22 Sep 2026"
- Line 2: **Regular 400**, #666666: "2 configurations · 1 pinning · 137 left after this"
  - Error variant (m3.2): the first segment turns `semantic_text/danger #8a2b20`: "<span #8a2b20>0 configurations</span> · 1 pinning · 137 left after this".
  - Text is dynamic: the configuration count, pinning count and remaining count follow the current selection and duration.

## 2. managed-by row: flex row, gap 8, align center, full width (clickable)
- Label "Managed by": Regular 12/16, #666666.
- Selector (flex 1): bg #fff, border 1px `border/default #ddd9ce`, radius **12**, padding **8 12**, flex row, gap 8, align center (~38 tall).
  - Avatar 18x18 circle, `assets/avatar-jitesh-kumar.png` (object-fit: cover, radius 999).
  - Name "Jitesh Kumar": Medium 500, 14/20, #0f0e0d.
  - Caret `assets/ic-caret-down-16-2.svg` 16x16 (grey #7d7d7d).
  - Tap = choose who manages the pinning (self or a sub-broker; links to the M4 sub-broker sheets, inferred).

## 3. Primary button: full width, height 48 (min and max 48), min-width 96, padding 12 20, radius 12, centered
- Label "Submit pinning request": **Medium 500, 14/20, ls 0.1px**, centered.
- **Drawn state in every M3 frame = disabled-look:** bg `surface/disabled #eeeeee`, label `text/muted #666666`. This includes m3.8 and m3.10, where rows are selected, so the drawn look does not change with validity.
- The enabled look is not drawn. If used: bg #4a16d9, label #fff (same as the sheet primary).
- Tap with 0 configurations selected → m3.2 (error toast + red units border + red "0 configurations").
