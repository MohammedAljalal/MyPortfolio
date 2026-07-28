const PersonalInfo = require('../models/personalInfoModel');

/**
 * @desc    Get personal info (singleton document)
 * @route   GET /api/personal
 * @access  Public
 */
const getPersonalInfo = async (req, res, next) => {
    try {
        const info = await PersonalInfo.findOne();
        res.json(info || {});
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create or update personal info
 * @route   PUT /api/personal
 * @access  Private/Admin
 */
const updatePersonalInfo = async (req, res, next) => {
    try {
        let info = await PersonalInfo.findOne();

        const {
            fullName,
            title,
            bio,
            email,
            location,
            availableForWork,
            github,
            linkedin,
            twitter,
            stats,
        } = req.body;

        const updatedFields = {
            ...(fullName !== undefined && { fullName }),
            ...(title !== undefined && { title }),
            ...(bio !== undefined && { bio }),
            ...(email !== undefined && { email }),
            ...(location !== undefined && { location }),
            ...(availableForWork !== undefined && { availableForWork }),
            socialLinks: {
                ...(github !== undefined && { github }),
                ...(linkedin !== undefined && { linkedin }),
                ...(twitter !== undefined && { twitter }),
            },
            // stats comes as JSON string from multipart form or as array from JSON body
            ...(stats !== undefined && {
                stats: typeof stats === 'string' ? JSON.parse(stats) : stats,
            }),
        };

        if (req.files) {
            if (req.files.profileImage && req.files.profileImage.length > 0) {
                updatedFields.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
            }
            if (req.files.resume && req.files.resume.length > 0) {
                updatedFields.resumeLink = `/uploads/${req.files.resume[0].filename}`;
            }
        }

        if (info) {
            info = await PersonalInfo.findByIdAndUpdate(
                info._id,
                { $set: updatedFields },
                { new: true, runValidators: true }
            );
        } else {
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
