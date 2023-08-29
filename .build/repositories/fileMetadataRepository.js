"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileMetadata_1 = require("../models/fileMetadata");
class FileMetadataRepository {
    async create(fileMetadata) {
        const newFileMetadata = new fileMetadata_1.FileMetadataModel(fileMetadata); // Using FileMetadataModel here
        return await newFileMetadata.save();
    }
    async findById(id) {
        return await fileMetadata_1.FileMetadataModel.findById(id).exec(); // Using FileMetadataModel here
    }
    async updateById(id, updates) {
        return await fileMetadata_1.FileMetadataModel.findByIdAndUpdate(id, updates, { new: true }).exec(); // Using FileMetadataModel here
    }
    async deleteById(id) {
        return await fileMetadata_1.FileMetadataModel.findByIdAndDelete(id).exec(); // Using FileMetadataModel here
    }
}
exports.default = FileMetadataRepository;
//# sourceMappingURL=fileMetadataRepository.js.map