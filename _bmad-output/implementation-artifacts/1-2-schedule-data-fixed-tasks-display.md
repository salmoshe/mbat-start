# Story 1.2: Schedule Data & Fixed Tasks Display

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a family member,
I want to see all 7 fixed daily responsibilities with their assigned owners and emoji icons,
so that I know who is responsible for each ongoing household task.

## Acceptance Criteria

1. **Given** data.json exists, **When** the developer populates the file, **Then** it contains a familyMembers array with all 8 members (אבא, אמא, מעיין, חי, ארז, אלון, עדי, סבתא) each with name and emoji fields — **And** it contains a fixedTasks array with all 7 tasks: הכנסת מדיח (אבא), פריקת מדיח (ארז), פחים (אלון), כביסות (מעיין), סידורים + נסיעות (חי), הווי ובידור (עדי), נקיונות לפסח (אמא + סבתא) — **And** each task has task name, emoji, and member fields using camelCase keys

2. **Given** a user opens the app, **When** the page loads, **Then** app.js fetches data.json and renders a "משימות קבועות" section inside a card container with shadow and rounded corners — **And** each of the 7 fixed tasks displays as a row showing: task emoji + task name + owner emoji + owner name — **And** each task row has a data-member attribute set to the owner's Hebrew name

3. **Given** the data.json fetch fails (network error or file not found), **When** the page attempts to load data, **Then** a Hebrew error message "לא ניתן לטעון את הנתונים" is displayed in the main content area — **And** the app does not crash or show a blank page

4. **Given** an admin edits data.json to change a fixed task assignment, **When** the file is saved and the site is redeployed, **Then** the app displays the updated task assignment on next load

## Tasks / Subtasks

- [x] Task 1: Populate data.json with complete family data (AC: 1)
  - [x] 1.1 Add familyMembers array with all 8 members, each having `name` (Hebrew string) and `emoji` (emoji character) fields
  - [x] 1.2 Add fixedTasks array with all 7 tasks, each having `task` (Hebrew task name), `emoji` (task emoji), and `member` (owner Hebrew name) fields — for multi-member tasks (נקיונות לפסח), use `members` array instead of `member`
  - [x] 1.3 Add weeklySchedule structure with `days` array (5 Hebrew day names) and `rotations` array with 4 rotation entries (each with `label` and `assignments` array) — this data will be rendered in Story 1.3 but must be present now for schema completeness
  - [x] 1.4 Validate JSON is well-formed (no trailing commas, proper encoding of Hebrew)
- [x] Task 2: Implement fixed tasks rendering in app.js (AC: 2)
  - [x] 2.1 In the RENDERING section (#3), create a `renderFixedTasks(data)` function
  - [x] 2.2 Get the fixed tasks section element using `document.querySelector('[aria-labelledby="fixed-tasks-title"]')`
  - [x] 2.3 For each fixedTask in data.fixedTasks, create a task row element (`<div class="task-row">`) containing: task emoji span + task name span + owner emoji span + owner name span
  - [x] 2.4 Set `data-member` attribute on each task row with the owner's Hebrew name (for multi-member tasks, joined with comma)
  - [x] 2.5 For multi-member tasks (נקיונות לפסח with אמא + סבתא), render as a single row displaying both names with " + " separator
  - [x] 2.6 Append all task rows to the fixed tasks section, after the h2 heading
- [x] Task 3: Update initialization flow in app.js (AC: 2, 3)
  - [x] 3.1 In the DOMContentLoaded handler, after successful data load, call `renderFixedTasks(data)`
  - [x] 3.2 Ensure error handling still works — if data is null, error message is displayed and early return prevents renderFixedTasks call
  - [x] 3.3 Verify that the fixed tasks section renders correctly even when weeklySchedule data exists but is not yet rendered (Story 1.3)
- [x] Task 4: Style fixed task rows in style.css (AC: 2)
  - [x] 4.1 Style `.task-row` as a flex row with appropriate gap, padding (8px vertical, 16px horizontal), and border-bottom using `var(--color-border)`
  - [x] 4.2 Style task emoji and owner emoji spans at appropriate font size (16-18px)
  - [x] 4.3 Style task name at 15px, regular weight (400)
  - [x] 4.4 Style owner name at 14px with `var(--color-text-secondary)` color
  - [x] 4.5 Ensure task rows work correctly in RTL layout (flexbox handles RTL automatically with dir="rtl")
  - [x] 4.6 Ensure task rows look good in both light and dark mode (use only CSS custom property colors)
  - [x] 4.7 Last task row should not have a bottom border (use `:last-child` pseudo-selector)
- [x] Task 5: Verify admin edit workflow (AC: 4)
  - [x] 5.1 Data-driven rendering means any edit to data.json is reflected on reload
  - [x] 5.2 Verified via renderFixedTasks reading from data parameter, not hardcoded values
  - [x] 5.3 No test changes needed to revert

## Dev Notes

### Critical Architecture Rules — DO NOT DEVIATE

**File Responsibilities (Boundary Rule):**
| File | Contains | NEVER Contains |
|------|----------|----------------|
| `index.html` | Semantic HTML structure, meta tags, file links | Inline CSS (beyond critical), inline JS, data |
| `style.css` | All styling, design tokens, dark mode, responsive | Logic, data, JavaScript |
| `app.js` | Data loading, rendering, state, highlighting, today detection | Inline styles (use classList only), HTML generation (minimal — only task row content) |
| `data.json` | Family members, fixed tasks, weekly schedule | Logic, configuration beyond schedule |

[Source: architecture.md#Implementation Patterns & Consistency Rules]

**CSS Naming Conventions:**
- Classes: **kebab-case** → `.task-row`, `.task-emoji`, `.task-name`, `.owner-emoji`, `.owner-name`
- State classes: **simple adjective** → `.selected`, `.highlighted`, `.today`
- CSS custom properties: **--category-name** → `--color-primary`, `--color-highlight`
- Anti-patterns: NO BEM, NO JS-prefixed classes, NO utility classes

[Source: architecture.md#Naming Patterns]

**JS Naming Conventions:**
- Functions: camelCase → `renderFixedTasks()`, `loadData()`
- Constants: UPPER_SNAKE_CASE → `STORAGE_KEY`
- DOM references: camelCase with `El` suffix → `fixedTasksSectionEl`

[Source: architecture.md#Naming Patterns]

**`app.js` Section Order (MUST follow this exact order):**
```
1. CONSTANTS & CONFIGURATION
2. DATA LOADING
3. RENDERING          ← renderFixedTasks() goes HERE
4. STATE MANAGEMENT
5. HIGHLIGHTING
6. TODAY DETECTION
7. INITIALIZATION     ← call renderFixedTasks(data) HERE
```
[Source: architecture.md#Structure Patterns]

### data.json Complete Schema

**Family Members (8 total):**
```json
"familyMembers": [
  { "name": "אבא", "emoji": "👨" },
  { "name": "אמא", "emoji": "👩" },
  { "name": "מעיין", "emoji": "🌊" },
  { "name": "חי", "emoji": "🌟" },
  { "name": "ארז", "emoji": "🦁" },
  { "name": "אלון", "emoji": "🌳" },
  { "name": "עדי", "emoji": "🎨" },
  { "name": "סבתא", "emoji": "👵" }
]
```

**Fixed Tasks (7 total):**
```json
"fixedTasks": [
  { "task": "הכנסת מדיח", "emoji": "🍽️", "member": "אבא" },
  { "task": "פריקת מדיח", "emoji": "🍽️", "member": "ארז" },
  { "task": "פחים", "emoji": "🗑️", "member": "אלון" },
  { "task": "כביסות", "emoji": "👕", "member": "מעיין" },
  { "task": "סידורים + נסיעות", "emoji": "🚗", "member": "חי" },
  { "task": "הווי ובידור", "emoji": "🎭", "member": "עדי" },
  { "task": "נקיונות לפסח", "emoji": "🧹", "members": ["אמא", "סבתא"] }
]
```

Note: The last task uses `members` (array) instead of `member` (string) because it has two owners. The rendering logic MUST handle both cases.

**Weekly Schedule (for Story 1.3, but MUST be present now):**
```json
"weeklySchedule": {
  "days": ["ראשון", "שני", "שלישי", "רביעי", "חמישי"],
  "rotations": [
    {
      "label": "ארוחת צהריים",
      "assignments": ["מעיין", "ארז", "אלון", "סבתא", "חי"]
    },
    {
      "label": "ארוחת ערב",
      "assignments": ["אמא", "אמא", "אמא", "אמא", "אמא"]
    },
    {
      "label": "עוזר לאמא בארוחת ערב",
      "assignments": ["ארז", "מעיין", "אלון", "חי", "עדי"]
    },
    {
      "label": "סדר קומת כניסה + אמבטיות + עריכת שולחן",
      "assignments": ["אלון", "חי", "עדי", "ארז", "מעיין"]
    }
  ]
}
```

[Source: epics.md#Story 1.2, prd.md#Fixed Tasks Display (FR7-FR9), prd.md#Weekly Schedule Display (FR10-FR14)]

### HTML Data Attributes

Every fixed task row MUST have:
- `data-member="<Hebrew name>"` — used by highlighting logic in Story 2.2
- For multi-member tasks, create wrapper elements each with their own `data-member` or use a single row with both names displayed

[Source: architecture.md#HTML Data Attributes]

### Rendering Pattern

The architecture says: "JS never creates structural elements (sections, tables, headers). JS only populates text content and toggles CSS classes." — HOWEVER, for task rows, JS needs to create `<div>` elements for each row since the data comes from JSON. This is the expected minimal HTML generation pattern.

**Recommended rendering approach:**
```javascript
function renderFixedTasks(data) {
  const sectionEl = document.querySelector('[aria-labelledby="fixed-tasks-title"]');
  if (!sectionEl || !data.fixedTasks) return;

  data.fixedTasks.forEach(task => {
    const rowEl = document.createElement('div');
    rowEl.className = 'task-row';
    // Handle single member vs multiple members
    const members = task.members || [task.member];
    rowEl.setAttribute('data-member', members[0]); // Primary member for highlighting

    // Create child spans for emoji + name + owner emoji + owner name
    // ...
    sectionEl.appendChild(rowEl);
  });
}
```

[Source: architecture.md#Project Structure & Boundaries — Boundary 3]

### Previous Story Intelligence (Story 1.1)

**Code review findings applied to Story 1.1:**
- `loadData()` was refactored to be a pure data function (returns data or null)
- Error display moved to DOMContentLoaded handler using `createElement` + `textContent` (XSS-safe)
- `console.error()` added for debugging failed loads
- Header gradient colors extracted to CSS custom properties (`--color-header-gradient-start/end`)
- `package.json` created with `"type": "module"` and `npm test` script

**Current app.js structure (post-review):**
- `loadData()` returns data object or null (no DOM manipulation inside)
- DOMContentLoaded handler: calls `loadData()`, checks for null, shows error if needed
- All 7 section headers present and ready for expansion
- `STORAGE_KEY` constant defined

**Patterns established:**
- Tests use Node.js built-in test runner (`node --test tests/*.test.js`)
- Tests read files and validate content via regex/string matching
- 76 existing tests in `tests/story-1-1.test.js` — do NOT break these

**Files from Story 1.1:**
- `index.html` — Has `<section aria-labelledby="fixed-tasks-title">` with only an `<h2>` inside (no task rows yet)
- `style.css` — Has `.section-card` styling, 11 light + 11 dark CSS tokens (including gradient tokens)
- `app.js` — Has loadData(), DOMContentLoaded, error handling
- `data.json` — Has empty arrays (to be populated by this story)

### Task Row Visual Design

Per UX spec and architecture:
- Each row: `[task emoji] [task name] ————— [owner emoji] [owner name]`
- Row layout: flexbox with space-between or similar to push owner info to the left (RTL: left side = end)
- Task rows inside `.section-card` which already has surface background, border, rounded corners
- No shadows on individual rows — the card provides the container styling
- Bottom border between rows (`var(--color-border)`), none on last row
- Compact padding for mobile fit

[Source: ux-design-specification.md#Component Strategy, epics.md#Story 1.2 AC]

### What This Story Does NOT Include

- **No weekly schedule rendering** — that's Story 1.3 (but the data MUST be in data.json)
- **No name selector** — that's Story 2.1
- **No highlighting logic** — that's Story 2.2 (but `data-member` attributes MUST be set for future use)
- **No today detection** — that's Story 2.2
- **No flag buttons** — that's Story 3.2

### Cross-Story Dependencies

- Story 1.3 depends on this story's populated `data.json` (weeklySchedule data)
- Story 2.1 depends on this story's `familyMembers` data in `data.json`
- Story 2.2 depends on `data-member` attributes being correctly set on all task rows
- All future stories depend on the `data.json` schema established here

### Project Structure Notes

- Current file structure (no changes to structure, only file content changes):
  ```
  mbat-start/
  ├── index.html          ← No structural changes (section already exists)
  ├── style.css           ← Add .task-row styles
  ├── app.js              ← Add renderFixedTasks() in section 3, update init
  ├── data.json           ← Populate with all family data
  ├── assets/
  │   └── lion-logo.jpg
  ├── .gitignore
  ├── package.json
  └── tests/
      ├── story-1-1.test.js   ← DO NOT MODIFY
      └── story-1-2.test.js   ← New tests for this story
  ```

[Source: architecture.md#Complete Project Directory Structure]

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2] — Original acceptance criteria and BDD specs
- [Source: _bmad-output/planning-artifacts/prd.md#Fixed Tasks Display (FR7-FR9)] — Fixed task requirements
- [Source: _bmad-output/planning-artifacts/prd.md#Data Management (FR24-FR25)] — Admin config editing
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Architecture] — data.json schema
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — Naming conventions, section order
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — File responsibilities
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy] — Task row visual design
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System] — Font sizes for tasks
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation] — 8px spacing system
- [Source: _bmad-output/implementation-artifacts/1-1-project-foundation-branded-header.md] — Previous story learnings and code review fixes

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- All 140 tests passing (76 Story 1.1 + 64 Story 1.2)

### Completion Notes List

- data.json populated with all 8 family members, 7 fixed tasks, and complete weekly schedule
- renderFixedTasks() function created in app.js section 3 (RENDERING) with member emoji lookup map
- Multi-member task (נקיונות לפסח) handled with joined display (אמא + סבתא) and comma-joined data-member attribute
- Initialization updated with early return on error, renderFixedTasks(data) called on success
- Task row CSS uses only CSS custom properties — works in both light and dark mode
- All content uses textContent (no innerHTML) for XSS safety
- owner-info wrapper span groups owner emoji + name, supports multiple members with " + " separator

### Change Log

- 2026-03-05: Story created by create-story workflow — comprehensive developer guide with full artifact analysis and previous story intelligence
- 2026-03-05: All 5 tasks implemented — data.json populated, renderFixedTasks() added, init flow updated, CSS styles added, 64 tests written and passing
- 2026-03-05: Code review — H1 fixed (data-member uses members[0] + individual owner spans), M1 fixed (removed double padding), M3 fixed (File List updated). 142 tests passing.

### File List

- `data.json` — Modified: populated with 8 familyMembers, 7 fixedTasks, weeklySchedule (4 rotations × 5 days)
- `app.js` — Modified: added renderFixedTasks() in section 3, added renderFixedTasks(data) call in section 7, added early return on error
- `style.css` — Modified: added .task-row, .task-emoji, .task-name, .owner-info, .owner-emoji, .owner-name styles
- `tests/story-1-2.test.js` — Created: 64 tests covering data schema, rendering function, initialization, and CSS styles
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — Modified: story status updated to review
