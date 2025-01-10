function updateNavigation() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminLink = document.getElementById('adminLink');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutLink = document.getElementById('logoutLink');

    if (currentUser) {
        // User is logged in
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'inline';
        
        // Show admin link only for admin users
        if (adminLink) {
            adminLink.style.display = currentUser.role === 'admin' ? 'inline' : 'none';
        }
    } else {
        // User is logged out
        if (loginLink) loginLink.style.display = 'inline';
        if (signupLink) signupLink.style.display = 'inline';
        if (logoutLink) logoutLink.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
}

// Update navigation when the page loads
document.addEventListener('DOMContentLoaded', updateNavigation);
