const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/books');

router.get('/', BooksController.books);
router.get('/:id', BooksController.bookDetails);

module.exports = router;