const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const crypto = require('crypto')
require('dotenv').config()

// Needed for mocking purposes
const FileMetadataRepository = require('./repositories/fileMetadataRepository')
const FileService = require('./services/fileService')

// Create the mock objects to test the fileService
const fileService = new FileService(new FileMetadataRepository({}))

// Constants
const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secure-file-sharing'

// Middleware
app.use(express.json())
app.use(cors())

// Routes
const fileRoutes = require('./routes/fileRoutes')

app.use('/api/files', fileRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
async function encryptionDemo (buffer) {
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
function createRandomBuffer (length) {
  return crypto.randomBytes(length)
}
// Execute the function with 1MB of buffer
encryptionDemo(createRandomBuffer(1024 * 1024 * 500)).catch((err) => {
  console.error('An error occurred:', err)
})

if (!process.env.DISABLE_DB) {
  console.log('Connecting to MongoDB...')
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.error('An error occurred connecting to mongoDB:', err)
    })
}
module.exports = app
