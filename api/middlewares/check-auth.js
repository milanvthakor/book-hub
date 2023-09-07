const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Token has to be present in the "Authorization" header with the "Bearer" prefix.
        // Example: "Authorization: Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("failed to verify auth token: ", err);

        return res.status(401).json({
            error: {
                message: 'Authorization failed'
            }
        });
    }
}