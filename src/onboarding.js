import onboarding1 from './img/onboarding1.png';
import onboarding2 from './img/onboarding2.png';
import onboarding3 from './img/onboarding3.png';



const onboardingData = [
    {
      img: onboarding1,
      title: "Stay Connected.\nEverywhere, Anytime.",
      description: "Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.",
      screen: "1"
    },
    {
      img: onboarding2,
      title: "Become a Savvy\nGlobal Citizen.",
      description: "Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!",
      screen: "2"
    },
    {
      img: onboarding3,
      title: "Enhance your News\nJourney Now!",
      description: "Be a part of our dynamix community and contribute your insights and participate in enriching conversations.",
      screen: "3",

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
     
  
      const slide = onboardingData[index];
  
      const image = document.createElement("img");
      image.className = "onboarding__image";
      image.src = slide.img
      image.alt = "Onboarding illustration";
  
      const title = document.createElement("h2");
      title.textContent = slide.title;
  
      const desc = document.createElement("p");
      desc.textContent = slide.description;
  
      const controls = document.createElement("div");
      controls.className = "onboarding__controls";
  
     

      const skipBtn = document.createElement("button");
      skipBtn.classList.add("onboarding__skip");
      skipBtn.textContent = "Skip";
      skipBtn.addEventListener("click", onComplete);
  
      const nextBtn = document.createElement("button");
      nextBtn.classList.add("onboarding__next");
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
      container.appendChild(image);
      container.appendChild(title);
      container.appendChild(desc);
      container.appendChild(dotsContainer);
      updateDots();
      
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
  