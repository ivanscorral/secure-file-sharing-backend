// src/services/maintenance/DiskCleanupService.ts
import { container } from '../../inversify.config'
import FileService from '../fileService'
import { promises as fs } from 'fs'
import MetadataService from '../metadataService'
import path from 'path'
import { FileMetadata } from '../../models/fileMetadata'
import { injectable } from 'inversify'
@injectable()
class DiskCleanupService {
  private _fileService: FileService
  private _metadataService: MetadataService
  private _tempPath: string = path.resolve('./temp')
  private _uploadPath: string = path.resolve('./uploads')

  constructor () {
    this._fileService = container.get<FileService>('FileService')
    this._metadataService = container.get<MetadataService>('MetadataService')
  }

  private async _deleteFile (filePath: string): Promise<void> {
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error)
      throw error
    }
  }

  private async wipeDirectoryData (dirPath: string): Promise<void> {
    try {
      const files = await fs.readdir(dirPath)
      for (const file of files) {
        try {
          const filePath = path.join(dirPath, file)
          await this._deleteFile(filePath)
        } catch (error) {
          console.error(`Error deleting file ${dirPath + '/' + file}:`, error)
        }
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async cleanupTemporaryFiles (): Promise<void> {
    try {
      await this.wipeDirectoryData(this._tempPath)
      console.log('Deleted temporary files')
    } catch (error) {
      console.error(error)
    }
  }

  async listOrphanedFiles (): Promise<string[]> {
    return await this._findOrphanedFiles()
  }

  private async _findOrphanedFiles (): Promise<string[]> {
    const fsFiles = await this._fileService.getEncryptedFiles()
    const dbEntries: FileMetadata[] = await this._metadataService.getAll()

    console.log('fsFiles:', fsFiles)
    console.log('dbEntries:', dbEntries.map((entry) => entry.id))

    return fsFiles.filter((file) => !dbEntries.map((entry) => entry.id).includes(file.slice(0, -4)))
  }

  async deleteOrphanedFiles (): Promise<string[]> {
    try {
      const fsOrphanedFiles = await this._findOrphanedFiles()

      console.log('fsOrphanedFiles:', fsOrphanedFiles)

      // Delete orphaned files from the filesystem
      for (const file of fsOrphanedFiles) {
        const filePath = path.join(this._uploadPath, file)
        await this._deleteFile(filePath)
        console.log(`Deleted orphaned file: ${filePath}`)
      }
      console.log('Orphaned files cleanup completed')
      return fsOrphanedFiles
    } catch (error) {
      console.error('Error deleting orphaned files:', error)
      throw error
    }
  }
}
export default DiskCleanupService
