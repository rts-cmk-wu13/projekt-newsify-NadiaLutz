import { updateFooterIcons } from './footer.js';

const sections = ["health", "sports", "travel", "technology", "business", "world"];

export default function renderSettings(app) {
  const main = document.createElement('main');
  main.classList.add('settings__page');

  const settingsHeadline = document.createElement('h1');
    settingsHeadline.classList.add('settings__headline');
    settingsHeadline.textContent = 'Settings';
    main.appendChild(settingsHeadline);

    const settingsDescription = document.createElement('p');
    settingsDescription.classList.add('settings__description');
    settingsDescription.textContent = 'Categories';
    main.appendChild(settingsDescription);

  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add('categories__wrapper');


  sections.forEach(section => {
    const settingItem = document.createElement('div');
    settingItem.classList.add('setting__item');

    const settingItemLeft = document.createElement('div');
    settingItemLeft.classList.add('setting__item-left');
    settingItem.appendChild(settingItemLeft);

    const logoImg = document.createElement('img');
    logoImg.src = "/img/newsify_logo.png";
    logoImg.alt = "Section logo";
    logoImg.classList.add('section__logo');

    const label = document.createElement('span');
    label.textContent = section.charAt(0).toUpperCase() + section.slice(1);
  
    settingItemLeft.append(logoImg, label);

    const toggleWrapper = document.createElement('label');
    toggleWrapper.classList.add('toggle__switch');

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.classList.add('setting__toggle');
    toggle.dataset.key = `settings_${section}`;

    const slider = document.createElement('span');
    slider.classList.add('slider');

 
    const saved = localStorage.getItem(`settings_${section}`);

toggle.checked = true;

    if (saved === 'true') {
      toggle.checked = true;
    } else if (saved === 'false') {
      toggle.checked = false;
    }

    toggle.addEventListener('change', (e) => {
      localStorage.setItem(`settings_${section}`, e.target.checked);
    });

    toggleWrapper.appendChild(toggle);
    toggleWrapper.appendChild(slider);

  
    settingItem.appendChild(toggleWrapper);
    categoriesWrapper.appendChild(settingItem);
  });

  main.appendChild(categoriesWrapper);

 
  const darkModeBtn = document.createElement('div');
  darkModeBtn.classList.add('darkModeBtn');
  main.appendChild(darkModeBtn);


  const darkModeWrapper = document.createElement('div');
  darkModeWrapper.classList.add('darkmode__wrapper');

  const darkModeItem = document.createElement('div');
  darkModeItem.classList.add('setting__item');

  const darkButton = document.createElement('button');
  darkButton.classList.add('darkmode__button');
  darkButton.textContent = 'Toggle dark mode';

  
  const darkSaved = localStorage.getItem('settings__darkMode');
  if (darkSaved === 'true') {
    document.body.classList.add('dark__mode');
  }

  darkButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark__mode');
    localStorage.setItem('settings__darkMode', isDark);
  
    const activeLink = document.querySelector('.footer__link.active');
    const activePage = activeLink ? activeLink.dataset.page : 'home';
  
    updateFooterIcons(activePage);
  });

  darkModeItem.appendChild(darkButton);
  darkModeWrapper.appendChild(darkModeItem);

  main.appendChild(darkModeWrapper);

  app.appendChild(main);
}
