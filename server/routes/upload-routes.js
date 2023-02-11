const multer = require("multer");
const express = require("express");
const path = require("path");

const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname).toLowerCase())
    }
})
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Only JPG and PNG images are accepted!'))
        }
        cb(undefined, true)
    }});

router.post('/', upload.single('file'), function(req, res) {
    res.send({status: 'success', imageUrl: process.env.ip + req.file.filename});
});

module.exports = router;
