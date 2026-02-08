const bars = document.querySelectorAll(".chart-bar");

const animateBars = () => {
  bars.forEach((bar, index) => {
    const height = bar.style.getPropertyValue("--h");
    bar.style.height = "0";
    setTimeout(() => {
      bar.style.transition = "height 1.2s ease";
      bar.style.height = height;
    }, 200 + index * 120);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateBars();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const panel = document.querySelector(".hero-panel");
if (panel) {
  observer.observe(panel);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
