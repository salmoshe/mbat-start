import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

function readFile(name) {
  return readFileSync(resolve(ROOT, name), 'utf-8');
}

// ============================================================
// Task 1: style.css — Highlighting & Today CSS styles
// ============================================================
describe('Task 1 — Highlighting & Today CSS styles', () => {
  const css = readFile('style.css');

  it('has .task-row.highlighted styles', () => {
    assert.match(css, /\.task-row\.highlighted\s*\{/);
  });

  it('.task-row.highlighted has golden background using --color-highlight', () => {
    assert.match(css, /\.task-row\.highlighted\s*\{[^}]*background-color:\s*var\(--color-highlight\)/);
  });

  it('.task-row.highlighted has font-weight: bold', () => {
    assert.match(css, /\.task-row\.highlighted\s*\{[^}]*font-weight:\s*bold/);
  });

  it('.task-row.highlighted has border-inline-start using --color-highlight-border', () => {
    assert.match(css, /\.task-row\.highlighted\s*\{[^}]*border-inline-start:[^}]*var\(--color-highlight-border\)/);
  });

  it('has .schedule-table td.highlighted styles', () => {
    assert.match(css, /\.schedule-table td\.highlighted\s*\{/);
  });

  it('.schedule-table td.highlighted has golden background', () => {
    assert.match(css, /\.schedule-table td\.highlighted\s*\{[^}]*background-color:\s*var\(--color-highlight\)/);
  });

  it('.schedule-table td.highlighted has font-weight: bold', () => {
    assert.match(css, /\.schedule-table td\.highlighted\s*\{[^}]*font-weight:\s*bold/);
  });

  it('has .schedule-table td.today styles', () => {
    assert.match(css, /\.schedule-table td\.today/);
  });

  it('.schedule-table td.today has --color-primary-light background', () => {
    assert.match(css, /\.schedule-table td\.today[^{]*\{[^}]*background-color:\s*var\(--color-primary-light\)/);
  });

  it('has .schedule-table th.today styles', () => {
    assert.match(css, /\.schedule-table th\.today/);
  });

  it('.highlighted is declared after .today in CSS (cascade order)', () => {
    const todayIdx = css.indexOf('.schedule-table td.today');
    const highlightedIdx = css.indexOf('.task-row.highlighted');
    assert.ok(highlightedIdx > todayIdx, '.highlighted should come after .today in CSS for cascade priority');
  });

  it('does NOT contain transition on highlighted rules', () => {
    const highlightSection = css.substring(css.indexOf('Highlighting & Today'), css.indexOf('Fixed Task Rows'));
    assert.ok(!highlightSection.includes('transition'), 'Should NOT have transition property in highlighting section');
  });

  it('light mode design tokens include --color-highlight', () => {
    const lightSection = css.substring(0, css.indexOf('Dark Mode'));
    assert.ok(lightSection.includes('--color-highlight:'), 'Light mode should define --color-highlight');
  });

  it('light mode design tokens include --color-highlight-border', () => {
    const lightSection = css.substring(0, css.indexOf('Dark Mode'));
    assert.ok(lightSection.includes('--color-highlight-border:'), 'Light mode should define --color-highlight-border');
  });

  it('dark mode design tokens include --color-highlight', () => {
    const darkSection = css.substring(css.indexOf('Dark Mode'), css.indexOf('Base & Reset'));
    assert.ok(darkSection.includes('--color-highlight:'), 'Dark mode should define --color-highlight');
  });

  it('dark mode design tokens include --color-highlight-border', () => {
    const darkSection = css.substring(css.indexOf('Dark Mode'), css.indexOf('Base & Reset'));
    assert.ok(darkSection.includes('--color-highlight-border:'), 'Dark mode should define --color-highlight-border');
  });
});

// ============================================================
// Task 2: app.js — highlightMember function
// ============================================================
describe('Task 2 — highlightMember in app.js', () => {
  const js = readFile('app.js');

  it('defines highlightMember function', () => {
    assert.match(js, /function\s+highlightMember\s*\(\s*memberName\s*\)/);
  });

  it('highlightMember is in section 5 (HIGHLIGHTING)', () => {
    const highlightIdx = js.indexOf('5. HIGHLIGHTING');
    const todayIdx = js.indexOf('6. TODAY DETECTION');
    const funcIdx = js.indexOf('function highlightMember');
    assert.ok(funcIdx > highlightIdx, 'highlightMember should be after HIGHLIGHTING header');
    assert.ok(funcIdx < todayIdx, 'highlightMember should be before TODAY DETECTION');
  });

  it('queries [data-member] elements', () => {
    assert.match(js, /querySelectorAll\s*\(\s*'\[data-member\]'\s*\)/);
  });

  it('removes highlighted class from all elements', () => {
    const func = js.substring(js.indexOf('function highlightMember'), js.indexOf('function detectToday'));
    assert.ok(func.includes("classList.remove('highlighted')"), 'Should remove highlighted class');
  });

  it('adds highlighted class to matching elements', () => {
    const func = js.substring(js.indexOf('function highlightMember'), js.indexOf('function detectToday'));
    assert.ok(func.includes("classList.add('highlighted')"), 'Should add highlighted class');
  });

  it('handles null/empty memberName by only removing highlights', () => {
    const func = js.substring(js.indexOf('function highlightMember'), js.indexOf('function detectToday'));
    assert.ok(func.includes('if (!memberName)'), 'Should check for falsy memberName');
  });
});

// ============================================================
// Task 3: app.js — detectToday function
// ============================================================
describe('Task 3 — detectToday in app.js', () => {
  const js = readFile('app.js');

  it('defines detectToday function', () => {
    assert.match(js, /function\s+detectToday\s*\(\s*\)/);
  });

  it('detectToday is in section 6 (TODAY DETECTION)', () => {
    const todayIdx = js.indexOf('6. TODAY DETECTION');
    const initIdx = js.indexOf('7. INITIALIZATION');
    const funcIdx = js.indexOf('function detectToday');
    assert.ok(funcIdx > todayIdx, 'detectToday should be after TODAY DETECTION header');
    assert.ok(funcIdx < initIdx, 'detectToday should be before INITIALIZATION');
  });

  it('uses new Date().getDay()', () => {
    const func = js.substring(js.indexOf('function detectToday'), js.indexOf('7. INITIALIZATION'));
    assert.ok(func.includes('new Date().getDay()'), 'Should use new Date().getDay()');
  });

  it('queries [data-day] elements', () => {
    const func = js.substring(js.indexOf('function detectToday'), js.indexOf('7. INITIALIZATION'));
    assert.match(func, /querySelectorAll\s*\(\s*'\[data-day="/);
  });

  it('adds today class to matching elements', () => {
    const func = js.substring(js.indexOf('function detectToday'), js.indexOf('7. INITIALIZATION'));
    assert.ok(func.includes("classList.add('today')"), 'Should add today class');
  });

  it('handles weekend by returning early for day >= 5', () => {
    const func = js.substring(js.indexOf('function detectToday'), js.indexOf('7. INITIALIZATION'));
    assert.ok(func.includes('day >= 5') || func.includes('day > 4'), 'Should check for weekend days');
  });
});

// ============================================================
// Task 4: app.js — Integration with name selection
// ============================================================
describe('Task 4 — Highlighting integration', () => {
  const js = readFile('app.js');

  it('handleNameClick calls highlightMember', () => {
    const handleFunc = js.substring(js.indexOf('function handleNameClick'), js.indexOf('function restoreSavedMember'));
    assert.ok(handleFunc.includes('highlightMember('), 'handleNameClick should call highlightMember');
  });

  it('restoreSavedMember calls highlightMember', () => {
    const restoreFunc = js.substring(js.indexOf('function restoreSavedMember'), js.indexOf('5. HIGHLIGHTING'));
    assert.ok(restoreFunc.includes('highlightMember('), 'restoreSavedMember should call highlightMember');
  });
});

// ============================================================
// Task 5: app.js — Initialization order
// ============================================================
describe('Task 5 — Initialization order', () => {
  const js = readFile('app.js');

  it('calls detectToday() in initialization', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    assert.ok(initSection.includes('detectToday()'), 'Should call detectToday()');
  });

  it('detectToday is called after restoreSavedMember in initialization', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    const restoreIdx = initSection.indexOf('restoreSavedMember()');
    const detectIdx = initSection.indexOf('detectToday()');
    assert.ok(detectIdx > restoreIdx, 'detectToday should be called after restoreSavedMember');
  });

  it('initialization order: renderNameSelector → renderFixedTasks → renderWeeklySchedule → restoreSavedMember → detectToday', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    const renderNameIdx = initSection.indexOf('renderNameSelector(data)');
    const renderFixedIdx = initSection.indexOf('renderFixedTasks(data)');
    const renderWeeklyIdx = initSection.indexOf('renderWeeklySchedule(data)');
    const restoreIdx = initSection.indexOf('restoreSavedMember()');
    const detectIdx = initSection.indexOf('detectToday()');
    assert.ok(renderNameIdx < renderFixedIdx, 'renderNameSelector before renderFixedTasks');
    assert.ok(renderFixedIdx < renderWeeklyIdx, 'renderFixedTasks before renderWeeklySchedule');
    assert.ok(renderWeeklyIdx < restoreIdx, 'renderWeeklySchedule before restoreSavedMember');
    assert.ok(restoreIdx < detectIdx, 'restoreSavedMember before detectToday');
  });
});
