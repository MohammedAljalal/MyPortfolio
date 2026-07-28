const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ─── Security Headers ──────────────────────────────────────────────────────────
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow serving images to frontend
    })
);

// ─── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, Postman in dev)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS: Origin ${origin} not allowed`));
            }
        },
        credentials: true, // Allow cookies
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// ─── Global Rate Limiter (100 req / 15 min per IP) ─────────────────────────────
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'development' ? 5000 : 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' },
    skip: () => process.env.NODE_ENV === 'development'
});
app.use('/api', globalLimiter);

// ─── Auth Rate Limiter (5 login attempts / 15 min) ─────────────────────────────
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many login attempts, please try again in 15 minutes.' },
    skipSuccessfulRequests: true,
});
app.use('/api/admin/login', authLimiter);

// ─── Contact Rate Limiter (5 messages / hour) ─────────────────────────────────
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { message: 'Too many messages sent, please try again in an hour.' },
});
app.use('/api/contact', (req, res, next) => {
    if (req.method === 'POST') {
        return contactLimiter(req, res, next);
    }
    next();
});

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());

// ─── NoSQL Injection Sanitization ────────────────────────────────────────────
// Note: express-mongo-sanitize disabled due to strict getter crash on req.query
// Consider using a different library or manual sanitization if needed.
// app.use(mongoSanitize());

// ─── Static Uploads ──────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/personal', require('./routes/personalInfoRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ─── Error Middleware ─────────────────────────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`[Server] Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
