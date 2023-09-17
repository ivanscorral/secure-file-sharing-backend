import { FileMetadata } from './models/fileMetadata'
import { injectable } from 'inversify'
import { FileService } from './services/fileService'
import { MetadataService } from './services/metadataService'
import { container } from './inversify.config'

@injectable()
class DatabaseCleanupService {
  private _fileService: FileService
  private _metadataService: MetadataService

  constructor () {
    this._fileService = container.get<FileService>('FileService')
    this._metadataService = container.get<MetadataService>('MetadataService')
  }

  public async cleanupUnusedData (): Promise<void> {
    const fsFiles = await this._fileService.getEncryptedFiles()
    const dbEntries: FileMetadata[] = await this._metadataService.getAll()

    const fsFilesWithoutExtension = fsFiles.map((file) => file.slice(0, -4))

    for (const record of dbEntries) {
      if (!fsFilesWithoutExtension.includes(record.id)) {
        await this._metadataService.removeFileMetadata(record.id)
      }
    }
  }

  public async removeExpiredRecords (expiryTime: number): Promise<void> {
    const currentTime = Date.now()
    const dbEntries: FileMetadata[] = await this._metadataService.getAll()

    for (const record of dbEntries) {
      const recordTime = record.createdAt.getTime()
      if (currentTime - recordTime > expiryTime) {
        await this._metadataService.removeFileMetadata(record.id)
      }
    }
  }
}

export { DatabaseCleanupService }
