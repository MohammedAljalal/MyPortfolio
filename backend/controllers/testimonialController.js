const Testimonial = require('../models/testimonialModel');

const getTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        next(error);
    }
};

const createTestimonial = async (req, res, next) => {
    try {
        const { name, role, company, text, rating, featured, order } = req.body;
        let avatar = '';
        if (req.file) avatar = req.file.path;

        const testimonial = await Testimonial.create({
            name, role, company, text, avatar,
            rating: rating ?? 5,
            featured: featured === 'true' || featured === true,
            order: order ?? 0,
        });
        res.status(201).json(testimonial);
    } catch (error) {
        next(error);
    }
};

const updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            res.status(404);
            return next(new Error('Testimonial not found'));
        }
        const updatedFields = { ...req.body };
        if (req.file) updatedFields.avatar = req.file.path;

        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            res.status(404);
            return next(new Error('Testimonial not found'));
        }
        await testimonial.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
