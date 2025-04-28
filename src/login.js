export default function renderLogin(app) {
    app.innerHTML = "";
  
    const loginContainer = document.createElement("main");
    loginContainer.className = "login";
  
    const logo = document.createElement("img");
    logo.src = "src/img/newsify_logo.png";
    logo.alt = "Newsify Logo";
    logo.className = "login__logo";
  
    const title = document.createElement("h2");
    title.textContent = "Welcome Back";
  
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
    loginButton.type = "submit";
    loginButton.textContent = "Login";
  
    form.append(emailInput, passwordInput, loginButton);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    });
  
    loginContainer.append(logo, title, form);
    app.appendChild(loginContainer);
  }
  