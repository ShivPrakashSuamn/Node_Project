const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/images");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg");
        }
    })

}).single("file");

const up_template = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/tmp");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".zip");
        }
    })
}).single("template");

module.exports = { upload, up_template };