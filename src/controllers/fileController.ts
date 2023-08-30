/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import FileService from '../services/fileService'
import { CryptoService } from '../services/cryptoService'
import { container } from '../inversify.config'

const fileService = container.get<FileService>('FileService')
const cryptoService = container.get<CryptoService>('CryptoService')

async function uploadFile (req: Request, res: Response, next: NextFunction) {
  const result = await fileService.uploadFile(req.file) // Implement this in FileService
  res.status(200).json(result)
}

async function downloadFile (req: Request, res: Response, next: NextFunction) {
  const file = await fileService.downloadFile(req.params.id) // Implement this in FileService
  res.status(200).send(file)
}

async function getFileStatus (req: Request, res: Response, next: NextFunction) {
  const status = await fileService.getFileStatus(req.params.id) // Implement this in FileService
  res.status(200).json(status)
}

async function testStoreMetadata (req: Request, res: Response, next: NextFunction) {
  const nanoid = await import('nanoid')
  cryptoService.setConfig({ key: Buffer.alloc(32), iv: Buffer.alloc(16), algorithm: 'aes-256-ctr' })

  const metadata = {
    id: nanoid.nanoid(10),
    filePath: 'test.txt',
    key: cryptoService.config.key,
    iv: cryptoService.config.iv,
    downloadCount: 0,
    maxDownloadCount: 0,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6)
  }

  const result = await fileService.createFileMetadata(metadata) // Implement this in FileService
  res.status(200).json(result)
}

export { uploadFile, downloadFile, getFileStatus, testStoreMetadata }
