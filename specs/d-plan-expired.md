# d-plan-expired · "Expired" modal (+ thanks variant)

Shell: `cmp-modal-dialog.md` → "Status / alert modal variant". Both 560 x 272, standalone in Figma. Render centered over dashboard (base **d1.2** / d1.2b) with rgba(0,0,0,.5) scrim.

## Trigger / flow
- Package validity has ended (after the d1.2b "6 days left" state runs out) and the user tries to add / pin → **d-plan-expired** (12973:261874). Also the natural result of "Renew now".
- **Yes, I want to extend / purchase again** → **d-plan-expired-thanks** (12973:261906).
- **Done** / X → close.

## A. d-plan-expired — 12973:261874 (ref `ref/d-plan-expired.png`)
- Header title **Expired** (16/22 Medium #0f0e0d) + close `assets/ic-x-16.svg`.
- Body: `assets/ic-warning-fill-danger-48.svg` 48x48; heading **New project pinning plan is expired** (18/26 SemiBold #0f0e0d); text **Your time duration for new project pinnings as per the package has expired now. To add more, please purchase additional slots.** (14px Regular, lh normal, #666, 2 lines).
- Button (512x48 primary): **Yes, I want to extend / purchase again**.

## B. d-plan-expired-thanks — 12973:261906 (ref `ref/d-plan-expired-thanks.png`)
- Header title **Expired** + close.
- `assets/ic-check-circle-success-48.svg`; heading **Request submitted successfully**; text **Thank you for your interest, your account manager will reach out to you as soon as possible.**
- Button **Done**.
