---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-05'
inputDocuments:
  - product-brief-mbat-start-2026-03-04.md
  - prd.md
  - ux-design-specification.md
workflowType: 'architecture'
project_name: 'mbat-start'
user_name: 'Mosh.s'
date: '2026-03-05'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

25 FRs for v1 covering branding (FR1–FR3), family member selection with localStorage persistence (FR4–FR6), fixed task display with emoji identifiers (FR7–FR9), weekly Sun–Thu schedule with 4 rotation tables (FR10–FR14), personal highlighting with today awareness (FR15–FR17), automatic dark mode (FR18–FR19), Hebrew RTL layout (FR20–FR23), and admin config editing (FR24–FR25). An additional 5 FRs (FR26–FR30) define the v1.1 flagging system requiring a backend API. Flagging applies to fixed tasks only — not weekly rotation duties.

Architecturally, v1 FRs are fully achievable with client-side rendering and static data. The FR26–FR30 flagging features are the only requirements that introduce server communication.

**Non-Functional Requirements:**

14 NFRs drive the following architectural decisions:
- **Performance (NFR1–NFR4):** < 2s first load, < 1s cached, < 500KB total, < 100ms interaction response. All achievable with a single static HTML file and no external dependencies.
- **Compatibility (NFR5–NFR8):** iOS Safari 15+, Android Chrome 90+, desktop Chrome/Safari. Vanilla JS + CSS custom properties are supported on all targets. No polyfills needed.
- **Maintainability (NFR9–NFR11):** Human-readable JSON config, non-technical admin editing, `git push` deployment. This mandates a clean data/presentation separation.
- **Hosting (NFR12–NFR14):** Static hosting only for v1. Flask on PythonAnywhere for v1.1. No infrastructure management.

**UX Architecture Implications:**

The UX spec defines a minimal custom design system (CSS custom properties as design tokens), 8 v1 components built with semantic HTML + CSS classes, a single 600px breakpoint, and JavaScript limited to CSS class toggling for state management. This constrains the architecture to zero-framework, zero-build-pipeline implementation.

### Scale & Complexity

- **Primary domain:** Frontend web — static SPA
- **Complexity level:** Low
- **Estimated architectural components:** 3 layers — presentation (HTML/CSS), logic (vanilla JS), data (JSON config) for v1. Add API integration layer for v1.1.
- **Real-time features:** None in v1. Flags in v1.1 are request/response, not real-time.
- **Multi-tenancy:** None — single family, single deployment.
- **Regulatory compliance:** None — private family app, no PII collection, no analytics.
- **Data volume:** Trivial — 8 family members, 7 fixed tasks, 4 rotation tables × 5 days.

### Technical Constraints & Dependencies

| Constraint | Source | Architectural Impact |
|-----------|--------|---------------------|
| No frameworks / no build pipeline | PRD + UX Spec | Vanilla HTML/CSS/JS only. No React, no Vite, no npm. |
| Single-file deployment option | PRD | Architecture must support inline CSS/JS in one `index.html` |
| GitHub Pages hosting (v1) | PRD | Static files only, no server-side processing |
| PythonAnywhere Flask (v1.1) | PRD | Lightweight Python backend, free/basic tier limitations |
| System font stack | UX Spec | No web font loading, zero typography dependencies |
| CSS custom properties for theming | UX Spec | All color/spacing tokens as CSS variables, dark mode via media query |
| localStorage for persistence | PRD | No cookies, no server sessions, browser-native storage |
| Hebrew RTL | PRD + UX Spec | `dir="rtl"` on root, CSS logical properties preferred |

### Cross-Cutting Concerns Identified

1. **Theming (light/dark)** — Every component must respect CSS custom property tokens. Dark mode is a media query swap, not a JS toggle. All colors must be defined as variables, never hardcoded.

2. **Personal highlighting** — Spans fixed task rows and weekly table cells. The JS logic that toggles `.highlighted` CSS classes must consistently identify elements belonging to the selected family member across both sections.

3. **Today awareness** — The day detection logic (`new Date().getDay()`) must map correctly to the Sun–Thu Hebrew week and handle weekend (Fri/Sat) by showing no today highlight.

4. **RTL layout** — All layout, text alignment, and table rendering must be RTL-native. CSS logical properties (`margin-inline-start` vs `margin-left`) preferred where supported.

5. **Data/presentation separation** — Schedule data must be cleanly separated from rendering logic so that admin editing (v1) and API-driven updates (v1.1) work without touching presentation code.

6. **v1 → v1.1 upgrade path** — The static SPA architecture must accommodate adding `fetch()` calls for flag CRUD without restructuring. The JS code should be organized so that adding API integration is additive, not a rewrite.

## Starter Template Evaluation

### Primary Technology Domain

**Static frontend web SPA** — vanilla HTML/CSS/JS with no build pipeline, deployed to GitHub Pages. This is the simplest possible web architecture: a single HTML file with inline or linked CSS/JS.

### Technical Preferences

| Category | Decision | Source |
|----------|----------|--------|
| Language | Vanilla JavaScript (ES6+) | PRD — no frameworks or dependencies |
| Styling | CSS custom properties (design tokens) | UX Spec — minimal custom design system |
| Build tools | None | PRD — no bundler, no npm |
| Testing | Manual browser testing | UX Spec — test on real devices |
| Deployment | GitHub Pages (static) | PRD — `git push` to deploy |
| Backend (v1.1) | Python Flask on PythonAnywhere | PRD — lightweight flag API |

### Starter Options Considered

| Option | Description | Verdict |
|--------|-------------|---------|
| **Framework CLIs** (create-react-app, Vite, Next.js, SvelteKit) | Standard web app scaffolds with build pipelines | **Rejected** — PRD mandates zero dependencies, no build pipeline. Any framework adds unnecessary weight and complexity. |
| **HTML5 Boilerplate** | Minimal HTML5 starting template with best practices | **Considered** — provides sensible defaults (meta tags, normalize.css, favicon setup) but includes files we don't need (jQuery placeholder, build scripts). More setup to strip down than to build up. |
| **Custom single-file template** | Hand-crafted `index.html` with inline CSS/JS structured for the project | **Selected** — The project is simple enough that a clean, purpose-built template gives us exactly what we need with zero waste. |

### Selected Starter: Custom Single-File Template

**Rationale for Selection:**

The project's constraints (no framework, no build pipeline, single-file deployment, < 500KB total) make any external starter template more complex than starting clean. The total component count is 8 for v1. The data model is a single JSON structure. A hand-crafted `index.html` with inline `<style>` and `<script>` tags is the most direct path to deployment.

**Initialization Command:**

```bash
# No CLI scaffold needed. Create project structure:
mkdir -p mbat-start
touch mbat-start/index.html
# Optional: separate files for development clarity
touch mbat-start/style.css
touch mbat-start/app.js
touch mbat-start/data.json
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- ES6+ JavaScript (arrow functions, template literals, const/let, destructuring)
- No TypeScript — project scope doesn't justify the setup overhead
- No transpilation needed — all target browsers support ES6+ natively

**Styling Solution:**
- CSS custom properties (`:root` variables) for all design tokens
- `@media (prefers-color-scheme: dark)` for dark mode token swap
- No CSS preprocessor (Sass/Less) — plain CSS is sufficient
- No CSS framework (Tailwind/Bootstrap) — custom styles only

**Build Tooling:**
- None. Files served as-is.
- Development: open `index.html` in browser, or use `python3 -m http.server` / VS Code Live Server
- Production: `git push` to GitHub Pages

**Testing Framework:**
- No automated test framework for v1 (scope too small to justify)
- Manual testing on target devices (iOS Safari, Android Chrome)
- Chrome DevTools for responsive testing and accessibility audits

**Code Organization:**
- **Option A (Single-file):** All HTML, CSS, and JS in one `index.html` — simplest deployment, single file to maintain
- **Option B (Multi-file):** Separate `index.html`, `style.css`, `app.js`, `data.json` — clearer separation, easier to edit individual concerns
- **Recommendation:** Option B for development clarity, with the option to inline everything for production if needed. GitHub Pages serves multiple files without issue.

**Development Experience:**
- VS Code as editor (Live Server extension for hot reload)
- Chrome DevTools for debugging, responsive mode, accessibility panel
- No linter configured (project scope doesn't warrant ESLint setup)
- Git for version control, GitHub Pages for deployment

**File Structure:**

```
mbat-start/
├── index.html          # Main HTML structure + semantic markup
├── style.css           # All CSS including design tokens + dark mode
├── app.js              # Name selection, highlighting, today detection
├── data.json           # Schedule data (fixed tasks + weekly rotation)
├── assets/
│   └── lion-logo.jpg   # שאגת האריה lion logo image
└── README.md           # Project documentation (optional)
```

**Note:** Project initialization with this structure should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data loading strategy (Option B — external `data.json` via `fetch()`)
- DOM rendering strategy (Option A — static HTML + JS class toggling)
- File structure (multi-file: `index.html`, `style.css`, `app.js`, `data.json`)

**Important Decisions (Shape Architecture):**
- localStorage key strategy for name persistence
- JS code organization pattern (sections within single file)
- Event delegation for name selector
- v1.1 API endpoint design

**Deferred Decisions (Post-MVP):**
- v1.1 flag storage mechanism (JSON file vs SQLite on PythonAnywhere)
- v1.1 CORS domain configuration (depends on final GitHub Pages URL)

### Data Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Data loading** | External `data.json` loaded via `fetch()` | Clean data/presentation separation. Admin edits only the data file, never touches code. GitHub Pages serves JSON over HTTP. |
| **Data format** | JSON file with family members, fixed tasks, and weekly rotation schedule | Human-readable, editable by non-technical admin with minimal guidance (NFR10). |
| **Client-side persistence** | localStorage with key `mbat-selected-member`, value = member name string | Single key-value pair. No complex state. Survives browser restarts. |
| **v1.1 flag storage** | Server-side via Flask API (deferred detail) | Flags are shared state — cannot live in localStorage. Simple REST API with JSON file or SQLite backend. |

### Authentication & Security

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Authentication** | None — by explicit product design | Zero-friction name selector replaces auth. No sensitive data. Family-only app. |
| **Search engine visibility** | `<meta name="robots" content="noindex">` | Private family app, prevent accidental indexing. |
| **v1.1 CORS** | Restrict to GitHub Pages origin domain | Prevents unauthorized API access from other sites. |
| **v1.1 input validation** | Sanitize flag text (max length, strip HTML) | Prevent XSS when rendering flag content. |
| **API keys** | None | Family tool with obscure URL + CORS is sufficient. No sensitive data at risk. |

### API & Communication Patterns

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **v1 API** | None — fully static | No server communication in MVP. |
| **v1.1 API style** | REST with JSON responses | Simple CRUD for flags. 3 endpoints: `GET /flags`, `POST /flags`, `PATCH /flags/:id`. |
| **v1.1 error handling** | Graceful degradation — schedule always visible, flagging disabled if API unreachable | v1 features never break due to backend issues. |
| **API base URL config** | Single constant in `app.js`: `const API_URL = '...'` | Easy to toggle between dev and production. |

### Frontend Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **DOM rendering** | Static HTML structure + JS class toggling | Layout is fixed (same sections, same table). JS only populates data cells and toggles `.selected`, `.highlighted`, `.today` classes. No dynamic DOM generation needed. |
| **State management** | Vanilla JS variables + CSS class toggling | Selected member stored in a JS variable, synced to localStorage. All visual state expressed as CSS classes. |
| **Event handling** | Event delegation on name selector container | Single listener handles all name chip clicks. Clean and efficient. |
| **JS organization** | Sectioned single file (`app.js`) | 5 clear sections: (1) data loading, (2) rendering, (3) state management, (4) highlighting, (5) today detection. |
| **Highlighting logic** | JS iterates data-attribute-tagged elements, toggles `.highlighted` class | Each task row and table cell tagged with `data-member="name"` for reliable matching. |

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **v1 hosting** | GitHub Pages from `main` branch | Free, auto-deploys on `git push`, serves static files. |
| **v1 URL** | `username.github.io/mbat-start` (default) | No custom domain needed for family use. |
| **v1.1 backend** | PythonAnywhere free tier Flask app | Free hosting, Python environment, sufficient for single-family flag API. |
| **v1.1 flag endpoints** | `GET /flags`, `POST /flags`, `PATCH /flags/:id` | Minimal REST CRUD for flag lifecycle. |
| **Environment config** | v1: none needed. v1.1: `API_URL` constant in `app.js` | Static app has no environment variables. API URL is the only config for v1.1. |

### Decision Impact Analysis

**Implementation Sequence:**
1. Create file structure (`index.html`, `style.css`, `app.js`, `data.json`, `assets/`)
2. Define `data.json` schema with all schedule data
3. Build static HTML structure with semantic markup and `data-member` attributes
4. Implement CSS design tokens + dark mode + highlighting styles
5. Implement JS: data loading → rendering → state management → highlighting → today detection
6. Deploy to GitHub Pages
7. (v1.1) Add Flask API on PythonAnywhere
8. (v1.1) Add flag UI components and `fetch()` calls to `app.js`

**Cross-Component Dependencies:**
- `data.json` schema drives both HTML structure (what elements exist) and JS logic (what to highlight)
- CSS custom properties must be defined before any component styling
- `data-member` attributes in HTML are the bridge between JS logic and CSS highlighting
- localStorage read must happen before initial render to auto-select returning user's name
- Today detection must run on page load before rendering to mark the correct column

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 8 areas where AI agents could make different choices, all resolved below.

### Naming Patterns

**JavaScript Naming:**

| Element | Convention | Example |
|---------|-----------|---------|
| Variables | camelCase | `selectedMember`, `todayIndex`, `scheduleData` |
| Functions | camelCase | `loadData()`, `selectMember()`, `highlightTasks()`, `detectToday()` |
| Constants | UPPER_SNAKE_CASE | `STORAGE_KEY`, `API_URL` |
| DOM references | camelCase with `El` suffix | `headerEl`, `nameSelectorEl`, `scheduleTableEl` |
| Event handlers | camelCase with `handle` prefix | `handleNameClick()`, `handleFlagSubmit()` |

**CSS Naming:**

| Element | Convention | Example |
|---------|-----------|---------|
| Classes | kebab-case | `.name-chip`, `.task-row`, `.section-card` |
| State classes | simple adjective | `.selected`, `.highlighted`, `.today` |
| CSS custom properties | `--category-name` kebab-case | `--color-primary`, `--color-highlight`, `--spacing-sm` |
| IDs | kebab-case (use sparingly) | `#fixed-tasks-title`, `#weekly-title` |

**Anti-patterns:**
- No BEM (`.block__element--modifier`) — project is too small to benefit
- No JS-prefixed classes (`.js-name-chip`) — only 1 JS file, no conflict risk
- No utility classes (`.mt-4`, `.flex`) — not using a utility framework

**HTML Data Attributes:**

| Attribute | Format | Example |
|-----------|--------|---------|
| `data-member` | Hebrew name string | `data-member="ארז"`, `data-member="אמא"` |
| `data-day` | Day index (0=Sun, 4=Thu) | `data-day="0"`, `data-day="3"` |
| `data-task` | Task identifier in Hebrew | `data-task="פריקת מדיח"` |

### Structure Patterns

**File Responsibilities:**

| File | Responsibility | Never Contains |
|------|---------------|----------------|
| `index.html` | Semantic HTML structure, meta tags, file links | Inline CSS (beyond critical), inline JS (beyond init), data |
| `style.css` | All styling, design tokens, dark mode, responsive rules | Layout logic, data, JavaScript |
| `app.js` | Data loading, rendering, state, highlighting, today detection | Styling (use class toggling only), HTML generation (minimal — only table cell content) |
| `data.json` | Family members, fixed tasks, weekly schedule data | Logic, presentation, configuration beyond schedule |

**`app.js` Section Order:**

```javascript
// ============================================
// 1. CONSTANTS & CONFIGURATION
// ============================================
const STORAGE_KEY = 'mbat-selected-member';
// const API_URL = '...'; // uncomment for v1.1

// ============================================
// 2. DATA LOADING
// ============================================
// fetch('data.json') and parse

// ============================================
// 3. RENDERING
// ============================================
// Populate table cells and task rows from data

// ============================================
// 4. STATE MANAGEMENT
// ============================================
// Name selection, localStorage read/write

// ============================================
// 5. HIGHLIGHTING
// ============================================
// Toggle .highlighted class on matching elements

// ============================================
// 6. TODAY DETECTION
// ============================================
// Detect current day, apply .today class

// ============================================
// 7. INITIALIZATION
// ============================================
// DOMContentLoaded → load data → render → restore state → highlight → detect today
```

**`data.json` Schema:**

```json
{
  "familyMembers": [
    { "name": "אבא", "emoji": "👨" },
    { "name": "אמא", "emoji": "👩" }
  ],
  "fixedTasks": [
    { "task": "הכנסת מדיח", "emoji": "🍽️", "member": "אבא" }
  ],
  "weeklySchedule": {
    "days": ["ראשון", "שני", "שלישי", "רביעי", "חמישי"],
    "rotations": [
      {
        "label": "ארוחת צהריים",
        "assignments": ["מעיין", "ארז", "אלון", "סבתא", "חי"]
      }
    ]
  }
}
```

### Format Patterns

**JSON Field Naming:** camelCase throughout — `familyMembers`, `fixedTasks`, `weeklySchedule`. Matches JS consumption with no translation.

**Date/Day Handling:**
- `new Date().getDay()` returns 0 (Sunday) through 6 (Saturday)
- Map: 0=ראשון, 1=שני, 2=שלישי, 3=רביעי, 4=חמישי
- Days 5 (Friday) and 6 (Saturday): no today highlight — show full week equally
- Day index is the column index in the weekly table (0-based, left-to-right in RTL means rightmost column = Sunday)

### Communication Patterns

**DOM State Communication:**
All visual state is expressed through CSS classes toggled by JavaScript. No inline styles, no direct DOM property changes.

| State | CSS Class | Applied To | Toggled By |
|-------|-----------|-----------|------------|
| Name selected | `.selected` | The active name chip `<button>` | `handleNameClick()` |
| Personal duty | `.highlighted` | Task rows + table cells matching selected member | `highlightTasks()` |
| Current day | `.today` | Day header `<th>` + all `<td>` in today's column | `detectToday()` |

**Class Toggling Rules:**
- Use `element.classList.add()` / `.remove()` — never `element.className = ...`
- Clear all `.highlighted` before applying new highlights (clean slate on name switch)
- `.today` is applied once on page load and never changes during session
- `.selected` is exclusive — only one name chip has it at a time

### Process Patterns

**Error Handling:**

| Scenario | Behavior | Implementation |
|----------|----------|---------------|
| `data.json` fetch fails | Show inline Hebrew error message: "לא ניתן לטעון את הנתונים" | `catch` block in fetch, display error in main content area |
| localStorage unavailable | App works normally, no name persistence | `try/catch` around localStorage calls, fail silently |
| Invalid day (weekend) | No today column highlighted | Check `getDay()` result, skip highlighting if > 4 |
| v1.1: API unreachable | Schedule displays normally, flag buttons disabled | Graceful degradation, v1 features never break |

**No loading spinners.** The app is < 500KB static. If `data.json` fetch takes time, show content progressively (header + name selector render from HTML immediately, table content fills when data arrives).

**Initialization Sequence:**

```
DOMContentLoaded
  → fetch('data.json')
  → populate table cells from data
  → read localStorage for saved name
  → if saved name: select it, highlight duties
  → detect today, apply .today classes
  → name selector ready for interaction
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow camelCase for JS, kebab-case for CSS, camelCase for JSON keys
2. Use `data-member` attributes with Hebrew name strings for element-to-member binding
3. Express all visual state as CSS class toggles — never inline styles
4. Keep data in `data.json`, structure in `index.html`, styles in `style.css`, logic in `app.js`
5. Follow the `app.js` section order: constants → data loading → rendering → state → highlighting → today → init
6. Use CSS custom properties for all colors and spacing — never hardcode values
7. Handle errors gracefully — the schedule must always be visible regardless of failures

**Pattern Verification:**
- Before submitting code, verify: no hardcoded colors, no inline styles, no data in JS files
- Check that all interactive elements have `data-member` or `data-day` attributes
- Confirm CSS class names match the kebab-case convention
- Ensure `app.js` sections follow the documented order

## Project Structure & Boundaries

### Complete Project Directory Structure

```
mbat-start/
├── index.html              # Main app: semantic HTML structure, meta tags, links to CSS/JS
├── style.css               # All styling: design tokens, components, dark mode, responsive
├── app.js                  # All logic: data loading, rendering, state, highlighting, today
├── data.json               # Schedule data: family members, fixed tasks, weekly rotations
├── assets/
│   └── lion-logo.jpg       # שאגת האריה lion logo image
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation (optional)
```

**v1.1 additions (when backend is added):**

```
mbat-start/
├── index.html
├── style.css
├── app.js                  # + flag fetch/post logic added to existing sections
├── data.json
├── assets/
│   └── lion-logo.jpg
├── .gitignore
├── README.md
└── api/                    # Flask backend (deployed separately to PythonAnywhere)
    ├── app.py              # Flask app: flag endpoints (GET, POST, PATCH)
    ├── flags.json          # Simple JSON file storage for flags
    └── requirements.txt    # Flask dependency
```

### Architectural Boundaries

**Boundary 1: Data ↔ Presentation**

```
data.json  ──fetch()──→  app.js  ──classList──→  index.html + style.css
   (data)                (logic)                  (presentation)
```

- `data.json` is the **single source of truth** for all schedule content
- `app.js` reads data and populates HTML elements, never hardcodes names or tasks
- `style.css` styles based on CSS classes, never based on content
- **Boundary rule:** To change the schedule, edit only `data.json`. To change appearance, edit only `style.css`. To change behavior, edit only `app.js`.

**Boundary 2: Client ↔ Server (v1.1)**

```
index.html + app.js  ──fetch()──→  api/app.py  ──read/write──→  api/flags.json
   (GitHub Pages)                  (PythonAnywhere)
```

- Frontend and backend are **separately deployed** — different hosts, different repos (or same repo, different deploy targets)
- Frontend works fully without backend (graceful degradation)
- Backend is stateless per request — reads/writes to `flags.json`
- **Boundary rule:** All flag state lives server-side. All schedule state lives in `data.json` on the frontend.

**Boundary 3: Static HTML ↔ Dynamic Content**

- `index.html` defines the **skeleton** — all structural elements exist in the HTML
- `app.js` fills in **content** — table cell text, task row details from `data.json`
- `app.js` toggles **state** — `.selected`, `.highlighted`, `.today` classes
- **Boundary rule:** JS never creates structural elements (sections, tables, headers). JS only populates text content and toggles CSS classes.

### Requirements to Structure Mapping

**FR Category → File Mapping:**

| FR Category | Primary File | Supporting Files |
|------------|-------------|-----------------|
| **Branding (FR1–FR3)** | `index.html` (header markup), `style.css` (gradient, colors) | `assets/lion-logo.jpg` |
| **Member Selection (FR4–FR6)** | `index.html` (name chip buttons), `app.js` (click handler, localStorage) | `style.css` (.selected state) |
| **Fixed Tasks (FR7–FR9)** | `index.html` (task row structure), `data.json` (task data) | `app.js` (populate from data), `style.css` (.highlighted state) |
| **Weekly Schedule (FR10–FR14)** | `index.html` (table structure), `data.json` (rotation data) | `app.js` (populate cells), `style.css` (table styling, .today) |
| **Personal Highlighting (FR15–FR17)** | `app.js` (highlighting logic), `style.css` (.highlighted, .today CSS) | `index.html` (data-member attributes) |
| **Dark Mode (FR18–FR19)** | `style.css` (`@media prefers-color-scheme: dark`) | — |
| **RTL/Hebrew (FR20–FR23)** | `index.html` (`dir="rtl"`, `lang="he"`), `style.css` (logical properties) | — |
| **Admin Config (FR24–FR25)** | `data.json` (editable schedule) | GitHub Pages (redeploy on push) |
| **Flagging (FR26–FR30, v1.1)** | `app.js` (flag fetch/post), `api/app.py` (endpoints) | `api/flags.json`, `style.css` (flag badge styling) |

**Cross-Cutting Concerns → File Mapping:**

| Concern | Files Affected | Implementation |
|---------|---------------|----------------|
| **Theming** | `style.css` | CSS custom properties on `:root` + dark mode media query |
| **Highlighting** | `index.html` (data-member attrs), `app.js` (class toggling), `style.css` (.highlighted) | All three files must agree on data-member values |
| **Today awareness** | `app.js` (day detection), `style.css` (.today), `index.html` (data-day attrs) | Day index mapping must be consistent |
| **RTL** | `index.html` (dir attr), `style.css` (logical properties) | Set once, affects everything |

### Data Flow

**v1 Data Flow:**

```
1. Browser loads index.html
2. index.html links style.css (renders skeleton + design tokens)
3. index.html links app.js (executes on DOMContentLoaded)
4. app.js fetches data.json → populates table cells + task rows
5. app.js reads localStorage → auto-selects saved member name
6. app.js applies .highlighted to matching data-member elements
7. app.js detects today → applies .today to matching data-day elements
8. User taps name chip → app.js updates .selected, .highlighted, localStorage
```

**v1.1 Flag Flow (additive):**

```
1–7. Same as v1
8. app.js fetches GET /flags from Flask API → displays active flag badges
9. User taps flag button → quick menu → POST /flags to API
10. Responsible person taps resolve → PATCH /flags/:id to API
11. Flag badge removed from view
```

### Development Workflow

**Local Development:**
- Open `index.html` via `python3 -m http.server` or VS Code Live Server (needed for `fetch()` to work)
- Edit files → browser auto-refreshes (Live Server) or manual refresh
- Test on mobile via Chrome DevTools device mode

**Deployment (v1):**
- `git push` to `main` branch → GitHub Pages auto-deploys
- All files in root directory served as static assets
- No build step, no transformation

**Deployment (v1.1 backend):**
- Upload `api/` folder to PythonAnywhere
- Configure Flask web app pointing to `api/app.py`
- Update `API_URL` constant in `app.js` with PythonAnywhere URL
- Redeploy frontend to GitHub Pages

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** PASS

All technology choices are mutually compatible:
- Vanilla JS (ES6+) + CSS custom properties + `fetch()` API — all natively supported on target browsers (iOS Safari 15+, Android Chrome 90+) with zero polyfills
- localStorage API works on all target browsers without restriction
- GitHub Pages serves static files (HTML, CSS, JS, JSON, images) without configuration
- Flask on PythonAnywhere accepts CORS-configured `fetch()` requests from GitHub Pages origin
- No version conflicts possible — there are no dependencies to conflict

**Pattern Consistency:** PASS

- Naming conventions are internally consistent: camelCase (JS + JSON), kebab-case (CSS), Hebrew strings (data attributes)
- File responsibility boundaries are clear and non-overlapping
- `app.js` section order aligns with the initialization sequence
- CSS class toggling is the single mechanism for all visual state changes
- `data-member` attribute convention is used consistently across highlighting and event handling

**Structure Alignment:** PASS

- File structure directly supports the data/presentation/logic separation boundary
- `data.json` as external file enables admin editing without touching code
- `assets/` directory isolates the single binary asset (logo)
- v1.1 `api/` directory is additive — doesn't reorganize existing files

### Requirements Coverage Validation

**Functional Requirements Coverage:**

| FR Range | Category | Architectural Support | Status |
|----------|----------|----------------------|--------|
| FR1–FR3 | Branding | `index.html` header + `style.css` gradient + `assets/lion-logo.jpg` | Covered |
| FR4–FR6 | Member Selection | `index.html` name chips + `app.js` click handler + localStorage | Covered |
| FR7–FR9 | Fixed Tasks | `index.html` task rows + `data.json` task data + `app.js` rendering | Covered |
| FR10–FR14 | Weekly Schedule | `index.html` table + `data.json` rotations + `app.js` cell population | Covered |
| FR15–FR17 | Highlighting | `app.js` class toggling + `style.css` .highlighted/.today + data-member attrs | Covered |
| FR18–FR19 | Dark Mode | `style.css` @media prefers-color-scheme + CSS custom properties | Covered |
| FR20–FR23 | RTL/Hebrew | `index.html` dir="rtl" lang="he" + `style.css` logical properties | Covered |
| FR24–FR25 | Admin Config | `data.json` editable file + GitHub Pages redeploy | Covered |
| FR26–FR30 | Flagging (v1.1) | `app.js` fetch + `api/app.py` REST endpoints + `api/flags.json` | Covered |

**All 30 FRs have explicit architectural support. No gaps.**

**Non-Functional Requirements Coverage:**

| NFR | Requirement | Architectural Support | Status |
|-----|-----------|----------------------|--------|
| NFR1 | < 2s first load on 4G | Single HTML + CSS + JS + JSON, < 500KB total, no framework overhead | Covered |
| NFR2 | < 1s cached load | Browser caches static files natively | Covered |
| NFR3 | < 500KB total | No dependencies, single logo image is heaviest asset | Covered |
| NFR4 | < 100ms interaction | CSS class toggling is sub-millisecond, no server calls | Covered |
| NFR5–NFR6 | Browser compatibility | All APIs used (fetch, localStorage, CSS custom properties, classList) supported on targets | Covered |
| NFR7 | No framework dependency | Vanilla HTML/CSS/JS architecture | Covered |
| NFR8 | Dark mode renders correctly | CSS custom properties swap via media query | Covered |
| NFR9 | Human-readable config | `data.json` with clear camelCase keys | Covered |
| NFR10 | Non-technical admin editing | JSON structure with Hebrew names, documented schema | Covered |
| NFR11 | `git push` deployment | GitHub Pages auto-deploys from main branch | Covered |
| NFR12 | Static site, no server (v1) | No server-side code in v1 architecture | Covered |
| NFR13 | Flask on PythonAnywhere (v1.1) | `api/` directory with Flask app, separately deployed | Covered |
| NFR14 | 24/7 availability | GitHub Pages static hosting, no maintenance windows | Covered |

**All 14 NFRs have explicit architectural support. No gaps.**

### Implementation Readiness Validation

**Decision Completeness:** PASS
- All critical decisions documented with clear rationale
- No technology version conflicts (zero external dependencies)
- Implementation patterns cover all code, CSS, and data conventions

**Structure Completeness:** PASS
- Every file has a defined purpose and responsibility boundary
- Directory structure is complete for both v1 and v1.1
- All FR categories mapped to specific files

**Pattern Completeness:** PASS
- Naming conventions cover JS, CSS, HTML attributes, and JSON
- `app.js` section order provides clear organizational structure
- Error handling patterns cover all failure scenarios
- Class toggling rules prevent state management conflicts

### Gap Analysis Results

**Critical Gaps:** None found.

**Important Gaps (non-blocking):**

1. **`data.json` complete schema not yet authored** — The architecture defines the schema structure, but the actual data file with all 8 family members, 7 fixed tasks, and 4 rotation tables needs to be created during implementation. The schema is documented; the data population is an implementation task.

2. **Lion logo image format not confirmed** — Architecture references `lion-logo.jpg` but the actual source images from the product brief are `PHOTO-2026-02-28-22-41-07.jpg` and `IMG_6949 copy.JPG`. The correct image needs to be selected and potentially optimized during implementation.

**Nice-to-Have Gaps:**

1. **Favicon** — Not mentioned in PRD or architecture. Could use a cropped lion logo as favicon for a polished feel.
2. **PWA manifest** — Not required, but adding to home screen with a custom icon would improve the "app-like" feel for family members.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low)
- [x] Technical constraints identified (8 constraints documented)
- [x] Cross-cutting concerns mapped (6 concerns identified)

**Architectural Decisions**

- [x] Critical decisions documented (data loading, DOM rendering, file structure)
- [x] Technology stack fully specified (vanilla HTML/CSS/JS, no dependencies)
- [x] Integration patterns defined (fetch for data, classList for state, localStorage for persistence)
- [x] Performance considerations addressed (< 500KB, < 2s, no framework overhead)

**Implementation Patterns**

- [x] Naming conventions established (camelCase JS/JSON, kebab-case CSS, Hebrew data attrs)
- [x] Structure patterns defined (file responsibilities, app.js section order)
- [x] Communication patterns specified (CSS class toggling, data attributes)
- [x] Process patterns documented (error handling, initialization sequence)

**Project Structure**

- [x] Complete directory structure defined (v1 + v1.1)
- [x] Component boundaries established (data/presentation/logic)
- [x] Integration points mapped (data.json → app.js → HTML/CSS)
- [x] Requirements to structure mapping complete (all 30 FRs → specific files)

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — This is a low-complexity project with a well-defined scope, zero external dependencies, and clear architectural boundaries. The simplicity of the stack eliminates entire categories of potential issues (dependency conflicts, build failures, version mismatches).

**Key Strengths:**
- Zero dependencies = zero dependency management
- Clear file responsibility boundaries prevent code placement ambiguity
- Data/presentation separation enables admin schedule editing
- v1.1 upgrade path is purely additive — no refactoring required
- All naming conventions and patterns are concrete with examples

**Areas for Future Enhancement:**
- Complete `data.json` with actual family schedule data (implementation task)
- Select and optimize lion logo image (implementation task)
- Consider favicon and PWA manifest for polish (optional)
- v1.1 Flask API detailed design when that phase begins

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all files
- Respect file responsibility boundaries — data in `data.json`, styles in `style.css`, logic in `app.js`
- Refer to this document for all architectural questions
- When in doubt, check the Enforcement Guidelines section

**First Implementation Priority:**
1. Create file structure: `index.html`, `style.css`, `app.js`, `data.json`, `assets/`
2. Populate `data.json` with complete family schedule data
3. Build `index.html` semantic structure with all `data-member` and `data-day` attributes
4. Implement `style.css` design tokens (from UX spec color system) + dark mode + component styles
5. Implement `app.js` following the documented section order
