import { Router } from 'express'
import { uploadFile, downloadFile, getFileStatus, testStoreMetadata } from '../controllers/fileController'

const fileRouter: Router = Router()

// Upload Endpoint: Handle file upload and encryption
fileRouter.post('/upload', uploadFile)

// Download Endpoint: Retrieve and decrypt the file
fileRouter.get('/download/:id', downloadFile)

// Optional: Status Endpoint to check file metadata or status
fileRouter.get('/status/:id', getFileStatus)

fileRouter.get('/testStoreMetadata', testStoreMetadata)

export default fileRouter
