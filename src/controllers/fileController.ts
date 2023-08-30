import { Request, Response, NextFunction } from 'express'
import FileService from '../services/fileService'
import { CryptoService } from '../services/cryptoService'
import { container } from '../inversify.config'

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
  // const fileService = container.get<FileService>('FileService')
  const cryptoService = container.get<CryptoService>('CryptoService')
  const nanoid = await dynamicImport('nanoid')
  cryptoService.setConfig({ key: Buffer.alloc(32), iv: Buffer.alloc(16), algorithm: 'aes-256-ctr' })
  console.log(cryptoService.config)
  const metadata = {
    id: nanoid.nanoid(10),
    filePath: 'test.txt',
    key: cryptoService.config.key,
    iv: cryptoService.config.iv,
    downloadCount: 0,
    maxDownloadCount: 0,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6)
  }

  // const result = await fileService.createFileMetadata(metadata)
  res.status(200).send('Generated metadata: ' + JSON.stringify(metadata))
}

export { uploadFile, downloadFile, getFileStatus, testStoreMetadata }
