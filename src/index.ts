import express from 'express'
import cors  from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

// Needed for mocking purposes
import FileMetadataRepository from './repositories/fileMetadataRepository'
import FileService from './services/fileService'
import { FileMetadataModel } from './models/fileMetadataModel'
// Create the mock objects to test the fileService
const fileService = new FileService(new FileMetadataRepository())

// Constants
const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-file-sharing'

// Middleware
app.use(express.json())
app.use(cors())

// Routes
import fileRoutes from './routes/fileRoutes'

app.use('/api/files', fileRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

async function encryptionDemo (buffer: Buffer) {
  // High-resolution timing
  const start = process.hrtime.bigint()

  const encryptedCfg = await fileService.encrypt(buffer)
  const end = process.hrtime.bigint()

  console.log(`Time taken: ${(end - start) / 1000000n} ms to encrypt with size ${buffer.length}`)
  console.log(encryptedCfg)

  // Decryption code commented out
}

/**
 * Generates a random buffer of the specified length.
 *
 * @param {number} length - The length of the buffer to be generated.
 * @return {Buffer} - A buffer containing random bytes.
 */
function createRandomBuffer (length: number): Buffer {
  return crypto.randomBytes(length)
}

// Execute the function with 1MB of buffer
encryptionDemo(createRandomBuffer(1024 * 1024 * 500)).catch((err) => {
  console.error('An error occurred:', err)
})

if (!process.env.DISABLE_DB) {
  console.log('Connecting to MongoDB...')
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.error('An error occurred connecting to mongoDB:', err)
    })
}

export default app
