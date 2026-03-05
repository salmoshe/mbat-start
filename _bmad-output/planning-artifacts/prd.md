---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain-skipped, step-06-innovation-skipped, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
inputDocuments:
  - product-brief-mbat-start-2026-03-04.md
  - PHOTO-2026-02-28-22-41-07.jpg
  - IMG_6949 copy.JPG
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - mbat-start

**Author:** Mosh.s
**Date:** 2026-03-04

## Executive Summary

**mbat-start** is a mobile-first, Hebrew-language family chore web app that digitizes the "שאגת הארי" household duty chart into a personalized, interactive experience. Built for a single family of 9 members (ages 12–120) during the שאגת אריה national period, it replaces a paper chart with a zero-friction web interface where each member selects their name to see their specific duties highlighted across fixed tasks and a weekly Sun–Thu rotation schedule.

The app serves a dual purpose: a practical family coordination tool and a showcase of AI-assisted rapid web development. It requires no accounts, no installation, and no backend for the MVP — just a URL shared via WhatsApp. v1 deploys as a static site on GitHub Pages; v1.1 adds peer-to-peer issue flagging via a lightweight PythonAnywhere Flask API.

### What Makes This Special

- **Ownership over compliance.** Each family member sees a personal view of *their* duties — not a generic board. This transforms chores from imposed obligations into owned responsibilities.
- **Emotionally anchored.** The שאגת האריה lion logo and national identity elevate mundane tasks into meaningful family contribution during a significant period.
- **Zero friction by design.** No login, no app install, no onboarding flow. Pick your name, see your duties. 3 seconds to value.
- **Born from reality.** The data model comes from an actual paper chart already in use — validated by the family before a line of code is written. The flagging feature was proposed by one of the kids (Erez), confirming genuine user demand.
- **Dark mode.** Automatic via device preference — essential for an app checked morning and night across all ages.

## Project Classification

| Attribute | Value |
|-----------|-------|
| **Project Type** | Web App (static SPA, mobile-first, GitHub Pages) |
| **Domain** | General — family/household utility |
| **Complexity** | Low — single family, no auth, no regulated data, static schedule |
| **Project Context** | Greenfield — new product, no existing codebase |
| **Tech Stack (MVP)** | HTML/CSS/JS, localStorage, static hosting |
| **Tech Stack (v1.1)** | + Flask API on PythonAnywhere for shared flag state |

## Success Criteria

### User Success

| Criteria | Metric | Target |
|----------|--------|--------|
| **Full family adoption** | Unique family members who opened the app | 8/8 within week 1 |
| **Repeat engagement** | Each member returns unprompted | At least twice per person in week 1 |
| **Organic reference** | App mentioned in family conversation without prompting | At least once in first 2 weeks |
| **Self-serve accountability** | A family member flags an issue without being asked (v1.1) | At least one flag in first week of v1.1 |
| **Nagging reduction** | Parents don't need to remind kids of duties | At least one full nag-free week |

### Business Success

| Criteria | Metric | Target |
|----------|--------|--------|
| **Professional quality** | External observers believe a professional team built it | Positive reactions when shown to colleagues/friends |
| **Rapid delivery** | Time from concept to deployed v1 | Completed in minimal sessions |
| **Practical utility** | Family uses app as daily duty reference | Active use throughout שאגת אריה period |

### Technical Success

| Criteria | Metric | Target |
|----------|--------|--------|
| **Loads correctly** | Page renders properly on all family phones | Works on iOS Safari + Android Chrome |
| **Looks right** | RTL layout, dark mode, logo, tables all display correctly | No visual bugs on mobile |
| **Instant access** | No install, no login friction | URL → name select → personal view in under 5 seconds |
| **Remembers user** | localStorage persists last selected name | User sees their view on return |

### Measurable Outcomes

- **Week 1:** 8/8 family members opened the app, each at least twice
- **Week 2:** Someone mentions the app organically at dinner
- **v1.1 Week 1:** At least one issue flag raised without prompting
- **Ongoing:** Paper chart becomes secondary reference; app is primary

## Product Scope & Phased Development

### MVP Strategy

**Approach:** Experience MVP — deliver a polished, emotionally resonant family duty board that replaces the paper chart. The product is validated by existing paper chart usage. Focus on execution quality over feature breadth.

**Resource:** Single developer (AI-assisted). No team, no infrastructure, no ongoing costs for v1.

### Phase 1 — MVP (v1, GitHub Pages)

1. שאגת האריה branding — lion logo header, blue-and-white palette, family motto
2. Dark mode — automatic via `prefers-color-scheme`
3. Family member selector — pick name, remembered via localStorage
4. Fixed tasks display — 7 responsibilities with owner + emoji icons
5. Weekly schedule (Sun–Thu) — 4 rotation tables (lunch, dinner, dinner helper, tidying+table)
6. Personal highlighting — selected member's tasks visually emphasized
7. Today awareness — current day column highlighted
8. Hebrew RTL — fully right-to-left interface
9. Mobile-first responsive — phone-optimized, works on desktop
10. Static deployment — GitHub Pages, schedule data in config/JSON

**Supports Journeys:** 1 (Erez daily check), 2 (Vered dinner helper), 3 (Mosh admin update), 5 (Grandma check-in)

### Phase 2 — v1.1 (PythonAnywhere Backend)

- Issue flagging: any member flags an issue → responsible person sees visual indicator
- Flask API on PythonAnywhere for shared flag state
- Flag resolution (mark as handled)
- In-app schedule editing for admins (Mosh.s, Ma'ayan)

**Supports Journey:** 4 (Erez flagging)

### Phase 3 — v1.2+ (Future)

- WhatsApp notification integration for flags
- Weekly family summary / engagement view
- Seasonal task rotation support

### Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Family doesn't adopt** | Low (paper chart already works) | High | Share via WhatsApp with enthusiasm, make first experience delightful |
| **Looks unprofessional** | Low (focused design effort) | Medium | Test on actual phones before sharing, prioritize polish |
| **Schedule changes mid-week** | Medium | Low | Admin can edit config and redeploy in minutes |
| **GitHub Pages downtime** | Very low | Low | Static hosting is highly reliable |

## User Journeys

### Journey 1: ארז (Erez) — The Daily Duty Check (Primary User, Happy Path)

**Opening Scene:** It's Monday evening. Erez, 14, is on his phone after school. He remembers something about dinner duty but can't recall if it's today. The paper chart is downstairs in the kitchen and he's in his room.

**Rising Action:** He taps the app link saved on his home screen. The app opens instantly — it already remembers he's ארז. He sees the full weekly schedule with Monday's column highlighted in blue. His name glows wherever he has a duty. He checks — Monday lunch is ארז. Monday tidying is אלון, not him.

**Climax:** He scrolls to the fixed tasks section — his dishwasher unloading icon is there, a daily reminder. He handles it before anyone asks.

**Resolution:** At dinner, אמא doesn't need to remind anyone. ארז handled his duties by checking the app himself. No nagging, no arguments.

**Reveals:** Personal view highlighting, today awareness, localStorage memory, mobile-first quick access. Full schedule visible with personal emphasis (Option A).

---

### Journey 2: אמא ורד (Mom Vered) — Who's Helping Tonight? (Primary User, Specific Need)

**Opening Scene:** It's Wednesday afternoon. Vered is planning dinner and needs to know who's her helper tonight. She's at the kitchen counter with her phone.

**Rising Action:** She opens the app and selects her name. The full schedule is visible — her name is highlighted everywhere she appears. She scans the "עוזר לאמא" row and sees **ארז** for Wednesday.

**Climax:** She sends a quick WhatsApp to ארז: "You're my dinner helper tonight, be home by 6." No searching the paper chart, no remembering the rotation from memory.

**Resolution:** Erez shows up on time. Dinner is ready together. The app gave Vered the answer in 3 seconds.

**Reveals:** Full board visibility lets her see other people's duties too, role-specific highlighting, quick glance value, integrates naturally with WhatsApp family communication.

---

### Journey 3: אבא מוש (Dad Mosh) — Schedule Update (Admin Journey)

**Opening Scene:** It's Sunday morning. Mosh realizes that this week סבתא can't come Thursday for lunch — she's visiting relatives. He needs to update the schedule.

**Rising Action:** He opens the project repository on his laptop, navigates to the config/JSON file, finds the Thursday lunch entry, and changes it from "סבתא" to "מעיין" for this week.

**Climax:** He commits and pushes to GitHub Pages. The site updates within a minute. He sends a message to the family WhatsApp: "Updated — מעיין is covering Thursday lunch this week."

**Resolution:** The family sees the updated schedule next time they open the app. No crossed-out paper chart entries, no confusion.

**Reveals:** Config-file-based admin workflow, GitHub Pages deployment, WhatsApp as notification channel (external to app).

---

### Journey 4: ארז — Flagging an Issue (v1.1, Peer Accountability)

**Opening Scene:** It's Tuesday afternoon. Erez walks into the kitchen and the trash is overflowing. Alon (trash duty) hasn't dealt with it.

**Rising Action:** Erez opens the app, sees the fixed tasks section. Next to "פחים — אלון" he taps the flag button and selects "הזבל מלא" from a quick menu.

**Climax:** Alon opens the app later and sees a red flag on his trash task: "הזבל מלא — flagged by ארז." It's visible, specific, and peer-to-peer — not a parent nagging.

**Resolution:** Alon takes out the trash and marks the flag as resolved. No argument, no parent involvement. The system handled accountability between the kids themselves.

**Reveals:** Issue flagging flow, peer-to-peer accountability, flag visibility on responsible person's view, flag resolution.

---

### Journey 5: סבתא (Grandma) — The Occasional Check-in (Secondary User)

**Opening Scene:** It's Wednesday evening. Grandma wants to confirm she's cooking Thursday lunch as usual.

**Rising Action:** She opens the link from WhatsApp. She picks "סבתא" from the name list. The full schedule appears with her name highlighted — Thursday lunch shows her name.

**Climax:** Confirmed in 10 seconds. She knows what to prepare for tomorrow.

**Resolution:** Quick in-and-out. The app served its purpose for a light user without any complexity.

**Reveals:** Simplicity for occasional users, name selector works for all ages, minimal interaction needed, full board visible even for secondary users.

---

### Journey Requirements Summary

| Journey | Key Capabilities Revealed |
|---------|--------------------------|
| **Erez — Daily Check** | Personal highlighting, today column, localStorage, mobile-first, fast load |
| **Vered — Dinner Helper** | Full board visibility, role-specific highlighting, quick glance value |
| **Mosh — Admin Update** | Config file editing, GitHub Pages deployment, external WhatsApp notification |
| **Erez — Flagging (v1.1)** | Flag creation UI, flag visibility, peer-to-peer notification, flag resolution |
| **Grandma — Check-in** | Simple name selector, minimal interaction, accessible for all ages |

**UX Decision:** Full schedule is always visible to all users (Option A). Selected user's tasks are visually emphasized. This matches the paper chart mental model and enables cross-member awareness needed for flagging and coordination.

## Web App Specific Requirements

### Project-Type Overview

Single-page application (SPA) serving a static family duty board. No routing, no server-side rendering, no build pipeline needed for MVP. One HTML file with embedded or linked CSS/JS, deployed to GitHub Pages. Data lives in a JSON config embedded or loaded at runtime.

### Technical Architecture Considerations

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **Architecture** | SPA — single HTML file | One page, no navigation needed |
| **Rendering** | Client-side only | Static hosting, no SSR needed |
| **Data source** | Embedded JSON or loaded config file | Schedule is static, editable by admin via file |
| **State management** | localStorage for user selection | No shared state in v1 |
| **Build pipeline** | None for MVP | Plain HTML/CSS/JS, no bundler needed |
| **Deployment** | GitHub Pages | Free, fast, auto-deploys on push |

### Browser & Device Support

| Browser | Priority | Notes |
|---------|----------|-------|
| **iOS Safari** | Primary | Family phones |
| **Android Chrome** | Primary | Family phones |
| **Desktop Chrome** | Secondary | For admin/general use |
| **Desktop Safari** | Secondary | Mac users |
| **Firefox** | Best effort | Standard web APIs, should work |

### Responsive Design

- **Mobile-first** — designed for 375px+ phone screens as primary viewport
- **Desktop** — fluid layout that works on larger screens, no separate desktop design needed
- **RTL layout** — `dir="rtl"` on root element, CSS logical properties where possible
- **No breakpoint complexity** — single responsive layout that scales, not separate mobile/desktop views

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **First load** | < 2 seconds on 4G | Single file, minimal assets |
| **Subsequent loads** | < 1 second | Browser cache, localStorage |
| **Total page weight** | < 500KB | Logo image is the heaviest asset |
| **JavaScript** | Vanilla JS, no framework | Zero dependency, instant parse |

### SEO Strategy

Not applicable — private family app, shared via direct URL in WhatsApp. No indexing needed. `<meta name="robots" content="noindex">` to prevent accidental indexing.

### Accessibility

- Standard readable mobile typography (16px+ base font)
- Sufficient color contrast in both light and dark modes
- Dark mode via `prefers-color-scheme` media query
- Semantic HTML elements for screen reader compatibility
- Touch-friendly tap targets (48px+ for interactive elements)
- No special accommodation beyond good default design practices

### Implementation Considerations

- **Single-file option:** Entire app can be one `index.html` with inline CSS/JS for simplest deployment
- **Asset handling:** Lion logo image as the only external asset (or base64 inline)
- **Hebrew font:** System fonts (no custom web fonts needed — iOS/Android have Hebrew support built in)
- **No framework:** Vanilla HTML/CSS/JS keeps it fast, simple, and dependency-free
- **v1.1 upgrade path:** When adding Flask API for flags, the SPA adds `fetch()` calls — no architectural change needed

## Functional Requirements

### Branding & Identity

- **FR1:** The app displays the שאגת האריה lion logo as a header element
- **FR2:** The app displays the family motto "בואו נשאג ביחד על המשימות! כל אחד תורם"
- **FR3:** The app uses a blue-and-white color palette derived from the שאגת האריה logo

### Family Member Selection

- **FR4:** Any user can select their name from a list of all family members (אבא, אמא, מעיין, חי, ארז, אלון, עדי, סבתא)
- **FR5:** The app remembers the user's last selected name between sessions
- **FR6:** Any user can switch to a different family member's view at any time

### Fixed Tasks Display

- **FR7:** The app displays all fixed daily responsibilities with their assigned owner
- **FR8:** Each fixed task displays an associated emoji icon and the owner's emoji identifier
- **FR9:** The app displays the following fixed tasks: הכנסת מדיח (אבא), פריקת מדיח (ארז), פחים (אלון), כביסות (מעיין), סידורים + נסיעות (חי), הווי ובידור (עדי), נקיונות לפסח (אמא + סבתא)

### Weekly Schedule Display

- **FR10:** The app displays a weekly schedule covering Sunday through Thursday
- **FR11:** The app displays a lunch rotation table (ארוחת צהריים) with assigned members per day
- **FR12:** The app displays a dinner table (ארוחת ערב) showing אמא as the cook every night
- **FR13:** The app displays a dinner helper rotation table (עוזר לאמא בארוחת ערב) with assigned members per day
- **FR14:** The app displays a tidying + table setting rotation table (סדר קומת כניסה + אמבטיות + עריכת שולחן) with assigned members per day

### Personal Highlighting

- **FR15:** When a family member is selected, all their tasks across fixed tasks and weekly schedule are visually emphasized
- **FR16:** Non-selected members' tasks remain visible but visually de-emphasized
- **FR17:** The app highlights the current day's column in the weekly schedule

### Dark Mode

- **FR18:** The app automatically adapts to the user's device light/dark mode preference
- **FR19:** The app is fully readable and visually correct in both light and dark modes

### Localization & Layout

- **FR20:** The app displays all content in Hebrew
- **FR21:** The app renders in right-to-left (RTL) layout
- **FR22:** The app is usable on mobile phone screens (375px+ width)
- **FR23:** The app is usable on desktop screens

### Data Management (Admin)

- **FR24:** An admin can update the schedule data by editing a configuration file
- **FR25:** Schedule changes are reflected in the app after redeployment

### Issue Flagging (v1.1)

- **FR26:** Any family member can flag an issue on any fixed task (e.g., "הזבל מלא") — flagging applies to fixed daily responsibilities only, not weekly rotation duties
- **FR27:** A flagged task displays a visual indicator visible to all users
- **FR28:** The flag shows who reported it and a brief description
- **FR29:** The responsible person can mark a flag as resolved
- **FR30:** Resolved flags are no longer displayed as active

## Non-Functional Requirements

### Performance

- **NFR1:** Initial page load completes in under 2 seconds on a 4G mobile connection
- **NFR2:** Subsequent page loads (cached) complete in under 1 second
- **NFR3:** Total page weight does not exceed 500KB (including logo asset)
- **NFR4:** Name selection and highlighting respond instantly (< 100ms, no server call)

### Compatibility

- **NFR5:** The app renders correctly on iOS Safari 15+ and Android Chrome 90+
- **NFR6:** The app renders correctly on desktop Chrome and Safari (latest versions)
- **NFR7:** The app functions without JavaScript frameworks or external dependencies
- **NFR8:** Dark mode renders correctly when device preference is set to dark

### Maintainability

- **NFR9:** Schedule data is stored in a single, human-readable configuration structure (JSON or equivalent)
- **NFR10:** A non-technical admin can understand and edit the schedule data with minimal guidance
- **NFR11:** Deployment requires only a `git push` to GitHub Pages

### Hosting & Availability

- **NFR12:** v1 runs entirely as a static site with no server-side processing
- **NFR13:** v1.1 backend (Flask API) runs on PythonAnywhere free/basic tier
- **NFR14:** The app is available 24/7 with no maintenance windows required (static hosting)
