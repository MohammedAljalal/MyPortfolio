const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Admin = require('../models/adminModel');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

// ─── Validation Schemas ────────────────────────────────────────────────────────

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
});

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * @desc    Authenticate admin — returns token in body (for CMS) + sets HttpOnly cookie
 * @route   POST /api/admin/login
 * @access  Public
 */
const loginAdmin = async (req, res, next) => {
    try {
        // Validate request body
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((d) => d.message).join(', ');
            res.status(400);
            return next(new Error(messages));
        }

        const { email, password } = value;
        const admin = await Admin.findOne({ email });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            res.status(401);
            return next(new Error('Invalid email or password'));
        }

        const token = generateToken(admin._id);

        // Set HttpOnly cookie for browser-based sessions
        res.cookie('adminToken', token, COOKIE_OPTIONS);

        // Also return token in body for existing CMS localStorage flow
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Logout admin — clears cookie
 * @route   POST /api/admin/logout
 * @access  Private
 */
const logoutAdmin = async (req, res) => {
    res.clearCookie('adminToken', { ...COOKIE_OPTIONS, maxAge: 0 });
    res.json({ message: 'Logged out successfully' });
};

/**
 * @desc    Get current admin profile
 * @route   GET /api/admin/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('-password');
        res.json(admin);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginAdmin,
    logoutAdmin,
    getMe,
};
