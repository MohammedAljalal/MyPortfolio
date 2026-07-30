const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a project title'],
        },
        description: {
            type: String,
            required: [true, 'Please add a project description'],
        },
        category: {
            type: String,
            default: 'Web App',
            required: [true, 'Please specify a category (e.g. Web App, Mobile App, Backend)'],
        },
        image: {
            type: String,
        },
        technologies: {
            type: [String],
            required: true,
        },
        githubLink: {
            type: String,
        },
        liveLink: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        // ─── Project Detail Fields ───────────────────────────────────────────
        role: {
            type: String, // e.g. "Full-Stack Developer", "Lead Frontend Engineer"
        },
        challenges: {
            type: String, // What challenges were faced
        },
        impact: {
            type: String, // Business/user impact
        },
        architecture: {
            type: String, // Technical architecture description
        },
        gallery: {
            type: [String], // Array of additional image URLs
            default: [],
        },
        timeline: {
            type: String, // e.g. "Jan 2024 – Mar 2024"
        },
        teamSize: {
            type: Number,
        },
        metrics: {
            type: String, // e.g. "2k+ users, 99.9% uptime"
        },
        casestudy: {
            type: String, // Long-form case study text or URL
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

module.exports = mongoose.model('Project', projectSchema);
