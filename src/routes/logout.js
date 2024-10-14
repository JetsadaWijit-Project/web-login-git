const express = require('express');

const router = express.Router();

// Logout route
router.get('/', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
