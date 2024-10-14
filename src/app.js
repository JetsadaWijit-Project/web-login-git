const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const logoutRoutes = require('./routes/logout');

const app = express();

// Define the path for the users file
const usersDirPath = path.join(__dirname, 'data');
const usersFilePath = path.join(usersDirPath, 'users.json');

// Function to check and create the data folder and users.json file if they don't exist
const checkUsersFile = () => {
    // Check if the data directory exists
    if (!fs.existsSync(usersDirPath)) {
        fs.mkdirSync(usersDirPath); // Create the data directory
        console.log('data directory created.');
    }

    // Check if the users.json file exists
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([])); // Create an empty array
        console.log('users.json file created.');
    }
};

// Check if the users directory and file exist and create if not
checkUsersFile();

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Passport setup
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/logout', logoutRoutes);

app.get('/', (req, res) => {
    res.send(`<h1>Home</h1><a href="/auth/github">Login with GitHub</a><br><a href="/auth/gitlab">Login with GitLab</a>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
