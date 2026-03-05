import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

function readFile(name) {
  return readFileSync(resolve(ROOT, name), 'utf-8');
}

// ============================================================
// Task 1: Project file structure
// ============================================================
describe('Task 1 — Project file structure', () => {
  const requiredFiles = [
    'index.html',
    'style.css',
    'app.js',
    'data.json',
    '.gitignore',
    'assets/lion-logo.jpg',
  ];

  for (const file of requiredFiles) {
    it(`${file} exists`, () => {
      assert.ok(existsSync(resolve(ROOT, file)), `Missing: ${file}`);
    });
  }

  it('lion-logo.jpg is under 200KB', () => {
    const stat = readFileSync(resolve(ROOT, 'assets/lion-logo.jpg'));
    assert.ok(stat.length < 200 * 1024, `Logo is ${stat.length} bytes, exceeds 200KB`);
  });
});

// ============================================================
// Task 2: index.html semantic skeleton
// ============================================================
describe('Task 2 — index.html structure', () => {
  const html = readFile('index.html');

  it('has <html lang="he" dir="rtl">', () => {
    assert.match(html, /<html\s[^>]*lang="he"[^>]*dir="rtl"/);
  });

  it('has viewport meta tag', () => {
    assert.match(html, /<meta\s[^>]*name="viewport"[^>]*content="width=device-width,\s*initial-scale=1"/);
  });

  it('has robots noindex meta tag', () => {
    assert.match(html, /<meta\s[^>]*name="robots"[^>]*content="noindex"/);
  });

  it('has color-scheme meta tag', () => {
    assert.match(html, /<meta\s[^>]*name="color-scheme"[^>]*content="light dark"/);
  });

  it('has charset UTF-8', () => {
    assert.match(html, /<meta\s[^>]*charset="UTF-8"/i);
  });

  it('links style.css', () => {
    assert.match(html, /<link\s[^>]*href="style\.css"/);
  });

  it('includes app.js with defer', () => {
    assert.match(html, /<script\s[^>]*src="app\.js"[^>]*defer/);
  });

  it('has header with lion logo img', () => {
    assert.match(html, /<header[\s\S]*?<img[^>]*src="assets\/lion-logo\.jpg"/);
  });

  it('lion logo has meaningful alt text', () => {
    assert.match(html, /<img[^>]*alt="לוגו שאגת האריה"/);
  });

  it('has h1 with title שאגת הארי', () => {
    assert.match(html, /<h1>שאגת הארי<\/h1>/);
  });

  it('has header motto paragraph', () => {
    assert.match(html, /בואו נשאג ביחד על המשימות! כל אחד תורם/);
  });

  it('has fixed tasks section with aria-labelledby', () => {
    assert.match(html, /<section\s[^>]*aria-labelledby="fixed-tasks-title"/);
    assert.match(html, /<h2\s[^>]*id="fixed-tasks-title">משימות קבועות<\/h2>/);
  });

  it('has weekly schedule section with aria-labelledby', () => {
    assert.match(html, /<section\s[^>]*aria-labelledby="weekly-title"/);
    assert.match(html, /<h2\s[^>]*id="weekly-title">לוח שבועי<\/h2>/);
  });

  it('has footer with motto and lion emoji', () => {
    assert.match(html, /<footer[\s\S]*?בואו נשאג ביחד על המשימות! כל אחד תורם 🦁/);
  });
});

// ============================================================
// Task 3: CSS design system
// ============================================================
describe('Task 3 — CSS design tokens', () => {
  const css = readFile('style.css');

  const lightTokens = [
    '--color-primary: #1A4B8C',
    '--color-primary-light: #E3F0FF',
    '--color-background: #FFFFFF',
    '--color-surface: #F0F4F8',
    '--color-text: #1A1A2E',
    '--color-text-secondary: #5A6A7A',
    '--color-highlight: #FFF3CD',
    '--color-highlight-border: #E6C85A',
    '--color-border: #D0D8E0',
  ];

  for (const token of lightTokens) {
    it(`light mode has ${token.split(':')[0].trim()}`, () => {
      assert.ok(css.includes(token), `Missing light token: ${token}`);
    });
  }

  const darkTokens = [
    '--color-primary: #4A90D9',
    '--color-primary-light: #1A2A44',
    '--color-background: #1A1A2E',
    '--color-surface: #252540',
    '--color-text: #E8ECF0',
    '--color-text-secondary: #8A9AAA',
    '--color-highlight: #3D3520',
    '--color-highlight-border: #8A7A30',
    '--color-border: #3A3A5A',
  ];

  for (const token of darkTokens) {
    it(`dark mode has ${token.split(':')[0].trim()}`, () => {
      assert.ok(css.includes(token), `Missing dark token: ${token}`);
    });
  }

  it('uses prefers-color-scheme: dark media query', () => {
    assert.match(css, /@media\s*\(prefers-color-scheme:\s*dark\)/);
  });

  it('sets system-ui font stack', () => {
    assert.match(css, /font-family:\s*system-ui,\s*-apple-system,\s*"Segoe UI",\s*sans-serif/);
  });

  it('sets 16px base font size', () => {
    assert.match(css, /font-size:\s*16px/);
  });

  it('sets -webkit-text-size-adjust: 100%', () => {
    assert.match(css, /-webkit-text-size-adjust:\s*100%/);
  });

  it('sets box-sizing: border-box globally', () => {
    assert.match(css, /\*[\s\S]*?box-sizing:\s*border-box/);
  });

  it('resets body margin and padding', () => {
    assert.match(css, /body\s*\{[^}]*margin:\s*0/);
    assert.match(css, /body\s*\{[^}]*padding:\s*0/);
  });

  it('uses CSS custom properties for body colors', () => {
    assert.match(css, /background-color:\s*var\(--color-background\)/);
    assert.match(css, /color:\s*var\(--color-text\)/);
  });
});

// ============================================================
// Task 4: Header styling
// ============================================================
describe('Task 4 — Header styling', () => {
  const css = readFile('style.css');

  it('header has gradient background', () => {
    assert.match(css, /\.app-header[\s\S]*?linear-gradient/);
  });

  it('header logo has border-radius: 50%', () => {
    assert.match(css, /\.header-logo[\s\S]*?border-radius:\s*50%/);
  });

  it('header h1 is 20px bold', () => {
    assert.match(css, /\.app-header\s+h1[\s\S]*?font-size:\s*20px/);
    assert.match(css, /\.app-header\s+h1[\s\S]*?font-weight:\s*bold/);
  });

  it('motto is 14px italic', () => {
    assert.match(css, /\.header-motto[\s\S]*?font-size:\s*14px/);
    assert.match(css, /\.header-motto[\s\S]*?font-style:\s*italic/);
  });
});

// ============================================================
// Task 5: Footer styling
// ============================================================
describe('Task 5 — Footer styling', () => {
  const css = readFile('style.css');

  it('footer text uses --color-text-secondary', () => {
    assert.match(css, /\.app-footer\s+p[\s\S]*?color:\s*var\(--color-text-secondary\)/);
  });

  it('footer text is 14px italic', () => {
    assert.match(css, /\.app-footer\s+p[\s\S]*?font-size:\s*14px/);
    assert.match(css, /\.app-footer\s+p[\s\S]*?font-style:\s*italic/);
  });
});

// ============================================================
// Task 6: Responsive layout
// ============================================================
describe('Task 6 — Responsive layout', () => {
  const css = readFile('style.css');

  it('has 600px desktop breakpoint', () => {
    assert.match(css, /@media\s*\(min-width:\s*600px\)/);
  });

  it('desktop sets max-width: 600px on content', () => {
    assert.match(css, /max-width:\s*600px/);
  });

  it('desktop centers content with margin: 0 auto', () => {
    assert.match(css, /margin:\s*0\s*auto/);
  });
});

// ============================================================
// Task 7: data.json schema
// ============================================================
describe('Task 7 — data.json', () => {
  it('is valid JSON', () => {
    const raw = readFile('data.json');
    assert.doesNotThrow(() => JSON.parse(raw));
  });

  it('has required top-level keys', () => {
    const data = JSON.parse(readFile('data.json'));
    assert.ok(Array.isArray(data.familyMembers), 'familyMembers should be array');
    assert.ok(Array.isArray(data.fixedTasks), 'fixedTasks should be array');
    assert.ok(typeof data.weeklySchedule === 'object', 'weeklySchedule should be object');
  });

  it('weeklySchedule has days and rotations', () => {
    const data = JSON.parse(readFile('data.json'));
    assert.ok(Array.isArray(data.weeklySchedule.days), 'days should be array');
    assert.ok(Array.isArray(data.weeklySchedule.rotations), 'rotations should be array');
  });

  it('uses camelCase keys', () => {
    const raw = readFile('data.json');
    assert.ok(!raw.includes('family_members'), 'Should use camelCase, not snake_case');
    assert.ok(!raw.includes('fixed_tasks'), 'Should use camelCase, not snake_case');
    assert.ok(!raw.includes('weekly_schedule'), 'Should use camelCase, not snake_case');
  });
});

// ============================================================
// Task 8: app.js foundation
// ============================================================
describe('Task 8 — app.js foundation', () => {
  const js = readFile('app.js');

  const sectionHeaders = [
    'CONSTANTS & CONFIGURATION',
    'DATA LOADING',
    'RENDERING',
    'STATE MANAGEMENT',
    'HIGHLIGHTING',
    'TODAY DETECTION',
    'INITIALIZATION',
  ];

  for (const header of sectionHeaders) {
    it(`has section header: ${header}`, () => {
      assert.ok(js.includes(header), `Missing section: ${header}`);
    });
  }

  it('defines STORAGE_KEY constant', () => {
    assert.match(js, /const\s+STORAGE_KEY\s*=\s*'mbat-selected-member'/);
  });

  it('has DOMContentLoaded listener', () => {
    assert.match(js, /addEventListener\s*\(\s*['"]DOMContentLoaded['"]/);
  });

  it('has loadData function with fetch', () => {
    assert.match(js, /async\s+function\s+loadData/);
    assert.match(js, /fetch\s*\(\s*['"]data\.json['"]\s*\)/);
  });

  it('has Hebrew error message for fetch failure', () => {
    assert.ok(js.includes('לא ניתן לטעון את הנתונים'), 'Missing Hebrew error message');
  });
});

// ============================================================
// Task 9: .gitignore
// ============================================================
describe('Task 9 — .gitignore', () => {
  const gitignore = readFile('.gitignore');

  const entries = ['.DS_Store', 'node_modules/', '.env', '*.log', '.vscode/', 'Thumbs.db'];

  for (const entry of entries) {
    it(`ignores ${entry}`, () => {
      assert.ok(gitignore.includes(entry), `Missing: ${entry}`);
    });
  }
});
