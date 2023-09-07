const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, OrderController.view);
router.post('/checkout', checkAuth, OrderController.checkout);

module.exports = router;