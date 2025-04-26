export function renderHeader() {
  const headerElement = document.createElement('header');
  headerElement.classList.add('header');
  headerElement.innerHTML = `
    <img src="src/img/newsify_logo.png" alt="Newsify Logo" class="logo">
    <h1 class="title">Newsify</h1>
  `;
  document.body.prepend(headerElement); 
}
