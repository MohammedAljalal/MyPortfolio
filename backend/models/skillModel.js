const mongoose = require('mongoose');

const skillSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a skill name'],
        },
        category: {
            type: String,
            enum: ['Frontend', 'Backend', 'Database', 'Tools'],
            required: [true, 'Please select a category'],
        },
        level: {
            type: Number,
            min: 1,
            max: 100,
            required: [true, 'Please add a proficiency level from 1 to 100'],
        },
        icon: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Skill', skillSchema);
