# Extraction brief (for spec agents)

Figma fileKey: MMROfHNkpi8xHCcP7yQt41. Project root: ROOT = the np-pinning folder that contains this file.
Goal: produce implementation-grade specs + assets so ANOTHER engineer can rebuild each screen pixel-accurately in plain HTML/CSS/JS WITHOUT access to Figma.

Tools: load via ToolSearch "select:mcp__e1578507-beaf-4ea8-bcd3-ff55ecaf5fee__get_design_context,mcp__e1578507-beaf-4ea8-bcd3-ff55ecaf5fee__get_screenshot,mcp__e1578507-beaf-4ea8-bcd3-ff55ecaf5fee__get_metadata,mcp__e1578507-beaf-4ea8-bcd3-ff55ecaf5fee__download_assets".
Always pass skillNames "figma-design-to-code", clientLanguages "html,css,javascript", clientFrameworks "unknown" to get_design_context.

For EACH frame assigned to you:
1. Reference screenshot: get_screenshot (maxDimension 1600 desktop / 1200 mobile), then curl the returned URL to ROOT/ref/<code>.png (code like d1.2, d3.1, m2.4). Look at it.
2. get_design_context on the frame. Output is huge (often >100KB and TRUNCATED at 100000 chars). If truncated or sparse, call get_design_context on the frame's visible child nodes (find IDs via get_metadata, or from the data-node-id attributes) until you have complete info for every visible part. For screens that are an overlay (modal/sheet/dropdown) over an identical base page already specced by you, you only need to fully spec the overlay + note "base = <code>" and any base differences.
   Process large outputs with python/jq from the saved tool-result file rather than reading 100KB into your context.
3. ASSETS: every image/SVG URL (https://www.figma.com/api/mcp/asset/...) used by a VISIBLE element must be downloaded with curl into ROOT/assets/ (URLs expire fast — download right after each call). Name files by semantic layer name, kebab-case, e.g. ic-caret-right-16.svg, housing-logo-seller-dark.svg, project-thumb-1.png. Before saving, check if a file of that name exists: if identical content (md5) reuse it; if different, add a suffix (-2, -3). NEVER modify asset contents. Note SVG root width/height. Append one line per NEW file to ROOT/assets/MANIFEST.txt: `file | figma layer name | node id | rendered size WxH | where used`.
4. Write ROOT/specs/<code>.md containing:
   - Title, figma node id, frame size, purpose of state, which interaction leads here and where its CTAs lead (infer from flow names).
   - Layout tree top→bottom with exact px: positions/sizes, flex direction, gaps, paddings, radii, borders (color+width), shadows, backgrounds (hex + token name), overlay scrim colors/opacity.
   - Typography for every text: size/line-height/weight/color/letter-spacing.
   - ALL visible copy VERBATIM (every label, placeholder, table cell, helper text, error, badge).
   - Every asset used: local filename + rendered box size + position (e.g. "24x24 icon left of 'Add sub-broker', gap 8").
   - Component states visible (selected/disabled/hover/error) and how they look.
   Be complete but terse (bullets, no React code dumps). Repeated rows: give one row's spec + the list of row data.
5. If a reusable component appears (navbar, project card, config table, dropdown panel, sticky CTA, bottom sheet, modal shell, OTP input, pagination…), spec it ONCE in ROOT/specs/cmp-<name>.md (check if another agent already wrote it; if so only append differences) and reference it from screen specs.

Do not write app code. Finish with a short summary: files written, frames done, anything uncertain.
