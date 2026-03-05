# Story 1.4: GitHub Pages Deployment

Status: ready-for-dev

## Story

As a family member,
I want to access the duty board via a URL shared in WhatsApp,
so that I can check my duties from my phone without installing anything.

## Acceptance Criteria

1. **AC1: Repository complete** — The GitHub repository contains all project files: index.html, style.css, app.js, data.json, assets/lion-logo.jpg, .gitignore

2. **AC2: GitHub Pages live** — GitHub Pages is configured to deploy from the main branch. The app is accessible at the GitHub Pages URL (username.github.io/mbat-start).

3. **AC3: iOS Safari rendering** — The app renders correctly on iOS Safari 15+: RTL layout, lion logo header, fixed tasks, weekly schedule table, dark mode (if enabled). No visual bugs or layout issues.

4. **AC4: Android Chrome rendering** — The app renders correctly on Android Chrome 90+ with the same visual quality as iOS Safari.

5. **AC5: Page weight and performance** — Total page weight (HTML + CSS + JS + JSON + logo image) is under 500KB. First load completes in under 2 seconds on a 4G connection.

## Tasks / Subtasks

- [ ] Task 1: Verify repository completeness (AC: 1)
  - [ ] 1.1: Run `git status` to confirm clean working tree (no uncommitted changes)
  - [ ] 1.2: Verify all required files exist in the repo: index.html, style.css, app.js, data.json, assets/lion-logo.jpg, .gitignore
  - [ ] 1.3: Verify no sensitive files are tracked (.env, credentials, etc.)
  - [ ] 1.4: Verify .gitignore covers: .DS_Store, node_modules/, .env, *.log, .vscode/, Thumbs.db

- [ ] Task 2: Create GitHub repository and push (AC: 1, 2)
  - [ ] 2.1: Create GitHub repository named `mbat-start` using `gh repo create`
  - [ ] 2.2: Add remote origin to local git repo
  - [ ] 2.3: Push all commits to main branch
  - [ ] 2.4: Verify push succeeded with `git log --oneline origin/main`

- [ ] Task 3: Configure GitHub Pages (AC: 2)
  - [ ] 3.1: Enable GitHub Pages via `gh api` — set source to main branch, root directory
  - [ ] 3.2: Wait for deployment to complete (check with `gh api`)
  - [ ] 3.3: Retrieve the live URL and verify it returns HTTP 200
  - [ ] 3.4: Verify the page content loads correctly (fetch the URL and check for key content)

- [ ] Task 4: Page weight verification (AC: 5)
  - [ ] 4.1: Measure total size of all project files: index.html + style.css + app.js + data.json + assets/lion-logo.jpg
  - [ ] 4.2: Verify total is under 500KB
  - [ ] 4.3: Report individual file sizes for transparency

- [ ] Task 5: Tests (AC: 1, 5)
  - [ ] 5.1: Test all required files exist in repository
  - [ ] 5.2: Test no sensitive files are tracked
  - [ ] 5.3: Test total page weight under 500KB
  - [ ] 5.4: Test individual file sizes are reasonable

## Dev Notes

- **No build step**: This is a vanilla HTML/CSS/JS project. GitHub Pages serves static files directly from the repo root. No build pipeline, no bundler, no CI/CD needed.
- **gh CLI**: Use `gh` (GitHub CLI) for all GitHub operations — repo creation, Pages configuration, deployment checks. This avoids manual UI steps.
- **Branch name**: The repo uses `master` or `main` — check with `git branch` before configuring Pages.
- **Deployment delay**: GitHub Pages deployments take 1-3 minutes. Poll the deployment status rather than assuming immediate availability.
- **Cross-browser testing**: AC3 and AC4 (iOS Safari, Android Chrome) cannot be automated in this environment. The dev agent should note these as manual verification items. The app uses only standard CSS and JS — no browser-specific APIs or prefixes that would cause issues.
- **robots noindex**: The meta tag `<meta name="robots" content="noindex">` is already in index.html to prevent search engine indexing (this is a private family app).

### Project Structure Notes

- No new files to create — this story is about deployment, not code
- The _bmad-output/ folder should NOT be deployed (it's in .gitignore? check this)
- The tests/ folder is development-only, not part of the deployed app (GitHub Pages serves everything in repo root, so tests/ will be accessible but harmless)

### Previous Story Intelligence

- **From Story 1.3**: All app code is complete — header, fixed tasks, weekly schedule table all rendering correctly
- **CSS specificity lesson**: Use `.schedule-table .rotation-label` not just `.rotation-label` to override parent selectors
- **Current file inventory**: index.html, style.css, app.js, data.json, assets/lion-logo.jpg, .gitignore, tests/*.test.js, _bmad-output/
- **3 commits in local repo**: No remote configured yet

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4: GitHub Pages Deployment]
- [Source: _bmad-output/planning-artifacts/architecture.md#Hosting & Availability]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
