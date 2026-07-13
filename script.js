const MOBILE_BREAKPOINT = 600;

const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">' +
  '<rect width="400" height="200" fill="#1a1a1a"/>' +
  '<text x="50%" y="50%" fill="#888888" font-family="sans-serif" font-size="20" ' +
  'text-anchor="middle" dominant-baseline="middle">Preview</text></svg>'
);

const projects = [
{
title: "WinSet – Windows Toolkit",
description: "One-click Windows tuning presets for gamers & devs.",
link: "https://github.com/enricjake/WinSet",
technologies: ["Python", "Tkinter", "pywin32"],
category: "desktop",
featured: true,
img: "https://wallpapercave.com/wp/wp9378857.jpg"
},
{
title: "Bongolicious Cat",
description: "Addictive cat clicker with upgrades & prestige system.",
link: "https://enricjake.github.io/BongoliciousCat/",
technologies: ["JavaScript", "Canvas", "CSS"],
category: "web",
featured: false,
img: "https://wallpapers-clan.com/wp-content/uploads/2024/03/bongo-cat-meme-gif-desktop-wallpaper-preview.gif"
},
{
title: "Simple Trivia",
description: "Multi-category quiz with local high-score storage.",
link: "https://enricjake.github.io/SimpleTriviaGame/",
technologies: ["JavaScript", "DOM", "Web Storage"],
category: "web",
featured: false,
img: "https://media.istockphoto.com/id/1469754711/vector/trivia-time-neon-sign-geometric-frame-decoration-quiz-show-label-on-brick-wall-vector-stock.jpg?s=612x612&w=0&k=20&c=7D-_PFacHKOD6pGYMaLa0FkR9PdKjXqmb1zZ4tIhEDQ="
},
{
title: "Weather Electron",
description: "Cross-platform desktop weather with city search.",
link: "https://enricjake.github.io/SimpleWeatherApp/",
technologies: ["Electron", "JS", "HTML"],
category: "desktop",
featured: false,
img: "https://blog.afi.io/content/images/size/w2000/2025/04/gg-weather-icon-1--1-.png"
},
{
title: "1942 — Arcade Shooter",
description: "Browser-based tribute to Capcom's classic 1942 with barrel roll, combos & procedural audio.",
link: "https://enricjake.github.io/1942/",
technologies: ["HTML5 Canvas", "JavaScript", "Web Audio API"],
category: "web",
featured: false,
img: "https://upload.wikimedia.org/wikipedia/en/5/52/1942_arcade_flyer.png"
},
{
title: "CONTRA — Jungle Run & Gun",
description: "Browser tribute to Konami's classic Contra with 8-directional aiming, 5 weapons, multi-level platforms & 3 stages.",
link: "https://enricjake.github.io/Contra/",
technologies: ["HTML5 Canvas", "JavaScript", "CSS"],
category: "web",
featured: false,
    img: "https://upload.wikimedia.org/wikipedia/en/6/65/Contra_cover.jpg"
  },
  {
    title: "Track & Field — 100m Dash",
    description: "Faithful 1:1 NES clone of Konami's classic sports game with alternating-button running physics and procedural Web Audio.",
    link: "https://enricjake.github.io/Track-Field/",
    technologies: ["HTML5 Canvas", "JavaScript", "Web Audio API"],
    category: "web",
    featured: false,
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Track%26Field_arcadeflyer.png/250px-Track%26Field_arcadeflyer.png"
  }
];

const elements = {
projectList: document.getElementById("projectList"),
mainNav: document.getElementById("mainNav"),
mobileMenuToggle: document.getElementById("mobileMenuToggle"),
backTop: document.getElementById("backTop"),
thankYouModal: document.getElementById("thankYouModal"),
closeModalBtn: document.getElementById("closeModal"),
contactForm: document.getElementById("contactForm"),
year: document.getElementById("year"),
header: document.querySelector("header"),
navLinks: document.querySelectorAll("nav a"),
sections: document.querySelectorAll("section:not(.hero)"),
footer: document.querySelector("footer"),
social: document.querySelector(".social")
};

function renderProjects() {
  if (!elements.projectList) return;

  const frag = document.createDocumentFragment();

  projects.forEach((project, i) => {
    const card = document.createElement("a");
    card.className = "project-card" + (project.featured ? " featured" : "");
    card.href = project.link;
    card.target = "_blank";
    card.rel = "noopener";

    const img = document.createElement("img");
    img.className = "project-image image-loading";
    img.loading = "lazy";
    img.alt = project.title;
    img.src = project.img;
    img.onload = () => img.classList.remove("image-loading");
    img.onerror = () => { img.src = FALLBACK_IMG; img.onerror = null; };
    card.appendChild(img);

    const content = document.createElement("div");
    content.className = "project-content";

    const h3 = document.createElement("h3");
    h3.textContent = project.title;
    content.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = project.description;
    content.appendChild(p);

    const tech = document.createElement("div");
    tech.className = "project-tech";
    project.technologies.forEach(t => {
      const span = document.createElement("span");
      span.textContent = t;
      tech.appendChild(span);
    });
    content.appendChild(tech);
    card.appendChild(content);

    frag.appendChild(card);
  });

  elements.projectList.innerHTML = "";
  elements.projectList.appendChild(frag);

  elements.projectList.querySelectorAll(".project-card").forEach(card => {
    setupCardTilt(card);
  });
}

function setupCardTilt(card) {
card.addEventListener("mousemove", (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const rotateX = ((y - centerY) / centerY) * -4;
const rotateY = ((x - centerX) / centerX) * 4;

card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
});

card.addEventListener("mouseleave", () => {
card.style.transform = "";
card.style.transitionDelay = "0s";
});
}

function scrollToSection(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute("href"));
target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleMobileMenu() {
if (!elements.mainNav || !elements.mobileMenuToggle) return;

const isActive = elements.mainNav.classList.toggle("active");
elements.mobileMenuToggle.setAttribute("aria-expanded", isActive);
}

function closeMobileMenu() {
if (window.innerWidth <= MOBILE_BREAKPOINT && elements.mainNav?.classList.contains("active")) {
elements.mainNav.classList.remove("active");
elements.mobileMenuToggle?.setAttribute("aria-expanded", "false");
}
}

function handleDocumentClick(e) {
if (!elements.mainNav?.contains(e.target) && !elements.mobileMenuToggle?.contains(e.target)) {
closeMobileMenu();
}
}

function handleScroll() {
const scrollY = window.scrollY;

if (elements.backTop) {
const show = scrollY > 400;
elements.backTop.classList.toggle("visible", show);
}

if (elements.header) {
elements.header.classList.toggle("scrolled", scrollY > 50);
}
}

async function handleFormSubmit(e) {
e.preventDefault();
if (!elements.contactForm) return;

const inputs = elements.contactForm.querySelectorAll("input[required], textarea[required]");
let hasError = false;

inputs.forEach(input => {
input.classList.remove("error");
void input.offsetWidth;
if (!input.value.trim()) {
input.classList.add("error");
hasError = true;
setTimeout(() => input.classList.remove("error"), 500);
} else {
input.classList.add("filled");
}
});

if (hasError) return;

const btn = elements.contactForm.querySelector('button[type="submit"]');
const originalText = btn.textContent;
btn.textContent = "Sending...";
btn.disabled = true;

try {
const res = await fetch(elements.contactForm.action, {
method: "POST",
body: new FormData(elements.contactForm),
headers: { "Accept": "application/json" }
});

if (res.ok) {
elements.contactForm.reset();
elements.contactForm.querySelectorAll(".filled").forEach(el => el.classList.remove("filled"));
showModal();
} else throw new Error();
} catch {
alert("Failed to send. Please try again.");
} finally {
btn.textContent = originalText;
btn.disabled = false;
}
}

function showModal() {
elements.thankYouModal?.classList.add("active");
}

function hideModal() {
elements.thankYouModal?.classList.remove("active");
}

function setupAnimations() {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      entry.target.classList.remove("fade-out");

      if (entry.target.id === "about") {
        const tags = entry.target.querySelectorAll(".project-tags span");
        tags.forEach((tag, i) => {
          tag.style.animation = `tagPop 0.4s ${0.3 + i * 0.08}s var(--ease) both`;
        });
      }

      if (entry.target.id === "work") {
        const cards = entry.target.querySelectorAll(".project-card");
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 0.1}s`;
          card.classList.add("revealed");
        });
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

elements.sections.forEach(s => observer.observe(s));
elements.footer && observer.observe(elements.footer);
elements.social && observer.observe(elements.social);
}

const debounce = (fn, ms) => {
let id;
return (...a) => (clearTimeout(id), id = setTimeout(fn, ms, ...a));
};

document.addEventListener("DOMContentLoaded", () => {
if (elements.year) elements.year.textContent = new Date().getFullYear();

renderProjects();
setupAnimations();

elements.mobileMenuToggle?.addEventListener("click", toggleMobileMenu);
elements.navLinks.forEach(link => link.addEventListener("click", (e) => {
scrollToSection.call(link, e);
closeMobileMenu();
}));
document.addEventListener("click", handleDocumentClick);

elements.contactForm?.addEventListener("submit", handleFormSubmit);

elements.closeModalBtn?.addEventListener("click", hideModal);
elements.thankYouModal?.addEventListener("click", e => e.target === elements.thankYouModal && hideModal());
document.addEventListener("keydown", e => e.key === "Escape" && hideModal());

  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(() => { handleScroll(); scrollTicking = false; });
    }
  });
elements.backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

window.addEventListener("resize", debounce(() => {
if (window.innerWidth > MOBILE_BREAKPOINT) {
elements.mainNav?.classList.remove("active");
}
}, 150));
});
