
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        bookPrice: { type: Number },
        quantity: { type: Number, required: true, min: [1, 'Quantity must be greater than or equal to 1'], default: 1 }
    },
    {
        _id: false
    }
);

module.exports = itemSchema;