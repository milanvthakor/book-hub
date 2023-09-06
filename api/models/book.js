const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    author: String,
    genre: String,
    price: Number
});

module.exports = mongoose.model('Book', bookSchema);