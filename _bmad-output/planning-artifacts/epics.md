---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
status: 'complete'
completedAt: '2026-03-05'
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# mbat-start - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for mbat-start, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Branding & Identity**
- FR1: The app displays the שאגת האריה lion logo as a header element
- FR2: The app displays the family motto "בואו נשאג ביחד על המשימות! כל אחד תורם"
- FR3: The app uses a blue-and-white color palette derived from the שאגת האריה logo

**Family Member Selection**
- FR4: Any user can select their name from a list of all family members (אבא, אמא, מעיין, חי, ארז, אלון, עדי, סבתא)
- FR5: The app remembers the user's last selected name between sessions
- FR6: Any user can switch to a different family member's view at any time

**Fixed Tasks Display**
- FR7: The app displays all fixed daily responsibilities with their assigned owner
- FR8: Each fixed task displays an associated emoji icon and the owner's emoji identifier
- FR9: The app displays the following fixed tasks: הכנסת מדיח (אבא), פריקת מדיח (ארז), פחים (אלון), כביסות (מעיין), סידורים + נסיעות (חי), הווי ובידור (עדי), נקיונות לפסח (אמא + סבתא)

**Weekly Schedule Display**
- FR10: The app displays a weekly schedule covering Sunday through Thursday
- FR11: The app displays a lunch rotation table (ארוחת צהריים) with assigned members per day
- FR12: The app displays a dinner table (ארוחת ערב) showing אמא as the cook every night
- FR13: The app displays a dinner helper rotation table (עוזר לאמא בארוחת ערב) with assigned members per day
- FR14: The app displays a tidying + table setting rotation table (סדר קומת כניסה + אמבטיות + עריכת שולחן) with assigned members per day

**Personal Highlighting**
- FR15: When a family member is selected, all their tasks across fixed tasks and weekly schedule are visually emphasized
- FR16: Non-selected members' tasks remain visible but visually de-emphasized
- FR17: The app highlights the current day's column in the weekly schedule

**Dark Mode**
- FR18: The app automatically adapts to the user's device light/dark mode preference
- FR19: The app is fully readable and visually correct in both light and dark modes

**Localization & Layout**
- FR20: The app displays all content in Hebrew
- FR21: The app renders in right-to-left (RTL) layout
- FR22: The app is usable on mobile phone screens (375px+ width)
- FR23: The app is usable on desktop screens

**Data Management (Admin)**
- FR24: An admin can update the schedule data by editing a configuration file
- FR25: Schedule changes are reflected in the app after redeployment

**Issue Flagging (v1.1)**
- FR26: Any family member can flag an issue on any task (e.g., "הזבל מלא")
- FR27: A flagged task displays a visual indicator visible to all users
- FR28: The flag shows who reported it and a brief description
- FR29: The responsible person can mark a flag as resolved
- FR30: Resolved flags are no longer displayed as active

### NonFunctional Requirements

**Performance**
- NFR1: Initial page load completes in under 2 seconds on a 4G mobile connection
- NFR2: Subsequent page loads (cached) complete in under 1 second
- NFR3: Total page weight does not exceed 500KB (including logo asset)
- NFR4: Name selection and highlighting respond instantly (< 100ms, no server call)

**Compatibility**
- NFR5: The app renders correctly on iOS Safari 15+ and Android Chrome 90+
- NFR6: The app renders correctly on desktop Chrome and Safari (latest versions)
- NFR7: The app functions without JavaScript frameworks or external dependencies
- NFR8: Dark mode renders correctly when device preference is set to dark

**Maintainability**
- NFR9: Schedule data is stored in a single, human-readable configuration structure (JSON or equivalent)
- NFR10: A non-technical admin can understand and edit the schedule data with minimal guidance
- NFR11: Deployment requires only a git push to GitHub Pages

**Hosting & Availability**
- NFR12: v1 runs entirely as a static site with no server-side processing
- NFR13: v1.1 backend (Flask API) runs on PythonAnywhere free/basic tier
- NFR14: The app is available 24/7 with no maintenance windows required (static hosting)

### Additional Requirements

**From Architecture — Project Setup & Structure:**
- Custom single-file template (no framework starter) — project initialization requires hand-crafted file structure
- Multi-file structure: index.html, style.css, app.js, data.json, assets/lion-logo.jpg
- data.json schema: camelCase keys with familyMembers, fixedTasks, weeklySchedule top-level structure
- app.js organized in 7 sections: constants → data loading → rendering → state management → highlighting → today detection → initialization
- External data.json loaded via fetch() for clean data/presentation separation

**From Architecture — Implementation Patterns:**
- data-member HTML attributes with Hebrew name strings for element-to-member binding
- data-day HTML attributes (0=Sun, 4=Thu) for today column detection
- CSS class toggling (.selected, .highlighted, .today) for all visual state — never inline styles
- localStorage key: "mbat-selected-member" for name persistence
- Naming: camelCase for JS/JSON, kebab-case for CSS classes, Hebrew strings for data attributes
- JS naming: El suffix for DOM refs, handle prefix for event handlers, UPPER_SNAKE_CASE for constants

**From Architecture — Error Handling:**
- Hebrew error message "לא ניתן לטעון את הנתונים" for data.json fetch failure
- Silent fail (try/catch) for localStorage unavailability
- No today highlight on weekends (Fri/Sat) — getDay() > 4
- Graceful degradation: v1 features always work regardless of v1.1 backend status

**From Architecture — v1.1 Backend:**
- v1.1 REST API: GET /flags, POST /flags, PATCH /flags/:id
- v1.1 CORS restricted to GitHub Pages origin domain
- v1.1 input validation: sanitize flag text (max length, strip HTML) to prevent XSS
- API_URL as single constant in app.js for environment config

**From UX — Visual Design:**
- Direction B: Card Modern design with gradient header, chip-style name selector, card containers with shadows and rounded corners
- Unified weekly schedule table (all 4 rotations in a single table card)
- Color system: 9 design tokens each for light/dark mode (--color-primary, --color-primary-light, --color-background, --color-surface, --color-text, --color-text-secondary, --color-highlight, --color-highlight-border, --color-border)
- Light mode highlight: warm golden (#FFF3CD bg, #E6C85A border)
- Dark mode highlight: muted gold (#3D3520 bg, #8A7A30 border)
- Typography: system-ui, -apple-system, "Segoe UI", sans-serif font stack — no web fonts
- Type scale: 20px app title, 18px section headers, 14-15px table cells, 16px name chips

**From UX — Layout & Spacing:**
- 8px base spacing unit (multiples: 8, 16, 24, 32, 40)
- Single breakpoint at 600px (max-width centering for desktop)
- Mobile-first: full-width on 375px+, centered max-width: 600px on desktop
- Name chip padding: 12px vertical, 16px horizontal (48px+ tap target)
- Table cell padding: 8px vertical, 6px horizontal (compact mobile fit)

**From UX — Accessibility:**
- WCAG 2.1 Level AA compliance (all color contrasts verified ≥ 4.5:1)
- Name chips: aria-pressed attribute, keyboard-navigable with Tab/Enter/Space
- Table: th scope="col" for day headers, th scope="row" for rotation labels
- html lang="he" dir="rtl" for language/direction declaration
- Sections: aria-labelledby linking to h2 title IDs
- No outline:none without alternative focus indicator
- Bold text + background color (two signals) for highlighting — never color-only meaning

**Product Decisions (during epic/story creation):**
- Flagging (FR26–FR30) applies to fixed tasks only — not weekly rotation duties. Rationale: fixed tasks have ongoing, visible, actionable issues (e.g., "trash is overflowing"). Weekly rotation duties are time-bound events where flagging feels accusatory rather than informational, conflicting with the "inform, never nag" design principle.

**From UX — Interaction Patterns:**
- Highlight overlap rule: .highlighted always wins over .today (personal duties > current day)
- "בחר שם" prompt when no name is selected (first visit)
- No animations on highlight change — instant CSS class swap
- Single-selection model for name chips (radio-button behavior)
- Scroll position resets to top on each visit

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Lion logo header |
| FR2 | Epic 1 | Family motto |
| FR3 | Epic 1 | Blue-white color palette |
| FR4 | Epic 2 | Name selector (8 members) |
| FR5 | Epic 2 | localStorage name persistence |
| FR6 | Epic 2 | Name switching |
| FR7 | Epic 1 | Fixed tasks with owners |
| FR8 | Epic 1 | Emoji icons for tasks/owners |
| FR9 | Epic 1 | 7 specific fixed tasks |
| FR10 | Epic 1 | Weekly Sun–Thu schedule |
| FR11 | Epic 1 | Lunch rotation table |
| FR12 | Epic 1 | Dinner table |
| FR13 | Epic 1 | Dinner helper rotation |
| FR14 | Epic 1 | Tidying rotation |
| FR15 | Epic 2 | Personal highlighting |
| FR16 | Epic 2 | De-emphasized non-selected |
| FR17 | Epic 2 | Today column highlight |
| FR18 | Epic 1 | Auto dark mode |
| FR19 | Epic 1 | Light/dark visual correctness |
| FR20 | Epic 1 | Hebrew content |
| FR21 | Epic 1 | RTL layout |
| FR22 | Epic 1 | Mobile responsive (375px+) |
| FR23 | Epic 1 | Desktop responsive |
| FR24 | Epic 1 | Admin config editing |
| FR25 | Epic 1 | Redeployment updates |
| FR26 | Epic 3 | Flag an issue |
| FR27 | Epic 3 | Flag visual indicator |
| FR28 | Epic 3 | Flag reporter + description |
| FR29 | Epic 3 | Mark flag resolved |
| FR30 | Epic 3 | Resolved flags hidden |

## Epic List

### Epic 1: The Family Duty Board
A family member can open the app URL and see the complete שאגת הארי duty board — branding with lion logo and family motto, all 7 fixed tasks with emoji identifiers, the full weekly Sun–Thu schedule with all 4 rotation tables, in Hebrew RTL layout, mobile-first responsive design, with automatic dark mode. An admin can update the schedule by editing data.json and redeploying.

**FRs covered:** FR1, FR2, FR3, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25

### Epic 2: Personal Duty View
A family member can select their name and see all their duties highlighted with a warm golden glow across the entire board. Today's column is visually emphasized. The app remembers the selected name between sessions, so return visits show a pre-personalized view with zero taps.

**FRs covered:** FR4, FR5, FR6, FR15, FR16, FR17

### Epic 3: Peer Accountability (v1.1)
Any family member can flag an issue on a task (e.g., "הזבל מלא"). The responsible person sees the flag with details and can mark it resolved. Powered by a Flask API on PythonAnywhere with graceful degradation if the backend is unreachable.

**FRs covered:** FR26, FR27, FR28, FR29, FR30

---

## Epic 1: The Family Duty Board

A family member can open the app URL and see the complete שאגת הארי duty board — branding with lion logo and family motto, all 7 fixed tasks with emoji identifiers, the full weekly Sun–Thu schedule with all 4 rotation tables, in Hebrew RTL layout, mobile-first responsive design, with automatic dark mode. An admin can update the schedule by editing data.json and redeploying.

### Story 1.1: Project Foundation & Branded Header

As a family member,
I want to open the app URL and see the שאגת הארי branded header with lion logo, title, and family motto in a polished mobile-first Hebrew layout with automatic dark mode,
So that I immediately feel this is our family's app and it looks professional on my phone.

**Acceptance Criteria:**

**Given** the project files do not yet exist
**When** the developer initializes the project
**Then** the following file structure is created: index.html, style.css, app.js, data.json, assets/lion-logo.jpg, .gitignore
**And** index.html includes `<html lang="he" dir="rtl">`, viewport meta tag, `<meta name="robots" content="noindex">`, and links to style.css and app.js

**Given** a user opens the app on a mobile phone (375px+ width)
**When** the page loads
**Then** a gradient blue header displays the שאגת האריה lion logo image, the title "שאגת הארי", and the family motto "בואו נשאג ביחד על המשימות! כל אחד תורם"
**And** a footer displays the motto with a lion emoji

**Given** style.css is loaded
**When** the browser renders the page
**Then** all 9 CSS custom property design tokens are defined on :root for light mode (--color-primary: #1A4B8C, --color-primary-light: #E3F0FF, --color-background: #FFFFFF, --color-surface: #F0F4F8, --color-text: #1A1A2E, --color-text-secondary: #5A6A7A, --color-highlight: #FFF3CD, --color-highlight-border: #E6C85A, --color-border: #D0D8E0)
**And** dark mode tokens are defined inside @media (prefers-color-scheme: dark) (--color-primary: #4A90D9, --color-background: #1A1A2E, --color-surface: #252540, --color-text: #E8ECF0, etc.)
**And** the typography uses the system-ui, -apple-system, "Segoe UI", sans-serif font stack with 16px+ base size

**Given** a user opens the app on a device with dark mode enabled
**When** the page renders
**Then** all colors swap to dark mode tokens automatically via the prefers-color-scheme media query
**And** the header, background, and text are all readable with sufficient contrast (WCAG AA ≥ 4.5:1)

**Given** a user opens the app on a desktop browser (600px+ width)
**When** the page renders
**Then** the content is centered with max-width: 600px
**And** the layout remains fully functional and readable

**Given** the HTML structure uses semantic elements
**When** a screen reader traverses the page
**Then** the heading hierarchy starts with h1 for the app title
**And** sections use aria-labelledby linking to h2 title IDs

### Story 1.2: Schedule Data & Fixed Tasks Display

As a family member,
I want to see all 7 fixed daily responsibilities with their assigned owners and emoji icons,
So that I know who is responsible for each ongoing household task.

**Acceptance Criteria:**

**Given** data.json exists
**When** the developer populates the file
**Then** it contains a familyMembers array with all 8 members (אבא, אמא, מעיין, חי, ארז, אלון, עדי, סבתא) each with name and emoji fields
**And** it contains a fixedTasks array with all 7 tasks: הכנסת מדיח (אבא), פריקת מדיח (ארז), פחים (אלון), כביסות (מעיין), סידורים + נסיעות (חי), הווי ובידור (עדי), נקיונות לפסח (אמא + סבתא)
**And** each task has task name, emoji, and member fields using camelCase keys

**Given** a user opens the app
**When** the page loads
**Then** app.js fetches data.json and renders a "משימות קבועות" section inside a card container with shadow and rounded corners
**And** each of the 7 fixed tasks displays as a row showing: task emoji + task name + owner emoji + owner name
**And** each task row has a data-member attribute set to the owner's Hebrew name

**Given** the data.json fetch fails (network error or file not found)
**When** the page attempts to load data
**Then** a Hebrew error message "לא ניתן לטעון את הנתונים" is displayed in the main content area
**And** the app does not crash or show a blank page

**Given** an admin edits data.json to change a fixed task assignment
**When** the file is saved and the site is redeployed
**Then** the app displays the updated task assignment on next load

### Story 1.3: Weekly Schedule Table

As a family member,
I want to see the full weekly Sun–Thu rotation schedule with lunch, dinner, dinner helper, and tidying assignments,
So that I can check who is responsible for each rotating duty on any day of the week.

**Acceptance Criteria:**

**Given** data.json contains the weeklySchedule data
**When** the developer populates the weekly schedule section
**Then** it contains a days array with 5 days (ראשון, שני, שלישי, רביעי, חמישי)
**And** it contains a rotations array with 4 entries: ארוחת צהריים (lunch), ארוחת ערב (dinner — אמא every day), עוזר לאמא בארוחת ערב (dinner helper), סדר קומת כניסה + אמבטיות + עריכת שולחן (tidying)
**And** each rotation has a label and an assignments array mapping members to days

**Given** a user opens the app
**When** the page loads and data is fetched
**Then** a "לוח שבועי" section displays inside a card container
**And** a unified table shows all 4 rotation rows × 5 day columns
**And** day headers display Hebrew day abbreviations (א׳, ב׳, ג׳, ד׳, ה׳) with blue background and white text
**And** each rotation row has a label header cell (th scope="row")
**And** each day header uses th scope="col"

**Given** the table renders on a 375px mobile screen
**When** the user views the weekly schedule
**Then** the table fits within the viewport width without horizontal scrolling
**And** table cells use compact padding (8px vertical, 6px horizontal) for mobile fit
**And** all Hebrew names are fully readable

**Given** each table cell contains a family member name
**When** the table renders
**Then** each cell has a data-member attribute set to the assigned member's Hebrew name
**And** each cell has a data-day attribute set to the day index (0=Sun through 4=Thu)

**Given** an admin edits data.json to change a weekly schedule assignment
**When** the file is saved and the site is redeployed
**Then** the app displays the updated schedule on next load

### Story 1.4: GitHub Pages Deployment

As a family member,
I want to access the duty board via a URL shared in WhatsApp,
So that I can check my duties from my phone without installing anything.

**Acceptance Criteria:**

**Given** the project code is complete (Stories 1.1–1.3)
**When** the developer initializes a git repository and pushes to GitHub
**Then** the repository contains all project files (index.html, style.css, app.js, data.json, assets/, .gitignore)

**Given** the GitHub repository exists
**When** GitHub Pages is configured to deploy from the main branch
**Then** the app is accessible at the GitHub Pages URL (username.github.io/mbat-start)

**Given** the app is deployed to GitHub Pages
**When** a family member opens the URL on iOS Safari 15+
**Then** the app renders correctly: RTL layout, lion logo header, fixed tasks, weekly schedule table, dark mode (if enabled)
**And** no visual bugs or layout issues are present

**Given** the app is deployed to GitHub Pages
**When** a family member opens the URL on Android Chrome 90+
**Then** the app renders correctly with the same visual quality as iOS Safari

**Given** the deployed app
**When** the total page weight is measured (HTML + CSS + JS + JSON + logo image)
**Then** the total is under 500KB
**And** the first load completes in under 2 seconds on a 4G connection

---

## Epic 2: Personal Duty View

A family member can select their name and see all their duties highlighted with a warm golden glow across the entire board. Today's column is visually emphasized. The app remembers the selected name between sessions, so return visits show a pre-personalized view with zero taps.

### Story 2.1: Family Member Name Selector

As a family member,
I want to tap my name from a list of all family members and have the app remember my choice,
So that I can personalize the board to my view and not have to re-select my name every time I visit.

**Acceptance Criteria:**

**Given** the app has loaded and data.json is fetched
**When** the name selector renders
**Then** 8 chip-style pill buttons are displayed, one for each family member (אבא, אמא, מעיין, חי, ארז, אלון, עדי, סבתא), each showing the member's emoji + Hebrew name
**And** the chips are rendered as `<button>` elements in a flex-wrap container with 8px gap
**And** each chip has 12px vertical + 16px horizontal padding (48px+ tap target height)
**And** a subtle "בחר שם" prompt is visible when no name is selected

**Given** no name has been previously selected (first visit)
**When** the user views the name selector
**Then** all chips appear in the default state: light background, border, normal weight
**And** no chip has the `.selected` class
**And** each chip has `aria-pressed="false"`

**Given** the name selector is displayed
**When** the user taps a name chip (e.g., "🦁 ארז")
**Then** that chip receives the `.selected` class (filled blue background --color-primary, white text)
**And** `aria-pressed="true"` is set on the selected chip
**And** the selected member name is saved to localStorage with key "mbat-selected-member"
**And** the "בחר שם" prompt disappears

**Given** a name chip is already selected
**When** the user taps a different name chip
**Then** the previously selected chip loses `.selected` class and returns to default state with `aria-pressed="false"`
**And** the newly tapped chip receives `.selected` class with `aria-pressed="true"`
**And** localStorage is updated with the new name
**And** the switch is instant (< 100ms, no server call)

**Given** a user previously selected a name and closed the app
**When** they reopen the app
**Then** localStorage is read for key "mbat-selected-member"
**And** the saved name's chip is automatically selected (`.selected` class + `aria-pressed="true"`)
**And** no user interaction is needed

**Given** localStorage is unavailable or blocked
**When** the app loads
**Then** the name selector functions normally (chips are tappable, selection works visually)
**And** no error is shown — the app simply does not persist the selection
**And** the try/catch around localStorage calls fails silently

**Given** the name selector is rendered
**When** a user navigates with keyboard (Tab key)
**Then** focus moves through each name chip in order with a visible focus indicator
**And** pressing Enter or Space on a focused chip selects it

### Story 2.2: Personal Highlighting & Today Awareness

As a family member,
I want my duties to glow with a warm golden highlight across the entire board and today's column to be visually marked,
So that I can instantly see what's mine and what's relevant right now.

**Acceptance Criteria:**

**Given** a family member name is selected (e.g., "ארז")
**When** the highlighting logic runs
**Then** all elements with `data-member="ארז"` receive the `.highlighted` class
**And** highlighted fixed task rows display: golden background (--color-highlight), bold text, gold left border (--color-highlight-border)
**And** highlighted weekly table cells display: golden background (--color-highlight), bold text
**And** the highlighting applies across both the fixed tasks section and the weekly schedule table

**Given** a family member is selected
**When** the board renders with highlighting
**Then** non-highlighted task rows and table cells remain visible in their default state
**And** the full schedule is readable — non-selected members' content is de-emphasized but not hidden

**Given** a name is selected and then a different name is tapped
**When** the re-highlighting runs
**Then** all previous `.highlighted` classes are removed first (clean slate)
**And** new `.highlighted` classes are applied to elements matching the new name
**And** the transition is instant — no animation or delay (CSS class swap)

**Given** the app loads on a weekday (Sunday through Thursday)
**When** today detection runs via `new Date().getDay()`
**Then** the day is mapped to the correct column index (0=Sunday/ראשון through 4=Thursday/חמישי)
**And** the today column's day header `<th>` receives the `.today` class (darker blue or underlined)
**And** all `<td>` cells in today's column receive the `.today` class (light blue background --color-primary-light)
**And** the `.today` class is applied once on page load and does not change during the session

**Given** the app loads on Friday (getDay()=5) or Saturday (getDay()=6)
**When** today detection runs
**Then** no column receives the `.today` class
**And** the full weekly schedule displays with all days equally styled

**Given** a cell is both in today's column AND matches the selected member
**When** both `.today` and `.highlighted` classes are present on the same element
**Then** the `.highlighted` style wins (golden background + bold text)
**And** the today light blue background is overridden by the golden highlight
**And** this is achieved via CSS specificity or declaration order

**Given** dark mode is active on the user's device
**When** highlighting and today detection render
**Then** highlighted cells use dark mode tokens (--color-highlight: #3D3520, --color-highlight-border: #8A7A30)
**And** today column uses dark mode token (--color-primary-light: #1A2A44)
**And** bold text on highlighted cells maintains WCAG AA contrast (≥ 4.5:1) against the dark highlight background

**Given** no name is selected (first visit, no localStorage)
**When** the board renders
**Then** no elements have the `.highlighted` class
**And** the today column highlighting still applies (if weekday)
**And** the board displays in its default state with all content equally visible

---

## Epic 3: Peer Accountability (v1.1)

Any family member can flag an issue on a fixed task (e.g., "הזבל מלא"). The responsible person sees the flag with details and can mark it resolved. Powered by a Flask API on PythonAnywhere with graceful degradation if the backend is unreachable. Flagging applies to fixed tasks only — not weekly rotation duties.

### Story 3.1: Flask Flag API Backend

As a developer,
I want a lightweight Flask API on PythonAnywhere that stores, retrieves, and resolves flags for fixed tasks,
So that flag state is shared across all family members' devices.

**Acceptance Criteria:**

**Given** the Flask app is deployed on PythonAnywhere
**When** a client sends `GET /flags`
**Then** the API returns a JSON array of all active (unresolved) flags
**And** each flag object contains: id, taskName, reportedBy, description, createdAt, resolved (boolean)
**And** resolved flags are excluded from the response

**Given** a valid flag creation request
**When** a client sends `POST /flags` with JSON body containing taskName, reportedBy, and description
**Then** the API creates a new flag with a unique id, resolved: false, and createdAt timestamp
**And** the flag is persisted to flags.json on the server
**And** the API returns the created flag object with HTTP 201

**Given** a POST request with invalid input
**When** the description exceeds the maximum length (e.g., 200 characters) or contains HTML tags
**Then** the API strips HTML tags from the description and truncates to max length
**And** the sanitized flag is saved and returned
**And** no XSS payload is stored

**Given** a POST request with missing required fields (taskName, reportedBy, or description)
**When** the API processes the request
**Then** it returns HTTP 400 with a JSON error message
**And** no flag is created

**Given** an active flag exists with a known id
**When** a client sends `PATCH /flags/:id` with JSON body containing resolved: true
**Then** the flag's resolved field is set to true in flags.json
**And** the API returns the updated flag object with HTTP 200

**Given** a PATCH request for a non-existent flag id
**When** the API processes the request
**Then** it returns HTTP 404 with a JSON error message

**Given** the Flask app is configured
**When** any request arrives from a domain other than the GitHub Pages origin
**Then** CORS headers reject the request
**And** only the GitHub Pages origin (username.github.io) is allowed

**Given** the Flask app is deployed on PythonAnywhere free/basic tier
**When** the server processes flag requests
**Then** flags.json is used as the storage mechanism (no database required)
**And** the API handles concurrent reads/writes safely for single-family usage

### Story 3.2: Flag Creation UI

As a family member,
I want to tap a flag button next to a fixed task and report an issue with a quick menu,
So that I can hold a family member accountable for their duty without involving a parent.

**Acceptance Criteria:**

**Given** the app loads and the fixed tasks section renders
**When** the flag buttons are displayed
**Then** each of the 7 fixed task rows has a small flag button (🚩 icon) positioned next to the task
**And** the flag button is a `<button>` element with `aria-label="דגל בעיה"` and 44px+ tap target
**And** the flag button appears subtle and grey in its default state (unobtrusive when no flags exist)
**And** flag buttons do NOT appear on weekly schedule table cells

**Given** a family member taps a flag button on a fixed task row
**When** the quick flag menu appears
**Then** the menu displays common issue options in Hebrew (e.g., "הזבל מלא", "צריך ניקוי", "לא בוצע")
**And** a custom text input option is available for free-form descriptions
**And** the menu is positioned near the tapped button and does not obstruct the task row

**Given** the user selects an issue option or types custom text
**When** they confirm the flag submission
**Then** a `POST /flags` request is sent to the Flask API with the taskName, reportedBy (currently selected member), and description
**And** on success: the flag icon on that task row turns active (red/orange badge) as visual confirmation
**And** the submission feedback appears within 2 seconds

**Given** the user submits a flag but no name is currently selected
**When** the flag submission is attempted
**Then** the user is prompted to select their name first before flagging
**And** the flag is not submitted until a name is selected as the reporter

**Given** the Flask API is unreachable (network error or backend down)
**When** the flag submission fails
**Then** a subtle inline Hebrew error message appears near the flag button with a retry option
**And** the error does not affect any other part of the app (schedule, highlighting, name selection all continue working)

**Given** the Flask backend is unreachable on page load
**When** the app detects the API is unavailable (failed health check or GET /flags failure)
**Then** flag buttons are visually disabled (greyed out) or hidden
**And** all v1 features (schedule, highlighting, name selection) continue functioning normally
**And** no error message is shown for the disabled flagging — it is silently degraded

### Story 3.3: Flag Display & Resolution

As a family member,
I want to see active flags on fixed tasks and be able to resolve flags on my own tasks,
So that issues are visible to everyone and I can clear them once handled.

**Acceptance Criteria:**

**Given** the app loads and the Flask API is reachable
**When** the page initialization runs
**Then** the app sends `GET /flags` to fetch all active flags
**And** for each active flag, a flag badge is displayed on the corresponding fixed task row

**Given** a fixed task has one or more active flags
**When** the flag badge renders
**Then** the badge shows: the issue description + "— flagged by [reporter name]"
**And** the flag badge is visible to ALL users regardless of which name is selected
**And** the badge uses an informational visual style (not aggressive red — more of a subtle orange/warm indicator)
**And** the flag button on that row shows an active state (red/orange badge with count if multiple flags)

**Given** a fixed task has no active flags
**When** the task row renders
**Then** no flag badge is displayed
**And** only the default subtle grey flag button is visible

**Given** the currently selected family member is the person responsible for a flagged task
**When** they view the flag badge on their task
**Then** a "סומן כטופל" (mark as handled) resolve button is visible on the flag badge
**And** the resolve button is a tappable element with 44px+ tap target

**Given** an admin member (אבא or אמא) is selected
**When** they view any flagged task
**Then** the resolve button is also visible (admins can resolve any flag)

**Given** a non-responsible, non-admin family member views a flagged task
**When** they see the flag badge
**Then** no resolve button is shown — they can only see the flag details
**And** they can still create new flags on any task

**Given** the responsible person or admin taps the resolve button
**When** the resolve action is triggered
**Then** a `PATCH /flags/:id` request is sent with resolved: true
**And** on success: the flag badge disappears from the task row
**And** the flag button returns to its default subtle grey state (if no other active flags remain)
**And** the resolution is reflected for all users on their next page load

**Given** the resolve API call fails
**When** the PATCH request returns an error
**Then** a subtle inline error message appears near the flag
**And** the flag badge remains visible
**And** the user can retry the resolve action

**Given** the app loads and `GET /flags` fails
**When** the API is unreachable
**Then** no flag badges are displayed (no stale flags shown)
**And** flag buttons are disabled
**And** all v1 features continue working normally (graceful degradation)
