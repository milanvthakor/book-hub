const mongoose = require('mongoose');
const Book = require('../models/book');
const Cart = require('../models/cart');

const asyncHandler = require('../../utils/async-handler');

module.exports.view = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ userId: req.user.id }).select('-__v');
    if (!cart) {
        const err = new Error('No cart found');
        err.status = 400;
        return next(err);
    }

    res.status(200).json({
        items: cart.items,
        total: cart.total
    });
});

module.exports.addBook = asyncHandler(async (req, res, next) => {
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
            items: [{
                bookId: bookId,
                bookPrice: book.price,
                quantity: quantity,
            }],
            total: parseFloat(quantity * book.price)
        });
        await newCart.save();

        return res.status(201).json({
            message: 'Book added into cart successfully',
            cart: {
                items: newCart.items,
                total: newCart.total
            }
        });
    }

    // Cart already exists for the user. 

    const bookIdx = cart.items.findIndex(item => item.bookId == bookId);
    if (bookIdx === -1) {
        // Book doesn't exists in the cart.
        cart.items.push({ bookId: bookId, bookPrice: book.price, quantity: quantity });
    } else {
        // Book already exists in the cart.
        cart.items[bookIdx].quantity += quantity;
    }

    cart.total = cart.items.reduce((prev, item) => parseFloat(prev + item.bookPrice * item.quantity), 0);
    await cart.save();

    res.status(201).json({
        message: 'Book added into cart successfully',
        cart: {
            items: cart.items,
            total: cart.total
        }
    });
});

module.exports.removeBook = asyncHandler(async (req, res, next) => {
    const bookId = req.query.bookId;

    // Validate the given book id
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        const err = new Error('Invalid book id');
        err.status = 400;
        return next(err);
    }

    // Check if cart exists or not
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
        const err = new Error('No cart found');
        err.status = 400;
        return next(err);
    }

    const bookIdx = cart.items.findIndex(item => item.bookId == bookId);
    // Book doesn't exists in the cart.
    if (bookIdx === -1) {
        const err = new Error('No book found in the cart with given id');
        err.status = 400;
        return next(err);
    }

    // Remove book
    cart.items.splice(bookIdx, 1);
    cart.total = cart.items.reduce((prev, item) => parseFloat(prev + item.bookPrice * item.quantity), 0);
    await cart.save();

    res.status(200).json({
        message: 'Book removed from cart successfully',
        cart: {
            items: cart.items,
            total: cart.total
        }
    });
});