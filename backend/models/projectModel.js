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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Project', projectSchema);
