const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Order = require('../models/order');

const asyncHandler = require("../../utils/async-handler");

module.exports.view = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ userId: req.user.id }).select('-__v');

    res.status(200).json({
        count: orders.length,
        orders: orders
    });
});

module.exports.checkout = asyncHandler(async (req, res, next) => {
    // Check if cart exists or not
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
        const err = new Error('No cart found');
        err.status = 400;
        return next(err);
    }

    // Create an order
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        userId: req.user.id,
        items: cart.items,
        total: cart.total
    });

    // Use transaction to atomically place an order and clearing out the cart.
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Place an order
        await order.save({ session: session });

        // Clear out cart
        await Cart.findByIdAndDelete(cart._id, { session: session });

        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession()
    }

    res.status(201).json({
        message: 'Order placed successfully',
        order: {
            _id: order._id,
            items: order.items,
            total: order.total,
        }
    });
});