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
            setTimeout(typeAbout, 18 + Math.random()*40);
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
});