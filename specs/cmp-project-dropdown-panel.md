# cmp-project-dropdown-panel — "Project DropdownPanel/Default" (desktop typeahead results)

Figma component 12597:138481 (362x172). Instance in d1.6: 12909:245280 at **512x172**, modal-relative (24, 306) = directly under the "Select project" search field (0 gap).

## Shell
- bg #fff; border 1px #ddd9ce; radius 12; overflow hidden; shadow Elevations/03 `0 4px 12px 0 rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.08)`.
- No search field inside (the modal's "Select project" field is the input). Padding-top 0; Items container padding-top 12. Height hugs content: 12 + 4×40 = 172.

## Result rows (height 40, padding 8/16, gap 12, label 14/20 Regular, bottom divider 1px #edebdf)
Format: "<Project name>, <Locality>, <City>" — verbatim:
1. Unitech Escape, Sector 49, Gurgaon — default (bg #fff, #0f0e0d)
2. Unitech Harmony, Sector 49, Gurgaon — **highlighted** (hover/keyboard-active)
3. Unitech Sky, Boyalahalli, Gurgaon — default

Highlight colors differ between component and instance:
- Library component default: highlight bg **#faf9f5** (surface/subtle), label #0f0e0d.
- **As used in d1.6**: bg **#f5f1fe** (surface/brand_subtle), label **#4a16d9** (text/brand). Use the d1.6 style for the active row.

## Footer row ("Can’t find your project?")
- Height 40, padding 8/16, gap 12, bg **#f6f4ed** (surface/default), bottom-left/right radius 12 (matches panel). No divider.
- Left group (gap 2, align center): `assets/ic-question-20.svg` 20x20 + text **"Can’t find your project? "** 14/20 Regular #0f0e0d (curly apostrophe; trailing space).
- Link button (height 14): **"Add this project"** Google Sans Flex Medium 12px / 12px lh, ls .1, **#4a16d9**, underline. Click → opens "Request a missing project" modal (d1.9).

## Behaviour
- Appears while typing in the "Select project" field (d1.6, query "Unitech"). Matches filtered by typed text within selected city/localities.
- Clicking a row → fills the field with the row text and shows the project summary card (d1.7), or the already-pinned warning (d1.8) if the project already has an active pinning.
