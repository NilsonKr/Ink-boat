'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { CURRENT_KEY_VERSION, sealApiKey } from '@/lib/crypto/providerKeys'
import { prisma } from '@/lib/prisma'
import { PROVIDER_KEY_SUMMARY_SELECT, validateProviderKey } from '@/lib/providerKeys'
import { saveProviderKeySchema } from '@/schemas/providerKeys'

import type { SaveProviderKeyInput } from '@/schemas/providerKeys'
import type { ProviderKeySummary, SaveProviderKeyResult } from '@/types/providers'

export const saveProviderKeyAction = async (
  input: SaveProviderKeyInput,
): Promise<SaveProviderKeyResult> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const parsed = saveProviderKeySchema.safeParse(input)

  if (!parsed.success) return { status: 'invalid_input', message: parsed.error.issues[0].message }

  const { provider, label, apiKey } = parsed.data

  const check = await validateProviderKey(provider, apiKey)

  if (check.status !== 'valid') return { status: check.status }

  const userId = session.user.id

  // A missing or malformed PROVIDER_SECRET_KEY makes sealApiKey throw. Letting that
  // escape reaches the client as an opaque digest, and the form would show nothing at
  // all, so it becomes a status the setup step can render.
  try {
    // The plaintext lives in this action only. What leaves it is the sealed buffer and
    // the last four characters the connected bar needs for its mask.
    const sealed = {
      ciphertext: sealApiKey({ apiKey, userId, provider }),
      keyVersion: CURRENT_KEY_VERSION,
      last4: apiKey.slice(-4),
    }

    // One key per provider: a second save replaces the old row instead of adding to it.
    const key = await prisma.providerKey.upsert({
      where: { userId_provider: { userId, provider } },
      create: { userId, provider, label, ...sealed },
      update: { label, lastUsedAt: null, ...sealed },
      select: PROVIDER_KEY_SUMMARY_SELECT,
    })

    return { status: 'saved', key }
  } catch {
    // The thrown value can carry the key material, so it never leaves this catch.
    return { status: 'failed' }
  }
}

export const getProviderKeysAction = async (): Promise<ProviderKeySummary[]> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  return prisma.providerKey.findMany({
    where: { userId: session.user.id },
    select: PROVIDER_KEY_SUMMARY_SELECT,
    orderBy: { provider: 'asc' },
  })
}

export const deleteProviderKeyAction = async (publicId: string): Promise<boolean> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const { count } = await prisma.providerKey.deleteMany({
    where: { publicId, userId: session.user.id },
  })

  return count > 0
}
