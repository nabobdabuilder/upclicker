// Job posting functionality
document.getElementById('submitJobForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!checkLoginAndProceed('post a job')) {
        return;
    }

    const jobData = {
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
        requirements: document.getElementById('requirements').value,
        salary: document.getElementById('salary').value,
        id: Date.now().toString(),
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.push(jobData);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    // Clear form
    this.reset();

    // Show success popup
    showSuccessPopup('Job Posted!', 'Your job posting has been submitted and is awaiting approval.');
});
