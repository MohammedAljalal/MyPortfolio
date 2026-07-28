const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
);

const personalInfoSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please add a full name'],
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        bio: {
            type: String,
            required: [true, 'Please add a bio'],
        },
        email: {
            type: String,
        },
        location: {
            type: String,
        },
        availableForWork: {
            type: Boolean,
            default: true,
        },
        profileImage: {
            type: String,
        },
        resumeLink: {
            type: String,
        },
        socialLinks: {
            github: { type: String },
            linkedin: { type: String },
            twitter: { type: String },
        },
        // Editable stats displayed in the About section
        stats: {
            type: [statSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
