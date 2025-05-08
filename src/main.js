import './style/style.scss';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import renderHome from './home.js';
import renderOnboarding from './onboarding.js';
import renderLogin from './login.js';
import renderPopular from './popular.js';
import renderArchive from './archive.js';
import renderSettings from './settings.js'; 
import setupDarkMode from './darkmode.js';
import initPullToRefresh from './refresh.js';
import renderIntro from './intro.js';

const app = document.getElementById('app');

renderIntro(app, initApp);

function initApp() {
  if (!localStorage.getItem("onboardingCompleted")) {
    renderOnboarding(app, () => {
      localStorage.setItem("onboardingCompleted", "true");
      fadeAndRenderLogin();
    });
  } else if (!localStorage.getItem("loggedIn")) {
    fadeAndRenderLogin();
  } else {
    fadeAndRenderHome();
  }

  setupDarkMode();
}

function fadeAndRenderHome() {
  app.classList.add("fade-out");
  setTimeout(() => {
    app.innerHTML = "";
    renderHeader(app);
    const container = renderHome(app);
    renderFooter('home');

    function handleRefresh() {
      app.innerHTML = "";
      renderHeader(app);
      const refreshedContainer = renderHome(app);
      renderFooter('home');
      initPullToRefresh(refreshedContainer, handleRefresh);
      setupNavigation();
    }

    initPullToRefresh(container, handleRefresh);
    setupNavigation();
    app.classList.remove("fade-out");
  }, 400);
}

function fadeAndRenderPopular() {
  app.classList.add("fade-out");
  setTimeout(() => {
    app.innerHTML = "";
    renderHeader(app);
    renderPopular(app);
    renderFooter('popular');
    setupNavigation();
    app.classList.remove("fade-out");
  }, 400);
}

function fadeAndRenderArchive() {
  app.classList.add("fade-out");
  setTimeout(() => {
    app.innerHTML = "";
    renderHeader(app);
    renderArchive(app);
    renderFooter('archive');
    setupNavigation();
    app.classList.remove("fade-out");
  }, 400);
}

function fadeAndRenderSettings() {
  app.classList.add("fade-out");
  setTimeout(() => {
    app.innerHTML = "";
    renderHeader(app);
    renderSettings(app); 
    renderFooter('settings');
    setupNavigation();
    app.classList.remove("fade-out");
  }, 400);
}

function fadeAndRenderLogin() {
  app.classList.add("fade-out");
  setTimeout(() => {
    app.innerHTML = "";
    renderHeader(app);
    renderLogin(app);
    app.classList.remove("fade-out");
  }, 400);
}

function setupNavigation() {
  const navButtons = document.querySelectorAll("button[id^='nav-']");
  navButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const id = e.currentTarget.id;
      if (id === "nav-home") {
        fadeAndRenderHome();
      } else if (id === "nav-popular") {
        fadeAndRenderPopular();
      } else if (id === "nav-archive") {
        fadeAndRenderArchive();
      } else if (id === "nav-settings") {
        fadeAndRenderSettings();
      }
    });
  });
}
