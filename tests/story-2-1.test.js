import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

function readFile(name) {
  return readFileSync(resolve(ROOT, name), 'utf-8');
}

// ============================================================
// Task 1: index.html — Name selector container
// ============================================================
describe('Task 1 — Name selector HTML structure', () => {
  const html = readFile('index.html');

  it('has a name-selector container div', () => {
    assert.match(html, /class="name-selector"/);
  });

  it('has a selector-prompt paragraph with "בחר שם"', () => {
    assert.match(html, /class="selector-prompt"/);
    assert.ok(html.includes('בחר שם'), 'Should contain "בחר שם" prompt text');
  });

  it('name-selector is inside app-content', () => {
    const contentIdx = html.indexOf('class="app-content"');
    const selectorIdx = html.indexOf('class="name-selector"');
    assert.ok(selectorIdx > contentIdx, 'name-selector should be inside app-content');
  });

  it('name-selector appears before fixed-tasks section', () => {
    const selectorIdx = html.indexOf('class="name-selector"');
    const fixedTasksIdx = html.indexOf('fixed-tasks-title');
    assert.ok(selectorIdx < fixedTasksIdx, 'name-selector should appear before fixed tasks section');
  });
});

// ============================================================
// Task 2: style.css — Name chip styles
// ============================================================
describe('Task 2 — Name chip CSS styles', () => {
  const css = readFile('style.css');

  it('has .name-selector styles', () => {
    assert.match(css, /\.name-selector\s*\{/);
  });

  it('.name-selector uses flexbox with wrap', () => {
    assert.match(css, /\.name-selector\s*\{[^}]*display:\s*flex/);
    assert.match(css, /\.name-selector\s*\{[^}]*flex-wrap:\s*wrap/);
  });

  it('.name-selector has 8px gap', () => {
    assert.match(css, /\.name-selector\s*\{[^}]*gap:\s*8px/);
  });

  it('has .name-chip styles', () => {
    assert.match(css, /\.name-chip\s*\{/);
  });

  it('.name-chip has 12px vertical and 16px horizontal padding', () => {
    assert.match(css, /\.name-chip\s*\{[^}]*padding:\s*12px\s+16px/);
  });

  it('.name-chip has 16px font-size', () => {
    assert.match(css, /\.name-chip\s*\{[^}]*font-size:\s*16px/);
  });

  it('.name-chip has border-radius for pill shape', () => {
    assert.match(css, /\.name-chip\s*\{[^}]*border-radius:/);
  });

  it('.name-chip uses CSS variable for border color', () => {
    assert.match(css, /\.name-chip\s*\{[^}]*border:[^}]*var\(--color-border\)/);
  });

  it('.name-chip uses CSS variable for background', () => {
    assert.match(css, /\.name-chip\s*\{[^}]*background-color:\s*var\(--color-surface\)/);
  });

  it('has .name-chip.selected styles', () => {
    assert.match(css, /\.name-chip\.selected\s*\{/);
  });

  it('.name-chip.selected uses --color-primary background', () => {
    assert.match(css, /\.name-chip\.selected\s*\{[^}]*background-color:\s*var\(--color-primary\)/);
  });

  it('.name-chip.selected has white text', () => {
    assert.match(css, /\.name-chip\.selected\s*\{[^}]*color:\s*#FFFFFF/);
  });

  it('has .name-chip:focus-visible styles', () => {
    assert.match(css, /\.name-chip:focus-visible\s*\{/);
  });

  it('.name-chip:focus-visible has outline (not outline: none)', () => {
    const focusMatch = css.match(/\.name-chip:focus-visible\s*\{([^}]*)\}/);
    assert.ok(focusMatch, 'Should have focus-visible rule');
    assert.ok(!focusMatch[1].includes('outline: none'), 'Should NOT have outline: none');
    assert.match(focusMatch[1], /outline:/, 'Should have outline property');
  });

  it('has .selector-prompt styles', () => {
    assert.match(css, /\.selector-prompt\s*\{/);
  });

  it('has .selector-prompt.hidden that hides the prompt', () => {
    assert.match(css, /\.selector-prompt\.hidden\s*\{[^}]*display:\s*none/);
  });
});

// ============================================================
// Task 3: app.js — renderNameSelector function
// ============================================================
describe('Task 3 — renderNameSelector in app.js', () => {
  const js = readFile('app.js');

  it('defines renderNameSelector function', () => {
    assert.match(js, /function\s+renderNameSelector\s*\(\s*data\s*\)/);
  });

  it('renderNameSelector is in section 3 (RENDERING)', () => {
    const renderingIdx = js.indexOf('3. RENDERING');
    const stateIdx = js.indexOf('4. STATE MANAGEMENT');
    const funcIdx = js.indexOf('function renderNameSelector');
    assert.ok(funcIdx > renderingIdx, 'renderNameSelector should be after RENDERING header');
    assert.ok(funcIdx < stateIdx, 'renderNameSelector should be before STATE MANAGEMENT');
  });

  it('creates button elements for name chips', () => {
    assert.match(js, /createElement\s*\(\s*'button'\s*\)/);
  });

  it('sets class name-chip on button elements', () => {
    assert.ok(js.includes("'name-chip'"), 'Should use name-chip class');
  });

  it('sets aria-pressed="false" on each chip', () => {
    assert.match(js, /setAttribute\s*\(\s*'aria-pressed',\s*'false'\s*\)/);
  });

  it('sets data-member attribute on each chip', () => {
    assert.match(js, /setAttribute\s*\(\s*'data-member',\s*member\.name\s*\)/);
  });

  it('queries .name-selector container', () => {
    assert.match(js, /querySelector\s*\(\s*'\.name-selector'\s*\)/);
  });
});

// ============================================================
// Task 4: app.js — State management
// ============================================================
describe('Task 4 — State management in app.js', () => {
  const js = readFile('app.js');

  it('defines handleNameClick function', () => {
    assert.match(js, /function\s+handleNameClick\s*\(\s*event\s*\)/);
  });

  it('handleNameClick is in section 4 (STATE MANAGEMENT)', () => {
    const stateIdx = js.indexOf('4. STATE MANAGEMENT');
    const highlightIdx = js.indexOf('5. HIGHLIGHTING');
    const funcIdx = js.indexOf('function handleNameClick');
    assert.ok(funcIdx > stateIdx, 'handleNameClick should be after STATE MANAGEMENT header');
    assert.ok(funcIdx < highlightIdx, 'handleNameClick should be before HIGHLIGHTING');
  });

  it('defines restoreSavedMember function', () => {
    assert.match(js, /function\s+restoreSavedMember\s*\(\s*\)/);
  });

  it('restoreSavedMember is in section 4 (STATE MANAGEMENT)', () => {
    const stateIdx = js.indexOf('4. STATE MANAGEMENT');
    const highlightIdx = js.indexOf('5. HIGHLIGHTING');
    const funcIdx = js.indexOf('function restoreSavedMember');
    assert.ok(funcIdx > stateIdx, 'restoreSavedMember should be after STATE MANAGEMENT header');
    assert.ok(funcIdx < highlightIdx, 'restoreSavedMember should be before HIGHLIGHTING');
  });

  it('uses STORAGE_KEY constant for localStorage operations', () => {
    const stateSection = js.substring(js.indexOf('4. STATE MANAGEMENT'), js.indexOf('5. HIGHLIGHTING'));
    assert.ok(stateSection.includes('STORAGE_KEY'), 'Should use STORAGE_KEY constant in state management');
  });

  it('wraps localStorage.setItem in try/catch', () => {
    const handleFunc = js.substring(js.indexOf('function handleNameClick'), js.indexOf('function restoreSavedMember'));
    assert.ok(handleFunc.includes('try'), 'handleNameClick should have try block');
    assert.ok(handleFunc.includes('catch'), 'handleNameClick should have catch block');
    assert.ok(handleFunc.includes('localStorage.setItem'), 'Should use localStorage.setItem');
  });

  it('wraps localStorage.getItem in try/catch', () => {
    const restoreFunc = js.substring(js.indexOf('function restoreSavedMember'));
    assert.ok(restoreFunc.includes('try'), 'restoreSavedMember should have try block');
    assert.ok(restoreFunc.includes('catch'), 'restoreSavedMember should have catch block');
    assert.ok(restoreFunc.includes('localStorage.getItem'), 'Should use localStorage.getItem');
  });

  it('sets aria-pressed="true" on selected chip', () => {
    assert.match(js, /setAttribute\s*\(\s*'aria-pressed',\s*'true'\s*\)/);
  });

  it('removes selected class from all chips before selecting', () => {
    assert.match(js, /classList\.remove\s*\(\s*'selected'\s*\)/);
  });

  it('adds selected class to clicked chip', () => {
    assert.match(js, /classList\.add\s*\(\s*'selected'\s*\)/);
  });

  it('hides selector prompt by adding hidden class', () => {
    assert.ok(js.includes("classList.add('hidden')"), 'Should add hidden class to prompt');
  });

  it('uses event delegation with closest()', () => {
    assert.match(js, /event\.target\.closest\s*\(\s*'\.name-chip'\s*\)/);
  });
});

// ============================================================
// Task 5: app.js — Initialization
// ============================================================
describe('Task 5 — Initialization in app.js', () => {
  const js = readFile('app.js');

  it('calls renderNameSelector(data) in initialization', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    assert.ok(initSection.includes('renderNameSelector(data)'), 'Should call renderNameSelector(data)');
  });

  it('renderNameSelector is called before renderFixedTasks', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    const selectorCallIdx = initSection.indexOf('renderNameSelector(data)');
    const fixedCallIdx = initSection.indexOf('renderFixedTasks(data)');
    assert.ok(selectorCallIdx < fixedCallIdx, 'renderNameSelector should be called before renderFixedTasks');
  });

  it('calls restoreSavedMember() in initialization', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    assert.ok(initSection.includes('restoreSavedMember()'), 'Should call restoreSavedMember()');
  });

  it('attaches click event listener to name selector', () => {
    const initSection = js.substring(js.indexOf('7. INITIALIZATION'));
    assert.ok(initSection.includes("addEventListener('click', handleNameClick)"), 'Should attach click listener with handleNameClick');
  });

  it('uses textContent (not innerHTML) for XSS safety', () => {
    assert.ok(!js.includes('innerHTML'), 'Should use textContent, not innerHTML');
  });
});
