import { createCipheriv, getCiphers} from 'crypto'

interface CryptoConfig {
  key: Buffer
  iv: Buffer
  algorithm: string
}

class CryptoService {
  private config: CryptoConfig

  constructor(config: CryptoConfig = { key: Buffer.alloc(0), iv: Buffer.alloc(0), algorithm: 'aes-256-cbc' }) {
    this.config = config
  }


  async encrypt(data: Buffer): Promise<Buffer> {
    const cipher = createCipheriv(this.config.algorithm, this.config.key, this.config.iv)
    return Buffer.concat([cipher.update(data), cipher.final()])
  }

}

export function getAESAlgorithms(): string[] {
  //return algorithms containing aes
  const allAlgorithms = getCiphers();
  return allAlgorithms.filter(algorithm => algorithm.includes('aes'));
}

export {CryptoService, CryptoConfig}
