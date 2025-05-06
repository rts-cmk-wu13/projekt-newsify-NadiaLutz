export default function initPullToRefresh(container, refreshCallback) {
    const threshold = 60;
    let startY = 0;
    let isPulling = false;
    let isRefreshing = false;
  
    const existingArrow = document.getElementById("pull-arrow");
    if (existingArrow) existingArrow.remove();
  
    const arrow = document.createElement("div");
    arrow.id = "pull-arrow";
    arrow.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(0deg); transition: transform 0.3s ease;">
        <path d="M12 4v13m0 0l-6-6m6 6l6-6" stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    arrow.style.cssText = `
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%) rotate(0deg);
      transition: transform 0.3s ease;
      opacity: 0;
      z-index: 10;
      pointer-events: none;
    `;
  
    container.style.position = "relative";
    container.insertBefore(arrow, container.firstChild);
    const svg = arrow.querySelector("svg");
  
    container.addEventListener("touchstart", (e) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    });
  
    container.addEventListener("touchmove", (e) => {
      if (!isPulling || isRefreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      if (diff > 0) {
        e.preventDefault();
        arrow.style.opacity = "1";
        arrow.style.top = `${Math.min(diff - 40, 50)}px`;
        svg.style.transform = `rotate(${Math.min(diff, threshold)}deg)`;
      }
    });
  
    container.addEventListener("touchend", async () => {
      if (!isPulling || isRefreshing) return;
      isPulling = false;
      const diff = event.changedTouches[0].clientY - startY;
  
      if (diff > threshold) {
        isRefreshing = true;
        svg.style.transition = "transform 0.4s linear";
        svg.style.transform = "rotate(360deg)";
        await new Promise((resolve) => setTimeout(resolve, 300));
        refreshCallback();
      }
  
      setTimeout(() => {
        isRefreshing = false;
        svg.style.transition = "transform 0.3s ease";
        svg.style.transform = "rotate(0deg)";
        arrow.style.opacity = "0";
        arrow.style.top = "-40px";
      }, 500);
    });
  }
  