'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { getGeminiClient } from '@/lib/gemini'
import { getDecryptedProviderKey } from '@/lib/providerKeys'

export async function geminiMessage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const apiKey = await getDecryptedProviderKey(session.user.id, 'GEMINI')

  // No key, no call — there is no env fallback, so the caller shows the setup step.
  if (!apiKey) return null

  const response = await getGeminiClient(apiKey).models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: ['Hello Gemini!'],
    config: {
      // systemInstruction:
      //   'You rewrite prose. Return exactly 3 alternatives for the passage.',
      responseMimeType: 'application/json',
      // responseSchema: {
      // type: 'object',
      //   properties: {
      //     suggestions: {
      //       type: 'array',
      //       items: {
      //         type: 'object',
      //         properties: {
      //           text: { type: 'string' },
      //           rationale: { type: 'string' },
      //         },
      //         required: ['text', 'rationale'],
      //         propertyOrdering: ['text', 'rationale'],
      //       },
      //     },
      //   },
      //   required: ['suggestions'],
      // },
    },
  })

  return JSON.parse(response.text!)
}
