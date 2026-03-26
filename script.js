// ===== PROJECT DATA =====
const projects = [
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
        img: "https://blog.afi.io/content/images/size/w2000/2025/04/gg-weather-icon-1--1-.png"
    }
];

// ===== SELECT ELEMENTS =====
const projectList = document.getElementById("projectList");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const contactForm = document.getElementById("contactForm");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mainNav = document.getElementById("mainNav");
const backToTopButton = document.getElementById("backTop");
const thankYouModal = document.getElementById("thankYouModal");
const closeModalBtn = document.getElementById("closeModal");

// ===== RENDER PROJECTS =====
function renderProjects() {
    if (!projectList) return;
    
    projectList.innerHTML = "";
    
    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        const techBadges = project.technologies
            .map(tech => {
                return `<span style="background: #00ffcc; color: #0a0a0a">${tech}</span>`;
            })
            .join("");

        card.innerHTML = `
            <img src="${project.img}" alt="${project.title}" class="project-image" loading="lazy">
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
    if (!mobileMenuToggle || !mainNav) return;
    
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
    if (!mainNav || !mobileMenuToggle) return;
    
    const isActive = mainNav.classList.toggle('active');
    mainNav.style.display = isActive ? 'flex' : 'none';
    mobileMenuToggle.setAttribute('aria-expanded', isActive.toString());
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
    if (!backToTopButton) return;
    
    if (window.pageYOffset > 400) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== CONTACT FORM =====
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit to Formspree
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showThankYouModal();
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

function showThankYouModal() {
    thankYouModal.classList.add('active');
}

function hideThankYouModal() {
    thankYouModal.classList.remove('active');
}

//
// ===== INIT =====
//
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateMobileMenuVisibility();
    setupScrollAnimations();
    updateFooterYear();
});

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.3, 0.7]
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            
            if (entry.isIntersecting) {
                // Fade in based on how much of the element is visible
                if (entry.intersectionRatio >= 0.1) {
                    element.classList.add('visible');
                }
            } else {
                // Fade out when element is no longer visible
                element.classList.remove('visible');
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
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

if (navLinks.length) {
    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

window.addEventListener('resize', debounce(updateMobileMenuVisibility, 150));
window.addEventListener('scroll', handleScrollToTop);

if (backToTopButton) {
    backToTopButton.addEventListener('click', scrollToTop);
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideThankYouModal);
}

// Close modal when clicking overlay
if (thankYouModal) {
    thankYouModal.addEventListener('click', (e) => {
        if (e.target === thankYouModal) {
            hideThankYouModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && thankYouModal.classList.contains('active')) {
        hideThankYouModal();
    }
});

// ===== FOOTER YEAR =====
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
