const express = require('express');
const upload = require('../middlewares/upload');  // Multer middleware
const fileUploadController = require('../controllers/fileUploadController');

const router = express.Router();

// File upload route
router.post('/upload', upload.single('file'), fileUploadController.uploadFile);

module.exports = router;
