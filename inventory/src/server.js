const express = require('express');
const mongoose = require('mongoose');
const Book = require('./db/BookDB'); // Import the Book model from BookDB.js
const applyMiddleware = require('./config/middleware'); // Import middleware.js
const verifyToken = require('./auth/authMiddleware'); // Import the auth middleware

const app = express();

// Apply middleware
applyMiddleware(app);

// Route to add a new book
app.post('/api/books', verifyToken, async (req, res) => {
  const { title, author, genre, publishedYear, username } = req.body;
  
  // Ensure the username is 'admin'
  if (username !== 'admin') {
	return res.status(403).json({ error: 'Unauthorized: Only admin can add books.' });
  }

  // Proceed with adding the book
  const book = new Book({ title, author, genre, publishedYear });
  try {
    const savedBook = await book.save();
    res.status(201).send(savedBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /api/books - Fetch books with optional filters for title and author
app.get('/api/books', verifyToken, async (req, res) => {
    try {
        const { title, author } = req.query;
        let filter = {};

        // Apply filters if title or author is provided
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        if (author) {
            filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search
        }

        const books = await Book.find(filter);
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// Route to get a book by ID
app.get('/api/books/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a book by ID
app.put('/api/books/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { username } = req.body; // Assuming username is passed in the body
  
  // Check if the username is 'admin'
  if (username !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized: Only admin can update books.' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete a book by ID
app.delete('/api/books/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { username } = req.body; // Assuming the username is sent in the request body
  
  // Check if the username is 'admin'
  if (username !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized: Only admin can delete books.' });
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send('Book deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a book by title
app.get('/api/books/title/:title', verifyToken, async (req, res) => {
  const { title } = req.params;

  try {
    const books = await Book.find({ title: { $regex: title, $options: 'i' } }); // Case-insensitive search
    if (books.length === 0) {
      return res.status(404).send('No books found with that title');
    }
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to search books by title or author using query parameters
app.get('/api/search', verifyToken, async (req, res) => {
  const { title, author } = req.query; // Get title and author from query parameters

  // If both title and author are not provided, return a 400 error
  if (!title && !author) {
    return res.status(400).send('At least one of the query parameters (title or author) is required');
  }

  const query = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' }; // Case-insensitive search for title
  }
  if (author) {
    query.author = { $regex: author, $options: 'i' }; // Case-insensitive search for author
  }

  try {
    const books = await Book.find(query); // Search for books based on the constructed query
    if (books.length === 0) {
      return res.status(404).send('No books found with the provided criteria');
    }
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(3001, () => console.log("Inventory Service running on port 3001"));
