import { FileMetadata } from '../models/fileMetadata'
import { SQLITE_PATH } from '../config'
import { GenericRepository } from './genericRepository'

class FileMetadataRepository extends GenericRepository<FileMetadata> {
  constructor () {
    super(SQLITE_PATH, 'FileMetadata')
  }

  toRow (entity: FileMetadata): any {
    return {
      id: entity.id,
      originalFilename: entity.originalFilename,
      fileSize: entity.fileSize,
      key: entity.key,
      iv: entity.iv,
      expiresAt: entity.expiresAt?.toISOString(),
      downloadCount: entity.downloadCount,
      maxDownloadCount: entity.maxDownloadCount
    }
  }

  fromRow (row: any): FileMetadata {
    return new FileMetadata(row)
  }
}

export default FileMetadataRepository
