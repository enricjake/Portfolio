// ===== PROJECT DATA =====
const projects = [
    {
        title: "Bongolicious Cat",
        description: "Addictive cat clicker with upgrades & prestige system.",
        link: "https://enricjake.github.io/BongoliciousCat/",
        technologies: ["JavaScript", "Canvas", "CSS"],
        category: "web",
        img: "https://imgs.search.brave.com/fA5Wmjj1krYYDlY0HKKImEAG_AJd74mmS1zvfNOkc2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/LmVtb2ppLmdnL2Vt/b2ppcy81MTgwX2Jv/bmdvY2F0LmdpZg.gif"
    },
    {
        title: "Simple Trivia",
        description: "Multi-category quiz with local high-score storage.",
        link: "https://enricjake.github.io/SimpleTriviaGame/",
        technologies: ["JavaScript", "DOM", "Web Storage"],
        category: "web",
        img: "https://imgs.search.brave.com/9xgkY0cCfX7GcoRBmerT5VjD93FvlO-qhp0l9sQiROs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIw/NjgzNDM2Ni92ZWN0/b3IvYS12aWJyYW50/LWNvbWljLXN0eWxl/LXRyaXZpYS1jaGFs/bGVuZ2UtYmFubmVy/LXdpdGgtYm9sZC10/eXBvZ3JhcGh5LWEt/eWVsbG93LWJ1cnN0/LWJhY2tncm91bmQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTdzaVdua0VaaWZR/amlwYmlKVVdJeVRQ/THFwTk9rZzI1OVNr/VHNySzRCYVU9"
    },
    {
        title: "WinSet – Windows Toolkit",
        description: "One-click Windows tuning presets for gamers & devs.",
        link: "https://github.com/enricjake/WinSet",
        technologies: ["Python", "Tkinter", "pywin32"],
        category: "desktop",
        img: "https://wallpapercave.com/wp/wp9378857.jpg"
    },
    {
        title: "Weather Electron",
        description: "Cross-platform desktop weather with city search.",
        link: "https://enricjake.github.io/SimpleWeatherApp/",
        technologies: ["Electron", "JS", "HTML"],
        category: "desktop",
        img: "https://cdn.pixabay.com/photo/2017/12/06/05/23/cloud-3001010_1280.png"
    }
];

// ===== TECH COLORS =====
const techColors = {
    'JavaScript': '#f7df1e',
    'Canvas': '#ff6b35',
    'CSS': '#1572b6',
    'DOM': '#ff6b35',
    'Web Storage': '#ff6b35',
    'Python': '#3776ab',
    'Tkinter': '#cc2927',
    'pywin32': '#cc2927',
    'Electron': '#47848f',
    'JS': '#f7df1e',
    'HTML': '#e34f26',
    'HTML5': '#e34f26',
    'Tkinter': '#cc2927',
    'pywin32': '#cc2927',
    'Windows API': '#00a4ef'
};

// ===== SELECT ELEMENTS =====
const projectList = document.getElementById("projectList");
const contactBtn = document.getElementById("contactBtn");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const contactForm = document.getElementById("contactForm");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mainNav = document.getElementById("mainNav");
const backToTopButton = document.getElementById("backTop");

// ===== RENDER PROJECTS =====
function renderProjects() {
    if (!projectList) return;
    
    projectList.innerHTML = "";
    
    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        const techBadges = project.technologies
            .map(tech => {
                const color = techColors[tech] || '#00ffcc';
                return `<span style="background: ${color}; color: ${getContrastColor(color)}">${tech}</span>`;
            })
            .join("");

        card.innerHTML = `
            <img src="${project.img}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">${techBadges}</div>
                <a href="${project.link}" class="project-btn" target="_blank" rel="noopener">View →</a>
            </div>
        `;

        projectList.appendChild(card);
    });
}

function getContrastColor(hexColor) {
    // Simple contrast function for badge text color
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// ===== SMOOTH SCROLL =====
function scrollToSection(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// ===== MOBILE MENU =====
function updateMobileMenuVisibility() {
    if (window.innerWidth <= 600) {
        mobileMenuToggle.style.display = 'flex';
        mainNav.style.display = 'none';
    } else {
        mobileMenuToggle.style.display = 'none';
        mainNav.style.display = 'flex';
        mainNav.classList.remove('active');
    }
}

function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    mainNav.style.display = mainNav.classList.contains('active') ? 'flex' : 'none';
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            mainNav.classList.remove('active');
            mainNav.style.display = 'none';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 600 && mainNav.classList.contains('active')) {
        if (!e.target.closest('nav')) {
            mainNav.classList.remove('active');
            mainNav.style.display = 'none';
        }
    }
});

// ===== BACK TO TOP =====
function handleScrollToTop() {
    if (window.pageYOffset > 400) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== CONTACT FORM =====
function handleContactFormSubmit(e) {
    e.preventDefault();
    alert('Thanks! I\'ll reply within 24 h.');
    contactForm.reset();
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections except hero
    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            observer.observe(section);
        }
    });
    
    // Observe footer
    const footer = document.querySelector('footer');
    if (footer) {
        observer.observe(footer);
    }
    
    // Observe social icons
    const socialContainer = document.querySelector('.social');
    if (socialContainer) {
        observer.observe(socialContainer);
    }
    
    // Trigger initial visibility
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= window.innerHeight * 0.1) {
                section.classList.add('visible');
            }
        });
    }, 100);
}

// ===== EVENT LISTENERS =====
navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
window.addEventListener('resize', updateMobileMenuVisibility);
window.addEventListener('scroll', handleScrollToTop);

if (backToTopButton) {
    backToTopButton.addEventListener('click', scrollToTop);
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

// ===== FOOTER YEAR =====
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateMobileMenuVisibility();
    setupScrollAnimations();
    updateFooterYear();
});