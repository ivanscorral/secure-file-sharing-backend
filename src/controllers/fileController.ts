import FileService from '../services/fileService'
import CryptoService from '../services/cryptoService'
import { container } from '../inversify.config'
import { Request, Response } from 'express'

const fileService = container.get<FileService>('FileService')
const cryptoService = container.get<CryptoService>('CryptoService')

async function uploadFile (req: Request, res: Response) {
  // const result = await fileService.uploadFile(req.file) // Implement this in FileService
  // res.status(200).json(result)
}

async function downloadFile (req: Request, res: Response) {
  console.log(req.params.id)
  const fileBuffer = await fileService.downloadFile(req.params.id)
  console.log(fileBuffer)
  res.status(200).send(fileBuffer)
}

async function getFileStatus (req: Request, res: Response) {
  const status = await fileService.getFileStatus(req.body.id) // Implement this in FileService
  res.status(200).json(status)
}

export { uploadFile, downloadFile, getFileStatus }
