const express = require('express');
const router = express.Router();

const BooksController = require('../controllers/books');

router.get('/', BooksController.books);

module.exports = router;