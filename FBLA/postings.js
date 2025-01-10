const approvedPostings = [
    { title: 'Software Developer', description: 'Develop software applications.', location: 'New York' }
];

const approvedContainer = document.getElementById('approvedPostings');
approvedPostings.forEach(post => {
    const posting = document.createElement('div');
    posting.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <p><strong>Location:</strong> ${post.location}</p>
        <a href="apply.html">Apply Now</a>
    `;
    approvedContainer.appendChild(posting);
});
