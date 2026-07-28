const Joi = require('joi');

/**
 * Factory: creates an Express middleware that validates req.body against a Joi schema.
 * On validation failure, returns 400 with all error messages.
 */
const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true, // Remove any unknown fields for safety
    });

    if (error) {
        const messages = error.details.map((d) => d.message).join('; ');
        return res.status(400).json({ message: messages });
    }

    req.body = value; // Use sanitized/typed values
    next();
};

// ─── Schemas ─────────────────────────────────────────────────────────────────

const contactSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().email().required(),
    message: Joi.string().trim().min(10).max(2000).required(),
});

const skillSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    category: Joi.string().valid('Frontend', 'Backend', 'Database', 'Tools').required(),
    level: Joi.number().integer().min(1).max(100).required(),
});

const projectSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required(),
    description: Joi.string().trim().min(10).max(2000).required(),
    technologies: Joi.string().trim().required(), // Comma-separated
    githubLink: Joi.string().uri().allow('', null).optional(),
    liveLink: Joi.string().uri().allow('', null).optional(),
    featured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
    role: Joi.string().trim().max(200).allow('', null).optional(),
    challenges: Joi.string().trim().max(3000).allow('', null).optional(),
    impact: Joi.string().trim().max(1000).allow('', null).optional(),
    architecture: Joi.string().trim().max(3000).allow('', null).optional(),
    timeline: Joi.string().trim().max(100).allow('', null).optional(),
    teamSize: Joi.number().integer().min(1).max(1000).allow(null).optional(),
    metrics: Joi.string().trim().max(1000).allow('', null).optional(),
    casestudy: Joi.string().trim().max(5000).allow('', null).optional(),
    order: Joi.number().integer().min(0).optional(),
});

const experienceSchema = Joi.object({
    company: Joi.string().trim().min(1).max(200).required(),
    role: Joi.string().trim().min(1).max(200).required(),
    duration: Joi.string().trim().min(1).max(100).required(),
    description: Joi.string().trim().min(10).max(3000).required(),
    achievements: Joi.alternatives()
        .try(Joi.array().items(Joi.string().trim()), Joi.string())
        .optional(),
    technologies: Joi.alternatives()
        .try(Joi.array().items(Joi.string().trim()), Joi.string())
        .optional(),
    companyUrl: Joi.string().uri().allow('', null).optional(),
    order: Joi.number().integer().min(0).optional(),
});

const educationSchema = Joi.object({
    institution: Joi.string().trim().min(1).max(200).required(),
    degree: Joi.string().trim().min(1).max(200).required(),
    field: Joi.string().trim().max(200).allow('', null).optional(),
    startYear: Joi.number().integer().min(1900).max(2100).required(),
    endYear: Joi.alternatives()
        .try(Joi.number().integer().min(1900).max(2100), Joi.string().valid('Present'))
        .optional(),
    gpa: Joi.string().trim().max(20).allow('', null).optional(),
    order: Joi.number().integer().min(0).optional(),
});

const certificateSchema = Joi.object({
    name: Joi.string().trim().min(1).max(200).required(),
    issuer: Joi.string().trim().min(1).max(200).required(),
    issueDate: Joi.string().trim().optional(),
    expiryDate: Joi.string().trim().allow('', null).optional(),
    credentialUrl: Joi.string().uri().allow('', null).optional(),
    order: Joi.number().integer().min(0).optional(),
});

const testimonialSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    role: Joi.string().trim().max(100).allow('', null).optional(),
    company: Joi.string().trim().max(100).allow('', null).optional(),
    text: Joi.string().trim().min(10).max(1000).required(),
    rating: Joi.number().integer().min(1).max(5).optional(),
    featured: Joi.boolean().optional(),
    order: Joi.number().integer().min(0).optional(),
});

module.exports = {
    validate,
    schemas: {
        contact: contactSchema,
        skill: skillSchema,
        project: projectSchema,
        experience: experienceSchema,
        education: educationSchema,
        certificate: certificateSchema,
        testimonial: testimonialSchema,
    },
};
