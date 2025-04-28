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

const bookmarked = getStored(STORAGE_KEYS.bookmarked);
const archived = getStored(STORAGE_KEYS.archived);

export function isBookmarked(url) {
  return bookmarked.includes(url);
}

export function isArchived(url) {
  return archived.includes(url);
}

let currentlySwipedCard = null;

export function createArticleCard(title, abstract, url, thumbnail, section, mode = "home") {
  if (mode === "home" && isArchived(url)) return null;

  const cardContainer = document.createElement("div");
  cardContainer.className = "article__card-container";

  const card = document.createElement("div");
  card.className = "article__card";

  const img = document.createElement("img");
  img.src = thumbnail || "src/img/newsify_logo.png";

  const content = document.createElement("div");
  content.className = "article__content";

  const h4 = document.createElement("h4");
  h4.textContent = title;

  const p = document.createElement("p");
  p.textContent = abstract;

  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.textContent = "Read more";
  a.className = "article__link";

  const actions = document.createElement("div");
  actions.className = "article__actions";

  if (mode === "home") {
    const archiveBtn = document.createElement("button");
    archiveBtn.className = "action__btn archive__btn";
    archiveBtn.title = "Archive";

    const archiveImg = document.createElement("img");
    archiveImg.src = isArchived(url) 
      ? "src/img/feather_archive-filled.png"
      : "src/img/feather_archive-white.png";
    archiveImg.alt = "Archive Icon";
    archiveBtn.appendChild(archiveImg);

    archiveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (!archived.includes(url)) {
        archived.push(url);
        setStored(STORAGE_KEYS.archived, archived);

        archiveImg.src = "src/img/feather_archive-filled.png";

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
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.title = "Delete";

    const deleteImg = document.createElement("img");
    deleteImg.src = "src/img/feather_trash.png";
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

  content.appendChild(h4);
  content.appendChild(p);
  content.appendChild(a);

  card.appendChild(img);
  card.appendChild(content);

  cardContainer.appendChild(card);
  cardContainer.appendChild(actions);

  let startX = 0;
  let currentX = 0;
  const threshold = 50;
  let isSwiping = false;

  card.addEventListener("touchstart", (e) => {
    if (e.target.closest("button") || card.classList.contains("card--open")) {
      isSwiping = false;
      return;
    }
    startX = e.touches[0].clientX;
    isSwiping = true;
    card.style.transition = "";
  });

  card.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const moveX = e.touches[0].clientX;
    currentX = moveX - startX;
    if (currentX < 0) {
      card.style.transform = `translateX(${currentX}px)`;
    }
  });

  card.addEventListener("touchend", () => {
    if (!isSwiping) return;
    card.style.transition = "transform 0.3s ease";
    if (currentX < -threshold) {
      card.style.transform = "translateX(-80px)";
      card.classList.add("card--open");
      currentlySwipedCard = card;
    } else {
      card.style.transform = "translateX(0)";
      card.classList.remove("card--open");
      currentlySwipedCard = null;
    }
    isSwiping = false;
    startX = 0;
    currentX = 0;
  });

  return cardContainer;
}

document.addEventListener("touchstart", (e) => {
  if (
    currentlySwipedCard &&
    !currentlySwipedCard.contains(e.target) &&
    !e.target.closest(".action-btn")
  ) {
    currentlySwipedCard.style.transition = "transform 0.3s ease";
    currentlySwipedCard.style.transform = "translateX(0)";
    currentlySwipedCard.classList.remove("card--open");
    currentlySwipedCard = null;
  }
});
