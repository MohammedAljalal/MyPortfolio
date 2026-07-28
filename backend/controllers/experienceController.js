const Experience = require('../models/experienceModel');

/**
 * Helper: parse comma-separated string or passthrough array
 */
const parseList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return value.split(',').map((v) => v.trim()).filter(Boolean);
};

/**
 * @desc    Get all experience entries
 * @route   GET /api/experience
 * @access  Public
 */
const getExperience = async (req, res, next) => {
    try {
        const experience = await Experience.find().sort({ order: 1, createdAt: -1 });
        res.json(experience);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create experience entry
 * @route   POST /api/experience
 * @access  Private/Admin
 */
const createExperience = async (req, res, next) => {
    try {
        const {
            company, role, duration, description,
            achievements, technologies, companyUrl, order,
        } = req.body;

        const experience = await Experience.create({
            company,
            role,
            duration,
            description,
            achievements: parseList(achievements),
            technologies: parseList(technologies),
            ...(companyUrl && { companyUrl }),
            order: order ?? 0,
        });

        res.status(201).json(experience);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update experience entry
 * @route   PUT /api/experience/:id
 * @access  Private/Admin
 */
const updateExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            res.status(404);
            return next(new Error('Experience not found'));
        }

        const {
            company, role, duration, description,
            achievements, technologies, companyUrl, order,
        } = req.body;

        const updatedFields = {
            ...(company !== undefined && { company }),
            ...(role !== undefined && { role }),
            ...(duration !== undefined && { duration }),
            ...(description !== undefined && { description }),
            ...(achievements !== undefined && { achievements: parseList(achievements) }),
            ...(technologies !== undefined && { technologies: parseList(technologies) }),
            ...(companyUrl !== undefined && { companyUrl }),
            ...(order !== undefined && { order }),
        };

        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        res.json(updatedExperience);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete experience entry
 * @route   DELETE /api/experience/:id
 * @access  Private/Admin
 */
const deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            res.status(404);
            return next(new Error('Experience not found'));
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
