const BaseRepository = require('./baseRepository')

class FileMetadataRepository extends BaseRepository {
  async getFileName (id) {
    const fullPath = await this.model.findById(id).select('filePath')
    return fullPath.filePath
  }

  async isFileAvailable (id) {
    const isAvailable = await this.model.findById(id).select('status')
    return isAvailable.status
  }
}
module.exports = FileMetadataRepository
