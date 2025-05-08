export function renderHeader(app) {
  const headerElement = document.createElement('header');
  headerElement.classList.add('header');
  headerElement.innerHTML = `
    <img src="/img/newsify_logo.png" alt="Newsify Logo" class="logo">
    <h1 class="title">Newsify</h1>
  `;
  app.appendChild(headerElement);
}
