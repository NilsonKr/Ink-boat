import { z } from 'zod'

import { AI_PROVIDERS, PROVIDER_KEY_COPY } from '@/lib/constants/providers'
import { AIProvider } from '@/lib/db/generated/enums'

export const saveProviderKeySchema = z
  .object({
    provider: z.enum(AIProvider),
    label: z
      .string()
      .trim()
      .min(1, PROVIDER_KEY_COPY.labelRequired)
      .max(40, PROVIDER_KEY_COPY.labelTooLong),
    apiKey: z
      .string()
      .trim()
      .min(20, PROVIDER_KEY_COPY.keyTooShort)
      .max(200, PROVIDER_KEY_COPY.keyTooLong),
  })
  // A prefix check catches the common paste error before we spend a request on it.
  .refine(({ provider, apiKey }) => apiKey.startsWith(AI_PROVIDERS[provider].keyPrefix), {
    message: PROVIDER_KEY_COPY.prefixMismatch,
    path: ['apiKey'],
  })

export type SaveProviderKeyInput = z.infer<typeof saveProviderKeySchema>
