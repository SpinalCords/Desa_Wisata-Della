document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar and Mobile Menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // Ripple effect for all buttons (including Pesan)
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    ripple.classList.add('ripple');
    const existing = button.querySelector('.ripple');
    if (existing) existing.remove();
    button.appendChild(ripple);
  }
  document.querySelectorAll('button, .btn-pesan').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // --- Theme Toggle ---
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeToggle?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
      if (menuToggle) {
        menuToggle.querySelectorAll('span').forEach(span => {
          span.style.backgroundColor = '#88AFE6';
        });
      }
    }
  }
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const icon = themeToggle.querySelector('i');
    if (icon) icon.classList.replace(isDark ? 'fa-sun' : 'fa-moon', isDark ? 'fa-moon' : 'fa-sun');
    if (menuToggle) {
      menuToggle.querySelectorAll('span').forEach(span => {
        span.style.backgroundColor = isDark ? 'white' : '#88AFE6';
      });
    }
  });

  // --- Language Toggle + Translations ---
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

  setLang(currentLang);

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

  // --- WhatsApp Booking ---
  document.querySelectorAll('.btn-pesan').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href) {
        btn.setAttribute('target', '_blank');
        return;
      }
      e.preventDefault();
      const itemName = btn.closest('.facility-card')?.querySelector('h2')?.textContent?.trim() || 'Fasilitas';
      const phone = '6281234567890';
      const text = encodeURIComponent(`Halo, saya ingin memesan ${itemName}`);
      const url = `https://wa.me/${phone}?text=${text}`;
      window.open(url, '_blank');
    });
  });

  // --- Reveal-on-scroll ---
  const cards = document.querySelectorAll('.facility-card');
  const reveal = () => {
    const wh = window.innerHeight;
    cards.forEach(c => {
      const top = c.getBoundingClientRect().top;
      if (top < wh - 60) c.classList.add('visible');
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();
});