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
        // ─── Enhanced Fields ─────────────────────────────────────────────────
        achievements: {
            type: [String], // Bullet-point achievements
            default: [],
        },
        technologies: {
            type: [String], // Tech used in this role
            default: [],
        },
        companyUrl: {
            type: String, // Link to company website
        },
        order: {
            type: Number,
            default: 0, // Lower = displayed first (most recent)
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Experience', experienceSchema);
