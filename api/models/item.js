
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    bookPrice: { type: Number },
    quantity: { type: Number, required: true, min: [1, 'Quantity must be greater than or equal to 1'], default: 1 }
});

module.exports = itemSchema;