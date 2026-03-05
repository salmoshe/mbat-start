// ==============================
// 1. CONSTANTS & CONFIGURATION
// ==============================
const STORAGE_KEY = 'mbat-selected-member';

// ==============================
// 2. DATA LOADING
// ==============================
async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    return null;
  }
}

// ==============================
// 3. RENDERING
// ==============================
function renderFixedTasks(data) {
  const sectionEl = document.querySelector('[aria-labelledby="fixed-tasks-title"]');
  if (!sectionEl || !data.fixedTasks) return;

  const memberEmojiMap = {};
  if (data.familyMembers) {
    data.familyMembers.forEach(m => {
      memberEmojiMap[m.name] = m.emoji;
    });
  }

  data.fixedTasks.forEach(task => {
    const rowEl = document.createElement('div');
    rowEl.className = 'task-row';

    const members = task.members || [task.member];
    rowEl.setAttribute('data-member', members[0]);

    const taskEmojiEl = document.createElement('span');
    taskEmojiEl.className = 'task-emoji';
    taskEmojiEl.textContent = task.emoji;

    const taskNameEl = document.createElement('span');
    taskNameEl.className = 'task-name';
    taskNameEl.textContent = task.task;

    const ownerInfoEl = document.createElement('span');
    ownerInfoEl.className = 'owner-info';

    members.forEach((memberName, index) => {
      if (index > 0) {
        const separator = document.createElement('span');
        separator.textContent = ' + ';
        ownerInfoEl.appendChild(separator);
      }

      const ownerEmojiEl = document.createElement('span');
      ownerEmojiEl.className = 'owner-emoji';
      ownerEmojiEl.setAttribute('data-member', memberName);
      ownerEmojiEl.textContent = memberEmojiMap[memberName] || '';

      const ownerNameEl = document.createElement('span');
      ownerNameEl.className = 'owner-name';
      ownerNameEl.setAttribute('data-member', memberName);
      ownerNameEl.textContent = memberName;

      ownerInfoEl.appendChild(ownerEmojiEl);
      ownerInfoEl.appendChild(ownerNameEl);
    });

    rowEl.appendChild(taskEmojiEl);
    rowEl.appendChild(taskNameEl);
    rowEl.appendChild(ownerInfoEl);
    sectionEl.appendChild(rowEl);
  });
}

// ==============================
// 4. STATE MANAGEMENT
// ==============================

// ==============================
// 5. HIGHLIGHTING
// ==============================

// ==============================
// 6. TODAY DETECTION
// ==============================

// ==============================
// 7. INITIALIZATION
// ==============================
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  if (!data) {
    const contentEl = document.querySelector('.app-content');
    if (contentEl) {
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error-message';
      errorMsg.textContent = 'לא ניתן לטעון את הנתונים';
      contentEl.appendChild(errorMsg);
    }
    return;
  }

  renderFixedTasks(data);
});
