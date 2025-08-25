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
        const slideWidth = slides[0].offsetWidth;
        const gap = 20;
        const totalWidth = slides.length * (slideWidth + gap);
        
        if (position <= -totalWidth) {
            position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    // Remove any background styling
    track.style.background = 'none';
    document.querySelector('.carousel-container').style.background = 'none';

    // Start animation
    animate();

    // Animasi ketik untuk About Us
    const aboutText = `Pantai Della, Papua Barat 🌴🏖️ adalah surga kecil dengan laut biru jernih, pasir putih yang lembut, dan suasana alami yang bikin hati tenang. Di sini, kamu bisa menikmati indahnya panorama pantai sambil merasakan keramahan masyarakat sekitar. Nggak hanya liburan, setiap kunjunganmu juga ikut mendukung UMKM lokal lewat kuliner khas, hasil olahan laut segar, hingga kerajinan tangan yang unik. Cocok banget buat tempat healing sekaligus pengalaman wisata yang berkesan.`;
    const typingTarget = document.getElementById('typing-text');
    const cursor = document.querySelector('.typing-cursor');
    let idx = 0;

    function typeAbout() {
        if (idx <= aboutText.length) {
            typingTarget.innerHTML = aboutText.slice(0, idx);
            idx++;
            // Reduced delay: changed from 18+random to 10+random
            setTimeout(typeAbout, 10 + Math.random() * 20); // Faster typing speed with less random variation
        }
    }
    typeAbout();

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
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        let theme = 'light';
        
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            theme = 'dark';
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            theme = 'light';
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            // Reset button styles to light mode
            document.querySelector('.hero-btn').style = '';
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});

// ====== Script Asli (Desa Wisata) ======
// (semua kode navbar, theme toggle, dll tetap ada)

// ====== Script Tambahan untuk Gallery ======
const images = document.querySelectorAll('.gallery img');
const descBox = document.getElementById('descBox');
const descText = document.getElementById('descText');
const descImg = document.getElementById('descImg');
const descSource = document.getElementById('descSource');

if (images.length > 0) {
  images.forEach(img => {
    img.addEventListener('click', () => {
      images.forEach(i => i.classList.remove('active'));
      img.classList.add('active');

      descBox.classList.remove('show');
      descImg.classList.remove('active');

      setTimeout(() => {
        descText.innerHTML = img.getAttribute('data-desc') + 
          '<p><strong>Lokasi:</strong> Pantai ...</p>';
        descImg.src = img.getAttribute('data-img');
        descSource.textContent = "Source: IG";

        descBox.classList.add('show');
        setTimeout(() => descImg.classList.add('active'), 100);
      }, 250);
    });
  });
}

// ===== Travel Potential Turtle Animation =====
function moveTurtle() {
  const turtle = document.querySelector('.moving-turtle');
  const card = document.querySelector('.travel-card');
  if (!turtle || !card) return;

  const maxX = card.offsetWidth - 60;
  const maxY = card.offsetHeight - 60;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  turtle.style.left = randomX + 'px';
  turtle.style.top = randomY + 'px';

  const rotation = Math.random() * 360;
  turtle.style.transform = `rotate(${rotation}deg)`;

  const nextMove = 2000 + Math.random() * 3000;
  setTimeout(moveTurtle, nextMove);
}

window.addEventListener('load', () => {
  setTimeout(moveTurtle, 1000);
});
