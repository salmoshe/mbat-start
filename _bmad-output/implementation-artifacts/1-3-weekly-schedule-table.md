# Story 1.3: Weekly Schedule Table

Status: done

## Story

As a family member,
I want to see the full weekly Sun–Thu rotation schedule with lunch, dinner, dinner helper, and tidying assignments,
so that I can check who is responsible for each rotating duty on any day of the week.

## Acceptance Criteria

1. **AC1: Data already populated** — data.json already contains weeklySchedule with days array (5 days) and rotations array (4 entries), each with label and assignments. No data changes needed.

2. **AC2: Table renders in card** — A "לוח שבועי" section displays inside the existing section-card. A unified `<table>` shows all 4 rotation rows x 5 day columns.

3. **AC3: Day headers** — Day headers display Hebrew day abbreviations (א׳, ב׳, ג׳, ד׳, ה׳) with blue background and white text. Each uses `<th scope="col">`.

4. **AC4: Rotation row labels** — Each rotation row has a label header cell using `<th scope="row">`.

5. **AC5: Mobile fit** — Table fits within 375px viewport without horizontal scrolling. Cells use compact padding (8px vertical, 6px horizontal).

6. **AC6: Data attributes** — Each `<td>` cell has `data-member` attribute set to the assigned member's Hebrew name AND `data-day` attribute set to the day index (0=Sun through 4=Thu).

7. **AC7: Admin editability** — Changing data.json and redeploying updates the displayed schedule.

## Tasks / Subtasks

- [x] Task 1: renderWeeklySchedule function (AC: 2, 3, 4, 6)
  - [x] 1.1: Create `function renderWeeklySchedule(data)` in app.js section 3 (RENDERING), after renderFixedTasks
  - [x] 1.2: Query section by `[aria-labelledby="weekly-title"]`
  - [x] 1.3: Build `<table>` element with `schedule-table` class
  - [x] 1.4: Build `<thead>` with empty corner `<th>` + 5 day headers as `<th scope="col">` with day abbreviations (א׳, ב׳, ג׳, ד׳, ה׳) and `data-day` attributes
  - [x] 1.5: Build `<tbody>` with 4 rotation `<tr>` rows
  - [x] 1.6: Each row starts with `<th scope="row" class="rotation-label">` containing the rotation label
  - [x] 1.7: Each `<td>` has `data-member` and `data-day` attributes, textContent = member name
  - [x] 1.8: Use textContent (never innerHTML) for XSS safety
  - [x] 1.9: Day abbreviation map: ראשון→א׳, שני→ב׳, שלישי→ג׳, רביעי→ד׳, חמישי→ה׳

- [x] Task 2: Initialization call (AC: 2, 7)
  - [x] 2.1: Add `renderWeeklySchedule(data)` call in section 7 (INITIALIZATION), after renderFixedTasks(data)

- [x] Task 3: CSS table styles (AC: 3, 5)
  - [x] 3.1: Add "Weekly Schedule Table" section in style.css between Fixed Task Rows and Footer
  - [x] 3.2: `.schedule-table` — width: 100%, border-collapse: collapse
  - [x] 3.3: `.schedule-table th, .schedule-table td` — padding: 8px 6px, text-align: center, font-size: 14px
  - [x] 3.4: Day headers (`.schedule-table thead th`) — background: var(--color-primary), color: #FFFFFF, font-weight: bold
  - [x] 3.5: `.schedule-table .rotation-label` — text-align: right (RTL start), font-weight: bold, font-size: 13px, background: var(--color-surface)
  - [x] 3.6: Table cell borders using var(--color-border)
  - [x] 3.7: Use only CSS custom properties for colors (no hardcoded values except white text on blue headers)

- [x] Task 4: Tests (AC: all)
  - [x] 4.1: Test data.json weeklySchedule structure (already covered in story-1-2.test.js Tasks 1.3/1.4)
  - [x] 4.2: Test renderWeeklySchedule function exists with correct signature
  - [x] 4.3: Test function is in section 3 (RENDERING)
  - [x] 4.4: Test queries section by aria-labelledby="weekly-title"
  - [x] 4.5: Test creates table with schedule-table class
  - [x] 4.6: Test creates th scope="col" for day headers
  - [x] 4.7: Test creates th scope="row" for rotation labels
  - [x] 4.8: Test sets data-member and data-day attributes
  - [x] 4.9: Test uses textContent not innerHTML
  - [x] 4.10: Test CSS has .schedule-table styles
  - [x] 4.11: Test day headers have blue background
  - [x] 4.12: Test compact padding (8px 6px)
  - [x] 4.13: Test renderWeeklySchedule(data) called in section 7
  - [x] 4.14: Test day abbreviation mapping (א׳, ב׳, etc.)

## Dev Notes

- **Pattern from Story 1.2**: Follow renderFixedTasks pattern — query section by aria-labelledby, build DOM with createElement/textContent, append to section
- **Padding lesson**: Use 8px 6px on cells (not matching card padding). The section-card provides its own 16px padding
- **data-member pattern**: Single Hebrew name per cell (one member per td), matching Story 2.2's querySelector('[data-member="ארז"]') pattern
- **Day abbreviation**: Map full day names to abbreviations in JS, not in data.json (keep data clean)
- **Table width**: 100% width, border-collapse: collapse. Hebrew names are short enough for 375px mobile
- **Empty corner th**: First `<th>` in thead row should be empty (labels column header)
- **Font sizes**: 14px for table cells (per UX spec), 13px for rotation labels (long labels need to be compact)

### Project Structure Notes

- app.js section 3: renderWeeklySchedule goes after renderFixedTasks
- app.js section 7: renderWeeklySchedule(data) call goes after renderFixedTasks(data)
- style.css: "Weekly Schedule Table" section between "Fixed Task Rows" and "Footer"
- tests/story-1-3.test.js: New test file for Story 1.3

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3: Weekly Schedule Table]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Weekly Schedule Table component]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Table Cell component]
- [Source: _bmad-output/planning-artifacts/architecture.md#data-day HTML attributes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Fixed Story 1.2 test boundary: CSS color check scanned past task-row section into weekly table section, picking up `#FFFFFF`. Tightened boundary from "Footer" to next `/* ====` section comment.

### Completion Notes List

- All 4 tasks implemented in single pass
- 36 new tests in story-1-3.test.js, all passing
- 178 total tests across all stories (76 + 66 + 36), all green
- Followed renderFixedTasks pattern: query by aria-labelledby, createElement/textContent, append
- Day abbreviations mapped in JS (dayAbbrev object), keeping data.json clean with full day names
- Compact 8px 6px cell padding for mobile fit per UX spec
- data-day attributes on both th headers and td cells (for future Story 2.2 today detection)

### File List

- app.js (modified: added renderWeeklySchedule in section 3, call in section 7)
- style.css (modified: added Weekly Schedule Table CSS section)
- tests/story-1-3.test.js (new: 36 tests)
- tests/story-1-2.test.js (modified: fixed CSS color check boundary)
- _bmad-output/implementation-artifacts/1-3-weekly-schedule-table.md (new: story file)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified: story status)
