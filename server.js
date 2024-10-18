const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

// Initialize Express
const app = express();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set View Engine
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect('mongodb://localhost/gaming-shop', { useNewUrlParser: true, useUnifiedTopology: true });

// Session Setup
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
