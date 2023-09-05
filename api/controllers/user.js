const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

const { isValidEmail, isValidPassword } = require('../../utils/helper');
const User = require('../models/user');

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

module.exports.login = async (req, res, next) => {
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
        // Check if there exists a user with the given email or not.
        const user = await User.findOne({ email: email });
        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            return next(err);
        }

        // Compare the passwords.
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const err = new Error('Login failed');
            err.status = 401;
            return next(err);
        }

        // Generate JWT authentication token.
        const token = jwt.sign({ email: email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successfully',
            token: token
        });
    } catch (err) {
        next(err);
    }
}