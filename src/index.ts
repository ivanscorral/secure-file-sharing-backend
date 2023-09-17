// src/index.ts
import 'reflect-metadata'
import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { container } from './inversify.config'
import path from 'path'
import fileRouter from './routes/fileRoutes'
import adminRouter from './routes/adminRoutes'
import FileService from './services/fileService'
import { PORT, MONGO_URI, DISABLE_DB } from './config'
import FileMetadataRepository from './repositories/fileMetadataRepository'
import DiskCleanupService from './services/maintenance/DiskCleanupService'

const fileService = container.get<FileService>('FileService')
const metadataRepository = container.get<FileMetadataRepository>('FileMetadataRepository')
const diskCleanupService = container.get<DiskCleanupService>('DiskCleanupService')
// Setup Express
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/files', fileRouter)
app.use('/api/admin', adminRouter)

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// Database connection
if (!DISABLE_DB) {
  console.log('Connecting to MongoDB...')
  connectToDatabase()
}

async function connectToDatabase () {
  try {
    console.debug('Connected to MongoDB')
    await mongoose.connect(MONGO_URI)
  } catch (err) {
    console.error('An error occurred connecting to MongoDB:', err)
  }
}

async function fileDemo (): Promise<void> {
  const fileMetadata = await fileService.encryptFile(path.resolve('README.md'))
  console.log(fileMetadata)
  console.log(`Total space used: ${await fileService.getTotalUsedSpace() / 1024} kB`)
}

async function downloadFileDemo (): Promise<void> {
  try {
    const fileData = await fileService.downloadFile('Ddq_9gblHLag')
    console.log(fileData)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
async function listAllFiles (): Promise<void> {
  const files = await metadataRepository.getAllIdentifiers()
  console.log(files)
}

async function cleanup (): Promise<void> {
  console.log(await diskCleanupService.listOrphanedFiles())
  await listAllFiles()
}
// Execution
fileDemo().catch((err) => {
  console.error('An error occurred:', err)
})
downloadFileDemo()
listAllFiles()
cleanup()
