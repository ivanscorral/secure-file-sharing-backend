const FileMetadataRepository = require('../repositories/fileMetadataRepository')
const FileService = require('../services/fileService')
const FileMetadataModel = require('../models/fileMetadataModel')

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
  const fileMetadataRepository = new FileMetadataRepository(FileMetadataModel)
  const fileService = new FileService(fileMetadataRepository)
  // create a mock metadata object with a unique ID
  const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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
