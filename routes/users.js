const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const multer = require('multer');

let upload = multer ({
}).single();

router.get("/", UserController.fetchAllUsers);
router.get("/:id", UserController.fetchUserById);
router.post("/", upload, UserController.createUser);
router.post("/login", upload, UserController.login);

module.exports = router;