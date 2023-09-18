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
export const PORT = process.env.PORT || 3000
export const SQLITE_PATH = process.env.SQLITE_PATH || 'sqlite://:memory:'
