import { createArticleCard } from './card.js';

const accessToken = "FG3G63jj17v5jMUHDO6B7CqrIwAUTY9a";

export default function renderPopular(app) {
  const main = document.createElement("main");
  main.id = "scrollable-content";
  app.appendChild(main);

  async function fetchPopularArticles() {
    const cacheKey = "nyt_popular_cache";
    const oneHour = 1000 * 60 * 60;
    const cachedData = JSON.parse(localStorage.getItem(cacheKey) || "null");

    if (cachedData && cachedData.timestamp && Array.isArray(cachedData.results)) {
      if (Date.now() - cachedData.timestamp < oneHour) {
        return cachedData.results;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    try {
      const res = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${accessToken}`);
      const data = await res.json();
      if (!data.results) return [];

      const results = data.results.slice(0, 20).map(article => {
        let image = null;

        if (
          article.media &&
          Array.isArray(article.media) &&
          article.media.length > 0 &&
          article.media[0]['media-metadata'] &&
          Array.isArray(article.media[0]['media-metadata']) &&
          article.media[0]['media-metadata'].length > 0
        ) {
          const metadata = article.media[0]['media-metadata'];
          image = metadata[2]?.url || metadata[1]?.url || metadata[0]?.url || null;
        }

        const simplified = {
          title: article.title,
          abstract: article.abstract,
          url: article.url,
          thumbnail: image,
          section: article.section || "Other"
        };

        localStorage.setItem(`article__${article.url}`, JSON.stringify(simplified));
        return simplified;
      });

      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), results }));

      return results;
    } catch (err) {
      console.error("Failed to fetch popular articles", err);
      return [];
    }
  }

  async function loadPopularArticles() {
    const articles = await fetchPopularArticles();
    const sections = {};

    articles.forEach(article => {
      const sectionName = article.section || "Other";
      if (!sections[sectionName]) {
        sections[sectionName] = [];
      }
      sections[sectionName].push(article);
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

      const arrow = document.createElement("img");
      arrow.className = "section__arrow";
      arrow.src = "/img/arrow.png";
      arrow.style.transform = "rotate(0deg)";

      header.appendChild(left);
      header.appendChild(arrow);

      const articlesWrapper = document.createElement("div");
      articlesWrapper.className = "articles__section";
      articlesWrapper.style.maxHeight = "0";
      articlesWrapper.style.overflow = "hidden";
      articlesWrapper.style.transition = "max-height 0.4s ease";

      sections[sectionName].forEach(article => {
        const card = createArticleCard(
          article.title,
          article.abstract,
          article.url,
          article.thumbnail,
          article.section,
          "popular"
        );
        if (card) articlesWrapper.appendChild(card);
      });

      let expanded = false;

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

      section.appendChild(header);
      section.appendChild(articlesWrapper);
      main.appendChild(section);
    });
  }

  loadPopularArticles();
}
