console.log(
    'This script populates some test books to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://username:password@cluster0.lz91hw2.mongodb.net/online-bookstore-api?retryWrites=true&w=majority"'
);

const Book = require('./api/models/book');

// Connect to MongoDB.
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    // Get arguments passed on command line
    const mongoURI = process.argv[2];

    await mongoose.connect(mongoURI);
    console.log('successfully connected to MongoDB');
};

const createBooks = async () => {
    // Create sample books.
    const booksCount = 10;
    const sampleBooks = [];

    for (let i = 0; i < booksCount; i++) {
        sampleBooks.push({
            title: 'Book Title #' + i,
            author: 'Book Author #' + i,
            genre: 'Book Genre #' + i,
            isbn: 'ISBN#' + i,
            price: 100 + i
        });
    }

    // Insert sample books into MongoDB.
    const result = await Book.insertMany(sampleBooks);
    console.log(`${result.length} books inserted`);
};

const main = async () => {
    await connectToMongoDB();
    await createBooks();
};

main()
    .catch(err => console.error(err))
    .finally(() => {
        process.exit(1);
    });