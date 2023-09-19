import { injectable } from 'inversify'
import { nanoid } from '../config'
import path from 'path'
import { FileMetadata, FileMetadataProps } from '../models/fileMetadata'
import { CryptoConfig } from './cryptoService'
import FileMetadataRepository from '../repositories/fileMetadataRepository'

@injectable()
export default class MetadataService {
  private readonly fileMetadataRepository: FileMetadataRepository
  private readonly basePath: string

  constructor () {
    this.fileMetadataRepository = new FileMetadataRepository()
    this.basePath = path.resolve('./uploads')
  }

  public async getAll (): Promise<FileMetadata[]> {
    return this.fileMetadataRepository.findAll()
  }

  public async removeFileMetadata (id: string): Promise<void> {
    await this.fileMetadataRepository.deleteById(id)
  }

  public async createFileMetadata (
    originalFilename: string,
    fileSize: number,
    cryptoConfig: CryptoConfig
  ): Promise<FileMetadata> {
    const fileId = nanoid(12)
    const metadataProps: FileMetadataProps = {
      id: fileId,
      originalFilename,
      fileSize,
      key: cryptoConfig.key,
      iv: cryptoConfig.iv
    }
    const metadata = new FileMetadata(metadataProps)
    await this.fileMetadataRepository.create(metadata.toRow())
    return metadata
  }

  public async saveFileMetadata (metadata: FileMetadata): Promise<FileMetadata> {
    await this.fileMetadataRepository.create(metadata.toRow())
    return metadata
  }

  public async getFileMetadata (id: string): Promise<FileMetadata | null> {
    return this.fileMetadataRepository.findById(id)
  }
}
