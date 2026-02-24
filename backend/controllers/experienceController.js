const Experience = require('../models/experienceModel');

// @desc    Get experience
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res, next) => {
    try {
        const experience = await Experience.find().sort({ createdAt: -1 });
        res.json(experience);
    } catch (error) {
        next(error);
    }
};

// @desc    Create experience
// @route   POST /api/experience
// @access  Private/Admin
const createExperience = async (req, res, next) => {
    try {
        const { company, role, duration, description } = req.body;

        const experience = await Experience.create({
            company,
            role,
            duration,
            description,
        });

        res.status(201).json(experience);
    } catch (error) {
        next(error);
    }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
const updateExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            res.status(404);
            throw new Error('Experience not found');
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedExperience);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
const deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            res.status(404);
            throw new Error('Experience not found');
        }

        await experience.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
};
