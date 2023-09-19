// src/index.ts
import 'reflect-metadata'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { container } from './inversify.config'
import path from 'path'
import fileRouter from './routes/fileRoutes'
import adminRouter from './routes/adminRoutes'
import FileService from './services/fileService'
import { PORT } from './config'
import DiskCleanupService from './services/maintenance/DiskCleanupService'
import MetadataService from './services/metadataService'

const fileService = container.get<FileService>('FileService')
const metadataService = container.get<MetadataService>('MetadataService')
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
  const files = await metadataService.getAll()
  for (const file of files) {
    console.log(file + ' - ' + JSON.stringify(file))
  }
}

async function cleanup (): Promise<void> {
  console.log(await diskCleanupService.listOrphanedFiles())
  await listAllFiles()
}
// Execution
fileDemo().catch((err) => {
  console.error('An error occurred:', err)
})
listAllFiles()
