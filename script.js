document.addEventListener('DOMContentLoaded', function() {
    // --- Navbar and UI ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropbtns = document.querySelectorAll('.dropbtn');
    const navItems = document.querySelectorAll('.nav-item');

    // Hamburger menu toggle with smooth animation
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        this.style.transform = this.style.transform === 'rotate(90deg)' 
            ? 'rotate(0deg)' 
            : 'rotate(90deg)';
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
            menuToggle.style.transform = 'rotate(0deg)';
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

    // --- Typing Animation ---
    function typeText(element, text, speed = 40, callback) {
        element.textContent = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        element.appendChild(cursor);
        let i = 0;
        function type() {
            if (i < text.length) {
                element.insertBefore(document.createTextNode(text[i]), cursor);
                i++;
                setTimeout(type, speed);
            } else {
                cursor.remove();
                if (callback) callback();
            }
        }
        type();
    }
    const explore = document.querySelector('.explore-text');
    const title = document.querySelector('.hero-title h1');
    const desc = document.querySelector('.hero-desc');
    if (explore && title && desc) {
        typeText(explore, '“ Explore ”', 50, function() {
            typeText(title, 'DELA 1001 OMBAK', 60, function() {
                typeText(desc, 'Kampung Della, Distrik Selemkai, Kabupaten Tambrauw, Papua Barat Daya.', 30);
            });
        });
    }

    // --- Carousel ---
    const track = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    // Set track width and image width for sliding effect
    track.style.width = `${images.length * 100}%`;
    images.forEach(img => img.style.width = `${100 / images.length}%`);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * (100 / images.length)}%)`;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Optional: swipe support for mobile
    let startX = null;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) prevBtn.click();
        else if (startX - endX > 40) nextBtn.click();
        startX = null;
    });

    // Initialize carousel position
    updateCarousel();
});