import { createCipheriv, getCiphers } from 'crypto'
import { injectable } from 'inversify'

interface CryptoConfig {
  key: Buffer
  iv: Buffer
  algorithm: string
}

@injectable()
class CryptoService {
  private _config!: CryptoConfig

  constructor (config: CryptoConfig = { key: Buffer.alloc(32), iv: Buffer.alloc(16), algorithm: 'aes-256-ctr' }) {
    this.setConfig(config)
  }

  private validateKeyAndIvLengths (algorithm: string, key: Buffer, iv: Buffer) {
    const match = algorithm.match(/aes-(128|192|256)-/)
    if (!match) {
      throw new Error(`Unknown algorithm: ${algorithm}`)
    }

    const keyLength = parseInt(match[1], 10) / 8 // Convert bits to bytes
    const ivLength = 16 // 128 bits or 16 bytes for AES algorithms

    if (key.length !== keyLength) {
      throw new Error(`Key length must be ${keyLength} bytes for ${algorithm}`)
    }

    if (iv.length !== ivLength) {
      throw new Error(`IV length must be ${ivLength} bytes for ${algorithm}`)
    }
  }

  setIV (iv: Buffer) {
    this.validateKeyAndIvLengths(this._config.algorithm, this._config.key, iv)
    this._config.iv = iv
  }

  setKey (key: Buffer) {
    this.validateKeyAndIvLengths(this._config.algorithm, key, this._config.iv)
    this._config.key = key
  }

  setAlgorithm (algorithm: string) {
    this._config.algorithm = algorithm
  }

  set algorithm (algorithm: string) {
    this.validateKeyAndIvLengths(algorithm, this._config.key, this._config.iv)
  }

  get algorithm () {
    return this._config.algorithm
  }

  set config (newConfig: CryptoConfig) {
    this.validateKeyAndIvLengths(newConfig.algorithm, newConfig.key, newConfig.iv)
    this._config = newConfig
  }

  get config () {
    return this._config
  }

  setConfig (newConfig: CryptoConfig) {
    this.config = newConfig
  }

  async encrypt (data: Buffer): Promise<Buffer> {
    const cipher = createCipheriv(this.config.algorithm, this.config.key, this.config.iv)
    return Buffer.concat([cipher.update(data), cipher.final()])
  }
}

function getAESAlgorithms (): string[] {
  // return algorithms containing aes
  const allAlgorithms = getCiphers()
  return allAlgorithms.filter(algorithm => algorithm.includes('aes'))
}

export { CryptoService, CryptoConfig, getAESAlgorithms }
