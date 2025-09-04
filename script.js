document.addEventListener('DOMContentLoaded', function() {
    // --- Navbar and UI ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropbtns = document.querySelectorAll('.dropbtn');
    const navItems = document.querySelectorAll('.nav-item');

    // Hamburger menu toggle with smooth animation
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Add hover effect for nav items
    [...dropbtns, ...navItems].forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Ripple effect for buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        button.appendChild(ripple);
    }

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active'); // Reset hamburger icon
        }
    });

    // Smooth scroll for nav items
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Carousel ---
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-img');

    // Clone slides for infinite loop effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    let position = 0;
    let speed = 0.8;

    function animate() {
        position -= speed;
        // Reset position when first set of images is completely scrolled
        const slideWidth = slides[0] ? slides[0].offsetWidth : 0;
        const gap = 20;
        const totalWidth = slides.length * (slideWidth + gap);
        if (position <= -totalWidth) {
            position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    // Remove any background styling
    if (track) track.style.background = 'none';
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) carouselContainer.style.background = 'none';

    // Start animation
    if (slides.length > 0) animate();

    // Typing effect for About Us, always uses current language
    function runAboutTyping(lang) {
        const typingTarget = document.getElementById('typing-text');
        if (!typingTarget || !translations[lang] || !translations[lang].aboutTyping) return;
        typingTarget.innerHTML = '';
        let idx = 0;
        function typeAbout() {
            if (idx <= translations[lang].aboutTyping.length) {
                typingTarget.innerHTML = translations[lang].aboutTyping.slice(0, idx);
                idx++;
                setTimeout(typeAbout, 10 + Math.random() * 20);
            }
        }
        typeAbout();
    }

    // Add section sizing functionality
    function setSectionHeights() {
        const sections = document.querySelectorAll('section');
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        sections.forEach(section => {
            // Set minimum height to viewport height
            section.style.minHeight = `${viewportHeight}px`;
            // Set maximum width for larger screens
            section.style.maxWidth = '1920px'; // Standard laptop screen width
            section.style.margin = '0 auto'; // Center content
            
            // Add padding based on viewport size
            const padding = viewportWidth > 1200 ? '4rem' : '2rem';
            section.style.padding = padding;
        });
    }

    // Initialize section sizes
    setSectionHeights();

    // Update sizes on window resize
    window.addEventListener('resize', setSectionHeights);

    // Dark mode toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && themeToggle) {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = 'light';
            if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                theme = 'dark';
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            } else {
                theme = 'light';
                themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                const heroBtn = document.querySelector('.hero-btn');
                if (heroBtn) heroBtn.style = '';
            }
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // Language toggle
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

    if (langBtn) {
        langBtn.addEventListener('click', function() {
            const langs = ['id', 'en', 'zh'];
            let idx = langs.indexOf(currentLang);
            idx = (idx + 1) % langs.length;
            setLang(langs[idx]);
        });
    }

    // Set initial language
    setLang(currentLang);

    // Parallax effect on image hover
    document.querySelectorAll('.parallax-img').forEach(wrapper => {
        wrapper.addEventListener('mousemove', function(e) {
            const img = this.querySelector('img');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            img.style.transform = `scale(1.08) translate(${x/18}px,${y/18}px)`;
        });
        wrapper.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = '';
        });
    });

    // ====== Script Tambahan untuk Gallery ======
    const images = document.querySelectorAll('.gallery img');
    const descBox = document.getElementById('descBox');

    // Hide the description box initially (if exists)
    if (descBox) { descBox.style.display = 'none'; }
    const descText = document.getElementById('descText');
    const descImg = document.getElementById('descImg');
    const descSource = document.getElementById('descSource');

    // Create modal for enlarged images
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <img src="" alt="Enlarged image">
    `;
    document.body.appendChild(modal);

    // Activate overlay within each gallery item instead of floating text boxes
    function activateGalleryOverlay() {
      const items = document.querySelectorAll('.gallery-item');
      items.forEach((item) => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const textEl = overlay.querySelector('.gallery-text');
        const locEl = overlay.querySelector('.gallery-location');

        // Fill overlay content from data- attributes
        const desc = img.getAttribute('data-desc') || '';
        const loc = img.getAttribute('data-location') || '';
        textEl.textContent = desc;
        locEl.innerHTML = `<strong>Lokasi:</strong> ${loc}`;

        // Click to activate this item overlay, deactivate others
        img.addEventListener('click', () => {
          images.forEach(i => i.classList.remove('active'));
          document.querySelectorAll('.gallery-item').forEach(it => it.classList.remove('active'));
          img.classList.add('active');
          item.classList.add('active');
        });

        // Double click to open modal
        img.addEventListener('dblclick', () => {
          const modalImg = modal.querySelector('img');
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modal.classList.add('active');
        });

        // Learn more button (per-item)
        const btn = overlay.querySelector('.gallery-learn-more');
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLearnMoreCard(img);
          });
        }
      });
    }

    if (images.length > 0) {
      activateGalleryOverlay();
      // Start with all images flat; do not activate any by default
    }

    // ===== Learn More Card Functionality =====
    // Initialize learnMoreCard overlay once on DOMContentLoaded
    let learnMoreCard;

    learnMoreCard = document.querySelector('.learn-more-card-overlay');

    if (!learnMoreCard) {
      learnMoreCard = document.createElement('div');
      learnMoreCard.className = 'learn-more-card-overlay';
      learnMoreCard.innerHTML = `
        <div class="learn-more-card">
          <button class="close-card-btn"></button>
          <div class="card-image-container">
            <img src="" alt="Card Image" class="card-image">
          </div>
          <div class="card-description">
            <p></p>
          </div>
        </div>
      `;
      document.body.appendChild(learnMoreCard);
    }

    // Close card when clicking outside or close button
    learnMoreCard.addEventListener('click', (e) => {
      if (e.target === learnMoreCard || e.target.classList.contains('close-card-btn')) {
        learnMoreCard.classList.remove('active');
      }
    });

    // Function to show the learn more card
    function showLearnMoreCard(imgElement) {
      if (!learnMoreCard) return;

      const cardImage = learnMoreCard.querySelector('.card-image');
      const cardDesc = learnMoreCard.querySelector('.card-description p');

      // Get image and description from the clicked gallery item
      const imgSrc = imgElement.src;
      const imgAlt = imgElement.alt;
      const description = imgElement.getAttribute('data-desc') || 'Deskripsi tidak tersedia';

      // Set card content
      cardImage.src = imgSrc;
      cardImage.alt = imgAlt;
      cardDesc.textContent = description;

      // Show the card
      learnMoreCard.classList.add('active');
    }

    // Close card with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && learnMoreCard.classList.contains('active')) {
        learnMoreCard.classList.remove('active');
      }
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    });

    // ===== Travel Potential Turtle Animation =====
    function moveTurtle() {
      const turtle = document.querySelector('.moving-turtle');
      const card = document.querySelector('.travel-card');
      if (!turtle || !card) return;

      const maxX = card.offsetWidth - 60;
      const maxY = card.offsetHeight - 60;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      // pindah pelan ke posisi baru
      turtle.style.left = randomX + 'px';
      turtle.style.top = randomY + 'px';

      // rotasi juga smooth
      const rotation = Math.random() * 360;
      turtle.style.transform = `rotate(${rotation}deg)`;

      // lama gerakan disamakan dengan transition
      const nextMove = 4000 + Math.random() * 2000;
      setTimeout(moveTurtle, nextMove);
    }

    window.addEventListener('load', () => {
      setTimeout(moveTurtle, 1000);
    });

    // === JS: Animasi Scroll Reveal untuk Rules ===
    const cards = document.querySelectorAll(".rules-card, .activity-card");

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 50) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // jalanin pas load awal

    // Footer Scroll Reveal
    const reveals = document.querySelectorAll(".reveal");

    const revealFooterOnScroll = () => {
      const windowHeight = window.innerHeight;
      reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
          el.classList.add('show');
        }
      });
    };

    window.addEventListener("scroll", revealFooterOnScroll);
    revealFooterOnScroll();

    // Footer Reveal Animation
    const footerSections = document.querySelectorAll('.footer-section');
    const observerFooter = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observerFooter.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    footerSections.forEach(section => {
      observerFooter.observe(section);
    });
});

// test