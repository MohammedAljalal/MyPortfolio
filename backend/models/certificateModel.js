const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a certificate title'],
        },
        issuer: {
            type: String,
            required: [true, 'Please add an issuer'],
        },
        date: {
            type: String,
        },
        credentialId: {
            type: String,
        },
        link: {
            type: String,
        },
        image: {
            type: String, // Badge/certificate image
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

module.exports = mongoose.model('Certificate', certificateSchema);
