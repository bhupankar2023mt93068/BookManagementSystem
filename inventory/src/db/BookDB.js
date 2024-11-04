// BookDB.js

const mongoose = require('mongoose');

// Define a Mongoose schema for books
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedYear: Number,
});

// Create the Book model from the schema
const Book = mongoose.model('Book', bookSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookDB')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

// Export the Book model for use in other files
module.exports = Book;
