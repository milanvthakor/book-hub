const bcrypt = require('bcrypt');
const { isValidEmail, isValidPassword } = require('../../utils/helper');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

module.exports.register = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email
    if (!isValidEmail(email)) {
        const err = new Error('Invalid email')
        err.status = 400;
        return next(err);
    }

    // Validate password
    if (!isValidPassword(password)) {
        const err = new Error('Invalid password. The length must be between 8 and 12 characters')
        err.status = 400;
        return next(err);
    }

    try {
        // Check if there exists any user with same email.
        const user = await User.findOne({ email: email });
        if (user) {
            const err = new Error('Email already exists');
            err.status = 409;
            return next(err);
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hashPassword
        });
        await newUser.save();

        res.status(201).json({
            message: 'User created'
        });
    } catch (err) {
        next(err);
    }
};