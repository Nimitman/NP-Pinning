# cmp-input-field — Desktop InputField (Bricks DS) as used in the pinning modal

Figma: library component "InputField" (instances e.g. 12991:20528/20529/20530 in d1.3). Width = container (512 in modal; 480 inside dropdown panels). Total height 60 = label 16 + gap 4 + field 40.

## Anatomy
- Wrapper: flex column, gap **4px**, `overflow: hidden`.
- Label row: text Google Sans Flex **Regular 400, 12px/16px, ls 0.1px**, color **#444444** (text/secondary), nowrap.
  - Required marker: label text + space + `*` in **#8a2b20** (same size) — e.g. "Project name *" (d1.9).
- Field box: height **40px**, bg #fff, **border 1px**, radius **12px** (radius-m), padding **8px 16px**, flex row, align center, gap **8px**, overflow hidden.
  - Value/placeholder text: flex 1, Google Sans Flex **Regular 400, 14px/20px**, ls 0.
  - Optional leading icon 16x16 (search fields): `assets/ic-magnifying-glass-16.svg`.
  - Optional trailing icon 16x16: select → `assets/ic-caret-down-16.svg` (chevron); typing → clear X `assets/ic-x-16-2.svg` (stroke #0F0E0D).
  - Dropdown panel search fields (inside cmp-*-dropdown-panel) have NO label: field box only.

## States (as drawn in Figma)
| State | Border | Text color | Example |
|---|---|---|---|
| Default / empty (placeholder) | #ddd9ce (border/default) | placeholder #666666 (text/muted) | "Search project name" (d1.3), "Choose a city" (d1.4), "Choose localities" (d1.5) |
| Filled (value set) | #ddd9ce | value #0f0e0d (text/primary) | "Gurgaon", "Sector 49 + 2", "Unitech Harmony, Sector 49, Gurgaon" (d1.7) |
| Focused / typing | **#211d19** (border/selected) 1px | typed text shown in **#666666** in Figma ("Unitech"); trailing X clear icon visible | d1.6 project search |
| Select open (dropdown showing) | stays #ddd9ce (Figma does not change border while panel is open — d1.4/d1.5) | placeholder #666 | d1.4, d1.5 |
| Typed in panel search, no results | #ddd9ce | #0f0e0d, caret drawn as "|" | cmp-city/locality "no results found" variant ("hubhon|") |
| Error | Not drawn in d1.x. Same DS InputField error as specced in m4-common.md: border **#f1b7ae** (semantic_border/danger); supporting row under field (gap 4): 16x16 `assets/ic-warning-circle-danger-16.svg` + 4 gap + text 12/16 ls .1 **#8a2b20** (semantic_text/danger). | value #0f0e0d | — |
| Disabled | Not drawn. | | |

Notes
- Select-type fields (City/Locality in d1.3–d1.9) are the same InputField with a trailing caret; clicking opens the corresponding dropdown panel flush under the field (0px gap, same x and width).
- Multi-select summary text format: "Sector 49 + 2" (first selection + count of additional).

---
## Additions from section 04 (d4.2–d4.6, sub-broker modal), added by the d4 agent

### Supporting-content row (helper under the field)
- flex row, gap 4, align center; text 12/16 Regular, ls 0.1px. Optional 16x16 status icon on the left.

### Phone variant (Field contents, left to right)
- Country selector (gap 4): "+91" 14/20 Regular (#444 while the number is empty, #0f0e0d once filled) + 12x12 chevron `assets/ic-caret-right-12.svg` (16x16 CaretRight SVG drawn at 12x12 and rotated 90° so it points DOWN).
- Divider: 1px wide x 20 tall, #ddd9ce, radius 999.
- Number text or placeholder (flex 1). Placeholder "10-digit mobile number". Filled format: 5 digits, space, 5 digits, e.g. "98998 97898" (+91 is not part of the text).

### Additional states seen in d4.x (these ARE drawn)
| state | field border | helper |
|---|---|---|
| default helper | #ddd9ce | #666 "We’ll send a 4-digit OTP to this number" |
| info (already your sub-broker) | #ddd9ce | #214ead (semantic_text/info) "Already your sub-broker", no icon |
| **error** | **#f1b7ae** (semantic_border/danger) | 16x16 `assets/ic-warning-circle-danger-16.svg` + text **#8a2b20** (semantic_text/danger) |
| success (verified) | #ddd9ce | #247840 "✓ Verified just now" (✓ is a text glyph) |
- Password: value drawn as "••••" 14px #0f0e0d. The design has no show/hide icon.

### OTP input (d4.5), Figma `OtpField` 12689:153633
- One box (not 4 separate boxes): height 60, padding 16 24, radius 12, bg #fff, border 1px #ddd9ce; flex row, align center, gap 48; width hugs content (~252 = 24 + 4x15 + 3x48 + 24). Left aligned in the modal body.
- 4 digit slots, each 15 wide x 22 tall, centered text. An empty slot shows "-" in **Rubik Regular 32px** (line-height 36), color #edebdf (warm_neutral/200).
- Filled and focused states are not drawn. Suggested: digit in Rubik 32px #0f0e0d; focused box border #211d19.

## Mobile variants
- Phone-number InputField (country code + divider + supporting row, info/success/error states): see `m4-common.md` § "Phone number input". Other agents: append mobile-specific differences below this line.
- (m4 agent) Mobile m4.2–m4.6 use exactly the same InputField / phone variant / states / OtpField as d4.x above, at width 312 (sheet body 360 − 2x24 padding). OTP box 252x60 left-aligned. No other differences. Mobile shell, scrim and flow: `m4-common.md`.
