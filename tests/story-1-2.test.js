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
// Task 1: data.json — Family Members
// ============================================================
describe('Task 1.1 — familyMembers data', () => {
  const data = loadJSON('data.json');

  it('has 8 family members', () => {
    assert.equal(data.familyMembers.length, 8);
  });

  const expectedMembers = [
    { name: 'אבא', emoji: '👨' },
    { name: 'אמא', emoji: '👩' },
    { name: 'מעיין', emoji: '🌊' },
    { name: 'חי', emoji: '🌟' },
    { name: 'ארז', emoji: '🦁' },
    { name: 'אלון', emoji: '🌳' },
    { name: 'עדי', emoji: '🎨' },
    { name: 'סבתא', emoji: '👵' },
  ];

  for (const member of expectedMembers) {
    it(`includes ${member.name} with emoji ${member.emoji}`, () => {
      const found = data.familyMembers.find(m => m.name === member.name);
      assert.ok(found, `Missing member: ${member.name}`);
      assert.equal(found.emoji, member.emoji);
    });
  }

  it('each member has name and emoji fields only', () => {
    for (const m of data.familyMembers) {
      assert.ok(typeof m.name === 'string' && m.name.length > 0);
      assert.ok(typeof m.emoji === 'string' && m.emoji.length > 0);
    }
  });
});

// ============================================================
// Task 1.2: data.json — Fixed Tasks
// ============================================================
describe('Task 1.2 — fixedTasks data', () => {
  const data = loadJSON('data.json');

  it('has 7 fixed tasks', () => {
    assert.equal(data.fixedTasks.length, 7);
  });

  const expectedTasks = [
    { task: 'הכנסת מדיח', emoji: '🍽️', member: 'אבא' },
    { task: 'פריקת מדיח', emoji: '🍽️', member: 'ארז' },
    { task: 'פחים', emoji: '🗑️', member: 'אלון' },
    { task: 'כביסות', emoji: '👕', member: 'מעיין' },
    { task: 'סידורים + נסיעות', emoji: '🚗', member: 'חי' },
    { task: 'הווי ובידור', emoji: '🎭', member: 'עדי' },
  ];

  for (const t of expectedTasks) {
    it(`includes task "${t.task}" assigned to ${t.member}`, () => {
      const found = data.fixedTasks.find(ft => ft.task === t.task);
      assert.ok(found, `Missing task: ${t.task}`);
      assert.equal(found.emoji, t.emoji);
      assert.equal(found.member, t.member);
    });
  }

  it('נקיונות לפסח uses members array with אמא and סבתא', () => {
    const task = data.fixedTasks.find(t => t.task === 'נקיונות לפסח');
    assert.ok(task, 'Missing task: נקיונות לפסח');
    assert.equal(task.emoji, '🧹');
    assert.ok(Array.isArray(task.members), 'Should use members array');
    assert.ok(task.members.includes('אמא'), 'Should include אמא');
    assert.ok(task.members.includes('סבתא'), 'Should include סבתא');
    assert.equal(task.member, undefined, 'Should not have singular member field');
  });

  it('each task has task, emoji fields', () => {
    for (const t of data.fixedTasks) {
      assert.ok(typeof t.task === 'string' && t.task.length > 0);
      assert.ok(typeof t.emoji === 'string' && t.emoji.length > 0);
    }
  });

  it('each task has either member (string) or members (array)', () => {
    for (const t of data.fixedTasks) {
      const hasMember = typeof t.member === 'string';
      const hasMembers = Array.isArray(t.members);
      assert.ok(hasMember || hasMembers, `Task "${t.task}" must have member or members`);
    }
  });
});

// ============================================================
// Task 1.3: data.json — Weekly Schedule
// ============================================================
describe('Task 1.3 — weeklySchedule data', () => {
  const data = loadJSON('data.json');
  const ws = data.weeklySchedule;

  it('has 5 days', () => {
    assert.equal(ws.days.length, 5);
  });

  const expectedDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
  for (const day of expectedDays) {
    it(`includes day ${day}`, () => {
      assert.ok(ws.days.includes(day), `Missing day: ${day}`);
    });
  }

  it('has 4 rotations', () => {
    assert.equal(ws.rotations.length, 4);
  });

  const expectedLabels = [
    'ארוחת צהריים',
    'ארוחת ערב',
    'עוזר לאמא בארוחת ערב',
    'סדר קומת כניסה + אמבטיות + עריכת שולחן',
  ];

  for (const label of expectedLabels) {
    it(`has rotation "${label}"`, () => {
      const found = ws.rotations.find(r => r.label === label);
      assert.ok(found, `Missing rotation: ${label}`);
      assert.equal(found.assignments.length, 5, `${label} should have 5 assignments`);
    });
  }

  it('ארוחת צהריים has correct assignments', () => {
    const rot = ws.rotations.find(r => r.label === 'ארוחת צהריים');
    assert.deepEqual(rot.assignments, ['מעיין', 'ארז', 'אלון', 'סבתא', 'חי']);
  });

  it('ארוחת ערב is all אמא', () => {
    const rot = ws.rotations.find(r => r.label === 'ארוחת ערב');
    assert.ok(rot.assignments.every(a => a === 'אמא'));
  });
});

// ============================================================
// Task 1.4: data.json — Well-formed JSON
// ============================================================
describe('Task 1.4 — JSON validity', () => {
  it('is valid JSON with no parsing errors', () => {
    const raw = readFile('data.json');
    assert.doesNotThrow(() => JSON.parse(raw));
  });

  it('uses camelCase for all keys', () => {
    const raw = readFile('data.json');
    assert.ok(!raw.includes('family_members'));
    assert.ok(!raw.includes('fixed_tasks'));
    assert.ok(!raw.includes('weekly_schedule'));
  });

  it('contains Hebrew text (not escaped Unicode)', () => {
    const raw = readFile('data.json');
    assert.ok(raw.includes('אבא'), 'Should contain literal Hebrew, not Unicode escapes');
  });
});

// ============================================================
// Task 2: app.js — renderFixedTasks function
// ============================================================
describe('Task 2 — renderFixedTasks in app.js', () => {
  const js = readFile('app.js');

  it('defines renderFixedTasks function', () => {
    assert.match(js, /function\s+renderFixedTasks\s*\(\s*data\s*\)/);
  });

  it('renderFixedTasks is in section 3 (RENDERING)', () => {
    const renderingIdx = js.indexOf('3. RENDERING');
    const stateIdx = js.indexOf('4. STATE MANAGEMENT');
    const funcIdx = js.indexOf('function renderFixedTasks');
    assert.ok(renderingIdx > -1, 'Missing RENDERING section');
    assert.ok(funcIdx > renderingIdx, 'renderFixedTasks should be after RENDERING header');
    assert.ok(funcIdx < stateIdx, 'renderFixedTasks should be before STATE MANAGEMENT');
  });

  it('queries fixed-tasks section by aria-labelledby', () => {
    assert.match(js, /querySelector\s*\(\s*'\[aria-labelledby="fixed-tasks-title"\]'\s*\)/);
  });

  it('creates task-row elements', () => {
    assert.ok(js.includes("'task-row'"), 'Should use task-row class');
  });

  it('sets data-member attribute on rows', () => {
    assert.match(js, /setAttribute\s*\(\s*'data-member'/);
  });

  it('creates task-emoji elements', () => {
    assert.ok(js.includes("'task-emoji'"), 'Should create task-emoji spans');
  });

  it('creates task-name elements', () => {
    assert.ok(js.includes("'task-name'"), 'Should create task-name spans');
  });

  it('creates owner-emoji elements', () => {
    assert.ok(js.includes("'owner-emoji'"), 'Should create owner-emoji spans');
  });

  it('creates owner-name elements', () => {
    assert.ok(js.includes("'owner-name'"), 'Should create owner-name spans');
  });

  it('handles multi-member tasks (members array)', () => {
    assert.match(js, /task\.members\s*\|\|\s*\[task\.member\]/);
  });

  it('uses members[0] for row data-member (not comma-join)', () => {
    assert.match(js, /setAttribute\s*\(\s*'data-member',\s*members\[0\]\)/);
  });

  it('sets data-member on individual owner spans for multi-member support', () => {
    assert.match(js, /ownerEmojiEl\.setAttribute\s*\(\s*'data-member'/);
    assert.match(js, /ownerNameEl\.setAttribute\s*\(\s*'data-member'/);
  });

  it('uses textContent (not innerHTML) for XSS safety', () => {
    assert.ok(!js.includes('innerHTML'), 'Should use textContent, not innerHTML');
  });

  it('builds member emoji lookup map from familyMembers', () => {
    assert.match(js, /memberEmojiMap/);
  });
});

// ============================================================
// Task 3: app.js — Initialization flow
// ============================================================
describe('Task 3 — Initialization calls renderFixedTasks', () => {
  const js = readFile('app.js');

  it('calls renderFixedTasks(data) in initialization', () => {
    assert.ok(js.includes('renderFixedTasks(data)'), 'Should call renderFixedTasks(data)');
  });

  it('renderFixedTasks call is in section 7 (INITIALIZATION)', () => {
    const initIdx = js.indexOf('7. INITIALIZATION');
    const callIdx = js.lastIndexOf('renderFixedTasks(data)');
    assert.ok(callIdx > initIdx, 'renderFixedTasks(data) call should be in INITIALIZATION section');
  });

  it('returns early on error (does not call renderFixedTasks when data is null)', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    const returnIdx = initSection.indexOf('return;');
    const renderCallIdx = initSection.indexOf('renderFixedTasks(data)');
    assert.ok(returnIdx > -1, 'Should have early return on error');
    assert.ok(renderCallIdx > returnIdx, 'renderFixedTasks should be called after error return');
  });

  it('still has error handling with Hebrew error message', () => {
    assert.ok(js.includes('לא ניתן לטעון את הנתונים'));
  });
});

// ============================================================
// Task 4: style.css — Task row styling
// ============================================================
describe('Task 4 — Task row CSS styles', () => {
  const css = readFile('style.css');

  it('has .task-row styles', () => {
    assert.match(css, /\.task-row\s*\{/);
  });

  it('.task-row uses flexbox', () => {
    assert.match(css, /\.task-row\s*\{[^}]*display:\s*flex/);
  });

  it('.task-row has gap spacing', () => {
    assert.match(css, /\.task-row\s*\{[^}]*gap:\s*8px/);
  });

  it('.task-row has vertical padding only (no horizontal — card provides it)', () => {
    assert.match(css, /\.task-row\s*\{[^}]*padding:\s*8px\s+0/);
  });

  it('.task-row has border-bottom using CSS variable', () => {
    assert.match(css, /\.task-row\s*\{[^}]*border-bottom:[^}]*var\(--color-border\)/);
  });

  it('.task-row:last-child has no border-bottom', () => {
    assert.match(css, /\.task-row:last-child\s*\{[^}]*border-bottom:\s*none/);
  });

  it('.task-emoji has appropriate font size', () => {
    assert.match(css, /\.task-emoji\s*\{[^}]*font-size:\s*18px/);
  });

  it('.task-name has appropriate font size', () => {
    assert.match(css, /\.task-name\s*\{[^}]*font-size:\s*15px/);
  });

  it('.owner-name uses --color-text-secondary', () => {
    assert.match(css, /\.owner-name\s*\{[^}]*color:\s*var\(--color-text-secondary\)/);
  });

  it('.owner-name has appropriate font size', () => {
    assert.match(css, /\.owner-name\s*\{[^}]*font-size:\s*14px/);
  });

  it('.owner-info uses flexbox', () => {
    assert.match(css, /\.owner-info\s*\{[^}]*display:\s*flex/);
  });

  it('uses only CSS custom properties for colors (no hardcoded colors in task rows)', () => {
    const taskRowSection = css.substring(css.indexOf('.task-row'));
    const footerIdx = taskRowSection.indexOf('Footer');
    const taskRowCSS = taskRowSection.substring(0, footerIdx);
    // Check that color values use var() not hex codes (except in var definitions)
    const colorLines = taskRowCSS.split('\n').filter(l => /color:/.test(l) && !l.includes('/*'));
    for (const line of colorLines) {
      if (line.includes('color:')) {
        assert.match(line, /var\(--color-/, `Line should use CSS variable: ${line.trim()}`);
      }
    }
  });
});
