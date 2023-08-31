import 'reflect-metadata'
import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { container } from './inversify.config'
import path from 'path'
import fileRouter from './routes/fileRoutes'
import FileService from './services/fileService'

require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-file-sharing'

const fileService = container.get<FileService>('FileService')

// Setup Express
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/files', fileRouter)

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
if (!process.env.DISABLE_DB) {
  connectToDatabase(MONGO_URI)
}

async function connectToDatabase (uri: string): Promise<void> {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('An error occurred connecting to MongoDB:', err)
  }
}

async function fileDemo (): Promise<void> {
  const encryptedData = await fileService.encryptFile(path.resolve('README.md'))
  console.log(encryptedData.fileMetadata)
  console.log(encryptedData.encryptedData)
}

// Execution

fileDemo().catch((err) => {
  console.error('An error occurred:', err)
})
