const express = require('express');
const app = express();

// Log incoming requests with the help of morgan package.
const morgan = require('morgan');
app.use(morgan());

// Set up available routes.
const healthRoutes = require('./api/routes/health');

app.use("/health", healthRoutes);

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