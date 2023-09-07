const mongoose = require('mongoose');

const itemSchema = require('./item');

const orderSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        items: [itemSchema],
        total: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);