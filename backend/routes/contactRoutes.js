const express = require('express');
const router = express.Router();
const {
    getMessages,
    createMessage,
    markAsRead,
    deleteMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const { validate, schemas } = require('../middleware/validateMiddleware');

router.route('/')
    .get(protect, getMessages)
    .post(validate(schemas.contact), createMessage); // Validated + sanitized

router.route('/:id')
    .put(protect, markAsRead)
    .delete(protect, deleteMessage);

module.exports = router;
