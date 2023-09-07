const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, CartController.view);
router.post('/', checkAuth, CartController.addBook);
router.delete('/', checkAuth, CartController.removeBook);

module.exports = router;