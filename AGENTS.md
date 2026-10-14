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

### Section 01: Entry & Dashboard

#### d1.1 – Dashboard (initial)
- **Title**: "New project pinning"
- **Content**: Budget card, Best Opportunities carousel, Your Pinnings table
- **Budget card state**: Normal (green, ≤50% budget used)
- **Features**: Filter pills (Ongoing, Nearby, All), carousel scroll, table tabs, pagination
- **Actions available**: Start pinning, view pinnings, export CSV

#### d1.2 – Dashboard (moderate budget)
- **Title**: "New project pinning"
- **Budget card state**: Normal
- **Recommendation**: 3 projects shown in carousel
- **Your Pinnings**: 4 entries (mix of Active/Ending Soon/Pending)
- **Difference from d1.1**: Same layout, different data

#### d1.2a – Budget warning
- **Budget card state**: Warning (yellow, >50% budget used)
- **Card text**: "⚠️ You're using... Renew your plan"
- **Impact**: Visual alert but flows unchanged
- **Actions**: Same as d1.1

#### d1.2b – Budget danger
- **Budget card state**: Danger (red, budget exceeded)
- **Card text**: "⚠️ You've exceeded... Renew now"
- **Impact**: Cannot pin new projects until budget renewed
- **Actions**: Renew plan option appears

#### d1.3 – Limit reached modal
- **Trigger**: Click "Add new project pinning" when at limit
- **Modal content**: 
  - Title: "Pinning limit reached"
  - Message: "You can pin up to X properties..."
  - Button: "Upgrade plan"
- **Background**: Dashboard d1.2 visible behind scrim

#### d1.4 – Plan expired modal
- **Trigger**: Click "Add new project pinning" when plan expired
- **Modal content**:
  - Title: "Pinning plan expired"
  - Message: "Your plan expired on..."
  - Button: "Renew plan"
- **Background**: Dashboard d1.2 visible behind scrim

---

### Section 02: Select Project

#### d1.5 – Select project modal (initial)
- **Title**: "Select a project to pin"
- **Form fields**:
  - City dropdown (default: empty, "Select city")
  - Locality multi-select (disabled until city chosen)
  - Project search/typeahead (disabled until city chosen)
- **Buttons**: "Pin a project" (disabled), "Can't find your project?" link
- **Modal state**: Empty, ready for input

#### d1.6 – City selected (Noida)
- **City dropdown**: "Noida" selected
- **Locality multi-select**: Now enabled, showing 8 options
- **Project search**: Still disabled (need locality)
- **Project summary card**: Hidden

#### d1.7 – Locality selected
- **Localities**: "Sector 49" + "Sohna Road" selected
- **Project search**: Now enabled, placeholder "Search projects..."
- **Project summary**: Hidden

#### d1.8 – Project selected (Harmony)
- **Project summary card**: Visible with:
  - Project name: "Unitech Harmony"
  - Config: "2, 3 BHK Apartments"
  - Address: "Nirvana Country, Sector 49..."
  - Price: "₹1.5 – 2.5 Cr"
  - Status badges: Green check for config, stars for rating
- **Button**: "Pin a project" now enabled

#### d1.8a – Already pinned warning
- **Project**: "Unitech Escape" (already pinned)
- **Warning callout**: "⚠️ You already pinned this project"
- **Button**: "Pin a project" disabled
- **Color**: Red/danger theme

#### d1.9 – Plan-locked city
- **City dropdown**: "Mumbai" has a 🔒 icon
- **Tooltip**: "Locked by plan"
- **Behavior**: City cannot be selected
- **Still selectable**: "New Delhi", "Gurugram", "Noida", etc.

#### d1.9a – Request missing project
- **User action**: Click "Can't find your project?"
- **Modal changes to**:
  - Title: "Request a missing project"
  - Form fields: Project name, Developer, City, Locality, RERA, Launch date, Possession date
  - Note paragraph explaining Housing will review
- **Button**: "Submit request"

---

### Section 03: Create Pinning

#### d3.1 – Create pinning (start)
- **Title**: "Create pinning for Unitech Harmony"
- **Sections**:
  - Project summary (collapsible)
  - Schedule: Date picker, duration pills (30/60/90 days)
  - Configurations: Table with 4 rows
  - Managed by: Dropdown with team members
- **Date picker**: Capped to plan expiry date; 30 days default
- **All configs**: Unselected (no checkboxes)
- **Submit button**: Disabled (error shown)

#### d3.2 – Duration selected (60 days)
- **Duration pill**: "60 days" highlighted
- **Hint text**: "2 pinnings will be used for 60 days · 136 will remain"
- **Configurations**: Still unselected
- **Submit button**: Still disabled

#### d3.3 – Config selected
- **Configurations**: 1–4 selected (checkboxes checked)
- **Submit button**: Now enabled
- **Remaining hint**: Updates based on selection

#### d3.4 – Inline price edit
- **User action**: Click edit icon on a config row
- **Row expands**: Shows text input with current price
- **Buttons**: Save (Enter), Cancel (Esc)
- **Validation**: Rejects negative/invalid prices
- **Feedback**: "Price updated" toast on Save

#### d3.5 – Warning icon on config
- **Config row**: Shows yellow warning icon
- **Reason**: Configuration not fully linked or data incomplete
- **Interaction**: Hover for tooltip

#### d3.6 – Report issue modal
- **Trigger**: Click "Report" on a config row
- **Modal content**:
  - Title: "Report an issue"
  - Reasons list: Expandable checkboxes
    - "Wrong name"
    - "Wrong price"
    - "Missing config"
    - "Other issue"
  - Text area: "Tell us more..."
  - Button: "Report issue"
- **Reported row**: Changes to show reported badge after submission

#### d3.7 – Add missing config
- **Trigger**: Click "Add missing config" link at bottom
- **Sheet slides up** (mobile) or modal (desktop):
  - Title: "Add missing configuration"
  - Form fields: Property type, BHK, Area, Price
  - Linked fields: Price ↔ Rate per sq.ft auto-converts
  - Button: "Add configuration"
- **After submission**: New row appears in table with "Under review" status

#### d3.8 – Submit enabled
- **All conditions met**:
  - At least 1 config selected
  - Managed by selected
  - Date set
  - Duration chosen
- **Submit button**: Bright blue, clickable
- **Text**: "Submit pinning"

#### d3.8a – Nothing selected error
- **User action**: Click Submit with 0 configs selected
- **Error callout**: "Please select at least 1 configuration"
- **Submit button**: Disabled with error color
- **Message**: Remains until configs selected

#### d3.8b – Manager selection
- **Managed by dropdown**: Shows team options
  - Jitesh Kumar (You, Admin, current selection)
  - Aakriti Jain (Sub-broker)
  - Rohit Mehra (Sub-broker)
- **Selection**: Persistent until changed
- **Display**: Avatar, name, role

---

### Section 04: Sub-Broker Management

#### d4.1 – Manager dropdown (expanded)
- **Dropdown**: Fully open showing all team members
- **Current selection**: Highlighted/checked
- **Actions**: Click to change

#### d4.2 – Create sub-broker flow (start)
- **Trigger**: Select "Create new sub-broker" from dropdown
- **Modal transitions**: Title changes to "Create a sub-broker"
- **Form fields**: Phone number with country code prefix
- **Button**: "Send OTP"
- **State**: Ready for input

#### d4.3 – Phone entered (demo: already in team)
- **Phone**: "9811111111" (demo number)
- **Callout**: "⚠️ Rohit Mehra is already your sub-broker"
- **Status**: "Already in team" indicator
- **Button**: "Send OTP" disabled
- **User can**: Go back or enter different number

#### d4.4 – Phone entered (demo: linked to another account)
- **Phone**: "9822222222" (demo number)
- **Callout**: "⚠️ This number is linked to another Housing account"
- **Status**: "Linked elsewhere" indicator
- **Button**: "Send OTP" disabled

#### d4.5 – Phone entered (valid)
- **Phone**: Any other 10-digit number
- **Callout**: None (valid state)
- **Button**: "Send OTP" enabled
- **Ready**: User can proceed

#### d4.6 – OTP modal
- **Modal title**: "Verify your phone number"
- **Content**: 
  - Message: "We've sent a 4-digit code to..."
  - OTP input: 4 boxes for digits (Rubik 32px)
  - Resend link: "Didn't receive code?" + "Resend" button
  - Timer: "Resend in 24s" (counts down)
- **OTP entry**: User types or pastes 4 digits
- **Button**: "Verify OTP"

#### d4.7 – Resend requested
- **User action**: Click "Resend" button
- **Timer**: Resets to 24 seconds
- **Toast**: "Code resent" notification
- **OTP input**: Cleared, ready for new code

#### d4.8 – Details modal (success path)
- **Modal title**: "Confirm account details"
- **Form fields**:
  - Name: "Ramlal Sharma"
  - Email: Text input (with validation)
  - Phone: Display only (non-editable)
  - Password: Text input (with requirements)
- **Validation**:
  - Email: Must be unique (demo: ramlal@turboprop.com fails)
  - Password: 8+ chars, must contain number
- **Button**: "Create sub-broker"

#### d4.8a – Email validation error
- **Email**: "ramlal@turboprop.com" (demo taken email)
- **Error message**: "Already used by another Housing account"
- **Field border**: Red/error state
- **Button**: Disabled until corrected

#### d4.8b – Password validation error
- **Password**: "abc" or "abcdefg" (no number)
- **Error message**: "Must be 8+ characters and contain a number"
- **Field border**: Red/error state
- **Button**: Disabled until corrected

#### d4.9 – Success modal
- **Modal content**:
  - Large green checkmark icon
  - Title: "Ramlal Sharma added to your team!"
  - Message: "They can now manage pinnings for your properties"
  - Button: "Continue"
- **Toast** (simultaneously): "Ramlal Sharma added to your team" with action
- **After click**: Returns to dashboard with new sub-broker as manager

---

## Mobile States (m1–m4)

### Section M1: Dashboard Mobile

#### m1.1 – Dashboard (header view)
- **Browser mock**: Status bar (9:30), Chrome toolbar
- **Top panel**: Back arrow (disabled), "New project pinning" headline, "12 pinned · 8 active" subtitle
- **Content**: Budget card, recommendation carousel, Your Pinnings table
- **Navigation**: Bottom nav with Dashboard active

#### m1.2 – Budget card (full view)
- **Card height**: Larger, showing all details
- **Budget state**: Normal (green)
- **Recommendation band**: 3 projects horizontally scrollable
- **Your Pinnings**: Table with 4 entries, status chips
- **Pagination**: "Page 1 of 2" + prev/next arrows

#### m1.3 – Filter pills active
- **Pills**: "Ongoing", "Nearby", "All" at top of Your Pinnings
- **Selected**: "Ongoing" highlighted
- **Results**: Table filtered to show only ongoing pinnings

#### m1.4 – Pinning collapsed
- **Your Pinnings card**: Row shows title, locality, status chip only
- **Details hidden**: Duration, manager, dates not visible
- **Interaction**: Swipe or tap to expand

#### m1.5 – Pagination (page 2)
- **Navigation**: Click next arrow on pagination
- **Table**: Shows pinnings 5–8
- **Pagination label**: "Page 2 of 2"
- **Prev arrow**: Now enabled

---

### Section M2: Select Project Mobile

#### m2.1 – Select project page (initial)
- **Header**: Back button, "Select a project to pin" headline
- **Form fields**:
  - City dropdown
  - Locality multi-select
  - Project search
- **Buttons**: "Start pinning this project" (disabled)
- **Link**: "Can't find your project?"

#### m2.2 – City picker sheet
- **Sheet slides up**: Title "Choose a city"
- **Search input**: Type to filter cities
- **List**: 8 cities (locked ones marked 🔒)
- **Sticky footer**: "Done" button

#### m2.3 – Locality multi-select sheet
- **Sheet**: Title "Choose localities"
- **Search**: Type to filter
- **Checkboxes**: Multiple selection allowed
- **Sticky footer**: "Done" button
- **Selected count**: Badge showing "2 selected"

#### m2.4 – Project search results
- **Search input**: Shows matching projects
- **Results dropdown**: List of projects below search
- **Selection**: Tap to select

#### m2.5 – Project summary (full sheet)
- **Sheet title**: Project name
- **Card content**: Config, address, price, status badges
- **Button**: "Start pinning this project"

#### m2.6 – Already pinned warning
- **Warning callout**: Red background, warning icon
- **Text**: "You already pinned this project"
- **Button**: "Start pinning this project" disabled

#### m2.7 – Request missing project sheet
- **Trigger**: Tap "Can't find your project?"
- **Form fields**: Project name, Developer, City, Locality, RERA, Launch, Possession dates
- **Note**: "We'll review your request..."
- **Button**: "Submit request"

#### m2.8 – Request success
- **Modal**: "Request submitted!"
- **Message**: "We'll notify you when this project is added"
- **Button**: "Continue"

---

### Section M3: Create Pinning Mobile

#### m3.1 – Create pinning (initial)
- **Header**: "Create pinning" headline
- **Sections**:
  - Project summary (collapsible)
  - When should it run? (date picker)
  - Which configurations? (table)
  - Managed by (selector)
- **Submit button**: Disabled (sticky bottom)

#### m3.2 – Date picker (open)
- **Calendar**: Month view, tap to select start date
- **Navigation**: < Month Year > arrows
- **Highlight**: Plan expiry date boundary (can't book after)
- **Selection**: Tap date to set

#### m3.3 – Duration pills
- **Pills**: "30 days", "60 days", "90 days"
- **Selected**: One highlighted (default 30)
- **Hint**: "2 pinnings will be used for 60 days..."
- **Tap**: Switch duration instantly

#### m3.4 – Configurations table
- **Rows**: 4 configurations (2BHK 1500sqft, 2BHK 1800sqft, 3BHK 2000sqft, 3BHK 2400sqft)
- **Checkbox**: Top checkbox = select all
- **Price**: Editable inline via pencil icon
- **Warning icons**: Yellow warning on incomplete rows

#### m3.5 – Config inline edit
- **Row**: Tapped, expands
- **Input**: Price text field with current value
- **Buttons**: ✓ Save, ✗ Cancel (or swipe to close)
- **Validation**: Price must be valid number

#### m3.6 – Report issue sheet
- **Trigger**: Tap "Report" on config row
- **Sheet**: "Report an issue"
- **Reasons**: Expandable checklist
- **Text area**: "Tell us more..."
- **Button**: "Report issue"
- **After**: Row shows "Reported" badge

#### m3.7 – Add missing config sheet
- **Trigger**: Tap "Add missing config" link
- **Form fields**: Property type, BHK, Area (sq.ft/sq.m), Price
- **Auto-conversion**: Price ↔ Rate (linked)
- **Button**: "Add configuration"

#### m3.8 – Managed by selector sheet
- **Sheet**: "Who's managing this?"
- **List**: Team members with avatars
- **Selected**: Checkmark on current
- **Tap**: To switch manager

#### m3.9 – Submit (ready state)
- **All conditions met**:
  - 1+ config selected
  - Manager chosen
  - Date set
- **Sticky button**: "Submit pinning" enabled, bright blue
- **Count**: "2 pinnings used, 138 remaining"

#### m3.10 – Error state (nothing selected)
- **User action**: Tap Submit with no configs
- **Error callout**: "Please select at least 1 configuration"
- **Button**: Disabled, red/error color
- **User must**: Select configs to proceed

---

### Section M4: Sub-Broker Mobile

#### m4.1 – Manager selection sheet
- **Sheet**: "Who's managing this?"
- **List**: 
  - Jitesh Kumar (You, Admin) ✓
  - Aakriti Jain (Sub-broker)
  - Rohit Mehra (Sub-broker)
- **Tap**: "Create new sub-broker"

#### m4.2 – Phone number sheet
- **Sheet title**: "Add a sub-broker"
- **Input**: Phone number with country code selector
- **Button**: "Send OTP"
- **Callout area**: Shows validation messages

#### m4.3 – Phone validation
- **Demo: 9811111111**: "Rohit Mehra is already your sub-broker"
- **Demo: 9822222222**: "This number is linked to another Housing account"
- **Valid number**: No callout, "Send OTP" enabled

#### m4.4 – OTP input sheet
- **Sheet title**: "Verify your phone number"
- **Message**: "We've sent a 4-digit code to 98765 12345"
- **OTP slots**: 4 input boxes (Rubik 32px)
- **Resend link**: "Didn't receive code?" + "Resend" button
- **Timer**: "Resend in 24s" (counts down)
- **Button**: "Verify OTP"

#### m4.5 – Resend OTP
- **User action**: Tap "Resend"
- **Timer**: Resets to 24 seconds
- **Toast**: "Code resent"
- **OTP input**: Cleared

#### m4.6 – Account details sheet
- **Sheet title**: "Confirm account details"
- **Form fields**:
  - Name: "Ramlal Sharma"
  - Email: Text input (validation)
  - Phone: Non-editable display
  - Password: Text input (8+ chars, must have number)
- **Button**: "Create sub-broker"
- **Validation errors**: Red field borders + error text

#### m4.7 – Email error
- **Email**: "ramlal@turboprop.com" (demo taken)
- **Error**: "Already used by another Housing account"
- **Field**: Red border, error text visible
- **Button**: Disabled

#### m4.8 – Password error
- **Password**: "abc" or "abcde" (no number)
- **Error**: "Must be 8+ characters and contain a number"
- **Field**: Red border, error text visible
- **Button**: Disabled

#### m4.9 – Success modal
- **Modal**: Success state after verification
- **Content**:
  - Large green checkmark (48px)
  - Title: "Ramlal Sharma added to your team!"
  - Message: "They can now manage pinnings for your properties"
  - Button: "Continue"
- **Overlay**: Full modal, centered
- **Toast** (simultaneous): "Ramlal Sharma added to your team"

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

See [README.md](README.md) for more details on running and testing the prototype.
