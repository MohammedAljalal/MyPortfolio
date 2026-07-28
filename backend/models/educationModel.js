const mongoose = require('mongoose');

const educationSchema = mongoose.Schema(
    {
        institution: {
            type: String,
            required: [true, 'Please add an institution name'],
        },
        degree: {
            type: String,
            required: [true, 'Please add a degree'],
        },
        location: {
            type: String,
        },
        year: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        description: {
            type: String,
        },
        achievements: {
            type: [String],
            default: [],
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

module.exports = mongoose.model('Education', educationSchema);
