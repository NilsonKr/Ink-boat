'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAnthropicClient } from '@/lib/anthropic'
import { auth } from '@/lib/auth'
import { getDecryptedProviderKey } from '@/lib/providerKeys'

export const anthropicMessage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const apiKey = await getDecryptedProviderKey(session.user.id, 'ANTHROPIC')

  // No key, no call — there is no env fallback, so the caller shows the setup step.
  if (!apiKey) return null

  const resBlocks = await getAnthropicClient(apiKey).messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Hello Claude!' }],
    model: 'claude-haiku-4-5',
  })

  for (const block of resBlocks.content) {
    if (block.type === 'text') return block.text
  }
}
