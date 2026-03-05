---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - PHOTO-2026-02-28-22-41-07.jpg
  - IMG_6949 copy.JPG
date: 2026-03-04
author: Mosh.s
---

# Product Brief: mbat-start

## Executive Summary

**mbat-start** ("שאגת הארי") is a mobile-friendly family chore web app born from a real household need during the "שאגת אריה" national period. It digitizes an existing paper-based family duty chart into an engaging, accessible web experience that helps each family member see and own their responsibilities. The project also serves as a demonstration of AI-assisted rapid web application development. Designed for a single family (8 members + grandma, ages 12-120), it prioritizes simplicity, engagement, emotional connection, and gentle accountability over complex task management.

---

## Core Vision

### Problem Statement

A paper chore chart hanging on the wall is easy to ignore, hard to interact with, and offers no way for family members to hold each other accountable. During the "שאגת אריה" period, the family needs a clear, reliable system to manage increased household duties — one that's always in everyone's pocket.

### Problem Impact

Without an accessible, engaging system, chores get forgotten, responsibilities feel uneven, and parents resort to nagging. The paper chart requires physical proximity and offers no interactivity — no way to flag issues, no personalized view, no sense of digital ownership for a generation that lives on their phones.

### Why Existing Solutions Fall Short

Off-the-shelf family chore apps (OurHome, Cozi, etc.) are generic, require account creation, and come with unnecessary complexity. This family needs something tailored to their exact structure — their names, their schedule, their culture, their language (Hebrew), and the meaningful context of "שאגת אריה" — not a one-size-fits-all tool.

### Proposed Solution

A lightweight, mobile-first Hebrew web app delivered in two phases:

**v1 — Static MVP (GitHub Pages):**
- Displays the family's fixed daily tasks and weekly Sun-Thu rotation schedule
- Personal view: select your name to see your duties highlighted
- Remembers last selected member (localStorage)
- Features the official שאגת האריה lion logo as the emotional anchor
- Blue-and-white color palette derived from the logo
- Dark mode support (respects device preference)
- Carries the family motto: "בואו נשאג ביחד על המשימות! כל אחד תורם"

**v1.1 — Interactive Features (PythonAnywhere backend):**
- Issue flagging: any family member can report an issue (e.g., "הזבל מלא", "השירותים צריכים ניקוי") that visually flags the responsible person's task
- Lightweight Flask API for shared flag state

### Key Differentiators

- **Hyper-personalized**: Built for one specific family, not a generic template
- **Zero friction**: No login, no accounts — just pick your name and go
- **Emotionally anchored**: The שאגת האריה logo and identity connect daily chores to a national moment of family duty
- **Culturally authentic**: Hebrew-first, RTL, reflects the family's warmth and identity
- **AI development showcase**: Demonstrates rapid, high-quality web app creation with AI assistance
- **Lightweight deployment**: Static hosting for MVP, minimal backend only when needed
- **Dark mode**: Respects device preference for comfortable use at any hour

## Target Users

### The Shaagat HaAri Household

- **אבא מוש (Dad Mosh)** + **אמא ורד (Mom Vered)** — the parents
- **מעיין (Ma'ayan)** + **חי (Chai)** — adult daughter + spouse
- **ארז (Erez)**, **אלון (Alon)** — kids
- **עדי (Adi)** — entertainment & morale
- **סבתא (Grandma)** — Thursday lunch + Passover cleaning

### Primary Users

**1. אבא מוש (Dad Mosh / Mosh.s) — Family Organizer & Admin**
- **Role:** Father, app admin, schedule creator
- **Motivation:** Keep the household running smoothly during שאגת אריה without constant nagging
- **Primary need:** Full overview of all duties, ability to update the schedule
- **App interaction:** Manages schedule, checks the big picture, flags issues when needed
- **Success moment:** A week goes by where chores happen without reminders

**2. אמא ורד (Mom Vered) — The Dinner Anchor**
- **Role:** Mother, cooks dinner every night, Passover cleaning lead
- **Motivation:** Family coordination, knowing who's helping her each evening
- **Primary need:** See who's her dinner helper tonight at a glance
- **App interaction:** Checks daily helper rotation, may flag if help is needed

**3. מעיין (Ma'ayan) — Co-Admin & Duty Owner**
- **Role:** Adult daughter, Chai's spouse, laundry owner, app co-admin
- **Motivation:** Share the management load with Dad, own her tasks
- **Primary need:** Admin access to update schedule + personal duty view
- **App interaction:** Updates schedule when needed, checks personal tasks, flags issues

**4. חי (Chai) — The Logistics Person**
- **Role:** Ma'ayan's spouse, errands + rides owner
- **Motivation:** Stay in sync with the family system, contribute reliably
- **Primary need:** Know what's expected today — errands, rides, dinner helper duty
- **App interaction:** Checks personal view, flags issues from outside the house

**5. ארז (Erez) — The Engaged Kid**
- **Role:** Kid, dishwasher unloader, the one who came up with the flagging idea
- **Motivation:** Know his duties, hold others accountable too
- **Primary need:** "What's mine today?" + ability to flag others
- **App interaction:** Daily check, active flagger — the power user among the kids

**6. אלון (Alon) — The Steady Contributor**
- **Role:** Kid, trash duty owner
- **Motivation:** Clear expectations, do his part
- **Primary need:** Quick view of today's tasks
- **App interaction:** Checks daily duties, responds to flags

**7. עדי (Adi) — The Morale Booster**
- **Role:** Family member, entertainment & morale (הווי ובידור)
- **Motivation:** Keep family spirits high during שאגת אריה
- **Primary need:** See her role in the family system
- **App interaction:** Light usage, checks her responsibilities

### Secondary Users

**8. סבתא (Grandma) — The Thursday Regular**
- **Role:** Grandmother, cooks Thursday lunch, helps with Passover cleaning
- **Motivation:** Know when she's expected
- **Primary need:** Minimal — Thursday lunch confirmation
- **App interaction:** Occasional check-in. Comfortable with smartphones.

### User Journey

1. **Discovery:** אבא מוש shares the app URL in the family WhatsApp group
2. **Onboarding:** Each person opens the link, picks their name — instant personalized view. No signup, no password. 3 seconds.
3. **Core usage:** Daily check — "what's my task today?" Glance at personal duties, check for flags
4. **Flagging (v1.1):** ארז notices the trash is full → flags "הזבל מלא" → אלון sees a flag on his task
5. **Admin:** אבא מוש or מעיין update the schedule when rotations change
6. **Success moment:** The family goes a full week where duties happen without nagging, and flags get resolved without arguments
7. **Long-term:** The app becomes the family's daily reference — the paper chart stays on the wall as a keepsake

## Success Metrics

### User Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Family adoption** | All 8+ family members open the app at least twice in the first week | Share link in WhatsApp, observe who mentions it |
| **Organic engagement** | Someone mentions the app at dinner unprompted | Family conversation — the best signal |
| **Active accountability** | ארז (or anyone) flags an issue without being asked | Flag usage in v1.1 |
| **Zero-nagging weeks** | At least one full week where chores happen without parental reminders | Parent gut feel — the ultimate KPI |

### Business Objectives

This is a personal family project, not a commercial product. "Business" objectives are:

| Objective | Success Criteria |
|-----------|-----------------|
| **AI development showcase** | Looks professional and polished enough that people don't believe AI made it |
| **Rapid delivery** | From concept to deployed app in minimal time |
| **Family utility** | Serves the family well throughout the שאגת אריה period |

### Key Performance Indicators

| KPI | Target | Timeframe |
|-----|--------|-----------|
| Family member reach | 8/8 members opened the app | Week 1 |
| Repeat usage | Each member returns at least twice | Week 1 |
| Conversation impact | App mentioned in family context organically | First 2 weeks |
| Flag adoption (v1.1) | At least one flag raised organically | First week after v1.1 launch |
| Professional quality | External observers impressed by polish | At launch |
| Lifespan | App serves the family for the duration of שאגת אריה | Duration of period |

## MVP Scope

### Core Features (v1 — Static MVP)

**Must-have for launch:**

1. **שאגת האריה branding** — Lion logo header, blue-and-white palette, family motto at the bottom
2. **Dark mode** — Automatic via `prefers-color-scheme`, no toggle needed
3. **Family member selector** — Pick your name to see personalized view, remembered via localStorage
4. **Fixed tasks display** — All 7 fixed responsibilities with owner, emoji icons:
   - 🍽️ הכנסת מדיח → 👨 אבא
   - 🍽️ פריקת מדיח → 🦁 ארז
   - 🗑️ פחים → 🌳 אלון
   - 👕 כביסות → 💧 מעיין
   - 🚗 סידורים + נסיעות → ⚡ חי
   - 🎭 הווי ובידור → 🎶 עדי
   - 🧹 נקיונות לפסח → 👩 אמא + 👵 סבתא
5. **Weekly schedule (Sun-Thu)** — 4 rotation tables:
   - ארוחת צהריים (Lunch)
   - ארוחת ערב (Dinner — אמא every night)
   - עוזר לאמא בארוחת ערב (Dinner helper rotation)
   - סדר קומת כניסה + אמבטיות + עריכת שולחן (Tidying + table setting)
6. **Personal highlighting** — When a name is selected, that person's tasks are visually emphasized across all tables
7. **Today awareness** — Current day column highlighted in the weekly schedule
8. **Hebrew RTL** — Fully right-to-left, Hebrew-first interface
9. **Mobile-first responsive** — Designed for phone screens, works on desktop too
10. **Static deployment** — GitHub Pages, schedule data in a config/JSON file editable by developer

### Out of Scope for MVP

| Feature | Rationale | Deferred to |
|---------|-----------|-------------|
| **Issue flagging** | Requires shared state/backend | v1.1 |
| **In-app schedule editing UI** | Config file editing is sufficient for now | v1.1+ |
| **Push notifications** | Adds complexity, not needed for adoption validation | v1.1+ |
| **User authentication/login** | Zero-friction name picker is the design choice | Not planned |
| **Multi-family support** | Single family product | Not planned |
| **Task completion tracking** | Keep it simple — this is a duty board, not a to-do app | Future consideration |
| **Gamification/points** | Could add engagement but risks over-engineering | Future consideration |

### MVP Success Criteria

The MVP is successful when:
- All 8+ family members have opened the app at least twice in week 1
- Someone mentions the app at dinner organically
- The app looks professional enough to serve as an AI development showcase
- The family uses it as their daily duty reference instead of (or alongside) the paper chart

### Future Vision

**v1.1 — Issue Flagging (PythonAnywhere):**
- Any member can flag an issue on any task (e.g., "הזבל מלא")
- Visual flag indicator appears on the responsible person's view
- Lightweight Flask API for shared flag state
- Flag resolution (mark as handled)

**v1.2+ — Possible enhancements (only if needed):**
- In-app schedule editing for admins (Mosh.s, Ma'ayan)
- WhatsApp notification integration for flags
- Weekly summary / family scoreboard
- Seasonal task rotation (post-Passover schedule changes)
