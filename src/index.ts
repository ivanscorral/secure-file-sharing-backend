import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { randomBytes } from 'crypto'
import fileRouter from './routes/fileRoutes'

// Needed for mocking purposes
import FileMetadataRepository from './repositories/fileMetadataRepository'
import FileService from './services/fileService'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
// Create the mock objects to test the fileService
const fileService = new FileService(new FileMetadataRepository())

// Constants
const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-file-sharing'

/**
 * Generates a random buffer of the specified length.
 *
 * @param {number} length - The length of the buffer to be generated.
 * @return {Buffer} - A buffer containing random bytes.
 */
function createRandomBuffer (length: number): Buffer {
  return randomBytes(length)
}

// Execute the function with 500MB of random data.
encryptionDemo(createRandomBuffer(1024 * 1024 * 10)).catch((err) => {
  console.error('An error occurred:', err)
})
// Middleware
app.use(express.json())
app.use(cors())

app.use('/api/files', fileRouter)

app.use((err: Error, req: Request, res: Response) => {
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
