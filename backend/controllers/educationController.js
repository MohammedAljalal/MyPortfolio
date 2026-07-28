const Education = require('../models/educationModel');

/**
 * @desc    Get all education entries
 * @route   GET /api/education
 * @access  Public
 */
const getEducation = async (req, res, next) => {
    try {
        const education = await Education.find().sort({ order: 1, startYear: -1 });
        res.json(education);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create education entry
 * @route   POST /api/education
 * @access  Private/Admin
 */
const createEducation = async (req, res, next) => {
    try {
        const { institution, degree, field, startYear, endYear, gpa, order } = req.body;
        const education = await Education.create({
            institution, degree, field, startYear, endYear, gpa,
            order: order ?? 0,
        });
        res.status(201).json(education);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update education entry
 * @route   PUT /api/education/:id
 * @access  Private/Admin
 */
const updateEducation = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            res.status(404);
            return next(new Error('Education entry not found'));
        }
        const updated = await Education.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete education entry
 * @route   DELETE /api/education/:id
 * @access  Private/Admin
 */
const deleteEducation = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            res.status(404);
            return next(new Error('Education entry not found'));
        }
        await education.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
