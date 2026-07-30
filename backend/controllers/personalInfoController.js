const PersonalInfo = require('../models/personalInfoModel');
const { convertHeicToJpgIfNeeded } = require('../utils/imageUtils');

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
                const finalFilename = await convertHeicToJpgIfNeeded(req.files.profileImage[0]);
                updatedFields.profileImage = `/uploads/${finalFilename}`;
            }
            if (req.files.resume && req.files.resume.length > 0) {
                updatedFields.resumeLink = `/uploads/${req.files.resume[0].filename}`;
            }
        }

        // Logic for auto-generating a profile picture from the name
        const currentProfileImage = info ? info.profileImage : null;
        if (!updatedFields.profileImage) {
            const isGeneratedAvatar = currentProfileImage && currentProfileImage.startsWith('https://ui-avatars.com/');
            if (!currentProfileImage || isGeneratedAvatar) {
                const nameToUse = fullName !== undefined ? fullName : (info?.fullName || 'User');
                // Only generate if there's no current image, or if the name changed and we're currently using a generated avatar
                if (!info || !currentProfileImage || (isGeneratedAvatar && fullName && fullName !== info.fullName)) {
                    updatedFields.profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameToUse)}&size=256&background=random`;
                }
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
