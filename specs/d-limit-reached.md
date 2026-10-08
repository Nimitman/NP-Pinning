# d-limit-reached · "Limit reached" modal (+ request-submitted variant)

Shell: `cmp-modal-dialog.md` → "Status / alert modal variant". Both frames 560 x 272, standalone in Figma (no scrim drawn). Render centered over the dashboard (base **d1.2**, budget would read 150 of 150 / 0 left) with rgba(0,0,0,.5) scrim.

## Trigger / flow
- User clicks "+ Add new project pinning" / "Pin a project" / card "Pin" when all 150 pinnings are used → **d-limit-reached** (12973:261792).
- Click **Yes, I want more slots** → request sent to account manager → **d-limit-reached-thanks** (12973:261940).
- **Done** or X (close) → dismiss back to dashboard.

## A. d-limit-reached — 12973:261792 (ref `ref/d-limit-reached.png`)
- Header (h54, border-bottom 1px #edebdf, padding 16): title **Limit reached** 16px/22px Medium 500 #0f0e0d; close 32x32 at top 10/right 10 with `assets/ic-x-16.svg` (stroke #222).
- Body (h122, padding 24): row gap 16:
  - `assets/ic-warning-fill-danger-48.svg` 48x48 (red #be3f31 triangle).
  - Heading **New project pinning limit reached** — 18px/26px SemiBold #0f0e0d.
  - Text (gap 12 below heading) **You've reached the limit of New project pinning slots included in your package. To add more, please purchase additional slots.** — 14px Regular, line-height normal, #666, 2 lines.
- Actions (h96, border-top 1px #edebdf, padding 24): primary full-width 512x48 **Yes, I want more slots** (bg #4a16d9, radius 12, label 14/20 Medium #fff ls 0.1).

## B. d-limit-reached-thanks — 12973:261940 (ref `ref/d-limit-reached-thanks.png`)
- Same header title **Limit reached** + close.
- Icon `assets/ic-check-circle-success-48.svg` 48x48 (green #2f7f49).
- Heading **Request submitted successfully**.
- Text **Thank you for your interest, your account manager will reach out to you as soon as possible.**
- Button **Done**.
