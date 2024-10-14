const express = require('express');
const passport = require('passport');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to save or update user data
const saveOrUpdateUser = (user, provider) => {
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        users = JSON.parse(fs.readFileSync(usersFilePath));
    }

    const existingUserIndex = users.findIndex((u) => u.email === user.email);

    if (existingUserIndex !== -1) {
        // If the user exists, update the provider flag (GitHub or GitLab)
        users[existingUserIndex].provider[provider] = true;  // Set to true
    } else {
        // If user doesn't exist, create a new entry with the correct provider flags
        const newUser = {
            username: user.username,
            email: user.email,
            provider: {
                github: provider === 'github', // true if provider is github
                gitlab: provider === 'gitlab'  // true if provider is gitlab
            }
        };
        users.push(newUser);
    }

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    saveOrUpdateUser(req.user, 'github');  // Mark GitHub as true
    res.redirect('/profile');
});

// GitLab login route
router.get('/gitlab', passport.authenticate('gitlab', { scope: ['read_user'] }));

// GitLab callback
router.get('/gitlab/callback', passport.authenticate('gitlab', { failureRedirect: '/' }), (req, res) => {
    saveOrUpdateUser(req.user, 'gitlab');  // Mark GitLab as true
    res.redirect('/profile');
});

module.exports = router;
