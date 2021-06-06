const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');

// multer middleware
let storage = multer.diskStorage( {
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer ({
    storage: storage,
}).single("image");

router.get("/", API.fetchAllBooks);
router.get("/count", API.countBooks);
router.get("/param/:param", API.getField);
router.get("/crDate", API.getBooksSortedDescByCreationDate);
router.get("/:id", API.fetchBookById);
router.post("/", upload, API.createBook);
router.patch("/:id", upload, API.updateBook);
router.delete("/:id", API.deleteBook);

module.exports = router;