const apiUrl = 'http://localhost:3001/api/books';

// Fetch all books
async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Display books in HTML
function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.innerText = `Title: ${book.title}, Author: ${book.author}, Year: ${book.publishedYear}`;
        booksList.appendChild(bookDiv);
    });
}

// Create a new book
document.getElementById('createBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        publishedYear: document.getElementById('publishedYear').value
    };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        fetchBooks();
    } catch (error) {
        console.error('Error creating book:', error);
    }
});

// Update a book
document.getElementById('updateBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookId = document.getElementById('updateId').value;
    const updatedBook = {
        title: document.getElementById('updateTitle').value,
        author: document.getElementById('updateAuthor').value,
        genre: document.getElementById('updateGenre').value,
        publishedYear: document.getElementById('updateYear').value
    };

    try {
        await fetch(`${apiUrl}/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook)
        });
        fetchBooks();
    } catch (error) {
        console.error('Error updating book:', error);
    }
});

// Delete a book
document.getElementById('deleteBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookId = document.getElementById('deleteId').value;

    try {
        await fetch(`${apiUrl}/${bookId}`, {
            method: 'DELETE'
        });
        fetchBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
    }
});

// Search by ID
document.getElementById('searchByIdForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookId = document.getElementById('searchId').value;

    try {
        const response = await fetch(`${apiUrl}/${bookId}`);
        const book = await response.json();
        displayBooks([book]);
    } catch (error) {
        console.error('Error searching book by ID:', error);
    }
});

// Search by Title
document.getElementById('searchByTitleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('searchTitle').value;

    try {
        const response = await fetch(`${apiUrl}?title=${encodeURIComponent(title)}`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error searching books by title:', error);
    }
});

// Search by Author
document.getElementById('searchByAuthorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const author = document.getElementById('searchAuthor').value;

    try {
        const response = await fetch(`${apiUrl}?author=${encodeURIComponent(author)}`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error searching books by author:', error);
    }
});
