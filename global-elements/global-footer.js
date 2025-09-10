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