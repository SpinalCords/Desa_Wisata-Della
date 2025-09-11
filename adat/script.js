// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.querySelector('.language-toggle');
    let currentLang = localStorage.getItem('lang') || 'id';

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    // Cycle language: id -> en -> zh -> id ...
    langBtn.addEventListener('click', function() {
        const langs = ['id', 'en', 'zh'];
        let idx = langs.indexOf(currentLang);
        idx = (idx + 1) % langs.length;
        setLang(langs[idx]);
    });

    // Set initial language
    setLang(currentLang);
});



// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update theme button icon
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    themeBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Set initial theme
    setTheme(currentTheme);
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
});

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll('.tradition-card, .value-card, .event-card, .intro-section, .traditions-section, .values-section, .events-section');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Cultural card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const traditionCards = document.querySelectorAll('.tradition-card');

    traditionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Cultural pattern animation
document.addEventListener('DOMContentLoaded', function() {
    const culturalElements = document.querySelectorAll('.tradition-card, .value-card, .event-card');

    culturalElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('cultural-animation');
    });
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .tradition-card, .value-card, .event-card');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="cultural-spinner"></div>
            <p>Loading Cultural Heritage...</p>
        </div>
    `;
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Add CSS for loader
const loaderStyles = `
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--cultural-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }

    .loader-content {
        text-align: center;
        color: var(--cultural-primary);
    }

    .cultural-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(139, 69, 19, 0.1);
        border-left: 4px solid var(--cultural-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loaderStyles;
document.head.appendChild(styleSheet);

// Cultural storytelling animation
document.addEventListener('DOMContentLoaded', function() {
    const traditionCards = document.querySelectorAll('.tradition-card');

    traditionCards.forEach(card => {
        const icon = card.querySelector('.tradition-icon');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');

        // Add entrance animation
        [icon, title, description].forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        });
    });
});

// Enhanced mobile responsiveness
window.addEventListener('resize', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.setAttribute('aria-label', 'Toggle mobile menu');

    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.setAttribute('aria-label', 'Toggle theme');

    const langBtn = document.querySelector('.language-toggle');
    langBtn.setAttribute('aria-label', 'Change language');

    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.tradition-card, .value-card, .event-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.querySelector('.language-toggle');
    let currentLang = localStorage.getItem('lang') || 'id';

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update typing effect for About section
        runAboutTyping(lang);
    }

    // Cycle language: id -> en -> zh -> id ...
    langBtn.addEventListener('click', function() {
        const langs = ['id', 'en', 'zh'];
        let idx = langs.indexOf(currentLang);
        idx = (idx + 1) % langs.length;
        setLang(langs[idx]);
    });

    // Set initial language
    setLang(currentLang);
});

// Dummy typing effect function for About section
function runAboutTyping(lang) {
    // You can implement typing animation here if needed
}

// Cultural celebration effect
function createCulturalParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cultural-particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'cultural-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
        particlesContainer.remove();
    }, 10000);
}

// Trigger cultural particles on page load
window.addEventListener('load', function() {
    setTimeout(createCulturalParticles, 2000);
});

// Add particle styles
const particleStyles = `
    .cultural-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    .cultural-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--cultural-primary);
        border-radius: 50%;
        animation: float 3s ease-in-out infinite;
        opacity: 0.6;
    }

    @keyframes float {
        0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        50% { opacity: 1; transform: translateY(50vh) rotate(180deg); }
    }
`;

const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// Remove footer element as requested

