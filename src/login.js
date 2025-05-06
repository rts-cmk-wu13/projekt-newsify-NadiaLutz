export default function renderLogin(app) {
  app.innerHTML = "";

  const loginContainer = document.createElement("main");
  loginContainer.className = "login";

  const logo = document.createElement("img");
  logo.src = "src/img/newsify_logo.png";
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
  loginButton.textContent = "Sign in with password";

  const signUpContainer = document.createElement("div");
  signUpContainer.className = "login__signup-container";
  
  const loginWithEmail = document.createElement("div");
  loginWithEmail.className = "login__with-email";
  loginWithEmail.textContent = "Don't have an account?";
  
  const signUpButton = document.createElement("button");
  signUpButton.className = "login__signup-button";
  signUpButton.textContent = "Sign up";
  
  signUpContainer.append(loginWithEmail, signUpButton);

  form.append(emailInput, passwordInput, loginButton, signUpContainer);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.location.reload();
  });

  loginContainer.append(logo, title, span);
  soMeContainer.append(facebookButton, googleButton);
  loginContainer.appendChild(soMeContainer);
  loginContainer.appendChild(form);
  app.appendChild(loginContainer);
}



// localStorage.setItem('onboardingCompleted','true');
// localStorage.setItem('loggedIn','true');   // ← key name matters!
// location.reload();  