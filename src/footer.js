export function renderFooter(activePage) {
  const footerElm = document.createElement('footer');
  footerElm.classList.add('footer');

  const icons = {
    home: {
      default: "src/img/feather_home.png",
      active: "src/img/feather_home-active.png"
    },
    archive: {
      default: "src/img/feather_bookmark.png",
      active: "src/img/feather_bookmark-active.png"
    },
    popular: {
      default: "src/img/feather_star.png",
      active: "src/img/feather_star-active.png"
    },
    settings: {
      default: "src/img/feather_settings.png",
      active: "src/img/feather_settings-active.png"
    }
  };

  footerElm.innerHTML = `
    <ul class="footer__list">
      <li class="footer__item">
        <button id="nav-home" class="footer__link ${activePage === 'home' ? 'active' : ''}">
          <img src="${activePage === 'home' ? icons.home.active : icons.home.default}" alt="Home Icon">
          <span>Home</span>
        </button>
      </li>
      <li class="footer__item">
        <button id="nav-archive" class="footer__link ${activePage === 'archive' ? 'active' : ''}">
          <img src="${activePage === 'archive' ? icons.archive.active : icons.archive.default}" alt="Archive Icon">
          <span>Archive</span>
        </button>
      </li>
      <li class="footer__item">
        <button id="nav-popular" class="footer__link ${activePage === 'popular' ? 'active' : ''}">
          <img src="${activePage === 'popular' ? icons.popular.active : icons.popular.default}" alt="Popular Icon">
          <span>Popular</span>
        </button>
      </li>
      <li class="footer__item">
        <button id="nav-settings" class="footer__link ${activePage === 'settings' ? 'active' : ''}">
          <img src="${activePage === 'settings' ? icons.settings.active : icons.settings.default}" alt="Settings Icon">
          <span>Settings</span>
        </button>
      </li>
    </ul>
  `;

  const app = document.getElementById('app');
  if (app) app.appendChild(footerElm);
}