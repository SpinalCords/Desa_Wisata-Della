document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) {
    console.error('[global-navbar] #navbar not found in DOM.');
    return;
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropbtns = document.querySelectorAll('.dropbtn');
  const navItems = document.querySelectorAll('.nav-item');
  const buttons = document.querySelectorAll('button');

  // --- Helper: keep mobile menu just under navbar ---
  function updateMobileTop() {
    if (mobileMenu && navbar) {
      mobileMenu.style.top = `${navbar.offsetHeight - 10}px`;
    }
  }

  // --- Toggle mobile menu and ensure navbar pinned while open ---
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      // Update accessibility attributes
      const isExpanded = this.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
      mobileMenu.setAttribute('aria-hidden', !isExpanded);

      // if opening, ensure navbar is pinned so menu sits below it
      if (mobileMenu.classList.contains('active')) {
        pinNav();
      }
      updateMobileTop();
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (mobileMenu && menuToggle && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      // Update accessibility attributes
      menuToggle.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    }
  });

  // Simple hover lift for dropdowns & nav-items
  [...dropbtns, ...navItems].forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.25s ease';
    });
    item.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // Ripple for buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    const existing = button.querySelector('.ripple');
    if (existing) existing.remove();
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }
  buttons.forEach(btn => btn.addEventListener('click', createRipple));

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        if (menuToggle) {
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', false);
          mobileMenu.setAttribute('aria-hidden', true);
        }
      }
    });
  });

  // --- Defensive check: look for old/inline scroll code in other script tags ---
  document.querySelectorAll('script').forEach(s => {
    const txt = s.innerText || '';
    if (txt.includes('navbar.style.top') || txt.includes('prevScrollpos') || txt.includes('pageYOffset')) {
      console.warn('[global-navbar] Found code in a script tag that may conflict with the navbar logic. Search for "navbar.style.top" or "prevScrollpos" and remove it to avoid conflicts.');
    }
  });

  // Remove any inline top style someone else might have set
  if (navbar.style && navbar.style.top) {
    navbar.style.top = '';
  }

  // MutationObserver: if some legacy code tries to set style.top, remove it immediately
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'style') {
        if (navbar.style.top) {
          // remove inline top override and re-assert our class-based control
          navbar.style.top = '';
          navbar.classList.add('nav--pinned');
          navbar.classList.remove('nav--unpinned');
        }
      }
    }
  });
  mo.observe(navbar, { attributes: true, attributeFilter: ['style'] });

  // --- Headroom-like scroll behavior (rAF throttled) ---
  let lastKnownScrollY = window.scrollY;
  let previousScrollY = lastKnownScrollY;
  let ticking = false;
  let state = 'pinned'; // 'pinned' or 'unpinned'
  let OFFSET = Math.max(navbar.offsetHeight + 10, 64);
  const TOLERANCE = { up: 8, down: 8 };

  navbar.classList.add('nav--pinned', 'nav--top');

  function pinNav() {
    if (state === 'pinned') return;
    navbar.classList.remove('nav--unpinned');
    navbar.classList.add('nav--pinned');
    state = 'pinned';
    navbar.style.pointerEvents = '';
  }

  function unpinNav() {
    if (state === 'unpinned') return;
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      pinNav();
      return;
    }
    navbar.classList.remove('nav--pinned');
    navbar.classList.add('nav--unpinned');
    state = 'unpinned';
    navbar.style.pointerEvents = 'none';
  }

  function onScroll() {
    lastKnownScrollY = window.scrollY;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    const currentY = lastKnownScrollY;
    const delta = currentY - previousScrollY;

    // ignore tiny changes
    if (Math.abs(delta) <= Math.max(TOLERANCE.up, TOLERANCE.down)) {
      ticking = false;
      return;
    }

    // always show when near top
    if (currentY <= 10) {
      navbar.classList.add('nav--top');
      pinNav();
    } else {
      navbar.classList.remove('nav--top');
      if (delta > 0 && currentY > OFFSET) {
        unpinNav();
      } else if (delta < 0) {
        pinNav();
      }
    }

    previousScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Recalc offset after resize and keep mobile menu aligned
  window.addEventListener('resize', () => {
    setTimeout(() => {
      OFFSET = Math.max(navbar.offsetHeight + 10, 64);
      updateMobileTop();
    }, 120);
  });

  // initial mobile menu top
  updateMobileTop();
});