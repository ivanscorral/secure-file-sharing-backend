import { Request, Response, NextFunction } from 'express'
import FileMetadataRepository from '../repositories/fileMetadataRepository'
import FileService from '../services/fileService'
import { randomBytes } from 'crypto'

async function dynamicImport (modulePath: string) {
  return await import(modulePath)
}

// Upload File: Handles file upload and encryption
async function uploadFile (req: Request, res: Response, next: NextFunction) {
  // TODO: Implement file upload logic
  res.status(200).send('File upload endpoint')
  next()
}

// Download File: Retrieve and decrypt the file
async function downloadFile (req: Request, res: Response, next: NextFunction) {
  // TODO: Implement file download logic
  res.status(200).send('File download endpoint')
  next()
}

// Get File Status: Check file metadata or status (optional)
async function getFileStatus (req: Request, res: Response, next: NextFunction) {
  // TODO: Implement file status check logic
  res.status(200).send('File status endpoint')
  next()
}

async function testStoreMetadata (req: Request, res: Response, next: NextFunction) {
  const fileMetadataRepository = new FileMetadataRepository()
  const fileService = new FileService(fileMetadataRepository)
  const nanoid = await dynamicImport('nanoid')

  const metadata = {
    id: nanoid(8), // Assuming nanoid(8) generates a string
    filePath: 'test.txt',
    key: randomBytes(32),
    iv: randomBytes(16),
    downloadCount: 0,
    maxDownloadCount: 0,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6)
  }

  const result = await fileService.createFileMetadata(metadata)
  res.status(200).send('Request result: ' + result)
  next()
}

export { uploadFile, downloadFile, getFileStatus, testStoreMetadata }
