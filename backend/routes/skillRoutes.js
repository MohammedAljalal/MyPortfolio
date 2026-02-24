const express = require('express');
const router = express.Router();
const {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getSkills)
    .post(protect, upload.single('icon'), createSkill);

router.route('/:id')
    .put(protect, upload.single('icon'), updateSkill)
    .delete(protect, deleteSkill);

module.exports = router;
