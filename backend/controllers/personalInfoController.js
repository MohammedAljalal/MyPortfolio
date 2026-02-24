const PersonalInfo = require('../models/personalInfoModel');

// @desc    Get personal info
// @route   GET /api/personal
// @access  Public
const getPersonalInfo = async (req, res, next) => {
    try {
        const info = await PersonalInfo.findOne();
        res.json(info || {});
    } catch (error) {
        next(error);
    }
};

// @desc    Update personal info
// @route   PUT /api/personal
// @access  Private/Admin
const updatePersonalInfo = async (req, res, next) => {
    try {
        let info = await PersonalInfo.findOne();
        const { fullName, title, bio, github, linkedin, twitter, facebook, phone, email, whatsapp } = req.body;

        let updatedFields = {
            fullName,
            title,
            bio,
            socialLinks: {
                github,
                linkedin,
                twitter,
                facebook,
            },
            contactInfo: {
                phone,
                email,
                whatsapp,
            }
        };

        // Remove undefined fields to not overwrite with null
        Object.keys(updatedFields).forEach(key => {
            if (updatedFields[key] === undefined) delete updatedFields[key];
        });

        if (req.files) {
            if (req.files.profileImage && req.files.profileImage.length > 0) {
                updatedFields.profileImage = req.files.profileImage[0].path;
            }
            if (req.files.resume && req.files.resume.length > 0) {
                updatedFields.resumeLink = req.files.resume[0].path;
            }
        }

        if (info) {
            // Update existing
            info = await PersonalInfo.findByIdAndUpdate(
                info._id,
                { $set: updatedFields },
                { new: true }
            );
        } else {
            // Create new
            info = await PersonalInfo.create(updatedFields);
        }

        res.json(info);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPersonalInfo,
    updatePersonalInfo,
};
