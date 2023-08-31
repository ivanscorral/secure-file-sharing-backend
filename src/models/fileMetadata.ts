import { prop, modelOptions, pre, getModelForClass } from '@typegoose/typegoose'

interface FileMetadataProps {
  id?: string;
  originalFilename: string;
  fileSize: number;
  filePath: string;
  key: Buffer;
  iv: Buffer;
  expiresAt?: Date;
  downloadCount?: number;
  maxDownloadCount?: number;
}

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

@pre<FileMetadata>('save', function (next) {
  if (this.isNew) {
    console.debug('New file metadata')
    if (!this.expiresAt) {
      this.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)
    }
    if (!this.id) {
      this.id = generateRandomString(10)
    }
  }
  next()
})

@modelOptions({ schemaOptions: { timestamps: true } })
class FileMetadata implements FileMetadataProps {
  @prop({ required: false, unique: true, index: true, default: () => generateRandomString(10) })
  public id?: string

  @prop({ required: true })
  public originalFilename!: string

  @prop({ required: true })
  public fileSize!: number

  @prop({ required: true })
  public filePath!: string

  @prop({ required: true })
  public key!: Buffer

  @prop({ required: true })
  public iv!: Buffer

  @prop({ required: false, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24) })
  public expiresAt?: Date

  @prop({ default: 0 })
  public downloadCount?: number

  @prop({ default: 1 })
  public maxDownloadCount?: number
}

const FileMetadataModel = getModelForClass(FileMetadata)

export { FileMetadataModel, FileMetadataProps, FileMetadata }
