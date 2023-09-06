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