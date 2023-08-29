class BaseRepository {
  constructor (model) {
    this.model = model
  }

  async create (data) {
    return this.model.create(data)
  }

  async findById (id) {
    return this.model.findById(id)
  }

  async updateById (id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteById (id) {
    return this.model.findByIdAndDelete(id)
  }
}

export default BaseRepository
