const express = require('express');
const router = express.Router();
const {
    getPersonalInfo,
    updatePersonalInfo,
} = require('../controllers/personalInfoController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const multiUpload = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);

router.route('/')
    .get(getPersonalInfo)
    .put(protect, multiUpload, updatePersonalInfo);

module.exports = router;
