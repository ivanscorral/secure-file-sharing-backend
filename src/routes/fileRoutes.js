const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Upload Endpoint: Handle file upload and encryption
router.post('/upload', fileController.uploadFile);

// Download Endpoint: Retrieve and decrypt the file
router.get('/download/:id', fileController.downloadFile);

// Optional: Status Endpoint to check file metadata or status
router.get('/status/:id', fileController.getFileStatus);

module.exports = router;
