import { getAnthropicClient } from '@/lib/anthropic'
import { openApiKey } from '@/lib/crypto/providerKeys'
import { getGeminiClient } from '@/lib/gemini'
import { prisma } from '@/lib/prisma'

import type { AIProvider, ProviderKeyCheck } from '@/types/providers'

// `server-only` is not installed, so the boundary is held here: this module opens
// plaintext keys and must never reach a client bundle.
if (typeof window !== 'undefined')
  throw new Error(
    'lib/providerKeys is server-only and must not be imported by a client component'
  )

/** The columns a stored key may expose. Every client-facing query uses this select. */
export const PROVIDER_KEY_SUMMARY_SELECT = {
  publicId: true,
  provider: true,
  label: true,
  last4: true,
} as const

/**
 * Google answers a malformed or revoked key with 400 INVALID_ARGUMENT, and Anthropic with
 * 401. `models.list` has no other reason to fail on these codes, so all three mean the key
 * is bad rather than the provider being down.
 */
const isKeyRejection = (error: unknown): boolean => {
  const { status } = (error ?? {}) as { status?: number }

  return status === 400 || status === 401 || status === 403
}

/**
 * Proves the key works before we store it. `models.list` costs no tokens on either
 * provider, so a save never spends the user's quota.
 */
export const validateProviderKey = async (
  provider: AIProvider,
  apiKey: string
): Promise<ProviderKeyCheck> => {
  try {
    if (provider === 'GEMINI')
      await getGeminiClient(apiKey).models.list({ config: { pageSize: 1 } })
    else await getAnthropicClient(apiKey).models.list({ limit: 1 })

    return { status: 'valid' }
  } catch (error) {
    return { status: isKeyRejection(error) ? 'invalid_key' : 'unreachable' }
  }
}

/**
 * The single source of a plaintext key. Callers hold the result in a local const, pass it
 * to the provider client, and never log it or return it to the client.
 * A `null` result means the user has no key yet, so the caller shows the setup step.
 */
export const getDecryptedProviderKey = async (
  userId: string,
  provider: AIProvider
): Promise<string | null> => {
  const stored = await prisma.providerKey.findUnique({
    where: { userId_provider: { userId, provider } },
    select: { id: true, ciphertext: true, keyVersion: true },
  })

  if (!stored) return null

  const apiKey = openApiKey({
    ciphertext: stored.ciphertext,
    userId,
    provider,
    keyVersion: stored.keyVersion,
  })

  await prisma.providerKey.update({
    where: { id: stored.id },
    data: { lastUsedAt: new Date() },
  })

  return apiKey
}
