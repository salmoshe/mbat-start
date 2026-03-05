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
  }
});
