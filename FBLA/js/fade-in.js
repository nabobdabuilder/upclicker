document.addEventListener('DOMContentLoaded', () => {
    // Initial animation setup for static elements
    const staticElements = document.querySelectorAll('.service-box, .team-member, .contact-form, .form-container');
    staticElements.forEach(element => {
        if (!element) return;
        element.classList.add('fade-in');
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-100px 0px'
    });

    // Observe static elements
    staticElements.forEach(element => {
        observer.observe(element);
    });

    // Function to handle dynamic job listings
    const handleJobListings = () => {
        const jobCards = document.querySelectorAll('.job-card');
        jobCards.forEach(card => {
            if (!card.classList.contains('fade-in')) {
                card.classList.add('fade-in');
                observer.observe(card);
            }
        });
    };

    // Initial check for job listings
    handleJobListings();

    // Set up a MutationObserver to watch for new job listings
    const jobListingsSection = document.getElementById('jobListings');
    if (jobListingsSection) {
        const mutationObserver = new MutationObserver(() => {
            // Small delay to ensure DOM is updated
            setTimeout(handleJobListings, 0);
        });
        mutationObserver.observe(jobListingsSection, { 
            childList: true, 
            subtree: true 
        });
    }
});
