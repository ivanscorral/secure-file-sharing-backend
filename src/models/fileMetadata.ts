interface FileMetadataProps {
  id: string;
  originalFilename: string;
  fileSize: number;
  key: Buffer;
  iv: Buffer;
  expiresAt?: Date;
  downloadCount?: number;
  maxDownloadCount?: number;
}

class FileMetadata implements FileMetadataProps {
  public id!: string
  public originalFilename!: string
  public fileSize!: number
  public key!: Buffer
  public iv!: Buffer
  public expiresAt?: Date
  public downloadCount?: number
  public maxDownloadCount?: number

  constructor (props: Partial<FileMetadata>) {
    Object.assign(this, props)
  }

  // Optionally, include methods to convert between this class and SQLite row data
  static fromRow (row: any): FileMetadata {
    return new FileMetadata({
      id: row.id,
      originalFilename: row.originalFilename,
      fileSize: row.fileSize,
      key: row.key,
      iv: row.iv,
      expiresAt: row.expiresAt ? new Date(row.expiresAt) : undefined,
      downloadCount: row.downloadCount,
      maxDownloadCount: row.maxDownloadCount
    })
  }

  toRow (): any {
    return {
      id: this.id,
      originalFilename: this.originalFilename,
      fileSize: this.fileSize,
      key: this.key,
      iv: this.iv,
      expiresAt: this.expiresAt ? this.expiresAt.toISOString() : null,
      downloadCount: this.downloadCount,
      maxDownloadCount: this.maxDownloadCount
    }
  }
}

export { FileMetadataProps, FileMetadata }
