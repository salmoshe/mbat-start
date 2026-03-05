import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

function fileExists(name) {
  return existsSync(resolve(ROOT, name));
}

function fileSize(name) {
  return readFileSync(resolve(ROOT, name)).length;
}

// ============================================================
// Task 1: Repository completeness — all required files exist
// ============================================================
describe('Task 1 — Required files exist in repository', () => {
  it('index.html exists', () => {
    assert.ok(fileExists('index.html'));
  });

  it('style.css exists', () => {
    assert.ok(fileExists('style.css'));
  });

  it('app.js exists', () => {
    assert.ok(fileExists('app.js'));
  });

  it('data.json exists', () => {
    assert.ok(fileExists('data.json'));
  });

  it('assets/lion-logo.jpg exists', () => {
    assert.ok(fileExists('assets/lion-logo.jpg'));
  });

  it('.gitignore exists', () => {
    assert.ok(fileExists('.gitignore'));
  });

  it('.nojekyll exists for GitHub Pages', () => {
    assert.ok(fileExists('.nojekyll'));
  });
});

// ============================================================
// Task 2: No sensitive files tracked
// ============================================================
describe('Task 2 — No sensitive files and proper .gitignore', () => {
  const gitignore = readFileSync(resolve(ROOT, '.gitignore'), 'utf-8');

  it('.gitignore covers .DS_Store', () => {
    assert.ok(gitignore.includes('.DS_Store'));
  });

  it('.gitignore covers node_modules/', () => {
    assert.ok(gitignore.includes('node_modules/'));
  });

  it('.gitignore covers .env', () => {
    assert.ok(gitignore.includes('.env'));
  });

  it('.gitignore covers *.log', () => {
    assert.ok(gitignore.includes('*.log'));
  });

  it('.gitignore covers .vscode/', () => {
    assert.ok(gitignore.includes('.vscode/'));
  });

  it('.gitignore covers Thumbs.db', () => {
    assert.ok(gitignore.includes('Thumbs.db'));
  });

  it('.gitignore covers _bmad/', () => {
    assert.ok(gitignore.includes('_bmad/'));
  });

  it('.gitignore covers _bmad-output/', () => {
    assert.ok(gitignore.includes('_bmad-output/'));
  });

  it('no .env file exists', () => {
    assert.ok(!fileExists('.env'));
  });

  it('no credentials.json exists', () => {
    assert.ok(!fileExists('credentials.json'));
  });
});

// ============================================================
// Task 3: Page weight under 500KB
// ============================================================
describe('Task 3 — Page weight verification', () => {
  const deployedFiles = [
    'index.html',
    'style.css',
    'app.js',
    'data.json',
    'assets/lion-logo.jpg',
  ];

  it('total page weight is under 500KB', () => {
    const total = deployedFiles.reduce((sum, f) => sum + fileSize(f), 0);
    assert.ok(total < 500 * 1024, `Total ${total} bytes exceeds 500KB`);
  });

  it('index.html is under 10KB', () => {
    assert.ok(fileSize('index.html') < 10 * 1024);
  });

  it('style.css is under 20KB', () => {
    assert.ok(fileSize('style.css') < 20 * 1024);
  });

  it('app.js is under 20KB', () => {
    assert.ok(fileSize('app.js') < 20 * 1024);
  });

  it('data.json is under 10KB', () => {
    assert.ok(fileSize('data.json') < 10 * 1024);
  });

  it('lion-logo.jpg is under 200KB', () => {
    assert.ok(fileSize('assets/lion-logo.jpg') < 200 * 1024);
  });
});
