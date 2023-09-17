import { container } from '../inversify.config'
import { Request, Response, NextFunction } from 'express'
import FileService from '../services/fileService'

const fileService = container.get<FileService>('FileService')

// POST api/admin/delete
async function deleteFile (req: Request, res: Response, next: NextFunction) {
  const fileId = req.body.fileId
}

// GET api/admin/all
async function getFiles (req: Request, res: Response, next: NextFunction) {
  const files = await fileService.getEncryptedFiles()
  res.status(200).json({
    count: files.length,
    filenames: files
  })
}

// POST api/admin/cleanup
async function performCleanup (req: Request, res: Response, next: NextFunction) {
  // TODO Implement file cleanup endpoint
}

export { deleteFile, getFiles, performCleanup }
