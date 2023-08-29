/**
 * @class CryptoService
 * @construct
 * @param {Object} options - The configuration options for the service.
 * @method encrypt - Encrypts a data buffer using the configured encryption mode.
 * @method decrypt - Decrypts a data buffer using the configured encryption mode.
 * @method setEncryptionAlgorithm - Sets the encryption algorithm in the configuration.
 *  @param {String} algorithm - The encryption algorithm to use.
 * @method getAvailableEncryptionAlgorithms - Returns a list of available encryption algorithms from OpenSSL.
 * @property {Object} options - The configuration options for the service.
 *
*/

/**
 * @typedef {Object} CryptoOptions
 * @property {String} algorithm - The encryption algorithm to use.
 * @property {Buffer} iv - The initialization vector.
 * @property {Buffer} key - The encryption key.
 */

const crypto = require('crypto')

class CryptoService {
  /**
     * @constructor
     * @param {CryptoOptions} options - The configuration options for the service.
     */
  constructor (options = {
    algorithm: 'aes-256-cbc',
    iv: crypto.randomBytes(16),
    key: crypto.randomBytes(32)
  }) {
    this.options = options
  }


}
