const ContactMessage = require('../models/contactMessageModel');

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res, next) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = await ContactMessage.create({
            name,
            email,
            message,
        });

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id
// @access  Private/Admin
const markAsRead = async (req, res, next) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (!message) {
            res.status(404);
            throw new Error('Message not found');
        }

        message.isRead = true;
        const updatedMessage = await message.save();

        res.json(updatedMessage);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = async (req, res, next) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (!message) {
            res.status(404);
            throw new Error('Message not found');
        }

        await message.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMessages,
    createMessage,
    markAsRead,
    deleteMessage,
};
