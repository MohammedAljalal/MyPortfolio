const Certificate = require('../models/certificateModel');

const getCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
        res.json(certificates);
    } catch (error) {
        next(error);
    }
};

const createCertificate = async (req, res, next) => {
    try {
        const { name, issuer, issueDate, expiryDate, credentialUrl, order } = req.body;
        let image = '';
        if (req.file) image = req.file.path;

        const certificate = await Certificate.create({
            name, issuer, issueDate, expiryDate, credentialUrl, image,
            order: order ?? 0,
        });
        res.status(201).json(certificate);
    } catch (error) {
        next(error);
    }
};

const updateCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            res.status(404);
            return next(new Error('Certificate not found'));
        }
        const updatedFields = { ...req.body };
        if (req.file) updatedFields.image = req.file.path;

        const updated = await Certificate.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

const deleteCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            res.status(404);
            return next(new Error('Certificate not found'));
        }
        await certificate.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
