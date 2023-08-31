// src/services/MetadataService.ts
import { container } from '../inversify.config'
import { injectable } from 'inversify'
import FileMetadataRepository from '../repositories/fileMetadataRepository'
import path from 'path'
import { FileMetadata, FileMetadataProps } from '../models/fileMetadata'
import { CryptoConfig } from './cryptoService'

@injectable()
class MetadataService {
  private _fileMetadataRepository: FileMetadataRepository
  private _basePath: string = path.resolve('./uploads')

  constructor () {
    this._fileMetadataRepository = container.get<FileMetadataRepository>('FileMetadataRepository')
  }

  public async createFileMetadata (originalFilename: string, fileSize: number, cryptoConfig: CryptoConfig): Promise<FileMetadataProps> {
    const fileId = (await import('nanoid')).nanoid(10)
    const newFilePath = path.resolve(this._basePath, `${fileId}.bin`)
    const metadata: FileMetadataProps = {
      id: fileId,
      originalFilename,
      fileSize,
      filePath: newFilePath,
      key: cryptoConfig.key,
      iv: cryptoConfig.iv
    }
    return metadata
  }

  public async saveFileMetadata (metadata: FileMetadata): Promise<FileMetadata> {
    return this._fileMetadataRepository.create(metadata)
  }

  public async getFileMetadata (id: string): Promise<FileMetadata | null> {
    return this._fileMetadataRepository.findById(id)
  }

  public async incrementDownloadCount (id: string): Promise<void> {
    // TODO Implement file download logic
  }

  public async handleFileExpiration (id: string): Promise<void> {
    // TODO Implement file expiration logic
  }
}
export default MetadataService
