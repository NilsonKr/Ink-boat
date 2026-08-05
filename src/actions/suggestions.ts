'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { runSuggestions } from '@/lib/ai/suggestions/run'
import { auth } from '@/lib/auth'
import { getDecryptedProviderKey } from '@/lib/providerKeys'
import { runSuggestionsSchema } from '@/schemas/suggestions'

import type { RunSuggestionsActionInput } from '@/schemas/suggestions'
import type { SuggestionsActionResult } from '@/types/suggestions'

/**
 * The only door to the run layer. It holds the session, opens the user's key, and hands the
 * run a plaintext key that never returns to the client.
 */
export const runSuggestionsAction = async (
  input: RunSuggestionsActionInput
): Promise<SuggestionsActionResult> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const parsed = runSuggestionsSchema.safeParse(input)

  if (!parsed.success) return { status: 'invalid_input', message: parsed.error.issues[0].message }

  const { provider, ...run } = parsed.data

  // Only Anthropic has a run layer today, and the setup step already offers a Gemini key.
  if (provider !== 'ANTHROPIC') return { status: 'unsupported_provider' }

  const apiKey = await getDecryptedProviderKey(session.user.id, provider)

  // No key, no call — there is no env fallback, so the caller shows the setup step.
  if (!apiKey) return { status: 'no_key' }

  return runSuggestions({ apiKey, ...run })
}
