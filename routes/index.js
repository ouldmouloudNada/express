const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Home Page
router.get('/', (req, res) => {
    res.render('home');
});

// Shop Page
router.get('/shop', async (req, res) => {
    const books = await Book.find();
    res.render('shop', { books });
});

// Buy Page
router.get('/buy/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('buy', { book });
});

// Insert New Products Page
router.post('/insert', async (req, res) => {
    const { title, author, price } = req.body;
    const newBook = new Book({ title, author, price });
    await newBook.save();
    res.redirect('/shop');
});

module.exports = router;
