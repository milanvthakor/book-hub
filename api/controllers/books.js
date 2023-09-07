const { default: mongoose } = require('mongoose');
const Book = require('../models/book');

const asyncHandler = require('../../utils/async-handler');

module.exports.books = asyncHandler(async (req, res, next) => {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    // Get Books
    const books = await Book.find({
        '$or': [
            { title: { '$regex': search, '$options': 'i' } },
            { author: { '$regex': search, '$options': 'i' } }
        ]
    })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .select('-__v');

    // Get the pagination metadata
    const totalBooks = await Book.countDocuments();

    res.status(200).json({
        total: totalBooks,
        page: page,
        pageSize: books.length,
        books: books
    });
});

module.exports.bookDetails = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    // Validate the book id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    }

    // Check if there exists any book with the given id or not
    const book = await Book.findById(id).select('-__v');
    if (!book) {
        const err = new Error('No book found with given id');
        err.status = 404;
        return next(err);
    }

    res.status(200).json(book);
});