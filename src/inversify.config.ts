// inversify.config.ts

import { Container } from 'inversify'
import 'reflect-metadata'
import { CryptoService } from './services/cryptoService'
import FileService from './services/fileService'
import FileMetadataRepository from './repositories/fileMetadataRepository'

const container = new Container()

container.bind<CryptoService>('CryptoService').to(CryptoService).inSingletonScope()
container.bind<FileService>('FileService').to(FileService).inSingletonScope()

container.bind<FileMetadataRepository>('FileMetadataRepository').to(FileMetadataRepository).inSingletonScope()

export { container }
