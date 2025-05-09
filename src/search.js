const searchElm = document.createElement("div");
searchElm.className = "header__search";

const searchInput = document.createElement("input");
searchInput.className = "search";
searchInput.id = "searchbar";
searchInput.type = "text";
searchInput.name = "name";
searchInput.placeholder = "   Search news";

searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.trim().toLowerCase();
  const allSections = document.querySelectorAll(".news__section");

  allSections.forEach(section => {
    const articles = section.querySelectorAll(".article__card-container");
    let hasVisibleArticle = false;

    articles.forEach(cardContainer => {
      const article = cardContainer.querySelector(".article__card");
      const headline = article.querySelector("h4")?.textContent.toLowerCase() || "";
      const summary = article.querySelector("p")?.textContent.toLowerCase() || "";
      const matches = headline.includes(query) || summary.includes(query);

      if (query === "" || matches) {
        cardContainer.style.display = "block";
      } else {
        cardContainer.style.display = "none";
      }

      if (matches) hasVisibleArticle = true;
    });

    const sectionContent = section.querySelector(".articles__section");
    const arrow = section.querySelector(".section__arrow");

    if (query === "") {
      section.style.display = "block";
      sectionContent.style.display = "block";
      sectionContent.style.maxHeight = "0";
      if (arrow) arrow.style.transform = "rotate(0deg)";
    } else {
      if (hasVisibleArticle) {
        section.style.display = "block";
        sectionContent.style.display = "block";
        sectionContent.style.maxHeight = "none";
        if (arrow) arrow.style.transform = "rotate(90deg)";
      } else {
        section.style.display = "none";
      }
    }
  });
});

searchElm.appendChild(searchInput);
export default searchElm;
