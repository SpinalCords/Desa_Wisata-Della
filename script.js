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
    const slides = document.querySelectorAll('.carousel-img');

    // Clone slides for infinite loop effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    let position = 0;
    let speed = 0.8; // Increased speed from 0.3 to 0.8

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

    // Start animation
    animate();

    // Optional: Pause on hover
    track.addEventListener('mouseenter', () => {
        speed = 0;
    });

    track.addEventListener('mouseleave', () => {
        speed = 0.8; // Make sure to match the new speed here too
    });
});