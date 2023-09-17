// config.ts

import dotenv from 'dotenv'

dotenv.config()

function parseBool (value: string): boolean {
  return value === 'true'
}

export function nanoid (t: number = 21): string {
  return crypto.getRandomValues(new Uint8Array(t)).reduce((acc: string, val: number) => {
    val &= 63 // Limit to 0-63
    let transformedVal: string

    if (val < 36) {
      transformedVal = val.toString(36)
    } else if (val < 62) {
      transformedVal = (val - 26).toString(36).toUpperCase()
    } else if (val === 62) {
      transformedVal = '-'
    } else {
      transformedVal = '_'
    }

    return acc + transformedVal
  }, '')
}
export const EXAMPLE_FILE_ID = process.env.EXAMPLE_FILE_ID
export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URI || 'http://localhost:27017/secure-file-sharing'
export const DISABLE_DB = parseBool(process.env.DISABLE_DB || 'false')
