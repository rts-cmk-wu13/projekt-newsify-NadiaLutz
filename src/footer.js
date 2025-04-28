export function renderFooter(activePage) {
  const footerElm = document.createElement('footer');
  footerElm.classList.add('footer');
  footerElm.setAttribute('id', 'footer');

  footerElm.innerHTML = `
    <ul class="footer__list">
      ${['home', 'archive', 'popular', 'settings'].map(page => `
        <li class="footer__item">
          <button id="nav-${page}" class="footer__link ${activePage === page ? 'active' : ''}" data-page="${page}">
            <img alt="${page} Icon">
            <span>${page.charAt(0).toUpperCase() + page.slice(1)}</span>
          </button>
        </li>
      `).join('')}
    </ul>
  `;

  const app = document.getElementById('app');
  if (app) app.appendChild(footerElm);

  updateFooterIcons(activePage);
}

export function updateFooterIcons(activePage) {
  const isDarkMode = document.body.classList.contains('dark__mode');

  const footerLinks = document.querySelectorAll('.footer__link');

  footerLinks.forEach(link => {
    const page = link.dataset.page;
    const img = link.querySelector('img');

    const basePath = `src/img/feather_${page}`;
    const imgSrc = activePage === page
      ? `${basePath}-active${isDarkMode ? '-light' : ''}.png`
      : `${basePath}${isDarkMode ? '-light' : ''}.png`;

    img.src = imgSrc;
  });
}
