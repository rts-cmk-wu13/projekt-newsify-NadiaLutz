export function renderFooter(activePage) {
   const footerElm = document.createElement('footer');
   footerElm.classList.add('footer');
   footerElm.innerHTML = `
     <ul class="footer__list">
       <li class="footer__item">
         <img src="src/img/feather_home.png">
         <a href="home.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
       </li>
       <li class="footer__item">
         <img src="src/img/feather_bookmark.png">
         <a href="archive.html" class="${activePage === 'archive' ? 'active' : ''}">Archive</a>
       </li>
       <li class="footer__item">
         <img src="src/img/feather_star.png">
         <a href="popular.html" class="${activePage === 'popular' ? 'active' : ''}">Popular</a>
       </li>
       <li class="footer__item">
         <img src="src/img/feather_settings.png">
         <a href="settings.html" class="${activePage === 'settings' ? 'active' : ''}">Settings</a>
       </li>
     </ul>
   `;
   const app = document.getElementById('app');
   if (app) app.appendChild(footerElm);
 }
 