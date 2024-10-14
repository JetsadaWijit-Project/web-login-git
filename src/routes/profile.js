const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from the file
const readUsersFile = () => {
    if (fs.existsSync(usersFilePath)) {
        return JSON.parse(fs.readFileSync(usersFilePath));
    }
    return [];
};

// Profile route
router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }

    const users = readUsersFile();
    const currentUser = users.find(u => u.email === req.user.email);

    if (currentUser) {
        // Build the profile HTML
        let profileHtml = `
            <h1>Welcome, ${currentUser.username}</h1>
            <p>Email: ${currentUser.email}</p>
            <p>Connected to GitHub: ${currentUser.provider.github}</p>
            <p>Connected to GitLab: ${currentUser.provider.gitlab}</p>
        `;

        // Add connect buttons if the providers are not connected
        if (!currentUser.provider.github) {
            profileHtml += `<a href="/auth/github" class="btn btn-primary">Connect GitHub</a><br>`;
        }

        if (!currentUser.provider.gitlab) {
            profileHtml += `<a href="/auth/gitlab" class="btn btn-primary">Connect GitLab</a><br>`;
        }

        profileHtml += `<a href="/logout" class="btn btn-danger">Logout</a>`;

        res.send(profileHtml);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
