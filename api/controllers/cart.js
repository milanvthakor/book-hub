const mongoose = require('mongoose');
const Book = require('../models/book');
const Cart = require('../models/cart');

module.exports.view = async (req, res, next) => {
    // TODO
    res.status(200).json();
}

module.exports.addBook = async (req, res, next) => {
    const { bookId, quantity } = req.body;

    // Validate the given book id
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        const err = new Error('Invalid book id');
        err.status = 400;
        return next(err);
    }

    // Validate the quantity
    if (quantity < 1) {
        const err = new Error('Quantity must be greater than or equal to 1');
        err.status = 400;
        return next(err);
    }

    // Check if there exists any book with the given id
    const book = await Book.findById(bookId);
    if (!book) {
        const err = new Error('No book exists with the given id');
        err.status = 400;
        return next(err);
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    // No cart exists for the user. Create a new cart with the book.
    if (!cart) {
        const newCart = new Cart({
            _id: new mongoose.Types.ObjectId(),
            userId: req.user.id,
            books: [{
                bookId: bookId,
                quantity: quantity,
            }],
            total: parseFloat(quantity * book.price)
        });
        await newCart.save();

        res.status(201).json({
            message: 'Book added into cart successfully',
            cart: {
                books: newCart.books,
                total: newCart.total
            }
        });
    }

    // Cart already exists for the user. 
    // TODO

    res.status(200).json();
}

module.exports.removeBook = async (req, res, next) => {
    // TODO
    res.status(200).json();
}