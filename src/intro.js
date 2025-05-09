export default function renderIntro(app, onComplete) {
    app.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "intro-container";
  
    const logo = document.createElement("img");
    logo.src = "/img/newsify_logo.png";
    logo.className = "intro-logo";
  
    const text = document.createElement("div");
    text.innerText = "Newsify";
    text.className = "intro-text";
  
    container.appendChild(logo);
    container.appendChild(text);
    app.appendChild(container);
  
    setTimeout(() => {
      logo.style.transform = "scale(2)";
      logo.style.opacity = "1";
    }, 100);
  
    setTimeout(() => {
      text.style.opacity = "1";
    }, 1200);
  
    setTimeout(() => {
      container.style.opacity = "0";
      setTimeout(() => onComplete(), 1000);
    }, 2500);
  }