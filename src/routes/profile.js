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
        // Render profile.ejs with user data
        res.render('profile', { user: currentUser });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
