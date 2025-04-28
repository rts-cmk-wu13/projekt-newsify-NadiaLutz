const onboardingData = [
    {
      title: "Stay Connected.\nEverywhere, Anytime.",
      description: "Welcome to Newsify, your all-in-one hub for real-time news tailored to your interests.",
      screen: "1"
    },
    {
      title: "Become a Savvy\nGlobal Citizen.",
      description: "Discover what matters and align with topics that help you grow — locally and globally.",
      screen: "2"
    },
    {
      title: "Enhance your News\nJourney Now!",
      description: "Opt in to our dynamic community and customize your feed with category preferences.",
      screen: "3",
      switches: ["Politics", "Travel", "Finance"]
    }
  ];
  
  export default function renderOnboarding(app, onComplete) {
    let currentSlide = 0;
    const container = document.createElement("main");
    container.className = "onboarding";
  
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "onboarding__dots";
  
    onboardingData.forEach(() => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dotsContainer.appendChild(dot);
    });
  
    function updateDots() {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlide);
      });
    }
  
    function renderSlide(index) {
      container.innerHTML = "";
      container.appendChild(dotsContainer);
      updateDots();
  
      const slide = onboardingData[index];
      const title = document.createElement("h2");
      title.textContent = slide.title;
      const desc = document.createElement("p");
      desc.textContent = slide.description;
  
      const controls = document.createElement("div");
      controls.className = "onboarding__controls";
  
      const skipBtn = document.createElement("button");
      skipBtn.textContent = "Skip";
      skipBtn.addEventListener("click", onComplete);
  
      const nextBtn = document.createElement("button");
      nextBtn.textContent = index === onboardingData.length - 1 ? "Start" : "Continue";
      nextBtn.addEventListener("click", () => {
        if (currentSlide < onboardingData.length - 1) {
          currentSlide++;
          renderSlide(currentSlide);
        } else {
          onComplete();
        }
      });
  
      controls.append(skipBtn, nextBtn);
      container.append(title, desc);
  
      if (slide.switches) {
        const switchGroup = document.createElement("div");
        switchGroup.className = "onboarding__switches";
        slide.switches.forEach(label => {
          const wrapper = document.createElement("label");
          wrapper.className = "switch-label";
          wrapper.textContent = label;
  
          const toggle = document.createElement("input");
          toggle.type = "checkbox";
          toggle.checked = true;
  
          wrapper.appendChild(toggle);
          switchGroup.appendChild(wrapper);
        });
        container.appendChild(switchGroup);
      }
  
      container.appendChild(controls);
    }
  
    renderSlide(currentSlide);
    app.innerHTML = "";
    app.appendChild(container);
  }
  