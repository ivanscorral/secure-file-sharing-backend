/* eslint-disable @typescript-eslint/no-unused-vars */
import FileMetadataRepository from '../repositories/fileMetadataRepository'
import { FileMetadata } from '../models/fileMetadata'
import { CryptoService, CryptoConfig } from './cryptoService'
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

  async deleteFile (id: string): Promise<void> {
    // TODO Implement file deletion logic
  }

  async incrementDownloadCount (id: string): Promise<void> {
    // TODO Implement file download logic
  }

  async handleFileExpiration (id: string): Promise<void> {
    // TODO Implement file expiration logic
  }

  async encryptFile (filePath: string): Promise<any> {
    // generate a new key and iv
    this._cryptoService.generateKeyAndIv(this._cryptoConfig)
    // read the file
    const data: Buffer = await this.readFile(filePath)
    // encrypt the data
    const encryptedData: Buffer = await this._cryptoService.encrypt(data, this._cryptoConfig)
    const fileMetadata: FileMetadata = await this._metadataService.createFileMetadata(filePath, encryptedData.length, this._cryptoConfig)
    // return the encrypted data
    return { encryptedData, fileMetadata }
  }

  async uploadFile (file: Express.Multer.File): Promise<FileMetadata | null> {
    try {
      const encryptedObject = (await this.encryptFile(file.path))
      // await this.writeFile(newFilePath, encryptedData)
      const fileMetadata: FileMetadata = encryptedObject.fileMetadata
      const encryptedData: Buffer = encryptedObject.encryptedData
      console.log(fileMetadata)
      return await this._fileMetadataRepository.create(fileMetadata)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async downloadFile (id: string): Promise<Buffer | null> {
    try {
      const metadata = await this._fileMetadataRepository.findById(id)
      if (!metadata) {
        return null
      }

      const config: CryptoConfig = {
        key: metadata.key,
        iv: metadata.iv,
        algorithm: 'aes-256-ctr'
      }
      const encryptedData = await this.readFile(metadata.filePath)
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
