const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Accepts both images AND document files (for resume)
function checkFileType(file, cb) {
    const imageTypes = /jpg|jpeg|png|webp|gif/;
    const docTypes = /pdf|doc|docx/;

    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const isImage = imageTypes.test(ext) && imageTypes.test(file.mimetype);
    const isDoc = docTypes.test(ext) && (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (isImage || isDoc) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpg, png, webp) and documents (pdf, doc, docx) are allowed!'));
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

