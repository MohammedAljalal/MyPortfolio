const express = require('express');
const router = express.Router();
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { protect } = require('../middleware/authMiddleware');
const { validate, schemas } = require('../middleware/validateMiddleware');

router.route('/')
    .get(getEducation)
    .post(protect, validate(schemas.education), createEducation);

router.route('/:id')
    .put(protect, validate(schemas.education), updateEducation)
    .delete(protect, deleteEducation);

module.exports = router;
