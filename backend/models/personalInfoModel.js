const mongoose = require('mongoose');

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
            facebook: { type: String },
        },
        contactInfo: {
            phone: { type: String },
            email: { type: String },
            whatsapp: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
