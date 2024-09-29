// Add smooth scrolling when clicking on navigation links
// Add smooth scrolling when clicking on navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        smoothScroll(target, 1000); // 1000ms = 1 second scroll duration
    });
});

// Smooth scroll function with easing
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Calculate target position
    const startPosition = window.pageYOffset; // Get current scroll position
    let startTime = null; // Initialize start time

    // Animation function
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime; // Set start time
        const timeElapsed = currentTime - startTime; // Calculate time elapsed
        const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration); // Calculate scroll position
        window.scrollTo(0, run); // Scroll to the calculated position
        if (timeElapsed < duration) requestAnimationFrame(animation); // Continue animation if duration not reached
    }

    // Easing function for smooth acceleration and deceleration
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b; // Ease in
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b; // Ease out
    }

    requestAnimationFrame(animation); // Start the animation
}

// Highlight active navigation link on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    sections.forEach(section => {
        observer.observe(section); // Observe each section for visibility
    });
});
