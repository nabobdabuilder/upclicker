const fs = require('fs');
const path = require('path');

const files = [
    'home.html',
    'about.html',
    'contact.html',
    'login.html',
    'signup.html',
    'employer.html',
    'postings.html',
    'admin.html'
];

const baseDir = 'c:/Users/navin/Downloads/FBLA';

files.forEach(file => {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update logo link
        content = content.replace(
            /<a href="home\.html">\s*<img src="logo\.png"/g,
            '<a href="about.html"><img src="logo.png"'
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});
