// src/services/fileService.ts
import FileMetadataRepository from '../repositories/fileMetadataRepository'
import { FileMetadata, FileMetadataProps } from '../models/fileMetadata'
import CryptoService, { CryptoConfig } from './cryptoService'
import { container } from '../inversify.config'
import { injectable } from 'inversify'
import path from 'path'
import { promises as fs } from 'fs'
import MetadataService from './metadataService'

@injectable()
class FileService {
  private _fileMetadataRepository: FileMetadataRepository
  private _cryptoService: CryptoService
  private _basePath: string = path.resolve('./uploads')
  private _cryptoConfig: CryptoConfig
  private _metadataService: MetadataService

  constructor () {
    this._fileMetadataRepository = container.get<FileMetadataRepository>('FileMetadataRepository')
    this._cryptoService = container.get<CryptoService>('CryptoService')
    this._metadataService = container.get<MetadataService>('MetadataService')
    this._cryptoConfig = {
      key: Buffer.alloc(32),
      iv: Buffer.alloc(16),
      algorithm: 'aes-256-ctr'
    }
  }

  async writeFile (filePath: string, data: Buffer): Promise<void> {
    try {
      const basePath: string = path.resolve(this._basePath, filePath)
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

  async getTotalUsedSpace (): Promise<number> {
    const files = await this._fileMetadataRepository.findAll()
    return files.reduce<number>((total: number, file: FileMetadataProps) => { return total + file.fileSize }, 0)
  }

  async deleteFile (id: string): Promise<void> {
    if (await this._fileMetadataRepository.findById(id) === null) {
      throw new Error('File not found')
    }
    // Delete file from disk
    const filePath: string = path.resolve(this._basePath, `${id}.bin`)
    console.debug(`Deleting file ${filePath}`)
    await fs.unlink(filePath)
    await this._fileMetadataRepository.deleteById(id)
  }

  private resolveEncryptedFilePath (id: string): string {
    return path.resolve(this._basePath, `${id}.bin`)
  }

  async encryptFile (filePath: string): Promise<FileMetadata> {
    // generate a new key and iv
    this._cryptoService.generateKeyAndIv(this._cryptoConfig)
    // read the file
    const data: Buffer = await this.readFile(filePath)
    // encrypt the data
    const encryptedData: Buffer = await this._cryptoService.encrypt(data, this._cryptoConfig)
    const fileMetadata: FileMetadata = await this._metadataService.createFileMetadata(filePath, encryptedData.length, this._cryptoConfig)
    // write encrypted data to file
    await this.writeFile(this.resolveEncryptedFilePath(fileMetadata.id), encryptedData)
    return fileMetadata
  }

  async uploadFile (file: Express.Multer.File): Promise<FileMetadata | null> {
    try {
      const fileMetadata = await this.encryptFile(file.path)
      console.log(fileMetadata)
      return fileMetadata
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getEncryptedFiles (): Promise<string[]> {
    return await fs.readdir(this._basePath)
  }

  async downloadFile (id: string): Promise<Buffer | null> {
    try {
      const metadata = await this._fileMetadataRepository.findById(id)
      console.log(metadata)
      if (!metadata) {
        return null
      }

      const config: CryptoConfig = {
        key: metadata.key,
        iv: metadata.iv,
        algorithm: 'aes-256-ctr'
      }
      const encryptedData = await this.readFile(this.resolveEncryptedFilePath(id))
      const data = await this._cryptoService.decrypt(encryptedData, config)

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getFileStatus (id: string): Promise<FileMetadata | null> {
    // TODO: Implement actual file status
    return null
  }
}
export default FileService
