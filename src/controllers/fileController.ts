import FileMetadataRepository from '../repositories/fileMetadataRepository'
import FileService from '../services/fileService'
import FileMetadataModel from '../models/fileMetadataModel'
import { randomBytes } from 'crypto'

// Upload File: Handles file upload and encryption
exports.uploadFile = (req, res, next) => {
  // TODO: Implement file upload logic
  res.status(200).send('File upload endpoint')
}

// Download File: Retrieve and decrypt the file
exports.downloadFile = (req, res, next) => {
  // TODO: Implement file download logic
  res.status(200).send('File download endpoint')
}

// Get File Status: Check file metadata or status (optional)
exports.getFileStatus = (req, res, next) => {
  // TODO: Implement file status check logic
  res.status(200).send('File status endpoint')
}

exports.testStoreMetadata = async (req, res, next) => {
  // initialize repository and service with metadata model
  const fileMetadataRepository: FileMetadataRepository = new FileMetadataRepository(FileMetadataModel)
  const fileService: FileService = new FileService(fileMetadataRepository)
  // create a mock metadata object with a unique ID
  const id = randomBytes(8).toString('hex')
  const metadata = {
    id: uniqueId,
    filePath: 'test.txt',
    encryptionKey: 'encryptionKey',
    expirationTime: new Date(),
    downloadCount: 0,
    maxDownloads: 0,
    createdAt: new Date(),
    status: 'available'
  }
  // store metadata
  const result = await fileService.createFile(metadata)
  res.status(200).send('Request result: ' + result)
}
