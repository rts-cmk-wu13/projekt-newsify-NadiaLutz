const STORAGE_KEYS = {
  bookmarked: "newsify__bookmarked",
  archived: "newsify__archived"
};

function getStored(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function setStored(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

let bookmarked = getStored(STORAGE_KEYS.bookmarked);
let archived = getStored(STORAGE_KEYS.archived);

export function isBookmarked(url) {
  return bookmarked.includes(url);
}

export function isArchived(url) {
  return archived.includes(url);
}

let currentlySwipedWrapper = null;

export function createArticleCard(title, abstract, url, thumbnail, section, mode = "home") {
  if ((mode === "home" || mode === "popular") && isArchived(url)) return null;

  const cardContainer = document.createElement("div");
  cardContainer.className = "article__card-container";

  const cardWrapper = document.createElement("div");
  cardWrapper.className = "article__card-wrapper";

  const card = document.createElement("div");
  card.className = "article__card";

  const img = document.createElement("img");
  img.src = typeof thumbnail === "string" && thumbnail.length > 0 ? thumbnail : "/img/newsify_logo.png";


  const content = document.createElement("div");
  content.className = "article__content";

  const h4 = document.createElement("h4");
  h4.textContent = title;

  const p = document.createElement("p");
  p.textContent = abstract;

  content.appendChild(h4);
  content.appendChild(p);

  card.appendChild(img);
  card.appendChild(content);
  cardWrapper.appendChild(card);
  cardContainer.appendChild(cardWrapper);

  const actions = document.createElement("div");
  actions.className = "article__actions";

  if (mode === "home" || mode === "popular") {
    const archiveBtn = document.createElement("button");
    archiveBtn.className = "action__btn archive__btn";
    archiveBtn.title = "Archive";

    const archiveImg = document.createElement("img");
    archiveImg.src = isArchived(url)
      ? "/img/feather_archive-filled.png"
      : "/img/feather_archive-white.png";
    archiveImg.alt = "Archive Icon";

    archiveBtn.appendChild(archiveImg);

    archiveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (!archived.includes(url)) {
        archived.push(url);
        setStored(STORAGE_KEYS.archived, archived);
        archiveImg.src = "/img/feather_archive-filled.png";

        setTimeout(() => {
          cardContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          cardContainer.style.opacity = "0";
          cardContainer.style.transform = "translateX(100%)";

          setTimeout(() => {
            cardContainer.remove();
          }, 300);
        }, 200);
      }
    });

    actions.appendChild(archiveBtn);
  }

  if (mode === "archives") {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action__btn delete__btn";
    deleteBtn.title = "Delete";

    const deleteImg = document.createElement("img");
    deleteImg.src = "/img/feather_trash.png";
    deleteImg.alt = "Delete Icon";

    deleteBtn.appendChild(deleteImg);

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const index = archived.indexOf(url);
      if (index > -1) {
        archived.splice(index, 1);
        setStored(STORAGE_KEYS.archived, archived);
      }

      const bookmarkIndex = bookmarked.indexOf(url);
      if (bookmarkIndex > -1) {
        bookmarked.splice(bookmarkIndex, 1);
        setStored(STORAGE_KEYS.bookmarked, bookmarked);
      }

      const section = cardContainer.closest("section");
      cardContainer.remove();

      if (section && section.querySelectorAll(".article__card-container").length === 0) {
        section.remove();
      }

      const app = document.getElementById("app");
      if (app && app.querySelectorAll("section").length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty__archive";
        emptyMessage.textContent = "No archived articles yet.";
        app.appendChild(emptyMessage);
      }
    });

    actions.appendChild(deleteBtn);
  }

  cardContainer.appendChild(actions);

  let startX = 0;
  let currentX = 0;
  const threshold = 50;
  let isSwiping = false;

  cardWrapper.addEventListener("touchstart", (e) => {
    if (e.target.closest("button")) {
      isSwiping = false;
      return;
    }
    startX = e.touches[0].clientX;
    isSwiping = true;
    cardWrapper.style.transition = "";
  });

  cardWrapper.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const moveX = e.touches[0].clientX;
    currentX = moveX - startX;
    if (currentX < 0) {
      cardWrapper.style.transform = `translateX(${currentX}px)`;
    }
  });

  cardWrapper.addEventListener("touchend", () => {
    if (!isSwiping) return;
    cardWrapper.style.transition = "transform 0.3s ease";

    if (currentX < -threshold) {
      cardWrapper.style.transform = "translateX(-80px)";
      cardWrapper.classList.add("card--open");
      currentlySwipedWrapper = cardWrapper;
    } else {
      cardWrapper.style.transform = "translateX(0)";
      cardWrapper.classList.remove("card--open");
      currentlySwipedWrapper = null;
    }

    isSwiping = false;
    startX = 0;
    currentX = 0;
  });

  content.addEventListener("click", () => {
    if (!cardWrapper.classList.contains("card--open")) {
      window.open(url, "_blank");
    }
  });

  return cardContainer;
}

document.addEventListener("touchstart", (e) => {
  if (
    currentlySwipedWrapper &&
    !currentlySwipedWrapper.contains(e.target) &&
    !e.target.closest(".action__btn")
  ) {
    currentlySwipedWrapper.style.transition = "transform 0.3s ease";
    currentlySwipedWrapper.style.transform = "translateX(0)";
    currentlySwipedWrapper.classList.remove("card--open");
    currentlySwipedWrapper = null;
  }
});
