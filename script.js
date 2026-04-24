const MOBILE_BREAKPOINT = 600;

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

elements.projectList.innerHTML = projects.map((project, i) => `
<div class="project-card${project.featured ? " featured" : ""}" data-link="${project.link}" style="--card-delay: ${i * 0.1}s">
<img src="${project.img}" alt="${project.title}" class="project-image image-loading" loading="lazy" onload="this.classList.remove('image-loading')" onerror="this.src='https://via.placeholder.com/400x200/1a1a1a/888888?text=Preview'">
<div class="project-content">
<h3>${project.title}</h3>
<p>${project.description}</p>
<div class="project-tech">
${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
</div>
</div>
</div>
`).join("");

document.querySelectorAll(".project-card").forEach(card => {
card.addEventListener("click", () => {
window.open(card.dataset.link, "_blank", "noopener");
});
setupCardTilt(card);
});
}

function setupCardTilt(card) {
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
elements.sections.forEach(s => s.classList.add("visible"));
elements.footer && elements.footer.classList.add("visible");
elements.social && elements.social.classList.add("visible");
return;
}

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");

if (entry.target.id === "work") {
const cards = entry.target.querySelectorAll(".project-card");
cards.forEach((card, i) => {
card.style.opacity = "0";
card.style.transform = "translateY(30px)";
setTimeout(() => {
card.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
card.style.opacity = "1";
card.style.transform = "translateY(0)";
}, i * 100);
});
}
}
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

window.addEventListener("scroll", debounce(handleScroll, 50));
elements.backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

window.addEventListener("resize", debounce(() => {
if (window.innerWidth > MOBILE_BREAKPOINT) {
elements.mainNav?.classList.remove("active");
}
}, 150));
});
