// src/services/MetadataService.ts
import { container } from '../inversify.config'
import { injectable } from 'inversify'
import { nanoid } from '../config'
import FileMetadataRepository from '../repositories/fileMetadataRepository'
import path from 'path'
import { FileMetadata } from '../models/fileMetadata'
import { CryptoConfig } from './cryptoService'

@injectable()
class MetadataService {
  private _fileMetadataRepository: FileMetadataRepository
  private _basePath: string = path.resolve('./uploads')

  constructor () {
    this._fileMetadataRepository = container.get<FileMetadataRepository>('FileMetadataRepository')
  }

  public async getAll (): Promise<FileMetadata[]> {
    return await this._fileMetadataRepository.findAll()
  }

  public async createFileMetadata (originalFilename: string, fileSize: number, cryptoConfig: CryptoConfig): Promise<FileMetadata> {
    const fileId = nanoid(12)
    const metadata: FileMetadata = {
      id: fileId,
      originalFilename,
      fileSize,
      key: cryptoConfig.key,
      iv: cryptoConfig.iv
    }
    await this._fileMetadataRepository.create(metadata)
    return metadata
  }

  public async saveFileMetadata (metadata: FileMetadata): Promise<FileMetadata> {
    return this._fileMetadataRepository.create(metadata)
  }

  public async getFileMetadata (id: string): Promise<FileMetadata | null> {
    return this._fileMetadataRepository.findById(id)
  }
}
export default MetadataService
