// Combined functionality for fasilitas page
document.addEventListener('DOMContentLoaded', function() {
    // --- Navbar and UI ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropbtns = document.querySelectorAll('.dropbtn');
    const navItems = document.querySelectorAll('.nav-item');

    // Hamburger menu toggle with smooth animation
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Add hover effect for nav items
    [...dropbtns, ...navItems].forEach(item => {
        if (item) {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
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
        if (mobileMenu && menuToggle && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
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

    // Dark mode toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (themeToggle) {
            const themeIcon = themeToggle.querySelector('i');
            if (themeIcon) {
                if (currentTheme === 'dark') {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                }
            }
        }
    }

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = 'light';

            if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                theme = 'dark';
                const themeIcon = themeToggle.querySelector('i');
                if (themeIcon) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                }
            } else {
                theme = 'light';
                const themeIcon = themeToggle.querySelector('i');
                if (themeIcon) {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
                // Reset button styles to light mode
                const heroBtn = document.querySelector('.hero-btn');
                if (heroBtn) {
                    heroBtn.style = '';
                }
            }

            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

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
