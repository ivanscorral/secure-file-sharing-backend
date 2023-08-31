// inversify.config.ts

import { Container } from 'inversify'
import 'reflect-metadata'
import { CryptoService } from './services/cryptoService'
import FileService from './services/fileService'
import FileMetadataRepository from './repositories/fileMetadataRepository'
import MetadataService from './services/metadataService'

const container = new Container()

container.bind<CryptoService>('CryptoService').to(CryptoService).inSingletonScope()
container.bind<FileService>('FileService').to(FileService).inSingletonScope()
container.bind<MetadataService>('MetadataService').to(MetadataService).inSingletonScope()
container.bind<FileMetadataRepository>('FileMetadataRepository').to(FileMetadataRepository).inSingletonScope()

export { container }
