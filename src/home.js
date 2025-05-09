import searchElm from './search.js';
import { createArticleCard } from './card.js';
import { updateArrows } from './footer.js';

export default function renderHome(app) {
  const sections = ["health", "sports", "travel", "technology", "business", "world"];
  const articleContainer = document.createElement("main");
  articleContainer.id = "scrollable__content";

  app.appendChild(searchElm);
  app.appendChild(articleContainer);

  const lastFetchTimes = {};
  const MIN_FETCH_INTERVAL = 2 * 60 * 1000; 

  function createSectionBlock(sectionName, articles) {
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
    arrow.style.transition = "transform 0.3s ease"; 

    header.appendChild(left);
    header.appendChild(arrow);

    const articlesWrapper = document.createElement("div");
    articlesWrapper.className = "articles__section";

    articles.forEach(article => {
      const image = (article.multimedia && article.multimedia.length > 0) ? article.multimedia[0].url : null;
      const card = createArticleCard(article.title, article.abstract, article.url, image, sectionName);
      if (card) articlesWrapper.appendChild(card);

      localStorage.setItem(`article__${article.url}`, JSON.stringify({
        title: article.title,
        abstract: article.abstract,
        thumbnail: image,
        section: sectionName
      }));
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

    section.appendChild(header);
    section.appendChild(articlesWrapper);
    articleContainer.appendChild(section);
  }

  async function fetchSectionArticles(section) {
    const cacheKey = `nyt_${section}_cache`;
    const cachedData = localStorage.getItem(cacheKey);
    const oneHour = 1000 * 60 * 60;

    if (cachedData) {
      const { timestamp, results } = JSON.parse(cachedData);
      if (Date.now() - timestamp < oneHour) {
        return results;
      }
    }

    const now = Date.now();
    if (lastFetchTimes[section] && now - lastFetchTimes[section] < MIN_FETCH_INTERVAL) {
      return [];
    }
    lastFetchTimes[section] = now;

    try {
      const res = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=FG3G63jj17v5jMUHDO6B7CqrIwAUTY9a`);
      const data = await res.json();
      if (!data.results) return [];
      const results = data.results.slice(0, 5);
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), results }));
      return results;
    } catch (err) {
      console.error("Fetching error:", err);
      return [];
    }
  }

  async function loadAllSections() {
    for (const section of sections) {
      const settingKey = `settings_${section}`;
      const isEnabled = localStorage.getItem(settingKey);

      if (isEnabled !== null && isEnabled === 'false') {
        console.log(`Skipping section: ${section}`);
        continue;
      }

      const articles = await fetchSectionArticles(section);
      if (articles.length) createSectionBlock(section, articles);
    }
    updateArrows();
  }

  loadAllSections();
  return articleContainer;
}

