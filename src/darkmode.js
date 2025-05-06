import { updateFooterIcons } from './footer.js';

export default function setupDarkMode() {
  const darkSaved = localStorage.getItem('settings__darkMode');
  if (darkSaved === 'true') {
    document.body.classList.add('dark__mode');
  } else {
    document.body.classList.remove('dark__mode');
  }

  const isDark = document.body.classList.contains('dark__mode');

  const activeLink = document.querySelector('.footer__link.active');
  const activePage = activeLink ? activeLink.dataset.page : 'home';

  updateFooterIcons(activePage);
}
