import './style/style.scss';
import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { createArticleCard } from './card.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();

  const app = document.getElementById('app');
  if (!app) return;

  function getStored(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  function loadArchivedArticles() {
    const archivedUrls = getStored('newsify__archived');
    app.innerHTML = '';

    const sectionMap = {};

    archivedUrls.forEach((url) => {
      const data = getStored(`article__${url}`);
      if (!data) return;

      const { title, abstract, thumbnail, section } = data;
      if (!sectionMap[section]) sectionMap[section] = [];
      sectionMap[section].push({ title, abstract, url, thumbnail });
    });

    Object.entries(sectionMap).forEach(([section, articles]) => {
      const sectionEl = document.createElement("section");
      sectionEl.className = "news__section";

      const header = document.createElement("div");
      header.className = "article__section";

      const left = document.createElement("div");
      left.className = "article__item";

      const logoImg = document.createElement("img");
      logoImg.src = "src/img/newsify_logo.png";
      logoImg.alt = "Section logo";
      logoImg.className = "section__logo";

      const titleSpan = document.createElement("span");
      titleSpan.className = "section__title";
      titleSpan.textContent = section.toUpperCase();

      left.appendChild(logoImg);
      left.appendChild(titleSpan);

      const arrow = document.createElement("img");
      arrow.className = "section__arrow";
      arrow.src = "src/img/arrow.png";

      header.appendChild(left);
      header.appendChild(arrow);

      const articlesWrapper = document.createElement("div");
      articlesWrapper.className = "articles__section";

      articles.forEach(({ title, abstract, url, thumbnail }) => {
        const card = createArticleCard(title, abstract, url, thumbnail, section, 'archives');
        if (card) articlesWrapper.appendChild(card);
      });

      articlesWrapper.style.overflow = "hidden";
      articlesWrapper.style.transition = "max-height 0.4s ease";
      let expanded = false;
      articlesWrapper.style.maxHeight = "0";
      arrow.style.transform = "rotate(0deg)";

      header.addEventListener("click", () => {
        expanded = !expanded;
        if (expanded) {
          articlesWrapper.style.maxHeight = "none";
          arrow.style.transform = "rotate(90deg)";
        } else {
          articlesWrapper.style.maxHeight = "0";
          arrow.style.transform = "rotate(0deg)";
        }
      });

      sectionEl.appendChild(header);
      sectionEl.appendChild(articlesWrapper);
      app.appendChild(sectionEl);
    });

    if (!Object.keys(sectionMap).length) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-archive';
      emptyMessage.textContent = 'No archived articles yet.';
      app.appendChild(emptyMessage);
    }

    renderFooter('archive');
  }

  loadArchivedArticles();
});
