import sqlite3 from 'sqlite3'
import { FileMetadata, FileMetadataProps } from '../models/fileMetadata'
import { injectable } from 'inversify'

@injectable()
class FileMetadataRepository {
  private db: sqlite3.Database

  constructor () {
    // Initialize SQLite database

    this.db = new sqlite3.Database('./secure-file-sharing-backend.db')
  }

  async create (fileMetadata: FileMetadataProps): Promise<FileMetadata> {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO FileMetadata(id, originalFilename, fileSize, key, iv, expiresAt, downloadCount, maxDownloadCount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
      const values = [
        fileMetadata.id,
        fileMetadata.originalFilename,
        fileMetadata.fileSize,
        fileMetadata.key,
        fileMetadata.iv,
        fileMetadata.expiresAt?.toISOString(),
        fileMetadata.downloadCount,
        fileMetadata.maxDownloadCount
      ]
      console.log(query, values)
      this.db.run(query, values, function (err) {
        if (err) {
          throw err
        }
        resolve(new FileMetadata(fileMetadata))
      })
    })
  }

  async findById (id: string): Promise<FileMetadata> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM FileMetadata WHERE id = ?'
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err)
          return
        }
        if (row) {
          resolve(FileMetadata.fromRow(row))
        } else {
          throw new Error(`[SQLITE] FileMetadata with id ${id} not found`)
        }
      })
    })
  }

  async deleteById (id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM FileMetadata WHERE id = ?'
      this.db.run(query, [id], (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }

  async findAll (): Promise<FileMetadata[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM FileMetadata'
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows.map(FileMetadata.fromRow))
      })
    })
  }

  async getAllIdentifiers (): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM FileMetadata'
      this.db.all(query, [], (err, rows: FileMetadata[]) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows.map((row) => row.id))
      })
    })
  }
  // Add other methods like findAll, deleteById, getAllIdentifiers, updateById, etc., similarly.

  // Close the database when you're done (ideally this would be in some sort of shutdown hook)
  close () {
    this.db.close()
  }
}

export default FileMetadataRepository
