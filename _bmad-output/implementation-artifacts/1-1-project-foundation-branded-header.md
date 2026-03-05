# Story 1.1: Project Foundation & Branded Header

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a family member,
I want to open the app URL and see the שאגת הארי branded header with lion logo, title, and family motto in a polished mobile-first Hebrew layout with automatic dark mode,
so that I immediately feel this is our family's app and it looks professional on my phone.

## Acceptance Criteria

1. **Given** the project files do not yet exist, **When** the developer initializes the project, **Then** the following file structure is created: `index.html`, `style.css`, `app.js`, `data.json`, `assets/lion-logo.jpg`, `.gitignore` — **And** `index.html` includes `<html lang="he" dir="rtl">`, viewport meta tag, `<meta name="robots" content="noindex">`, `<meta name="color-scheme" content="light dark">`, and links to `style.css` and `app.js`

2. **Given** a user opens the app on a mobile phone (375px+ width), **When** the page loads, **Then** a gradient blue header displays the שאגת האריה lion logo image, the title "שאגת הארי", and the family motto "בואו נשאג ביחד על המשימות! כל אחד תורם" — **And** a footer displays the motto with a lion emoji

3. **Given** `style.css` is loaded, **When** the browser renders the page, **Then** all 9 CSS custom property design tokens are defined on `:root` for light mode — **And** dark mode tokens are defined inside `@media (prefers-color-scheme: dark)` — **And** the typography uses the `system-ui, -apple-system, "Segoe UI", sans-serif` font stack with 16px+ base size

4. **Given** a user opens the app on a device with dark mode enabled, **When** the page renders, **Then** all colors swap to dark mode tokens automatically via the `prefers-color-scheme` media query — **And** the header, background, and text are all readable with sufficient contrast (WCAG AA ≥ 4.5:1)

5. **Given** a user opens the app on a desktop browser (600px+ width), **When** the page renders, **Then** the content is centered with `max-width: 600px` — **And** the layout remains fully functional and readable

6. **Given** the HTML structure uses semantic elements, **When** a screen reader traverses the page, **Then** the heading hierarchy starts with `h1` for the app title — **And** sections use `aria-labelledby` linking to `h2` title IDs

## Tasks / Subtasks

- [x] Task 1: Create project file structure (AC: 1)
  - [x] 1.1 Create `index.html`, `style.css`, `app.js`, `data.json`, `.gitignore` in project root
  - [x] 1.2 Create `assets/` directory
  - [x] 1.3 Copy lion logo source image (`IMG_6949 copy.JPG`) to `assets/lion-logo.jpg` — optimize to <200KB if possible (total page budget is 500KB)
- [x] Task 2: Build `index.html` semantic skeleton (AC: 1, 6)
  - [x] 2.1 Set `<html lang="he" dir="rtl">`
  - [x] 2.2 Add meta tags: `viewport` (width=device-width, initial-scale=1), `robots` (noindex), `color-scheme` (light dark), `charset` (UTF-8)
  - [x] 2.3 Link `style.css` in `<head>` and `app.js` with `defer` at end of `<body>` (or in head with defer)
  - [x] 2.4 Create `<header>` with lion logo `<img>`, `<h1>שאגת הארי</h1>`, and motto `<p>`
  - [x] 2.5 Create `<main>` with placeholder `<section>` elements for "משימות קבועות" and "לוח שבועי" (these sections will be populated in Stories 1.2 and 1.3)
  - [x] 2.6 Each `<section>` must have `aria-labelledby` pointing to its `<h2>` element's `id`
  - [x] 2.7 Create `<footer>` with motto text + lion emoji: "בואו נשאג ביחד על המשימות! כל אחד תורם 🦁"
- [x] Task 3: Implement CSS design system in `style.css` (AC: 3)
  - [x] 3.1 Define all 9 light mode CSS custom properties on `:root` (exact values below in Dev Notes)
  - [x] 3.2 Define all 9 dark mode CSS custom properties inside `@media (prefers-color-scheme: dark)` on `:root`
  - [x] 3.3 Set base typography: `font-family: system-ui, -apple-system, "Segoe UI", sans-serif`, `font-size: 16px` on `html`
  - [x] 3.4 Add `-webkit-text-size-adjust: 100%` to prevent iOS text inflation
  - [x] 3.5 Set `box-sizing: border-box` globally via `*, *::before, *::after`
  - [x] 3.6 Reset body margin/padding, set `background-color: var(--color-background)`, `color: var(--color-text)`
- [x] Task 4: Style gradient header and branded elements (AC: 2)
  - [x] 4.1 Header gradient background using `--color-primary` (e.g., `linear-gradient(135deg, #1A4B8C, #2E6BC6)`)
  - [x] 4.2 Center lion logo image with appropriate max-width (120-150px) and `border-radius: 50%` if circular
  - [x] 4.3 Style title "שאגת הארי" at 20px bold, white text
  - [x] 4.4 Style motto at 14px, lighter/italic, white text with slight transparency
  - [x] 4.5 Add header padding using 8px spacing unit system (24-32px vertical, 16px horizontal)
  - [x] 4.6 Ensure logo `<img>` has meaningful `alt` text (e.g., `alt="לוגו שאגת האריה"`)
- [x] Task 5: Style footer (AC: 2)
  - [x] 5.1 Footer text in `--color-text-secondary`, italic, 14px
  - [x] 5.2 Centered text with 24px bottom padding
- [x] Task 6: Implement responsive layout (AC: 5)
  - [x] 6.1 Mobile-first base: `width: 100%`, `padding: 0 16px`
  - [x] 6.2 Desktop breakpoint: `@media (min-width: 600px)` → `max-width: 600px`, `margin: 0 auto`, `padding: 0 24px`
  - [x] 6.3 Header stretches full-width (no max-width constraint on header)
- [x] Task 7: Set up initial `data.json` schema (AC: 1, prep for Story 1.2)
  - [x] 7.1 Create valid JSON with `familyMembers`, `fixedTasks`, `weeklySchedule` top-level keys
  - [x] 7.2 Use camelCase for all keys
  - [x] 7.3 Populate with empty arrays/objects as placeholder (full data in Story 1.2)
- [x] Task 8: Set up `app.js` foundation (AC: 1, prep for Story 1.2)
  - [x] 8.1 Add all 7 section comment headers per architecture spec
  - [x] 8.2 Define `STORAGE_KEY = 'mbat-selected-member'` constant
  - [x] 8.3 Add `DOMContentLoaded` event listener as entry point
  - [x] 8.4 Stub `loadData()` function with `fetch('data.json')` and error handling (display "לא ניתן לטעון את הנתונים" on failure)
- [x] Task 9: Create `.gitignore` (AC: 1)
  - [x] 9.1 Standard web project ignores: `.DS_Store`, `node_modules/`, `.env`, `*.log`, `.vscode/`, `Thumbs.db`
- [x] Task 10: Verify dark mode rendering (AC: 4)
  - [x] 10.1 Test in Chrome DevTools with `prefers-color-scheme: dark` emulation
  - [x] 10.2 Verify header text against gradient background meets WCAG AA (white on #1A4B8C = 8.2:1 ✓)
  - [x] 10.3 Verify body text against background in both modes

## Dev Notes

### Critical Architecture Rules — DO NOT DEVIATE

**File Responsibilities (Boundary Rule):**
| File | Contains | NEVER Contains |
|------|----------|----------------|
| `index.html` | Semantic HTML structure, meta tags, file links | Inline CSS (beyond critical), inline JS, data |
| `style.css` | All styling, design tokens, dark mode, responsive | Logic, data, JavaScript |
| `app.js` | Data loading, rendering, state, highlighting, today detection | Inline styles (use classList only), HTML generation (minimal) |
| `data.json` | Family members, fixed tasks, weekly schedule | Logic, configuration beyond schedule |

[Source: architecture.md#Implementation Patterns & Consistency Rules]

**CSS Naming Conventions:**
- Classes: **kebab-case** → `.name-chip`, `.task-row`, `.section-card`
- State classes: **simple adjective** → `.selected`, `.highlighted`, `.today`
- CSS custom properties: **--category-name** → `--color-primary`, `--color-highlight`
- IDs: **kebab-case** (sparingly) → `#fixed-tasks-title`, `#weekly-title`
- Anti-patterns: NO BEM, NO JS-prefixed classes, NO utility classes

[Source: architecture.md#Naming Patterns]

**JS Naming Conventions:**
- Variables: camelCase → `selectedMember`, `scheduleData`
- Functions: camelCase → `loadData()`, `selectMember()`
- Constants: UPPER_SNAKE_CASE → `STORAGE_KEY`, `API_URL`
- DOM references: camelCase with `El` suffix → `headerEl`, `nameSelectorEl`
- Event handlers: camelCase with `handle` prefix → `handleNameClick()`

[Source: architecture.md#Naming Patterns]

**`app.js` Section Order (MUST follow this exact order):**
```
1. CONSTANTS & CONFIGURATION
2. DATA LOADING
3. RENDERING
4. STATE MANAGEMENT
5. HIGHLIGHTING
6. TODAY DETECTION
7. INITIALIZATION
```
[Source: architecture.md#Structure Patterns]

### Exact CSS Design Token Values

**Light Mode (`:root`):**
```css
--color-primary: #1A4B8C;
--color-primary-light: #E3F0FF;
--color-background: #FFFFFF;
--color-surface: #F0F4F8;
--color-text: #1A1A2E;
--color-text-secondary: #5A6A7A;
--color-highlight: #FFF3CD;
--color-highlight-border: #E6C85A;
--color-border: #D0D8E0;
```

**Dark Mode (`@media (prefers-color-scheme: dark)` on `:root`):**
```css
--color-primary: #4A90D9;
--color-primary-light: #1A2A44;
--color-background: #1A1A2E;
--color-surface: #252540;
--color-text: #E8ECF0;
--color-text-secondary: #8A9AAA;
--color-highlight: #3D3520;
--color-highlight-border: #8A7A30;
--color-border: #3A3A5A;
```

[Source: ux-design-specification.md#Color System, architecture.md#Core Architectural Decisions]

### Typography Specs

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| App title | 20px | Bold | שאגת הארי header |
| Section headers | 18px | Bold | "משימות קבועות", "לוח שבועי" |
| Table headers | 14px | Bold | Day names, rotation labels |
| Table cells | 14-15px | Normal / Bold (highlighted) | Schedule data |
| Name chips | 16px | Medium (500) | Family member names |
| Motto | 14px | Normal, italic | Footer text |

[Source: ux-design-specification.md#Typography System]

### Spacing System

**Base unit: 8px** — all spacing in multiples: 8, 16, 24, 32, 40

| Element | Spacing |
|---------|---------|
| Page side padding | 16px (mobile), 24px (desktop) |
| Section gap | 24px |
| Header padding | 24-32px vertical, 16px horizontal |
| Footer bottom padding | 24px |

[Source: ux-design-specification.md#Spacing & Layout Foundation]

### Lion Logo Source Image

The lion logo must be copied from the project root:
- **Source file:** `IMG_6949 copy.JPG` (recommended per UX design spec — this is the שאגת האריה logo)
- **Alternative source:** `PHOTO-2026-02-28-22-41-07.jpg`
- **Destination:** `assets/lion-logo.jpg`
- **Optimization:** Compress to reasonable size. The total page weight budget is 500KB including all files. Logo should ideally be <200KB.
- **Alt text:** `alt="לוגו שאגת האריה"` — meaningful Hebrew description

[Source: architecture.md#Gap Analysis Results, ux-design-specification.md#Design Direction Decision]

### RTL & Hebrew Considerations

- Set `dir="rtl"` on `<html>` root element only — do NOT use CSS `direction` property for this
- Hebrew names are short (2-4 chars typically) — table cells rarely need truncation
- Add `overflow-wrap: break-word` as safety on table cells
- Use CSS logical properties for spacing (`margin-inline-start`, `padding-block-end`) where appropriate — fully supported on target browsers
- Numeric content and Latin punctuation may reverse in RTL context — wrap with `dir="ltr"` if needed
- Use `border-radius` with physical properties (not logical variants) for cross-browser safety

[Source: architecture.md#Cross-Cutting Concerns, web research]

### Dark Mode Implementation

- Add `<meta name="color-scheme" content="light dark">` in `<head>` BEFORE any CSS — prevents flash of unstyled content (FOUC)
- All colors via CSS custom properties — NEVER hardcode color values
- `@media (prefers-color-scheme: dark)` swaps token values on `:root`
- No manual toggle — automatic via device preference (per product design)
- Gradient header should work in both modes — dark mode may use lighter blue primary

[Source: architecture.md#Core Architectural Decisions, ux-design-specification.md#Accessibility Considerations]

### WCAG AA Color Contrast Verification

All combinations verified ≥ 4.5:1 ratio:
| Element | Foreground | Background | Ratio |
|---------|-----------|-----------|-------|
| Body text (light) | #1A1A2E | #FFFFFF | 16.8:1 |
| Body text (dark) | #E8ECF0 | #1A1A2E | 12.4:1 |
| Header text | #FFFFFF | #1A4B8C | 8.2:1 |

[Source: ux-design-specification.md#Accessibility Strategy]

### `data.json` Initial Schema Shape

```json
{
  "familyMembers": [],
  "fixedTasks": [],
  "weeklySchedule": {
    "days": [],
    "rotations": []
  }
}
```
This will be fully populated in Story 1.2. For Story 1.1, the schema must exist and be valid JSON so `fetch()` doesn't fail.

[Source: architecture.md#Data Architecture]

### Error Handling Pattern (app.js)

- `data.json` fetch failure: Show inline Hebrew error message "לא ניתן לטעון את הנתונים" in main content area
- localStorage unavailable: `try/catch` around localStorage calls, fail silently
- No loading spinners — app is <500KB, content renders progressively

[Source: architecture.md#Process Patterns]

### Semantic HTML Structure (index.html skeleton)

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta name="color-scheme" content="light dark">
  <title>שאגת הארי - לוח משימות משפחתי</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="app-header">
    <img src="assets/lion-logo.jpg" alt="לוגו שאגת האריה" class="header-logo">
    <h1>שאגת הארי</h1>
    <p class="header-motto">בואו נשאג ביחד על המשימות! כל אחד תורם</p>
  </header>
  <main class="app-content">
    <!-- Name selector will be added in Story 2.1 -->
    <section aria-labelledby="fixed-tasks-title" class="section-card">
      <h2 id="fixed-tasks-title">משימות קבועות</h2>
      <!-- Fixed task rows populated by app.js in Story 1.2 -->
    </section>
    <section aria-labelledby="weekly-title" class="section-card">
      <h2 id="weekly-title">לוח שבועי</h2>
      <!-- Weekly schedule table populated by app.js in Story 1.3 -->
    </section>
  </main>
  <footer class="app-footer">
    <p>בואו נשאג ביחד על המשימות! כל אחד תורם 🦁</p>
  </footer>
  <script src="app.js" defer></script>
</body>
</html>
```

This is a reference — the dev agent should use this as a guide, not copy blindly. Adapt as needed while following all architectural rules.

[Source: ux-design-specification.md#Implementation Guidelines, architecture.md#Structure Patterns]

### What This Story Does NOT Include

- **No name selector** — that's Story 2.1
- **No fixed tasks rendering** — that's Story 1.2 (but placeholders exist)
- **No weekly schedule rendering** — that's Story 1.3 (but placeholders exist)
- **No highlighting logic** — that's Story 2.2
- **No today detection** — that's Story 2.2
- **No GitHub Pages deployment** — that's Story 1.4
- `data.json` should have the schema structure but NOT the full data content (Story 1.2 fills it)

### Cross-Story Dependencies

- Story 1.2 depends on this story's file structure, `data.json` schema, and `app.js` foundation
- Story 1.3 depends on this story's HTML skeleton (sections) and CSS design system
- Story 2.1 depends on this story's name selector area in HTML
- All future stories depend on the CSS design tokens defined here

### Project Structure Notes

- Alignment with unified project structure:
  ```
  mbat-start/
  ├── index.html
  ├── style.css
  ├── app.js
  ├── data.json
  ├── assets/
  │   └── lion-logo.jpg
  └── .gitignore
  ```
- All files at project root level (no `src/` or `public/` subdirectories)
- No build pipeline, no package.json, no node_modules
- Development server: `python3 -m http.server` or VS Code Live Server (needed for fetch() to work)

[Source: architecture.md#Complete Project Directory Structure]

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation] — File structure and initialization
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules] — All naming and coding conventions
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions] — Data loading, DOM rendering, file structure decisions
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries] — File responsibilities and boundaries
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Color System] — Exact design token values
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System] — Font stack and type scale
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation] — 8px spacing system
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design Direction Decision] — Direction B: Card Modern chosen
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Responsive Design & Accessibility] — Responsive strategy, WCAG compliance
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy] — App Header, Section Card, Footer component specs
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1] — Original acceptance criteria
- [Source: _bmad-output/planning-artifacts/prd.md#Branding & Identity] — FR1, FR2, FR3 requirements
- [Source: _bmad-output/planning-artifacts/prd.md#Dark Mode] — FR18, FR19 requirements
- [Source: _bmad-output/planning-artifacts/prd.md#Localization & Layout] — FR20-FR23 requirements

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

- Fixed Unicode escape issue in app.js Hebrew error message — Write tool encoded Hebrew as \uXXXX escapes; resolved by editing to use literal Hebrew characters

### Completion Notes List

- Created complete project file structure: index.html, style.css, app.js, data.json, .gitignore, assets/lion-logo.jpg
- Built semantic HTML skeleton with RTL support (lang="he" dir="rtl"), all required meta tags, aria-labelledby sections
- Implemented full CSS design system with 9 light mode + 9 dark mode tokens, system-ui font stack, 8px spacing system
- Styled gradient header with circular lion logo (130px max-width), branded title and motto
- Styled footer with secondary color text, 14px italic
- Responsive layout: mobile-first (100% width, 16px padding), desktop breakpoint at 600px (centered, 24px padding)
- Created data.json with correct camelCase schema (familyMembers, fixedTasks, weeklySchedule.days/rotations)
- Set up app.js with all 7 architecture-mandated section headers, STORAGE_KEY constant, async loadData() with fetch and Hebrew error handling, DOMContentLoaded entry point
- Created standard .gitignore for web project
- Verified dark mode rendering in Chrome DevTools — all color swaps working, WCAG AA contrast ratios met
- Verified mobile (375px) and desktop rendering
- 76 unit tests written and passing (Node.js built-in test runner, no external dependencies)

### Change Log

- 2026-03-05: Story created by create-story workflow — comprehensive developer guide with full artifact analysis
- 2026-03-05: All 10 tasks implemented — project foundation, branded header, CSS design system, dark mode, responsive layout, data schema, app.js foundation, .gitignore. 76 tests passing.

### File List

- `index.html` — Created: semantic HTML skeleton with RTL, meta tags, header, main sections, footer
- `style.css` — Created: CSS design system with 18 tokens (light+dark), header/footer/section styles, responsive breakpoint
- `app.js` — Created: foundation with 7 section headers, STORAGE_KEY, loadData(), DOMContentLoaded init
- `data.json` — Created: initial schema with empty familyMembers, fixedTasks, weeklySchedule
- `.gitignore` — Created: standard web project ignores
- `assets/lion-logo.jpg` — Created: copied from IMG_6949 copy.JPG (21KB)
- `tests/story-1-1.test.js` — Created: 76 unit tests covering all 10 tasks
