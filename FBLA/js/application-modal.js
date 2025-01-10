function createApplicationModal() {
    // Create modal HTML
    const modalHtml = `
        <div id="application-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2>Job Application</h2>
                <form id="application-form" class="job-form">
                    <input type="hidden" id="jobId" name="jobId">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required>
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" min="16" max="100" required>
                    </div>
                    <div class="form-group">
                        <label for="birthday">Birthday</label>
                        <input type="date" id="birthday" name="birthday" required>
                    </div>
                    <div class="form-group">
                        <label for="resume">Resume (PDF, DOC, DOCX)</label>
                        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
                    </div>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Add event listeners
    const modal = document.getElementById('application-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('application-form');

    closeBtn.onclick = function() {
        closeApplicationModal();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            closeApplicationModal();
        }
    }

    // Add minimal styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        #application-modal.modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #application-modal .modal-content {
            background: var(--purple-primary);
            padding: 2rem;
            border: 2px solid var(--gold-primary);
            border-radius: 15px;
            width: 90%;
            max-width: 500px;
            text-align: center;
            position: relative;
        }

        #application-modal h2 {
            color: var(--white);
            margin-bottom: 2rem;
            text-align: center;
        }

        #application-modal .modal-close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            color: var(--white);
            font-size: 24px;
            cursor: pointer;
        }

        #application-modal .job-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        #application-modal .form-group {
            width: 100%;
            text-align: center;
        }

        #application-modal .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--white);
            text-align: center;
        }

        #application-modal .form-group input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--gold-primary);
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.1);
            color: var(--white);
            text-align: center;
        }

        #application-modal button[type="submit"] {
            background: var(--gold-primary);
            color: var(--purple-primary);
            padding: 0.8rem 2rem;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 1rem;
            font-weight: bold;
            min-width: 200px;
        }

        #application-modal button[type="submit"]:hover {
            opacity: 0.9;
        }
    `;
    document.head.appendChild(styleSheet);
}

function openApplicationModal(jobId) {
    // Only proceed if jobId is provided
    if (!jobId) {
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to apply for jobs!');
        window.location.href = 'login.html';
        return;
    }

    // Check if modal already exists, if not create it
    let modal = document.getElementById('application-modal');
    if (!modal) {
        createApplicationModal();
        modal = document.getElementById('application-modal');
    }
    
    document.getElementById('jobId').value = jobId;
    modal.style.display = 'block';

    // Set default max date to today for birthday
    const today = new Date().toISOString().split('T')[0];
    const birthdayInput = document.getElementById('birthday');
    birthdayInput.max = today;

    // Calculate minimum date (must be at least 16 years old)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);
    birthdayInput.min = minDate.toISOString().split('T')[0];
    birthdayInput.max = maxDate.toISOString().split('T')[0];
}

function closeApplicationModal() {
    document.getElementById('application-modal').style.display = 'none';
    document.getElementById('application-form').reset();
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    
    const jobId = document.getElementById('jobId').value;
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const birthday = document.getElementById('birthday').value;
    const resumeFile = document.getElementById('resume').files[0];

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = resumeFile.name.substring(resumeFile.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, or DOCX file.');
        return;
    }

    // Get existing applications or initialize empty array
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    
    // Create new application
    const application = {
        id: Date.now().toString(),
        jobId,
        fullName,
        age,
        birthday,
        resumeName: resumeFile.name,
        status: 'pending',
        submittedDate: new Date().toISOString()
    };

    // Add to applications
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Close modal and show success message
    closeApplicationModal();
    showSuccessPopup('Application submitted successfully! We will review your application and contact you soon.');
}
