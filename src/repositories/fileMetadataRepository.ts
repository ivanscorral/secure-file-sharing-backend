import { injectable } from 'inversify'
import { FileMetadata, FileMetadataModel } from '../models/fileMetadata'

@injectable()
class FileMetadataRepository {
  async create (fileMetadata: FileMetadata): Promise<FileMetadata> {
    const newFileMetadata = new FileMetadataModel(fileMetadata) // Using FileMetadataModel here
    return await newFileMetadata.save()
  }

  async findById (id: string): Promise<FileMetadata | null> {
    return await FileMetadataModel.findById(id).exec() // Using FileMetadataModel here
  }

  async updateById (id: string, updates: Partial<FileMetadata>): Promise<FileMetadata | null> {
    return await FileMetadataModel.findByIdAndUpdate(id, updates, { new: true }).exec() // Using FileMetadataModel here
  }

  async deleteById (id: string): Promise<FileMetadata | null> {
    return await FileMetadataModel.findByIdAndDelete(id).exec() // Using FileMetadataModel here
  }

  // Add more methods as needed
}

export default FileMetadataRepository
