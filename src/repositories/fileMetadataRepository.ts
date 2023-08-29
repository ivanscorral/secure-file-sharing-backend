import  * from '../models/fileMetadataModel';
import { BaseRepository } from './baseRepository';

class FileMetadataRepository extends BaseRepository {
  model: FileMetadataModel;

  constructor() {
    super(FileMetadataModel);
    this.model = new FileMetadataModel();
  }

  async getFileName(id: string): Promise<string> {
    const file = await this.model.findById(id).select('filePath');
    return file?.filePath || '';
  }

  async isFileAvailable(id: string): Promise<boolean> {
    const file = await this.model.findById(id).select('status');
    return file?.status || false;
  }
}

export default FileMetadataRepository;
