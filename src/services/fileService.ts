/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import FileMetadataRepository from '../repositories/fileMetadataRepository'
import { FileMetadata } from '../models/fileMetadata'
import { CryptoService, CryptoConfig } from './cryptoService'
import { container } from '../inversify.config'
import { injectable } from 'inversify'
import path from 'path'
import { promises as fs } from 'fs'

@injectable()
class FileService {
  private _fileMetadataRepository: FileMetadataRepository
  private _cryptoService: CryptoService

  constructor () {
    this._fileMetadataRepository = container.get<FileMetadataRepository>('FileMetadataRepository')
    this._cryptoService = container.get<CryptoService>('CryptoService')
  }

  async createFileMetadata (metadata: FileMetadata): Promise<FileMetadata> {
    // TODO: Implement actual file creation
    return await this._fileMetadataRepository.create(metadata)
  }

  async writeFile (filePath: string, data: Buffer): Promise<void> {
    try {
      const basePath: string = path.resolve(filePath)
      await fs.writeFile(basePath, data)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async readFile (filePath: string): Promise<Buffer> {
    try {
      const basePath: string = path.resolve(filePath)
      const dataBuffer: Buffer = await fs.readFile(basePath)
      return dataBuffer
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteFile (id: string): Promise<void> {
    // TODO Implement file deletion logic
  }

  async incrementDownloadCount (id: string): Promise<void> {
    // TODO Implement file download logic
  }

  async handleFileExpiration (id: string): Promise<void> {
    // TODO Implement file expiration logic
  }

  async uploadFile (file: any): Promise<FileMetadata | null> {
    // TODO: Implement actual file upload
    return null
  }

  async downloadFile (id: string): Promise<Buffer | null> {
    // TODO: Implement actual file download
    return null
  }

  async getFileStatus (id: string): Promise<FileMetadata | null> {
    // TODO: Implement actual file status
    return null
  }
}
export default FileService
