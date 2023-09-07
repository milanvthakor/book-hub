// A middleware utility that wraps asynchronous route handlers.
// It ensures that any errors occurring within the handler are properly caught and passed to
// error-handling middleware.
module.exports = fn => (req, res, next) => {
    fn(req, res, next).catch(next);
}