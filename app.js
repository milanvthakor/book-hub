// Load all the environment variables from the .env file.
require('dotenv').config();

const express = require('express');
const app = express();

// Log incoming requests with the help of morgan package.
const morgan = require('morgan');
app.use(morgan());

// Parse the incoming HTTP request body with the help of body-parser package
// and populate the `req.body` object with the parsed data.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB.
const mongoose = require('mongoose');
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('successfully connected to MongoDB');
    } catch (err) {
        console.error('failed to connect to MongoDB: ' + err);
        process.exit(1);
    }
})()

// Set up available routes.
const healthRoutes = require('./api/routes/health');
const userRoutes = require('./api/routes/user');
const booksRoutes = require('./api/routes/books');
const cartRoutes = require('./api/routes/cart');
const orderRoutes = require('./api/routes/order');

app.use('/health', healthRoutes);
app.use('/user', userRoutes);
app.use('/books', booksRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// If the request URI doesn't match any routes, throw an error.
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

// Middleware to handle errors passed from all other middleware.
// Send an error response to client with status code and message.
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;