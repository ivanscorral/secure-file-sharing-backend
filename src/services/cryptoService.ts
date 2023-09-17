import { createCipheriv, getCiphers, createDecipheriv, randomBytes } from 'crypto'
import { injectable } from 'inversify'

interface CryptoConfig {
  key: Buffer
  iv: Buffer
  algorithm: string
}

@injectable()
class CryptoService {
  private validateKeyAndIvLengths (algorithm: string, key: Buffer, iv: Buffer) {
    const match = algorithm.match(/aes-(128|192|256)-/)
    if (!match) {
      throw new Error(`Unknown algorithm: ${algorithm}`)
    }

    const keyLength = parseInt(match[1], 10) / 8
    const ivLength = 16 // 128 bits or 16 bytes for AES algorithms

    if (key.length !== keyLength) {
      throw new Error(`Key length must be ${keyLength} bytes for ${algorithm}`)
    }

    if (iv.length !== ivLength) {
      throw new Error(`IV length must be ${ivLength} bytes for ${algorithm}`)
    }
  }

  public generateKeyAndIv (config: CryptoConfig): CryptoConfig {
    const key = randomBytes(32)
    const iv = randomBytes(16)
    try {
      this.validateKeyAndIvLengths(config.algorithm, key, iv)
      // reuse the configuration object to store the key and IV
      config.key = key
      config.iv = iv
    } catch {
      throw new Error(`Could not generate key and IV for ${config.algorithm}`)
    }
    return config
  }

  /**
  * Encrypts the given data using the provided CryptoConfig.
  *
  * @param {Buffer} data - The data to be encrypted.
  * @param {CryptoConfig} config - The configuration for the encryption.
  * @return {Promise<Buffer>} The encrypted data as a Buffer.
  */
  async encrypt (data: Buffer, config: CryptoConfig): Promise<Buffer> {
    this.validateKeyAndIvLengths(config.algorithm, config.key, config.iv)
    const cipher = createCipheriv(config.algorithm, config.key, config.iv)
    return Buffer.concat([cipher.update(data), cipher.final()])
  }

  /**
   * Decrypts the given data using the provided configuration.
   *
   * @param {Buffer} data - The data to be decrypted.
   * @param {CryptoConfig} config - The configuration for the decryption.
   * @return {Promise<Buffer>} A promise that resolves to the decrypted data.
   */
  async decrypt (data: Buffer, config: CryptoConfig): Promise<Buffer> {
    this.validateKeyAndIvLengths(config.algorithm, config.key, config.iv)
    const decipher = createDecipheriv(config.algorithm, config.key, config.iv)
    return Buffer.concat([decipher.update(data), decipher.final()])
  }
}

/**
 * Retrieves a list of AES algorithms.
 *
 * @return {string[]} An array of AES algorithms.
 */
function getAESAlgorithms (): string[] {
  // return algorithms containing aes
  const allAlgorithms = getCiphers()
  return allAlgorithms.filter(algorithm => algorithm.includes('aes'))
}

export default CryptoService
export { CryptoConfig, getAESAlgorithms }
