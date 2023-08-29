import express from 'express'
import { uploadFile, downloadFile, getFileStatus, testStoreMetadata } from '../controllers/fileController'
import { Router } from 'express'

const router: Router = express.Router()

// Upload Endpoint: Handle file upload and encryption
router.post('/upload', uploadFile)

// Download Endpoint: Retrieve and decrypt the file
router.get('/download/:id', downloadFile)

// Optional: Status Endpoint to check file metadata or status
router.get('/status/:id', getFileStatus)

router.get('/testStoreMetadata', testStoreMetadata)

export default router
