

const SECTIONS = ["health", "sports", "travel", "technology", "business", "world"];

export default function renderSettings(app) {
  const main = document.createElement('main');
  main.classList.add('settings__page');


  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add('categories__wrapper');


  SECTIONS.forEach(section => {
    const settingItem = document.createElement('div');
    settingItem.classList.add('setting__item');

    const label = document.createElement('span');
    label.textContent = section.charAt(0).toUpperCase() + section.slice(1);

    const toggleWrapper = document.createElement('label');
    toggleWrapper.classList.add('toggle__switch');

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.classList.add('setting__toggle');
    toggle.dataset.key = `settings_${section}`;

    const slider = document.createElement('span');
    slider.classList.add('slider');

 
    const saved = localStorage.getItem(`settings_${section}`);
    if (saved === 'true') {
      toggle.checked = true;
    }

    toggle.addEventListener('change', (e) => {
      localStorage.setItem(`settings_${section}`, e.target.checked);
    });

    toggleWrapper.appendChild(toggle);
    toggleWrapper.appendChild(slider);

    settingItem.appendChild(label);
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
  });

  darkModeItem.appendChild(darkButton);
  darkModeWrapper.appendChild(darkModeItem);

  main.appendChild(darkModeWrapper);

  app.appendChild(main);
}
