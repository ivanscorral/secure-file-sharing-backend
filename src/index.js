const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
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
async function encryptionDemo () {
  const stringToEncrypt = 'This is a test string to encrypt%&$asqd1 2312   assa'

  // Await the encryption promise
  const encryptedCfg = await fileService.encrypt(
    Buffer.from(stringToEncrypt, 'utf8')
  )
  console.log(encryptedCfg)

  // Await the decryption promise
  const decryptedBuffer = await fileService.decrypt(
    encryptedCfg.data,
    encryptedCfg.iv,
    encryptedCfg.key
  )

  const decryptedString = decryptedBuffer.toString('utf8')
  console.log(decryptedString)
}

// Execute the function
encryptionDemo().catch((err) => {
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
