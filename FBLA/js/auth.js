// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

function switchModal(closeModalId, openModalId) {
    closeModal(closeModalId);
    openModal(openModalId);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // Get stored user data
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = allUsers.find(u => u.email === email);
        
        if (user && user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', user.role === 'admin');
            closeModal('loginModal');
            updateAuthUI();
        } else {
            alert('Invalid email or password. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

// Handle Signup
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const role = document.getElementById('signupRole').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            alert('An account with this email already exists.');
            return;
        }

        // Create new user
        const newUser = {
            name,
            email,
            password,
            role,
            applications: []
        };
        
        // Add to users array
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set as current user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', role === 'admin');
        
        closeModal('signupModal');
        updateAuthUI();
        alert('Account created successfully!');
        
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
}

// Handle Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    updateAuthUI();
    // Redirect to home page if on admin page
    if (window.location.href.includes('admin.html')) {
        window.location.href = '/';
    }
}

// Handle Job Application
async function handleJobApplication(jobId, applicationData) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please login to apply for jobs');
            openModal('loginModal');
            return false;
        }

        // Get all users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        
        if (userIndex === -1) {
            alert('User not found. Please try logging in again.');
            return false;
        }

        // Add application to user's applications
        const application = {
            jobId,
            ...applicationData,
            date: new Date().toISOString(),
            status: 'pending'
        };

        users[userIndex].applications = users[userIndex].applications || [];
        users[userIndex].applications.push(application);

        // Update both users array and current user
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        return true;
    } catch (error) {
        console.error('Application error:', error);
        alert('Failed to submit application. Please try again.');
        return false;
    }
}

// Update UI based on auth state
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const adminLink = document.getElementById('adminLink');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutLink = document.getElementById('logoutLink');
    
    if (currentUser && isLoggedIn) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        adminLink.style.display = currentUser.role === 'admin' ? 'inline' : 'none';
    } else {
        loginLink.style.display = 'inline';
        signupLink.style.display = 'inline';
        logoutLink.style.display = 'none';
        adminLink.style.display = 'none';
    }
}

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);

// Generic success popup
function showSuccessPopup(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'successOverlay';
    overlay.style.display = 'block';

    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.id = 'successPopup';
    popup.style.display = 'block';

    const titleElem = document.createElement('h3');
    titleElem.textContent = title;

    const messageElem = document.createElement('p');
    messageElem.textContent = message;

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.onclick = closeSuccessPopup;

    popup.appendChild(titleElem);
    popup.appendChild(messageElem);
    popup.appendChild(okButton);

    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

function closeSuccessPopup() {
    const overlay = document.getElementById('successOverlay');
    const popup = document.getElementById('successPopup');
    if (overlay) overlay.remove();
    if (popup) popup.remove();
}

// Login required popup
function showLoginPrompt(action) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'loginPromptOverlay';
    overlay.style.display = 'block';

    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.id = 'loginPromptPopup';
    popup.style.display = 'block';

    const title = document.createElement('h3');
    title.textContent = 'Login Required';

    const message = document.createElement('p');
    message.textContent = `Please login to ${action}`;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '1rem';
    buttonContainer.style.justifyContent = 'center';

    const loginBtn = document.createElement('button');
    loginBtn.textContent = 'Login';
    loginBtn.onclick = function() {
        closeLoginPrompt();
        openModal('loginModal');
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = closeLoginPrompt;

    buttonContainer.appendChild(loginBtn);
    buttonContainer.appendChild(cancelBtn);

    popup.appendChild(title);
    popup.appendChild(message);
    popup.appendChild(buttonContainer);

    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

function closeLoginPrompt() {
    const overlay = document.getElementById('loginPromptOverlay');
    const popup = document.getElementById('loginPromptPopup');
    if (overlay) overlay.remove();
    if (popup) popup.remove();
}

function checkLoginAndProceed(action, callback) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showLoginPrompt(action);
        return false;
    }
    if (callback) callback();
    return true;
}
