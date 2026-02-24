const Skill = require('../models/skillModel');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find().sort({ category: 1, level: -1 });
        res.json(skills);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = async (req, res, next) => {
    try {
        const { name, category, level } = req.body;
        let icon = '';

        if (req.file) {
            icon = `/uploads/${req.file.filename}`;
        }

        const skill = await Skill.create({
            name,
            category,
            level,
            icon,
        });

        res.status(201).json(skill);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
const updateSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }

        const { name, category, level } = req.body;

        let updatedFields = {
            name,
            category,
            level,
        };

        // Remove undefined fields
        Object.keys(updatedFields).forEach(key => updatedFields[key] === undefined && delete updatedFields[key]);

        if (req.file) {
            updatedFields.icon = `/uploads/${req.file.filename}`;
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        res.json(updatedSkill);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }

        await skill.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
};
