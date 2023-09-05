// Helper script to insert sample books data into MongoDB.

// Load all the environment variables from the .env file.
require('dotenv').config();

// Connect to MongoDB.
const mongoose = require('mongoose');
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('successfully connected to MongoDB');
    } catch (err) {
        console.error('failed to connect to MongoDB: ' + err);
        process.exit(1);
    }
})()

// Create sample books.
const booksCount = 10;
const sampleBooks = [];

for (let i = 0; i < booksCount; i++) {
    sampleBooks.push({
        title: 'Book Title #' + i,
        author: 'Book Author #' + i,
        genre: 'Book Genre #' + i,
        price: 100 + i
    });
}

// Insert sample books into MongoDB.
const Book = require('../api/models/book');
(async () => {
    try {
        const result = await Book.insertMany(sampleBooks);
        console.log(`${result.length} books inserted`);
    } catch (err) {
        console.error('failed to insert books: ', err);
    }
})()