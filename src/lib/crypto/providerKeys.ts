import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

import type { AIProvider } from '@/types/providers'

const ALGORITHM = 'aes-256-gcm'
const IV_BYTES = 12
const TAG_BYTES = 16
const MASTER_KEY_BYTES = 32

/** Raised only when a new master secret arrives, so old rows stay readable. */
export const CURRENT_KEY_VERSION = 1

export class ProviderKeyCryptoError extends Error {
  constructor(message = 'The stored provider key could not be read') {
    super(message)
    this.name = 'ProviderKeyCryptoError'
  }
}

/**
 * Read at call time, never at module load — a build machine has no secret, and a throw
 * during import would break `next build`.
 */
const getMasterKey = (): Buffer => {
  const secret = process.env.PROVIDER_SECRET_KEY

  if (!secret) throw new ProviderKeyCryptoError('PROVIDER_SECRET_KEY is not set')

  const masterKey = Buffer.from(secret, 'base64')

  if (masterKey.length !== MASTER_KEY_BYTES)
    throw new ProviderKeyCryptoError('PROVIDER_SECRET_KEY must hold 32 bytes, base64 encoded')

  return masterKey
}

// The seal is bound to its owner and provider, so a ciphertext moved to another row
// fails authentication instead of opening.
const buildAad = (userId: string, provider: AIProvider) => Buffer.from(`${userId}:${provider}`)

type SealParams = {
  apiKey: string
  userId: string
  provider: AIProvider
}

// Prisma's Bytes field takes a plain-backed Uint8Array, which a Node Buffer is not.
export const sealApiKey = ({ apiKey, userId, provider }: SealParams): Uint8Array<ArrayBuffer> => {
  const iv = randomBytes(IV_BYTES)
  const cipher = createCipheriv(ALGORITHM, getMasterKey(), iv, { authTagLength: TAG_BYTES })

  cipher.setAAD(buildAad(userId, provider))

  const sealed = Buffer.concat([cipher.update(apiKey, 'utf8'), cipher.final()])

  return Uint8Array.from(Buffer.concat([iv, cipher.getAuthTag(), sealed]))
}

type OpenParams = {
  ciphertext: Uint8Array
  userId: string
  provider: AIProvider
  keyVersion: number
}

export const openApiKey = ({ ciphertext, userId, provider, keyVersion }: OpenParams): string => {
  if (keyVersion !== CURRENT_KEY_VERSION)
    throw new ProviderKeyCryptoError('The stored provider key uses an unknown key version')

  const masterKey = getMasterKey()
  const payload = Buffer.from(ciphertext)

  try {
    const iv = payload.subarray(0, IV_BYTES)
    const authTag = payload.subarray(IV_BYTES, IV_BYTES + TAG_BYTES)
    const sealed = payload.subarray(IV_BYTES + TAG_BYTES)

    const decipher = createDecipheriv(ALGORITHM, masterKey, iv, { authTagLength: TAG_BYTES })

    decipher.setAAD(buildAad(userId, provider))
    decipher.setAuthTag(authTag)

    return Buffer.concat([decipher.update(sealed), decipher.final()]).toString('utf8')
  } catch {
    // A crypto failure message can echo the payload, so it stops here.
    throw new ProviderKeyCryptoError()
  }
}
