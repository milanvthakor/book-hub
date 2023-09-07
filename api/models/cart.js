const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        books: [
            {
                bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
                quantity: { type: Number, required: true, min: [1, 'Quantity must be greater than or equal to 1'], default: 1 }
            }
        ],
        total: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);