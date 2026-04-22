// ===== CONSTANTS =====
const MOBILE_BREAKPOINT = 600;

// ===== PROJECT DATA =====
const projects = [
    {
        title: "WinSet – Windows Toolkit",
        description: "One-click Windows tuning presets for gamers & devs.",
        link: "https://github.com/enricjake/WinSet",
        technologies: ["Python", "Tkinter", "pywin32"],
        category: "desktop",
        img: "https://wallpapercave.com/wp/wp9378857.jpg"
    },
    {
        title: "Bongolicious Cat",
        description: "Addictive cat clicker with upgrades & prestige system.",
        link: "https://enricjake.github.io/BongoliciousCat/",
        technologies: ["JavaScript", "Canvas", "CSS"],
        category: "web",
        img: "https://wallpapers-clan.com/wp-content/uploads/2024/03/bongo-cat-meme-gif-desktop-wallpaper-preview.gif"
    },
    {
        title: "Simple Trivia",
        description: "Multi-category quiz with local high-score storage.",
        link: "https://enricjake.github.io/SimpleTriviaGame/",
        technologies: ["JavaScript", "DOM", "Web Storage"],
        category: "web",
        img: "https://media.istockphoto.com/id/1469754711/vector/trivia-time-neon-sign-geometric-frame-decoration-quiz-show-label-on-brick-wall-vector-stock.jpg?s=612x612&w=0&k=20&c=7D-_PFacHKOD6pGYMaLa0FkR9PdKjXqmb1zZ4tIhEDQ="
    },
    {
        title: "Weather Electron",
        description: "Cross-platform desktop weather with city search.",
        link: "https://enricjake.github.io/SimpleWeatherApp/",
        technologies: ["Electron", "JS", "HTML"],
        category: "desktop",
        img: "https://blog.afi.io/content/images/size/w2000/2025/04/gg-weather-icon-1--1-.png"
    }
];

// ===== DOM ELEMENTS =====
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

// ===== RENDER PROJECTS =====
function renderProjects() {
    if (!elements.projectList) return;

    elements.projectList.innerHTML = projects.map(project => `
        <div class="project-card" data-link="${project.link}">
            <img src="${project.img}" alt="${project.title}" class="project-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x180/1a1a1a/888888?text=Image+Not+Available'">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
                </div>
            </div>
        </div>
    `).join("");

    // Add click listeners to cards
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            window.open(card.dataset.link, "_blank", "noopener");
        });
    });
}

// ===== SMOOTH SCROLL =====
function scrollToSection(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    if (!elements.mainNav || !elements.mobileMenuToggle) return;
    
    const isActive = elements.mainNav.classList.toggle("active");
    elements.mainNav.style.display = isActive ? "flex" : "none";
    elements.mobileMenuToggle.setAttribute("aria-expanded", isActive);
}

function closeMobileMenu() {
    if (window.innerWidth <= MOBILE_BREAKPOINT && elements.mainNav?.classList.contains("active")) {
        elements.mainNav.classList.remove("active");
        elements.mainNav.style.display = "none";
    }
}

function handleDocumentClick(e) {
    if (!elements.mainNav?.contains(e.target) && !elements.mobileMenuToggle?.contains(e.target)) {
        closeMobileMenu();
    }
}

// ===== SCROLL HANDLERS =====
function handleScroll() {
    const scrollY = window.scrollY;

    // Back to top button
    if (elements.backTop) {
        const show = scrollY > 400;
        elements.backTop.classList.toggle("visible", show);
    }

    // Header scroll state
    if (elements.header) {
        elements.header.classList.toggle("scrolled", scrollY > 50);
    }
}

// ===== CONTACT FORM =====
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
    } catch (err) {
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

// ===== SCROLL ANIMATIONS =====
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        });
    }, { threshold: 0.1 });

    elements.sections.forEach(s => observer.observe(s));
    elements.footer && observer.observe(elements.footer);
    elements.social && observer.observe(elements.social);
}

// ===== UTILITIES =====
const debounce = (fn, ms) => {
    let id;
    return (...a) => (clearTimeout(id), id = setTimeout(fn, ms, ...a));
};

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    // Set year
    if (elements.year) elements.year.textContent = new Date().getFullYear();

    // Render
    renderProjects();
    setupAnimations();

    // Mobile menu
    elements.mobileMenuToggle?.addEventListener("click", toggleMobileMenu);
    elements.navLinks.forEach(link => link.addEventListener("click", (e) => {
        scrollToSection(e);
        closeMobileMenu();
    }));
    document.addEventListener("click", handleDocumentClick);

    // Form
    elements.contactForm?.addEventListener("submit", handleFormSubmit);

    // Modal
    elements.closeModalBtn?.addEventListener("click", hideModal);
    elements.thankYouModal?.addEventListener("click", e => e.target === elements.thankYouModal && hideModal());
    document.addEventListener("keydown", e => e.key === "Escape" && hideModal());

    // Scroll handlers
    window.addEventListener("scroll", debounce(handleScroll, 50));
    elements.backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Resize
    window.addEventListener("resize", debounce(() => {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            elements.mainNav?.classList.remove("active");
        }
    }, 150));
});