import express from 'express'
import fileController from '../controllers/fileController'
import { Router } from 'express'

const router: Router = express.Router()

// Upload Endpoint: Handle file upload and encryption
router.post('/upload', fileController.uploadFile)

// Download Endpoint: Retrieve and decrypt the file
router.get('/download/:id', fileController.downloadFile)

// Optional: Status Endpoint to check file metadata or status
router.get('/status/:id', fileController.getFileStatus)

router.get('/testStoreMetadata', fileController.testStoreMetadata)

export default router
