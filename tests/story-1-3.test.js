import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

function readFile(name) {
  return readFileSync(resolve(ROOT, name), 'utf-8');
}

function loadJSON(name) {
  return JSON.parse(readFile(name));
}

// ============================================================
// Task 1: app.js — renderWeeklySchedule function
// ============================================================
describe('Task 1 — renderWeeklySchedule in app.js', () => {
  const js = readFile('app.js');

  it('defines renderWeeklySchedule function', () => {
    assert.match(js, /function\s+renderWeeklySchedule\s*\(\s*data\s*\)/);
  });

  it('renderWeeklySchedule is in section 3 (RENDERING)', () => {
    const renderingIdx = js.indexOf('3. RENDERING');
    const stateIdx = js.indexOf('4. STATE MANAGEMENT');
    const funcIdx = js.indexOf('function renderWeeklySchedule');
    assert.ok(renderingIdx > -1, 'Missing RENDERING section');
    assert.ok(funcIdx > renderingIdx, 'renderWeeklySchedule should be after RENDERING header');
    assert.ok(funcIdx < stateIdx, 'renderWeeklySchedule should be before STATE MANAGEMENT');
  });

  it('queries weekly section by aria-labelledby', () => {
    assert.match(js, /querySelector\s*\(\s*'\[aria-labelledby="weekly-title"\]'\s*\)/);
  });

  it('creates table with schedule-table class', () => {
    assert.ok(js.includes("'schedule-table'"), 'Should use schedule-table class');
  });

  it('creates thead element', () => {
    assert.match(js, /createElement\s*\(\s*'thead'\s*\)/);
  });

  it('creates tbody element', () => {
    assert.match(js, /createElement\s*\(\s*'tbody'\s*\)/);
  });

  it('sets th scope="col" for day headers', () => {
    assert.match(js, /\.scope\s*=\s*'col'/);
  });

  it('sets th scope="row" for rotation labels', () => {
    assert.match(js, /\.scope\s*=\s*'row'/);
  });

  it('creates rotation-label elements', () => {
    assert.ok(js.includes("'rotation-label'"), 'Should use rotation-label class');
  });

  it('sets data-member attribute on td cells', () => {
    assert.match(js, /td\.setAttribute\s*\(\s*'data-member'/);
  });

  it('sets data-day attribute on td cells', () => {
    assert.match(js, /td\.setAttribute\s*\(\s*'data-day'/);
  });

  it('sets data-day attribute on th day headers', () => {
    assert.match(js, /th\.setAttribute\s*\(\s*'data-day'/);
  });

  it('uses textContent (not innerHTML) for XSS safety', () => {
    const funcStart = js.indexOf('function renderWeeklySchedule');
    const funcEnd = js.indexOf('// =', funcStart + 1);
    const funcBody = js.substring(funcStart, funcEnd);
    assert.ok(!funcBody.includes('innerHTML'), 'Should use textContent, not innerHTML');
  });

  it('maps day names to abbreviations (א׳, ב׳, ג׳, ד׳, ה׳)', () => {
    assert.ok(js.includes("'א׳'"), 'Should have א׳ abbreviation');
    assert.ok(js.includes("'ב׳'"), 'Should have ב׳ abbreviation');
    assert.ok(js.includes("'ג׳'"), 'Should have ג׳ abbreviation');
    assert.ok(js.includes("'ד׳'"), 'Should have ד׳ abbreviation');
    assert.ok(js.includes("'ה׳'"), 'Should have ה׳ abbreviation');
  });

  it('creates an empty corner th in header row', () => {
    assert.match(js, /cornerTh/);
  });
});

// ============================================================
// Task 2: app.js — Initialization calls renderWeeklySchedule
// ============================================================
describe('Task 2 — Initialization calls renderWeeklySchedule', () => {
  const js = readFile('app.js');

  it('calls renderWeeklySchedule(data) in initialization', () => {
    assert.ok(js.includes('renderWeeklySchedule(data)'), 'Should call renderWeeklySchedule(data)');
  });

  it('renderWeeklySchedule call is in section 7 (INITIALIZATION)', () => {
    const initIdx = js.indexOf('7. INITIALIZATION');
    const callIdx = js.lastIndexOf('renderWeeklySchedule(data)');
    assert.ok(callIdx > initIdx, 'renderWeeklySchedule(data) call should be in INITIALIZATION section');
  });

  it('renderWeeklySchedule is called after renderFixedTasks', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    const fixedIdx = initSection.indexOf('renderFixedTasks(data)');
    const weeklyIdx = initSection.indexOf('renderWeeklySchedule(data)');
    assert.ok(weeklyIdx > fixedIdx, 'renderWeeklySchedule should be called after renderFixedTasks');
  });

  it('renderWeeklySchedule is called after error return guard', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    const returnIdx = initSection.indexOf('return;');
    const callIdx = initSection.indexOf('renderWeeklySchedule(data)');
    assert.ok(callIdx > returnIdx, 'renderWeeklySchedule should be called after error return');
  });
});

// ============================================================
// Task 3: style.css — Weekly schedule table styles
// ============================================================
describe('Task 3 — Weekly schedule CSS styles', () => {
  const css = readFile('style.css');

  it('has .schedule-table styles', () => {
    assert.match(css, /\.schedule-table\s*\{/);
  });

  it('.schedule-table has width: 100%', () => {
    assert.match(css, /\.schedule-table\s*\{[^}]*width:\s*100%/);
  });

  it('.schedule-table has border-collapse: collapse', () => {
    assert.match(css, /\.schedule-table\s*\{[^}]*border-collapse:\s*collapse/);
  });

  it('table cells have compact padding (8px 6px)', () => {
    assert.match(css, /\.schedule-table\s+th[\s\S]*?\{[^}]*padding:\s*8px\s+6px/);
  });

  it('table cells have font-size: 14px', () => {
    assert.match(css, /\.schedule-table\s+th[\s\S]*?\{[^}]*font-size:\s*14px/);
  });

  it('table cells have center text-align', () => {
    assert.match(css, /\.schedule-table\s+th[\s\S]*?\{[^}]*text-align:\s*center/);
  });

  it('table cells have border using CSS variable', () => {
    assert.match(css, /\.schedule-table\s+th[\s\S]*?\{[^}]*border:[^}]*var\(--color-border\)/);
  });

  it('day headers have blue background using --color-primary', () => {
    assert.match(css, /\.schedule-table\s+thead\s+th\s*\{[^}]*background:\s*var\(--color-primary\)/);
  });

  it('day headers have white text', () => {
    assert.match(css, /\.schedule-table\s+thead\s+th\s*\{[^}]*color:\s*#FFFFFF/);
  });

  it('day headers are bold', () => {
    assert.match(css, /\.schedule-table\s+thead\s+th\s*\{[^}]*font-weight:\s*bold/);
  });

  it('.rotation-label has text-align: right', () => {
    assert.match(css, /\.schedule-table\s+\.rotation-label\s*\{[^}]*text-align:\s*right/);
  });

  it('.rotation-label has font-size: 13px', () => {
    assert.match(css, /\.schedule-table\s+\.rotation-label\s*\{[^}]*font-size:\s*13px/);
  });

  it('.rotation-label uses --color-surface background', () => {
    assert.match(css, /\.schedule-table\s+\.rotation-label\s*\{[^}]*background:\s*var\(--color-surface\)/);
  });

  it('weekly table section comes before Footer section', () => {
    const weeklyIdx = css.indexOf('Weekly Schedule Table');
    const footerIdx = css.indexOf('Footer');
    assert.ok(weeklyIdx > -1, 'Missing Weekly Schedule Table section');
    assert.ok(weeklyIdx < footerIdx, 'Weekly Schedule Table should come before Footer');
  });
});

// ============================================================
// Task 4: data.json — Weekly schedule data validation
// ============================================================
describe('Task 4 — Weekly schedule data cross-check', () => {
  const data = loadJSON('data.json');
  const ws = data.weeklySchedule;

  it('all rotation assignments reference valid family members or empty marker', () => {
    const memberNames = data.familyMembers.map(m => m.name);
    for (const rotation of ws.rotations) {
      for (const assignment of rotation.assignments) {
        assert.ok(memberNames.includes(assignment) || assignment === '—',
          `"${assignment}" in rotation "${rotation.label}" is not a valid family member or empty marker`);
      }
    }
  });

  it('each rotation has exactly 5 assignments (one per day)', () => {
    for (const rotation of ws.rotations) {
      assert.equal(rotation.assignments.length, ws.days.length,
        `Rotation "${rotation.label}" should have ${ws.days.length} assignments`);
    }
  });
});
