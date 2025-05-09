const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}

export default function renderLogin(app) {
  app.innerHTML = "";

  const loginContainer = document.createElement("main");
  loginContainer.className = "login";

  const logo = document.createElement("img");
  logo.src = "/img/newsify_logo.png";
  logo.alt = "Newsify Logo";
  logo.className = "login__logo";

  const title = document.createElement("h1");
  title.textContent = "Newsify";

  const span = document.createElement("span");
  span.textContent = "Welcome! Let's dive into your account";

  const soMeContainer = document.createElement("div");
  soMeContainer.className = "login__socials";

  const facebookButton = document.createElement("button");
  facebookButton.className = "login__socials-facebook";
  facebookButton.textContent = "Continue with Facebook";

  const googleButton = document.createElement("button");
  googleButton.className = "login__socials-google";
  googleButton.textContent = "Continue with Google";

  const form = document.createElement("form");
  form.className = "login__form";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Email";
  emailInput.required = true;

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.required = true;

  const loginButton = document.createElement("button");
  loginButton.className = "login__button";
  loginButton.type = "submit";
  loginButton.textContent = "Login";

  form.append(emailInput, passwordInput, loginButton);

  const passwordButton = document.createElement("button");
  passwordButton.className = "login__password-button";
  passwordButton.textContent = "Sign in with password";

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "login__modal-overlay";
  modalOverlay.style.display = "none";

  const modal = document.createElement("div");
  modal.className = "login__modal";

  const modalClose = document.createElement("span");
  modalClose.className = "login__modal-close";
  modalClose.textContent = "×";
  modalClose.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modal.append(modalClose, form);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  passwordButton.addEventListener("click", (e) => {
    e.preventDefault();
    modalOverlay.style.display = "flex";
  });

  const bottomText = document.createElement("p");
  bottomText.className = "login__bottom";
  bottomText.innerHTML = `Don't have an account? <span class="signup">Sign up</span> or <span class="guest">Continue as guest</span>`;

  bottomText.querySelector(".signup").addEventListener("click", (e) => {
    e.preventDefault();
  });

  bottomText.querySelector(".guest").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("loggedIn", "true");
    window.location.reload();
  });

  soMeContainer.append(facebookButton, googleButton);
  loginContainer.append(
    logo,
    title,
    span,
    soMeContainer,
    passwordButton,
    bottomText
  );

  app.append(loginContainer);
}
