import { injectable } from 'inversify'
import { FileMetadata, FileMetadataModel } from '../models/fileMetadata'

@injectable()
class FileMetadataRepository {
  async create (fileMetadata: FileMetadata): Promise<FileMetadata> {
    const newFileMetadata = new FileMetadataModel(fileMetadata) // Using FileMetadataModel here
    return await newFileMetadata.save()
  }

  async findById (id: string): Promise<FileMetadata | null> {
    return await FileMetadataModel.findOne({ id }).exec() // Using FileMetadataModel here
  }

  async findAll (): Promise<FileMetadata[]> {
    return await FileMetadataModel.find().exec()
  }

  async deleteById (id: string) {
    await FileMetadataModel.findOneAndDelete({ id }).exec()
  }

  async getAllIdentifiers (): Promise<string[]> {
    const files = await this.findAll()
    return files.map(file => file.id as string)
  }

  async updateById (id: string, updates: Partial<FileMetadata>): Promise<void> {
    await FileMetadataModel.findOneAndUpdate({ id }, updates, { new: true }).exec() // Using FileMetadataModel here
  }

  // Add more methods as needed
}

export default FileMetadataRepository
