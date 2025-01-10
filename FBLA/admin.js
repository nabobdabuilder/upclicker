// Function to approve the job posting
function approvePost(jobId) {
    // Get the specific job posting element by its ID
    const jobPostElement = document.getElementById(jobId);

    // Change the inner HTML to show it is approved
    jobPostElement.innerHTML = `
        <h2>Job Approved</h2>
        <p>The job has been approved and is now live on the website.</p>
        <p><strong>Approved by Admin</strong></p>
    `;

    // Optionally, you can add some styling to indicate approval visually
    jobPostElement.style.border = "2px solid green";
}

// Function to deny the job posting
function denyPost(jobId) {
    // Get the specific job posting element by its ID
    const jobPostElement = document.getElementById(jobId);

    // Change the inner HTML to show it is denied
    jobPostElement.innerHTML = `
        <h2>Job Denied</h2>
        <p>The job has been denied and will not be posted on the website.</p>
        <p><strong>Denied by Admin</strong></p>
    `;

    // Optionally, you can add some styling to indicate denial visually
    jobPostElement.style.border = "2px solid red";
}
// Check if a job is approved or denied on page load
window.onload = function() {
    const jobIds = ['jobID1']; // List all job IDs here

    jobIds.forEach((jobId) => {
        const status = localStorage.getItem(jobId);

        if (status === 'approved') {
            approvePost(jobId);
        } else if (status === 'denied') {
            denyPost(jobId);
        }
    });
};

// Function to approve the job posting and store the status
function approvePost(jobId) {
    const jobPostElement = document.getElementById(jobId);
    jobPostElement.innerHTML = `
        <h2>Job Approved</h2>
        <p>The job has been approved and is now live on the website.</p>
        <p><strong>Approved by Admin</strong></p>
    `;
    jobPostElement.style.border = "2px solid green";

    // Store the approved status in localStorage
    localStorage.setItem(jobId, 'approved');
}

// Function to deny the job posting and store the status
function denyPost(jobId) {
    const jobPostElement = document.getElementById(jobId);
    jobPostElement.innerHTML = `
        <h2>Job Denied</h2>
        <p>The job has been denied and will not be posted on the website.</p>
        <p><strong>Denied by Admin</strong></p>
    `;
    jobPostElement.style.border = "2px solid red";

    // Store the denied status in localStorage
    localStorage.setItem(jobId, 'denied');
}
