/* eslint-disable @typescript-eslint/no-unused-vars */
// Import third-party modules
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { randomBytes } from 'crypto'
import { container } from './inversify.config'

// Import local modules
import fileRouter from './routes/fileRoutes'
import FileService from './services/fileService'
import { CryptoConfig, CryptoService } from './services/cryptoService'

// Load and validate environment variables
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-file-sharing'

// Initialize services and dependency injection
const fileService = container.get<FileService>('FileService')

// Setup Express
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/files', fileRouter)

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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

// Utility Functions

async function encryptionDemo (buffer: Buffer): Promise<void> {
  const start = process.hrtime.bigint()
  const cryptoService = container.get<CryptoService>('CryptoService')
  cryptoService.config.iv = randomBytes(16)
  const encryptedCfg = await cryptoService.encrypt(buffer)
  const end = process.hrtime.bigint()
  console.log(`Time taken: ${(end - start) / 1000000n} ms to encrypt with size ${buffer.length}`)
  console.log(encryptedCfg)
}

function createRandomBuffer (length: number): Buffer {
  return Buffer.allocUnsafe(length).fill(0)
}

async function connectToDatabase (uri: string): Promise<void> {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('An error occurred connecting to MongoDB:', err)
  }
}

// Execution
encryptionDemo(createRandomBuffer(1024 * 1024 * 512)).catch((err) => {
  console.error('An error occurred:', err)
})
