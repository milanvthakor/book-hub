const { isValidEmail, isValidPassword } = require('../../utils/helper');
const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        const err = new Error('Invalid email')
        err.status = 400;
        return next(err);
    }

    if (!isValidPassword(password)) {
        const err = new Error('Invalid password. The length must be between 8 and 12 characters')
        err.status = 400;
        return next(err);
    }

    // TODO: Handle valid details
    
    res.status(200).json();
};