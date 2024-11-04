const express = require('express');
const Book = require('../models/book.model');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) res.json(book);
        else res.status(404).send('Book not found');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedBook) res.json(updatedBook);
        else res.status(404).send('Book not found');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (deletedBook) res.json(deletedBook);
        else res.status(404).send('Book not found');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
