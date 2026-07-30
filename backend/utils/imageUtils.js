const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

/**
 * Converts a HEIC/HEIF image to JPG.
 * If the input file is not a HEIC image, it returns the original filename.
 * 
 * @param {Object} file - The multer file object
 * @returns {Promise<string>} - The filename of the processed image
 */
const convertHeicToJpgIfNeeded = async (file) => {
    if (!file) return null;

    const ext = path.extname(file.originalname).toLowerCase();
    
    // Check if it's a HEIC file
    if (ext === '.heic' || ext === '.heif') {
        const inputFilePath = file.path;
        // Generate new filename with .jpg extension
        const newFilename = file.filename.replace(/\.heic|\.heif/i, '.jpg');
        const outputFilePath = path.join(file.destination, newFilename);

        try {
            const inputBuffer = fs.readFileSync(inputFilePath);
            
            const outputBuffer = await heicConvert({
                buffer: inputBuffer, // the HEIC file buffer
                format: 'JPEG',      // output format
                quality: 0.8         // the jpeg compression quality, between 0 and 1
            });

            // Write the converted JPEG to disk
            fs.writeFileSync(outputFilePath, outputBuffer);

            // Delete the original HEIC file to save space
            fs.unlinkSync(inputFilePath);

            return newFilename;
        } catch (error) {
            console.error('Error converting HEIC image:', error);
            // If conversion fails, return the original filename and let the frontend deal with it
            return file.filename;
        }
    }

    // Not a HEIC file, return original filename
    return file.filename;
};

module.exports = {
    convertHeicToJpgIfNeeded
};
