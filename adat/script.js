// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');  // debug

    // Utility: translate a single element
    function translateElement(el, langObj) {
        if (!el || !langObj) return;
        const key = el.getAttribute('data-i18n');
        if (!key) return;

        if (Object.prototype.hasOwnProperty.call(langObj, key)) {
            const value = langObj[key];
            if (typeof value === 'string' && /&[#\w]+;|<br|<span|<strong|<em/.test(value)) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        } else {
            console.warn('Missing translation for key:', key);
        }
    }

    // Applies translations to all elements currently in the DOM
    function applyTranslations(lang) {
        if (!window.translations || !window.translations[lang]) {
            console.error('No translations for language:', lang);
            return;
        }
        const langObj = window.translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            translateElement(el, langObj);
        });
        const langBtn = document.getElementById('language-toggle') || document.querySelector('.language-toggle');
        if (langBtn) {
            const span = langBtn.querySelector('span');
            if (span) {
                const labels = { id: 'Bahasa', en: 'EN', zh: '中文' };
                span.textContent = labels[lang] || lang;
            }
        } else {
            console.warn('Language toggle button not found when updating label');
        }
    }

    // Language Toggle logic
    const langBtn = document.getElementById('language-toggle') || document.querySelector('.language-toggle');
    console.log('langBtn', langBtn);
    let currentLang = localStorage.getItem('lang') || 'id';
    console.log('Starting language:', currentLang);

    function setLang(lang) {
        console.log('Setting language to:', lang);
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            console.log('Language toggle clicked');
            const langs = ['id', 'en', 'zh'];
            let idx = langs.indexOf(currentLang);
            if (idx === -1) idx = 0;
            idx = (idx + 1) % langs.length;
            setLang(langs[idx]);
        });
    } else {
        console.error('No language toggle button found — click listener not attached');
    }

    // Always call setLang once on load
    setLang(currentLang);

    // MutationObserver: translate newly added nodes dynamically
    const mutationObserver = new MutationObserver(mutations => {
        let didChange = false;
        for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length) {
                m.addedNodes.forEach(node => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return;
                    if (node.hasAttribute && node.hasAttribute('data-i18n')) {
                        translateElement(node, window.translations[currentLang]);
                    }
                    node.querySelectorAll && node.querySelectorAll('[data-i18n]').forEach(el => {
                        translateElement(el, window.translations[currentLang]);
                    });
                });
                didChange = true;
            }
            if (m.type === 'attributes' && m.attributeName === 'data-i18n' && m.target) {
                translateElement(m.target, window.translations[currentLang]);
                didChange = true;
            }
        }
        if (didChange) {
            clearTimeout(window.__translate_debounce);
            window.__translate_debounce = setTimeout(() => {
                applyTranslations(currentLang);
            }, 50);
        }
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-i18n']
    });

    // =========================
    // Theme Toggle
    // =========================
    const themeBtn = document.querySelector('.theme-toggle');
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeBtn && themeBtn.querySelector('i')) {
            themeBtn.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
        setTheme(localStorage.getItem('theme') || 'light');
    }

    // =========================
    // Mobile Menu
    // =========================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // =========================
    // Smooth Scrolling
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            // Only intercept when href is an internal anchor
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
            menuToggle?.classList.remove('active');
            mobileMenu?.classList.remove('active');
        });
    });

    // =========================
    // Fade-in Animations (IntersectionObserver)
    // =========================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.tradition-card, .value-card, .event-card, .intro-section, .traditions-section, .values-section, .events-section')
        .forEach(el => observer.observe(el));

    // =========================
    // Parallax Hero
    // =========================
    const hero = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        if (hero) hero.style.transform = `translateY(${window.scrollY * -0.5}px)`;
    });

    // =========================
    // Loader + Particles
    // =========================
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `<div class="loader-content"><div class="cultural-spinner"></div><p>Loading Cultural Heritage...</p></div>`;
    document.body.appendChild(loader);
    setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 500); }, 1500);

    setTimeout(() => {
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
        setTimeout(() => particlesContainer.remove(), 10000);
    }, 2000);
    
     let lastScroll = 0;
  const navbar = document.querySelector('nav');
  
  // Fungsi untuk mengontrol navbar saat scrolling
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
      // Scroll Down
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
      // Scroll Up
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });
});