# Interactive States & Flows (Agents)

This document describes all 66 interactive states in the NP-Pinning prototype, organized by flow and user journey.

## Quick Reference

**Total states**: 66 (41 desktop, 25 mobile)

**Access via:**
- Screens switcher (dark pill, bottom-left)
- URL hash: `#d1.2`, `#m3.5`, etc.
- Keyboard: `[` and `]` to step
- Console: `NP.goto('d1.2')`

---

## Desktop States (d1–d4)

Unless a state says otherwise it starts from the default prototype data: budget 12 of 150 pinnings used (138 left), package valid till 12 Oct 2026 with 20 days left (amber "warning" budget card), prototype "today" 22 Sep 2026. Create-pinning states (`d3.*`, `d4.*`) open "Unitech Harmony" with the first two configurations selected, 30 days, managed by Jitesh Kumar.

### Section 01: Entry & Dashboard

#### d1.1 – Dashboard — first time (no pinnings)
- **Setup**: `firstTime = true`, budget 0 used, 90 days left
- **Header**: "New project pinning" with no "Pin a project" button; budget card in normal state ("0 of 150 pinnings used · 150 left", "Package valid till 12 Oct 2026 · 90 days left")
- **Content**: "How it works" card (Pick a project → Pin it → Get leads), "Best opportunities for you (24)" carousel with filters
- **Hidden**: "Your pinnings" table
- **CTA**: "+ Add new project pinning"

#### d1.2 – Dashboard — with pinnings
- **Setup**: none (default data)
- **Header**: "New project pinning" + "Pin a project" outline button; budget card "12 of 150 pinnings used · 138 left", "20 days left" (warning)
- **Best opportunities**: filter pills Gurugram, "Sector 71, +2", High demand, Seller competition, Developer is active; ‹ › carousel arrows
- **Your pinnings**: Export link, collapse button, tabs All (12) / Active (8) / Expired (2) / Pending (2) / Rejected (0), rows Bestech Sanskriti, Emaar Digihub, Godrej Aria (Ending soon), M3M Capital (Pending approval); pager 1–4 … 12
- **CTA**: "+ Add new project pinning"

#### d1.2a – Your pinnings collapsed
- **Setup**: `pinCollapsed = true`, `collapsible = true`
- **Your pinnings**: replaced by a banner "You have total of 8 active, 2 pending and 3 expired pinnings." with an expand (▾) button
- **Rest**: same as d1.2

#### d1.2b – Package expiring (6 days, Renew now)
- **Setup**: `budget.daysLeft = 6`, `collapsible = true`
- **Budget card**: danger (red) state, "Package valid till 12 Oct 2026 · 6 days left", "Renew now" button (opens the Plan expired modal)
- **Your pinnings**: expanded, collapsible styling

#### d1.2c – Seller competition dropdown
- **Setup**: `filters.open = 'competition'`
- **Dropdown**: No competition yet, Low competition, Moderate competition, Crowded; picking one filters the carousel

#### d1.2d – Demand dropdown (disabled option)
- **Setup**: `filters.open = 'demand'`
- **Shows**: the "Buyer demand" picker with "High demand" disabled and "Moderate demand" selectable
- **Note**: only the mobile layout renders this picker. On desktop "High demand" is a toggle pill, so at desktop width this state looks like d1.2

#### d-limit – Limit reached modal
- **Setup**: budget 150 of 150 used (0 left), `modal = 'limit'`
- **Modal**: "Limit reached", red warning icon, "New project pinning limit reached", copy about purchasing additional slots
- **CTA**: "Yes, I want more slots" → d-limit-thanks

#### d-limit-thanks – Limit reached — request submitted
- **Setup**: budget 150 used, `modal = 'limitThanks'`
- **Modal**: "Limit reached", green check, "Request submitted successfully", "Thank you for your interest, your account manager will reach out to you as soon as possible."
- **CTA**: "Done"

#### d-expired – Plan expired modal
- **Setup**: `budget.daysLeft = 0`, `modal = 'expired'`
- **Budget card**: expired state, "Package expired on 12 Oct 2026", "Renew now"
- **Modal**: "Expired", "New project pinning plan is expired", copy about extending/purchasing
- **CTA**: "Yes, I want to extend / purchase again" → d-expired-thanks

#### d-expired-thanks – Plan expired — request submitted
- **Setup**: `budget.daysLeft = 0`, `modal = 'expiredThanks'`
- **Modal**: "Expired", green check, "Request submitted successfully", account-manager copy
- **CTA**: "Done"

---

### Section 02: Select Project

#### d1.3 – Select a project to pin
- **Setup**: `modal = 'select'`
- **Modal**: "Select a project to pin" over the dashboard
- **Fields**: Select city (Gurgaon), Select locality ("Sector 49 + 2"), Select project (empty search, "Search project name")
- **CTA**: "Start pinning this project" (disabled until a project is picked)

#### d1.4 – City dropdown open
- **Setup**: select modal, `sel.open = 'city'`
- **Panel**: "Search city..." box; New Delhi, Gurugram (selected), Noida, Mumbai, Pune, Bangalore, Ahmedabad, Hyderabad
- **Locked**: Mumbai shows "Not allowed under your plan" and can't be picked

#### d1.5 – Locality dropdown open
- **Setup**: select modal, `sel.open = 'loc'`, draft selection `['Sector 49']`
- **Panel**: "Search locality..." box; multi-select checkboxes with only Sector 49 checked; Golf Course Road locked ("Not allowed under your plan")
- **CTA**: "Select locality" applies the draft

#### d1.6 – Project typeahead results
- **Setup**: select modal, query "Unitech", `sel.open = 'proj'`, highlight index 1
- **Results**: Unitech Escape, Unitech Harmony (highlighted), Unitech Sky (each as "Name, Locality, Gurgaon"); ↑/↓/Enter navigate
- **Footer**: "Can’t find your project? Add this project" → request modal

#### d1.7 – Project selected — CTA enabled
- **Setup**: select modal, project `harmony` ("Unitech Harmony, Sector 49, Gurgaon")
- **Summary card**: Unitech Harmony, "2, 3 BHK Apartments · ₹1.5 – 2.5 Cr", "Nirvana Country, Sector 49, Dwarka Expressway, Gurugram", High demand · No competition yet · Developer is active
- **CTA**: "Start pinning this project" enabled → create pinning (d3.1)

#### d1.8 – Project already pinned
- **Setup**: as d1.7 plus `sel.forcePinned = true`
- **Callout** (warning): "You already pinned this project" — "Ending soon · started 05 Jul 2026 · 4 days left. A project can hold only one pinning at a time — extend the existing one instead."
- **CTA**: "View & extend existing pinning" → back to dashboard with an "Opening your existing pinning" toast

#### d1.9 – Request missing project
- **Setup**: `modal = 'request'`, form pre-filled with demo values
- **Modal**: "Request a missing project"
- **Fields**: Project name "Unitech Grande", Developer "Unitech Group", City "Gurugram", Locality "Sector 49", RERA "ASDF247376", Launch "11/10/2026", Possession "10/11/2026"
- **Note**: "Housing verifies new projects within 48 hours. No pinning is used until the project is live…"
- **CTA**: "Submit project request" (name, city and locality required)

#### d1.9a – Request sent
- **Setup**: demo request, `req.sent = 'Unitech Grande, Sector 49, Gurugram'`, `modal = 'requestSent'`
- **Modal**: "Project request sent", pill "Under verification · ETA 48 hrs", project line, copy ending "Nothing has been deducted from your 138 pinnings."
- **CTA**: "Done"

---

### Section 03: Create Pinning

#### d3.1 – Confirm details
- **Setup**: `create(S)` — route `create` for Unitech Harmony
- **Header**: "Creating new project pinning" / "Confirm the details before pinning the project" + budget card
- **Project card**: Unitech Harmony with dark "Selected" tag, signal strip, "Preview project"
- **When should it run?**: start date 22 Sep 2026 (calendar limited to 22 Sep–12 Oct), duration pills 30 / 60 / 90 days (1 / 2 / 3 pinnings), hint "1 pinning will be used for 30 days · 137 will remain"
- **Configurations**: 2 BHK · 1,500 sq.ft, 2 BHK · 1,800 sq.ft (both selected), 3 BHK · 2,000 sq.ft, 3 BHK · 2,400 sq.ft; columns Total price (pencil), Price / sq.ft. (unit dropdown, pencil), Report; "Select all"; "+ Add missing configuration"
- **Submit bar**: "Pinning Unitech Harmony for 30 days from 22 Sep 2026", "2 configurations selected · 1 pinning used · 137 remaining after this", Managed by Jitesh Kumar, "Submit pinning request"

#### d3.1a – Unit dropdown open (sq.ft. / sq.m.)
- **Setup**: d3.1 + `unitOpen = true`
- **Dropdown**: sq.ft. (selected) / sq.m. under the "Price / sq.ft." header; choosing sq.m. converts rates at 1 sq.m. = 10.7639 sq.ft.

#### d3.2 – No configuration selected (error)
- **Setup**: all rows unselected, `create.error = true`
- **Table**: error outline; message "Select at least one configuration you are selling — buyers are matched to you by configuration."
- **Submit bar**: "0 configurations selected"; selecting any row clears the error

#### d3.3 – Add missing configuration
- **Setup**: rows unselected, add-config form pre-filled (no type/BHK chosen), `modal = 'addCfg'`
- **Modal**: "Add a missing configuration" / "Please add the configuration details which you think are missing for this project."
- **Fields**: Property Type pills (Apartment … Plot), BHK pills (1 BHK … 5+ BHK), Built up area 1,650 sq.ft., Price 1,72,00,000 (₹1.72 Cr) ⇄ Rate 10,424 /sq.ft. (each recalculates the other)
- **CTA**: "Add configuration" (shows field errors until type and BHK are picked)

#### d3.4 – Thank you — configuration added
- **Setup**: rows unselected, add-config form filled with Apartment / 3 BHK, `modal = 'addCfgThanks'`
- **Modal**: "Configuration added", "Thanks — 3 BHK · 1,650 sq.ft is added", Under review copy
- **Details**: Configuration "3 BHK Apartment · 1,650 sq.ft", Your price "₹1.72 Cr · ₹10,424/sq.ft", Reference "CFG-48213"
- **CTA**: "Back to pinning" adds the row (see d3.5)

#### d3.5 – New configuration row (Under review)
- **Setup**: original rows unselected, `warn90 = true`, new selected row 3 BHK Apartment · 1,650 sq.ft (₹1,72,00,000, ₹10,424/sq.ft)
- **Row**: "Under review" chip, "Added by you · verified within 48 hrs", "Remove" action
- **Duration**: warning icon on the 90 days pill

#### d3.6 – Report & correct configuration
- **Setup**: report opened for row c4 (3 BHK · 2,400 sq.ft), correct price set to 2,32,00,000
- **Modal**: "Report and update the correct information", subtitle "3 BHK · 2,400 sq.ft"
- **Reasons**: "Price is wrong" (checked: Correct price ₹2,32,00,000 ⇄ Rate 10,417 /sq.ft.), "Built-up area is wrong", "This configuration doesn’t exist in the project", "Something else"
- **Note**: "Reports are reviewed by Housing within 72 hrs. Your pinning is not affected."
- **CTA**: "Send report"

#### d3.6a – Report — all reasons expanded
- **Setup**: as d3.6 with all four reasons checked
- **Expanded**: price/rate pair, Built up area 2,400 sq.ft., two "Description" text areas

#### d3.7 – Thank you — issue reported
- **Setup**: d3.6 report sent
- **Modal**: "Issue reported" (subtitle "3 BHK · 2,400 sq.ft"), "Thanks for flagging this"
- **Details**: Reported "Price is wrong", Suggested "₹2,32,00,000", Reference "RPT-20931"
- **CTA**: "Done" marks row c4 as Reported

#### d3.8 – Reported label on row
- **Setup**: original rows unselected; new selected row 3 BHK · 1,650 sq.ft with status Reported (ref RPT-20931, "Price is wrong", suggested ₹2,32,00,000)
- **Row**: "Reported" chip, "30 Sep · RPT-20931 · Housing is reviewing"; the "Reported" action reopens the issue summary read-only

#### d3.8b – Inline price editing
- **Setup**: `warn90 = true`, row c4 selected, new selected 3 BHK · 1,650 sq.ft row in `Editing price` with draft 10,424
- **Row**: Price / sq.ft. cell becomes a "₹ … /sq.ft." input; total recalculates as you type; "Total updates as you type · Enter to save, Esc to cancel"; Save / Cancel
- **Saved**: row shows "Price updated by you" with the old rate

#### d3.10 – Inline total price editing
- **Setup**: as d3.8b but the new row is in `Editing total` with draft 1,72,00,000
- **Row**: Total price cell becomes a "₹ …" input with a short-form suffix (₹1.72 Cr); rate recalculates as you type; "Rate updates as you type · Enter to save, Esc to cancel"; Save / Cancel

---

### Section 04: Sub-Broker Management

#### d4.1 – Managed by dropdown
- **Setup**: d3.1 + `managedOpen = true`
- **Dropdown** (opens up from the submit bar): "Who manages this pinning?" / "Leads from this pinning go to the manager"
  - Jitesh Kumar — You · Admin · 4 pinnings (selected)
  - Aakriti Jain — Sub-broker · 4 pinnings
  - Rohit Mehra — Sub-broker · 2 pinnings
  - "+ Create new sub-broker" — "3 of 5 sub-brokers used · verify by OTP"

#### d4.2 – Sub-broker — enter phone
- **Setup**: `modal = 'sb-phone'`, empty phone
- **Modal**: "Create a sub-broker", "STEP 1 OF 3 · VERIFY PHONE", intro copy
- **Field**: "Sub-broker’s mobile number" with +91 prefix, hint "We’ll send a 4-digit OTP to this number"
- **CTA**: "Send OTP" (disabled until a valid 10-digit number)

#### d4.3 – Already in team
- **Setup**: phone `9811111111` (`demoPhones.inTeam`)
- **Field hint**: "Already your sub-broker"
- **Callout** (info): "Rohit Mehra is already in your team" — "Added on 14 Aug 2026 · manages 3 pinnings…"
- **CTA**: "Send OTP" disabled

#### d4.4 – Number linked elsewhere
- **Setup**: phone `9822222222` (`demoPhones.linked`)
- **Field error**: "This number is linked to another Housing account"
- **Callout** (error): "Can’t add this number" + "Contact support"
- **CTA**: "Send OTP" disabled

#### d4.5 – Verify OTP
- **Setup**: `modal = 'sb-otp'`, phone `9899897898` (`demoPhones.ok`), resend timer started
- **Modal**: "STEP 2 OF 3 · VERIFY OTP", "OTP sent to +91 98998 97898" + "Change number"
- **OTP**: 4 boxes; "OTP is valid for 10 minutes"; "Resend in 00:24" counting down, then "Resend OTP"
- **CTA**: "Verify OTP" (enabled at 4 digits)

#### d4.6 – Enter details (with errors)
- **Setup**: `modal = 'sb-details'` (verified), name "Ramlal Sharma", email `ramlal@turboprop.com` (`takenEmail`), password "1234"
- **Modal**: "STEP 3 OF 3 · ENTER DETAILS"; Mobile number read-only "98998 97898" with "✓ Verified just now"
- **Errors**: Email "Already used by another Housing account — use a different email"; Password "Too short — use at least 8 characters with 1 number"
- **Checkbox**: "Send login details by SMS and email" (on)
- **CTA**: "Create sub-broker" disabled; closing the modal now asks to discard (d4.7)

#### d4.7 – Discard confirmation
- **Setup**: d4.6 + `modal = 'sb-discard'`
- **Modal**: "Discard this sub-broker?" — the number is verified but the account isn’t created; leaving needs a fresh OTP
- **CTAs**: "Keep editing" (back to d4.6), "Discard"

#### d4.8 – Thank you — sub-broker created
- **Setup**: valid details (Ramlal Sharma, `ramlal@turboprop.in`, `ramlal2026`) submitted
- **Modal**: "Sub-broker created", "Ramlal Sharma is now your sub-broker", login details sent to +91 98998 97898 and ramlal@turboprop.in
- **Details**: Role "Sub-broker", Assigned to "Unitech Harmony pinning", Team "4 of 5 sub-brokers"
- **CTAs**: "Manage team", "Continue to create pinning"

#### d4.9 – Sub-broker assigned
- **Setup**: d4.8 + Continue
- **Create pinning**: modal closed; Managed by now shows Ramlal Sharma (RS initials)
- **Toast** (8 s): "Ramlal Sharma added to your team · Now managing this pinning" with "Change" (reopens the Managed by dropdown)

---

## Mobile States (m1–m4)

Mobile states render the 360 px layout (inside a device frame with status bar and Chrome toolbar when the window is ≥768 px). Mobile create pinning starts with no configurations selected.

### Section M1: Dashboard Mobile

#### m1.1 – Dashboard — first time
- **Setup**: `firstTime = true`, budget 0 used (days left stays at 20)
- **Top panel**: back arrow, "New project pinning" / "Pin your listings on new-project pages"
- **Content**: budget card in normal styling ("0 of 150 pinnings used · 150 left"), "Best opportunities" cards (Godrej Meridien, DLF Crest, Lodha Bellezza) with filter pills
- **Hidden**: Your pinnings
- **Bottom**: "Add new project pinning" CTA + bottom nav (Dashboard active)

#### m1.2 – Dashboard — with pinnings
- **Setup**: none (default data)
- **Top panel**: "New project pinning" / "12 pinned · 8 active"
- **Budget**: 12 of 150, 138 left, 20 days left (warning)
- **Your pinnings**: Export, collapse toggle, scrolling tabs, 4 cards with status chip, days left, Duration, Managed by, Start/End date; pager "1 / 12"

---

### Section M2: Select Project Mobile

#### m2.1 – Select a project
- **Setup**: route `m-select`
- **Page**: back arrow, "Select a project to pin"; Select city (Gurgaon), Select locality ("Sector 49 + 2"), Select project search
- **Fixed CTA**: "Start pinning this project" (disabled)

#### m2.2 – City sheet open
- **Setup**: `sel.open = 'city'`
- **Sheet**: "Select city", "Search city..." box, 8 cities with Gurugram selected and Mumbai locked ("Not allowed under your plan"); tapping a city applies it

#### m2.3 – Locality sheet open
- **Setup**: `sel.open = 'loc'`, draft `['Sector 49']`
- **Sheet**: "Select locality", "Search locality..." box, multi-select with Sector 49 checked, Golf Course Road locked
- **CTA**: "Select locality"

#### m2.4 – Project results
- **Setup**: query "Unitech", `sel.open = 'proj'`, highlight index 1
- **Results**: Unitech Escape, Unitech Harmony (highlighted), Unitech Sky; footer "Can’t find your project? Add this project"

#### m2.5 – Project selected
- **Setup**: project `harmony`
- **Card**: Unitech Harmony, "2, 3 BHK apartments · ₹1.5 – 2.5 Cr", address, signal row
- **Fixed CTA**: "Start pinning this project" enabled

#### m2.6 – Project already pinned
- **Setup**: m2.5 + `sel.forcePinned = true`
- **Callout**: "You already pinned this project" (Ending soon · 4 days left)
- **Fixed CTA**: "View & extend existing pinning"

#### m2.7 – Request missing project
- **Setup**: route `m-request`, demo values (Unitech Grande, Unitech Group, Gurugram, Sector 49, ASDF247376, 11/10/2026, 10/11/2026)
- **Page**: "Request missing project" full-page form with the same fields and note as d1.9; City/Locality open picker sheets
- **Fixed CTA**: "Submit project request"

#### m2.8 – Request sent
- **Setup**: m2.7 + `modal = 'requestSent'`
- **Sheet**: "Project request sent", "Under verification · ETA 48 hrs", "Unitech Grande, Sector 49, Gurugram"
- **CTA**: "Done" returns to the dashboard

---

### Section M3: Create Pinning Mobile

#### m3.1 – Confirm details
- **Setup**: `create(S)`
- **Top panel**: "Confirm the project details" / "138 of 150 pinnings left · valid till 12 Oct"
- **Content**: Unitech Harmony card ("Selected" tag, external link); "When should it run?" (22 Sep 2026, Duration 30/60/90, "1 pinning for 30 days · 137 will remain"); "Which configurations are you selling?" with 4 unselected cards (Price/sq.ft. and Price rows with pencils, warning icon to report), "Select all", "Add missing configuration"
- **Sticky bar**: "Unitech Harmony · 30 days from 22 Sep 2026", "0 configurations · 1 pinning · 137 left after this", Managed by Jitesh Kumar, "Submit pinning request" (disabled styling)

#### m3.2 – No configuration selected
- **Setup**: `create.error = true` + error toast
- **Shows**: configurations card in error state, "0 configurations" emphasised in the sticky bar, toast "Select at least 1 configuration to pin" (dismissible)

#### m3.3 – Add missing configuration
- **Setup**: add-config form pre-filled (no type/BHK), `modal = 'addCfg'`
- **Sheet**: "Add a missing configuration" with the same fields as d3.3; Price and Rate stacked
- **CTA**: "Add configuration"

#### m3.4 – Configuration added
- **Setup**: Apartment / 3 BHK filled, `modal = 'addCfgThanks'`
- **Sheet**: "Configuration added", "Thanks — 3 BHK · 1,650 sq.ft is added", details incl. Reference CFG-48213
- **CTA**: "Back to pinning"

#### m3.5 – New configuration (Under review)
- **Setup**: new unselected row 3 BHK Apartment · 1,650 sq.ft
- **Card**: "Under review" chip, "Added by you · verified within 48 hrs", "Remove"

#### m3.6 – Report an issue
- **Setup**: report for c4, correct price 2,32,00,000, `modal = 'report'`
- **Sheet**: "Report an issue" / "3 BHK · 2,400 sq.ft"; "Price is wrong" checked (₹2,32,00,000, rate 10,417), other three reasons unchecked
- **CTA**: "Send report"

#### m3.7 – Issue reported
- **Setup**: m3.6 sent
- **Sheet**: "Issue reported", "Thanks for flagging this", Reported "Price is wrong", Suggested "₹2,32,00,000", Reference "RPT-20931"
- **CTA**: "Done"

#### m3.8 – Reported label on row
- **Setup**: row c2 selected; row c4 status Reported (RPT-20931, "Price is wrong")
- **Card**: c4 shows "Reported" chip and "30 Sep · RPT-20931 · Housing is reviewing"; its warning icon opens the report summary

#### m3.9 – Edit price
- **Setup**: `edit` for c1 (total 1,56,00,000, rate 10,400), `modal = 'editPrice'`
- **Sheet**: "Edit price" / "2 BHK Apartment · 1,500 sq.ft"; Total price (₹1.56 Cr) ⇄ Price per sq.ft 10,400 — editing either updates the other
- **CTA**: "Save price"

#### m3.10 – Price updated (toast + Undo)
- **Setup**: m3.9 saved
- **Card**: c1 selected at ₹10,400/sq.ft, ₹1,56,00,000, "Price updated" chip, "it was ₹10,000/sq.ft."
- **Toast** (6 s): "Thanks — price updated" / "₹10,400/sq.ft for 2 BHK · 1,500 sq.ft" with "Undo"

---

### Section M4: Sub-Broker Mobile

#### m4.1 – Choose manager
- **Setup**: create pinning, `modal = 'manager'`
- **Sheet**: "Who manages this pinning?" / "Leads from this pinning go to the manager"; Jitesh Kumar (selected), Aakriti Jain, Rohit Mehra; "+ Create new sub-broker" (3 of 5 used)

#### m4.2 – Enter phone
- **Setup**: `modal = 'sb-phone'`, empty phone
- **Sheet**: "Create a sub-broker", "STEP 1 OF 3 · VERIFY PHONE", +91 phone field
- **CTA**: "Send OTP" (disabled)

#### m4.3 – Already in team
- **Setup**: phone `9811111111`
- **Shows**: "Already your sub-broker" hint and "Rohit Mehra is already in your team" callout; "Send OTP" disabled

#### m4.4 – Number linked elsewhere
- **Setup**: phone `9822222222`
- **Shows**: "This number is linked to another Housing account" error and "Can’t add this number" callout with "Contact support"; "Send OTP" disabled

#### m4.5 – Verify OTP
- **Setup**: `modal = 'sb-otp'`, phone `9899897898`, resend timer started
- **Sheet**: "STEP 2 OF 3 · VERIFY OTP", "OTP sent to +91 98998 97898" + "Change number", 4 OTP boxes, "Resend in 00:24" countdown
- **CTA**: "Verify OTP"

#### m4.6 – Enter details (with errors)
- **Setup**: same demo inputs as d4.6 (Ramlal Sharma, ramlal@turboprop.com, "1234")
- **Sheet**: "STEP 3 OF 3 · ENTER DETAILS"; email and password errors as in d4.6
- **CTA**: "Create sub-broker" disabled

#### m4.7 – Discard confirmation
- **Setup**: m4.6 + `modal = 'sb-discard'`
- **Dialog**: "Discard this sub-broker?" with "Keep editing" / "Discard"

#### m4.8 – Sub-broker created
- **Setup**: valid details (ramlal@turboprop.in / ramlal2026) submitted
- **Sheet**: "Sub-broker created", "Ramlal Sharma is now your sub-broker", Role, Assigned project "Unitech Harmony", Team "4 of 5 sub-brokers"
- **CTAs**: "Manage team" (text button), "Continue"

#### m4.9 – Sub-broker assigned
- **Setup**: m4.8 + Continue
- **Sticky bar**: Managed by Ramlal Sharma
- **Toast** (8 s): "Ramlal Sharma added to your team" / "Now managing this pinning" with "Change"

---

## Navigation Patterns

### Desktop Flow
```
d1.1/d1.2 (Dashboard)
  ↓ "Add new project pinning"
d1.3–d1.9 (Select Project Modal)
  ↓ "Pin a project"
d3.1–d3.8 (Create Pinning)
  ↓ Select manager / "Create new sub-broker"
d4.2–d4.9 (Sub-Broker Flow or Submit)
  ↓ "Submit pinning" or "Continue"
d1.1 (Back to Dashboard with new pinning)
```

### Mobile Flow
```
m1.1–m1.5 (Dashboard)
  ↓ "Add new project pinning"
m2.1–m2.8 (Select Project Page)
  ↓ "Start pinning this project"
m3.1–m3.10 (Create Pinning)
  ↓ Select manager / "Create new sub-broker"
m4.1–m4.9 (Sub-Broker Flow or Submit)
  ↓ "Submit pinning" or "Continue"
m1.1 (Back to Dashboard with new pinning)
```

---

## State Switching Tips

- **Browse all states**: Use Screens switcher (dark pill)
- **Test a flow**: Start at `d1.1` or `m1.1`, click through
- **Jump to error state**: `NP.goto('d3.8a')` to see "nothing selected" error
- **Compare desktop/mobile**: Select same state in Auto/Desktop/Mobile 360 mode
- **Resume from anywhere**: All 66 states are live entry points

---

## Debugging

### Console API
```js
NP.goto('d3.5')              // Jump to state
NP.screens()                 // List all 66 states
NP.S                         // View current state object
NP.S.route                   // Current route
NP.S.sel                     // Project selection state
NP.S.create                  // Pinning creation state
```

### Troubleshooting
- **State not loading**: Check browser console for errors
- **Wrong layout**: Ensure Screens switcher is set to correct device (Auto/Desktop/Mobile)
- **Missing content**: Verify assets/ folder exists and images load (F12 → Network)
- **Form not responding**: Check [data-a] and [data-bind] attributes in HTML

---

## Figma ↔ code map (Broker NP pinning page)

Figma file `MMROfHNkpi8xHCcP7yQt41`, page "↳ Broker NP pinning" (`12108:220025`).

### New states (2026-10-14)
| Code | Figma | What it shows |
|---|---|---|
| `d3.1a` | 3.1a · Create pinning — unit dropdown open (`13258:21075`) | Price / sq.ft. header opens a sq.ft. / sq.m. dropdown; rows convert at 1 sq.m. = 10.7639 sq.ft. |
| `d3.10` | 3.10 · Create pinning — edit total price row (`13261:82092`) | Total price inline edit; rate updates live, Enter saves, Esc cancels |

`NP/Config table/Row` gained `Status=Editing total` (Selected = Yes / No).

### Section components
Repeated frames were turned into components; screens now use instances. Main components live in the "Desktop Local components" and "Mobile local components" sections.

| Component | Code counterpart |
|---|---|
| NP/Dashboard/Page header (+ "· first time") | `desktop.js` `header()` |
| NP/Dashboard/Add pinning CTA | `desktop.js` `.cta-bar` |
| NP/Dashboard/Opportunities banner | not in the prototype (hidden in Figma screens) |
| NP/Create/Page header | `desktop.js` create-pinning header |
| NP/Create/Schedule | `desktop.js` `schedule()` |
| NP/Create/Date picker popover | `desktop.js` date picker |
| NP/Create/Submit bar | `desktop.js` `submitBar()` |
| NP/Dialog/Header, NP/Dialog/Actions · single CTA, · sub-broker | `desktop.js` modal shell |
| NP/Mobile/Sticky CTA · dashboard, · select project | `mobile.js` sticky CTA |
| NP/Mobile/Select project header | `mobile.js` select-project header |
| NP/Mobile/Sheet header (+ "· with subtitle"), NP/Mobile/Sheet actions · single CTA, · sub-broker | `mobile.js` bottom sheets |

### Developer annotations
Dev-facing notes use the file's annotation categories (Interaction, Behaviour, Development, Accessibility) and sit on representative screens: 1.2 (carousel, collapse toggle, Export, Action column, budget card, CTA), 3.1 (schedule, unit header, row, submit bar), 3.1a (unit dropdown), 3.10 (editing total), 4.5 (dialog shell, OTP), M1.2 (sticky CTA) and M4.5 (bottom sheet). Each note names the action/state in `app.js` it maps to. New main components also carry a description.

---

See [README.md](README.md) for more details on running and testing the prototype.
