// src/models/fileMetadata.ts
import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

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

@modelOptions({ schemaOptions: { timestamps: true } })
class FileMetadata implements FileMetadataProps {
  @prop({ required: true, unique: true, index: true })
  public id!: string

  @prop({ required: true })
  public originalFilename!: string

  @prop({ required: true })
  public fileSize!: number

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
