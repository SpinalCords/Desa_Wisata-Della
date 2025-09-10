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

  // --- Theme Toggle (same behavior as homepage) ---
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeToggle?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
      if (menuToggle) {
        menuToggle.querySelectorAll('span').forEach(span => {
          span.style.backgroundColor = '#88AFE6'; // blue color for dark mode
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

  // --- Language Toggle + Apply Translations (mirrors homepage) ---
  const languageToggle = document.querySelector('.language-toggle');

  function applyTranslations(lang) {
    const t = (window.translations && window.translations[lang]) || (window.translations && window.translations.id) || {};
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);

    // Navbar dropdowns
    const navDropdowns = document.querySelectorAll('.nav-links .dropdown');
    if (navDropdowns.length >= 1) {
      const profileDrop = navDropdowns[0];
      const profileBtn = profileDrop.querySelector('.dropbtn');
      const links1 = profileDrop.querySelectorAll('.dropdown-content a');
      if (profileBtn && t.nav?.profile) profileBtn.textContent = t.nav.profile;
      if (links1[0] && t.nav?.about) links1[0].textContent = t.nav.about;
      if (links1[1] && t.nav?.home) links1[1].textContent = t.nav.home;
    }
    if (navDropdowns.length >= 2) {
      const wisataDrop = navDropdowns[1];
      const wisataBtn = wisataDrop.querySelector('.dropbtn');
      const links2 = wisataDrop.querySelectorAll('.dropdown-content a');
      if (wisataBtn && t.nav?.wisata) wisataBtn.textContent = t.nav.wisata;
      if (links2[0] && t.nav?.touristAttractive) links2[0].textContent = t.nav.touristAttractive;
      if (links2[1] && t.nav?.travelPotential) links2[1].textContent = t.nav.travelPotential;
      if (links2[2] && t.nav?.facilities) links2[2].textContent = t.nav.facilities;
      if (links2[3] && t.nav?.rules) links2[3].textContent = t.nav.rules;
      if (links2[4] && t.nav?.activities) links2[4].textContent = t.nav.activities;
    }
    const meetUs = document.querySelector('.nav-links .nav-item');
    if (meetUs && t.nav?.meetus) meetUs.textContent = t.nav.meetus;

    // Mobile
    const languageSpan = document.querySelector('.language-toggle span');
    if (languageSpan && t.ui?.language) languageSpan.textContent = t.ui.language;

    // Page title and description (facilities)
    const titleEl = document.querySelector('[data-translate="facilities.title"]');
    if (titleEl && t.facilities?.title) titleEl.textContent = t.facilities.title;
    const descEl = document.querySelector('[data-translate="facilities.description"]');
    if (descEl && t.facilities?.description) descEl.textContent = t.facilities.description;

    // Facility items (names, desc, price, button)
    const cards = document.querySelectorAll('.facility-card');
    const items = t.facilities?.items || [];
    cards.forEach((card, i) => {
      const name = card.querySelector(`[data-facility-name="${i}"]`);
      const desc = card.querySelector(`[data-facility-desc="${i}"]`);
      const price = card.querySelector(`[data-facility-price="${i}"]`);
      const btn = card.querySelector('.btn-pesan');
      if (items[i]?.name && name) name.textContent = items[i].name;
      if (items[i]?.desc && desc) desc.textContent = items[i].desc;
      if (items[i]?.price && price) price.textContent = items[i].price;
      if (btn && t.facilities?.bookButton) btn.lastChild.textContent = ` ${t.facilities.bookButton}`;
    });
  }

  // Build simple language dropdown under mobile menu
  const mobileMenuEl = document.querySelector('.mobile-menu');
  if (languageToggle && mobileMenuEl) {
    const langMenu = document.createElement('div');
    langMenu.className = 'lang-menu';
    langMenu.style.display = 'none';
    function renderLangMenuLabels() {
      const currentLang = localStorage.getItem('lang') || 'id';
      const names = (window.translations && window.translations[currentLang]?.langName) || { id: 'Indonesia', en: 'English', zh: '中文' };
      langMenu.innerHTML = '';
      ['id','en','zh'].forEach(code => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'mobile-lang-item';
        b.dataset.lang = code;
        b.textContent = names[code] || code;
        langMenu.appendChild(b);
      });
    }
    renderLangMenuLabels();
    mobileMenuEl.appendChild(langMenu);

    languageToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLangMenuLabels();
      langMenu.style.display = langMenu.style.display === 'none' ? 'block' : 'none';
    });
    langMenu.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      applyTranslations(btn.dataset.lang);
      langMenu.style.display = 'none';
    });
    document.addEventListener('click', (e) => {
      if (!langMenu.contains(e.target) && !languageToggle.contains(e.target)) {
        langMenu.style.display = 'none';
      }
    });
  }

  // Initialize language on load
  const savedLang = localStorage.getItem('lang') || 'id';
  applyTranslations(savedLang);

  // --- WhatsApp Booking: ensure click opens WhatsApp ---
  document.querySelectorAll('.btn-pesan').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow native anchor navigation if href is set
      const href = btn.getAttribute('href');
      if (href) {
        // make sure it opens in new tab and has target
        btn.setAttribute('target', '_blank');
        return; // let anchor default work
      }
      e.preventDefault();
      const itemName = btn.closest('.facility-card')?.querySelector('h2')?.textContent?.trim() || 'Fasilitas';
      const phone = '6281234567890';
      const text = encodeURIComponent(`Halo, saya ingin memesan ${itemName}`);
      const url = `https://wa.me/${phone}?text=${text}`;
      window.open(url, '_blank');
    });
  });

  // --- Reveal-on-scroll for cards ---
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
