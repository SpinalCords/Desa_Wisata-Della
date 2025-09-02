// Combined functionality for theme toggle and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(currentTheme + '-theme');

    // Update icon based on current theme
    updateThemeIcon(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Remove current theme class and add new one
        body.classList.remove(currentTheme + '-theme');
        body.classList.add(newTheme + '-theme');

        // Save theme preference to localStorage
        localStorage.setItem('theme', newTheme);

        // Update icon
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // Sun icon for dark theme (to switch to light)
        } else {
            themeIcon.className = 'fas fa-moon'; // Moon icon for light theme (to switch to dark)
        }
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
});
