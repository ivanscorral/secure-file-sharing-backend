import mongoose from 'mongoose'
import { prop, modelOptions, pre, getModelForClass } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'


//Hooks
@modelOptions({ schemaOptions: { timestamps: true } })
@pre<FileMetadata>('save', function(next){
  if (this.isNew && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)
  }
  next()
})

interface FileMetadataProps {
  id: string
  filePath: string
  key: Buffer
  iv: Buffer
  expiresAt: Date
  downloadCount?: number
  maxDownloadCount: number
}

class FileMetadata {
  @prop({ required: true, unique: true, index: true, default: () => nanoid(10)})
  public id!: string

  @prop({ required: true })
  public filePath!: string

  @prop({ required: true })
  public key!: Buffer

  @prop({ required: true })
  public iv!: Buffer

  @prop({ required: true })
  public expiresAt!: Date

  @prop({ default: 0 })
  public downloadCount?: number

  @prop(default: 0)
  public maxDownloadCount!: number
}

export const FileMetadataModel = getModelForClass(FileMetadata)
