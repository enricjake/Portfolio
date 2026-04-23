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
    navLinks: document.querySelectorAll("#mainNav a"),
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

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const nav = document.getElementById("mainNav");
    const toggle = document.getElementById("mobileMenuToggle");
    if (!nav || !toggle) return;
    
    nav.classList.toggle("active");
    const isActive = nav.classList.contains("active");
    toggle.setAttribute("aria-expanded", isActive);
}

// ===== SCROLL ANIMATIONS =====
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggle visible class based on whether element is in viewport
            // This makes animations work both when scrolling down AND up
            entry.target.classList.toggle("visible", entry.isIntersecting);
        });
    }, { threshold: 0.1 });

    elements.sections.forEach(s => observer.observe(s));
    elements.footer && observer.observe(elements.footer);
}

// ===== HANDLE SCROLL =====
function handleScroll() {
    const scrollY = window.scrollY;

    // Header scrolled state
    if (elements.header) {
        elements.header.classList.toggle("scrolled", scrollY > 50);
    }

    // Back to top button visibility
    if (elements.backTop) {
        elements.backTop.classList.toggle("visible", scrollY > 400);
    }
}

// ===== MODAL =====
function showModal() {
    if (elements.thankYouModal) {
        elements.thankYouModal.classList.add("active");
    }
}

function hideModal() {
    if (elements.thankYouModal) {
        elements.thankYouModal.classList.remove("active");
    }
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const form = elements.contactForm;
    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = form.querySelector("button[type='submit']");

    if (!nameInput || !emailInput || !messageInput || !submitBtn) return;

    // Start with disabled visual state
    submitBtn.disabled = true;

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function checkFormValidity() {
        const isNameValid = nameInput.value.trim() !== "";
        const isEmailValid = validateEmail(emailInput.value.trim());
        const isMessageValid = messageInput.value.trim() !== "";

        if (isNameValid && isEmailValid && isMessageValid) {
            submitBtn.classList.add("ready");
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove("ready");
            submitBtn.disabled = true;
        }
    }

    // Add event listeners
    nameInput.addEventListener("input", checkFormValidity);
    emailInput.addEventListener("input", checkFormValidity);
    messageInput.addEventListener("input", checkFormValidity);
}

// ===== FORM SUBMISSION =====
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;

    try {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.classList.remove("ready");

        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            form.reset();
            showModal();
            // Re-run validation to reset button state
            const event = new Event('input');
            form.querySelector('#name').dispatchEvent(event);
        } else {
            throw new Error("Form submission failed");
        }
    } catch (error) {
        alert("Something went wrong. Please try again or email me directly.");
        submitBtn.classList.add("ready");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
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
    setupFormValidation();

    // Mobile menu toggle
    elements.mobileMenuToggle?.addEventListener("click", toggleMobileMenu);

    // Nav links - scroll and close menu
    document.querySelectorAll("#mainNav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            target?.scrollIntoView({ behavior: "smooth" });
            
            // Close mobile menu if open
            const nav = document.getElementById("mainNav");
            if (nav) {
                nav.classList.remove("active");
                nav.style.display = ""; // Clear inline styles just in case
                const toggle = document.getElementById("mobileMenuToggle");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Logo link - smooth scroll to top
    const logoLink = document.querySelector(".logo");
    if (logoLink) {
        logoLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Form
    elements.contactForm?.addEventListener("submit", handleFormSubmit);

    // Modal
    elements.closeModalBtn?.addEventListener("click", hideModal);
    elements.thankYouModal?.addEventListener("click", e => e.target === elements.thankYouModal && hideModal());
    document.addEventListener("keydown", e => e.key === "Escape" && hideModal());

    // Scroll handlers
    window.addEventListener("scroll", debounce(handleScroll, 50));
    elements.backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Resize cleanup
    window.addEventListener("resize", debounce(() => {
        const nav = document.getElementById("mainNav");
        if (nav && window.innerWidth > MOBILE_BREAKPOINT) {
            nav.classList.remove("active");
            nav.style.display = ""; // Clear inline styles
            const toggle = document.getElementById("mobileMenuToggle");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
    }, 150));

    // Trigger initial scroll check
    handleScroll();
});