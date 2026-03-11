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

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const closeNavMenu = () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openNavMenu = () => {
    navLinks.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navLinks.classList.contains("is-open");
    if (isOpen) {
      closeNavMenu();
      return;
    }
    openNavMenu();
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNavMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeNavMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNavMenu();
    }
  });
}
