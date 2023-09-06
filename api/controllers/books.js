const { default: mongoose } = require('mongoose');
const Book = require('../models/book');

module.exports.books = async (req, res, next) => {
    const search = req.query.search || "";

    try {
        const books = await Book.find({
            '$or': [
                { title: { '$regex': search, '$options': 'i' } },
                { author: { '$regex': search, '$options': 'i' } }
            ]
        }).select('-__v');

        res.status(200).json({
            count: books.length,
            books: books
        });
    } catch (err) {
        next(err);
    }
}

module.exports.bookDetails = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    }

    try {
        const book = await Book.findById(id).select('-__v');
        if (!book) {
            const err = new Error('No book found with given id');
            err.status = 404;
            return next(err);
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
}