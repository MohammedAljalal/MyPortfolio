const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

/**
 * Middleware: Protect admin routes.
 * Supports both Authorization: Bearer <token> header (Admin CMS) and
 * HttpOnly cookie `adminToken` for future cookie-based auth.
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Check Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // 2. Fallback: check HttpOnly cookie
    else if (req.cookies && req.cookies.adminToken) {
        token = req.cookies.adminToken;
    }

    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, no token provided'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id).select('-password');

        if (!req.admin) {
            res.status(401);
            return next(new Error('Not authorized, admin not found'));
        }

        next();
    } catch (error) {
        res.status(401);
        if (error.name === 'TokenExpiredError') {
            return next(new Error('Not authorized, token expired'));
        }
        return next(new Error('Not authorized, token invalid'));
    }
};

module.exports = { protect };
