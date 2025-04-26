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
    const articles = section.querySelectorAll(".article__card");
    let hasMatch = false;

    articles.forEach(article => {
      const headline = article.querySelector("h4")?.textContent.toLowerCase() || "";
      const summary = article.querySelector("p")?.textContent.toLowerCase() || "";
      const matches = headline.includes(query) || summary.includes(query);
      article.style.display = matches ? "block" : "none";
      if (matches) hasMatch = true;
    });

    const sectionContent = section.querySelector(".articles__section");
    const arrow = section.querySelector(".section__arrow");

    if (hasMatch) {
      sectionContent.style.display = "block";
      sectionContent.style.maxHeight = "none";
      arrow.style.transform = "rotate(90deg)";
    } else {
      sectionContent.style.display = "none";
      sectionContent.style.maxHeight = "0";
      arrow.style.transform = "rotate(0deg)";
    }
  });
});

searchElm.appendChild(searchInput);
export default searchElm;
