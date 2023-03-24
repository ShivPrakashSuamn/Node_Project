const multer = require("multer");
const path = require("path");

const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/images");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    })

}).single("file");

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/tmp");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    })
}).single("file");

module.exports = { imageUpload, fileUpload }; 