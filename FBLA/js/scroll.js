document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollButton');
    if (scrollButton) {
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: document.getElementById('contactSection').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
});
