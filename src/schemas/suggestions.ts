import { z } from 'zod'

import { AI_PROVIDERS } from '@/lib/constants/providers'
import { SUGGESTION_INPUT_COPY, SUGGESTION_MODES } from '@/lib/constants/suggestions'
import { AIProvider } from '@/lib/db/generated/enums'

import type { SuggestionModeKey } from '@/types/suggestions'

/** One source for the modes, so a new mode never has to be added twice. */
const MODE_KEYS = Object.keys(SUGGESTION_MODES) as [SuggestionModeKey, ...SuggestionModeKey[]]

/** Matches the caps in `lib/editor/selection.ts`, with slack for the ellipsis it adds. */
const MAX_SURROUNDING_CHARS = 800
const MAX_PASSAGE_CHARS = 4000

export const runSuggestionsSchema = z
  .object({
    provider: z.enum(AIProvider),
    model: z.string(),
    mode: z.enum(MODE_KEYS),
    toneOption: z.string().trim().max(40).optional(),
    context: z.object({
      before: z.string().max(MAX_SURROUNDING_CHARS),
      selected: z
        .string()
        .trim()
        .min(1, SUGGESTION_INPUT_COPY.passageRequired)
        .max(MAX_PASSAGE_CHARS, SUGGESTION_INPUT_COPY.passageTooLong),
      after: z.string().max(MAX_SURROUNDING_CHARS),
    }),
    draft: z.object({
      title: z.string().max(300),
      description: z.string().max(500),
    }),
  })
  // The model id reaches the provider as sent, so it has to be one we offer for that provider.
  .refine(
    ({ provider, model }) => AI_PROVIDERS[provider].models.some(({ id }) => id === model),
    { message: SUGGESTION_INPUT_COPY.unknownModel, path: ['model'] }
  )

export type RunSuggestionsActionInput = z.infer<typeof runSuggestionsSchema>
