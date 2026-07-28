const express = require('express');
const router = express.Router();
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getCertificates)
    .post(protect, upload.single('image'), createCertificate);

router.route('/:id')
    .put(protect, upload.single('image'), updateCertificate)
    .delete(protect, deleteCertificate);

module.exports = router;
