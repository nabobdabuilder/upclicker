document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin.html';
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin.html'; // Redirect to admin panel
    } else if (username === 'user' && password === 'user123') {
        window.location.href = 'postings.html';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});
