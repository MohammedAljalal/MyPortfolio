const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please add a company name'],
        },
        role: {
            type: String,
            required: [true, 'Please add a role/title'],
        },
        duration: {
            type: String,
            required: [true, 'Please add a duration (e.g., 2021 - Present)'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Experience', experienceSchema);
