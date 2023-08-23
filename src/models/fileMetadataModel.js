const mongoose = require('mongoose')

const fileMetadataSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  filePath: String,
  encryptionKey: String,
  expirationTime: Date,
  downloadCount: Number,
  maxDownloads: { type: Number, required: false },
  createdAt: Date,
  status: String
})

const FileMetadata = mongoose.model('FileMetadata', fileMetadataSchema)

module.exports = FileMetadata
