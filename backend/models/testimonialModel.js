const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the person\'s name'],
        },
        position: {
            type: String,
        },
        company: {
            type: String,
        },
        image: {
            type: String, // Profile picture URL
        },
        text: {
            type: String,
            required: [true, 'Please add the testimonial text'],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
