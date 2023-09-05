const express = require('express');
const app = express();

// Log incoming requests with the help of morgan package.
const morgan = require('morgan');
app.use(morgan());

// Parse the incoming HTTP request body with the help of body-parser package
// and populate the `req.body` object with the parsed data.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Set up available routes.
const healthRoutes = require('./api/routes/health');
const userRoutes = require('./api/routes/user');

app.use('/health', healthRoutes);
app.use('/user', userRoutes);

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