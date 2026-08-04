const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const docTypes = /pdf|doc|docx/;
        const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
        const isDoc = docTypes.test(ext) || file.mimetype === 'application/pdf';

        return {
            folder: 'mern-portfolio',
            resource_type: isDoc ? 'raw' : 'auto',
            public_id: isDoc
                ? `${file.fieldname}-${Date.now()}.${ext}`   // e.g. resume-1234567890.pdf
                : `${file.fieldname}-${Date.now()}`           // images: Cloudinary handles extension
        };
    },
});

// Accepts both images AND document files (for resume)
function checkFileType(file, cb) {
    const docTypes = /pdf|doc|docx/;

    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    
    // Check if it's an image based on mimetype or common image extensions (for cases like HEIC where mimetype might not be standard)
    const isImage = file.mimetype.startsWith('image/') || /^(jpg|jpeg|png|webp|gif|heic|heif|svg|bmp|tiff|avif)$/.test(ext);
    
    const isDoc = docTypes.test(ext) && (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (isImage || isDoc) {
        return cb(null, true);
    } else {
        cb(new Error('Only images and documents (pdf, doc, docx) are allowed!'));
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

module.exports = upload;

