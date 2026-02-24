const Project = require('../models/projectModel');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res, next) => {
    try {
        const { title, description, technologies, githubLink, liveLink, featured } = req.body;
        let image = '';

        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const project = await Project.create({
            title,
            description,
            image,
            technologies: technologies ? technologies.split(',').map((tech) => tech.trim()) : [],
            githubLink,
            liveLink,
            featured: featured === 'true' || featured === true,
        });

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            throw new Error('Project not found');
        }

        const { title, description, technologies, githubLink, liveLink, featured } = req.body;

        let updatedFields = {
            title,
            description,
            technologies: technologies ? technologies.split(',').map((tech) => tech.trim()) : undefined,
            githubLink,
            liveLink,
            featured: featured !== undefined ? (featured === 'true' || featured === true) : undefined,
        };

        // Remove undefined fields
        Object.keys(updatedFields).forEach(key => updatedFields[key] === undefined && delete updatedFields[key]);

        if (req.file) {
            updatedFields.image = `/uploads/${req.file.filename}`;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            throw new Error('Project not found');
        }

        await project.deleteOne();

        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
