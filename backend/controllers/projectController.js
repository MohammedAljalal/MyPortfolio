const Project = require('../models/projectModel');


/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a project
 * @route   POST /api/projects
 * @access  Private/Admin
 */
const createProject = async (req, res, next) => {
    try {
        const {
            title, description, category, technologies, githubLink, liveLink, featured,
            role, challenges, impact, architecture, timeline, teamSize, metrics, casestudy, order,
        } = req.body;

        let image = '';
        if (req.file) {
            image = req.file.path;
        }
        const project = await Project.create({
            title,
            description,
            category: category || 'Web App',
            image,
            technologies: technologies
                ? technologies.split(',').map((tech) => tech.trim()).filter(Boolean)
                : [],
            githubLink,
            liveLink,
            featured: featured === 'true' || featured === true,
            role,
            challenges,
            impact,
            architecture,
            timeline,
            teamSize: teamSize ? parseInt(teamSize, 10) : undefined,
            metrics,
            casestudy,
            order: order ? parseInt(order, 10) : 0,
        });

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a project
 * @route   PUT /api/projects/:id
 * @access  Private/Admin
 */
const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            return next(new Error('Project not found'));
        }

        const {
            title, description, category, technologies, githubLink, liveLink, featured,
            role, challenges, impact, architecture, timeline, teamSize, metrics, casestudy, order,
        } = req.body;

        const updatedFields = {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(category !== undefined && { category }),
            ...(technologies !== undefined && {
                technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
            }),
            ...(githubLink !== undefined && { githubLink }),
            ...(liveLink !== undefined && { liveLink }),
            ...(featured !== undefined && { featured: featured === 'true' || featured === true }),
            ...(role !== undefined && { role }),
            ...(challenges !== undefined && { challenges }),
            ...(impact !== undefined && { impact }),
            ...(architecture !== undefined && { architecture }),
            ...(timeline !== undefined && { timeline }),
            ...(teamSize !== undefined && { teamSize: parseInt(teamSize, 10) }),
            ...(metrics !== undefined && { metrics }),
            ...(casestudy !== undefined && { casestudy }),
            ...(order !== undefined && { order: parseInt(order, 10) }),
        };

        if (req.file) {
            updatedFields.image = req.file.path;
        }
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            return next(new Error('Project not found'));
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
