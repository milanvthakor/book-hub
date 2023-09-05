const Book = require('../models/book');

module.exports.books = async (req, res, next) => {
    try {
        const books = await Book.find().select('-__v');
        res.status(200).json({
            count: books.length,
            books: books
        });
    } catch (err) {
        next(err);
    }
}