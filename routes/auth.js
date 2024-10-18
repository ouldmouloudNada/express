const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/login');
});

// Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/shop',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;

