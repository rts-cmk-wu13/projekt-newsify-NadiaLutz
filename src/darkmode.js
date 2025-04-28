import { updateFooterIcons } from './footer.js';

export default function setupDarkMode() {
  const darkSaved = localStorage.getItem('settings__darkMode');
  const isDark = darkSaved === 'true';

  if (isDark) {
    document.body.classList.add('dark__mode');
  } else {
    document.body.classList.remove('dark__mode');
  }

  updateFooterIcons();
}
