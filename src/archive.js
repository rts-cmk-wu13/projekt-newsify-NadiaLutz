import { createArticleCard } from './card.js';

export default function renderArchive(app) {
  const main = document.createElement("main");
  main.id = "scrollable__content";
  app.appendChild(main);

  const archived = JSON.parse(localStorage.getItem("newsify__archived") || "[]");

  if (archived.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty__archive";
    emptyMessage.textContent = "No archived articles yet.";
    main.appendChild(emptyMessage);
    return;
  }

  const sections = {};

  archived.forEach(url => {
    const articleData = JSON.parse(localStorage.getItem(`article__${url}`));
    if (!articleData) return;

    if (!sections[articleData.section]) {
      sections[articleData.section] = [];
    }

    sections[articleData.section].push({
      title: articleData.title,
      abstract: articleData.abstract,
      url: url,
      thumbnail: articleData.thumbnail,
      section: articleData.section
    });
  });

  Object.keys(sections).forEach(sectionName => {
    const section = document.createElement("section");
    section.className = "news__section";

    const header = document.createElement("div");
    header.className = "article__section";

    const left = document.createElement("div");
    left.className = "article__item";

    const logoImg = document.createElement("img");
    logoImg.src = "/img/newsify_logo.png";
    logoImg.alt = "Section logo";
    logoImg.className = "section__logo";

    const title = document.createElement("span");
    title.className = "section__title";
    title.textContent = sectionName.toUpperCase();

    left.appendChild(logoImg);
    left.appendChild(title);

    header.appendChild(left);
    section.appendChild(header);

    const articlesWrapper = document.createElement("div");
    articlesWrapper.className = "articles__section";
    articlesWrapper.style.maxHeight = "none";

    sections[sectionName].forEach(article => {
      const card = createArticleCard(
        article.title,
        article.abstract,
        article.url,
        article.thumbnail,
        article.section,
        "archives"
      );

      if (card) articlesWrapper.appendChild(card);
    });

    section.appendChild(articlesWrapper);
    main.appendChild(section);
  });
}
