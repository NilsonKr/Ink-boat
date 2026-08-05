import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'

import { getAnthropicClient } from '@/lib/anthropic'
import { buildSystemBlocks, buildUserContent } from '@/lib/ai/suggestions/context'
import { getRequestTuning } from '@/lib/ai/suggestions/models'
import { suggestionRunSchema } from '@/lib/ai/suggestions/schema'
import { TAKES_PER_RUN } from '@/lib/constants/suggestions'

import type { SuggestionRunOutput } from '@/lib/ai/suggestions/schema'
import type {
  RunSuggestionsInput,
  RunSuggestionsResult,
  Suggestion,
} from '@/types/suggestions'

// The caller hands this module a plaintext key, so it must never reach a client bundle.
if (typeof window !== 'undefined')
  throw new Error('lib/ai/suggestions/run is server-only and must not be imported by a client component')

/** `A`, `B`, `C`… — the letter the panel orders the list by. */
const getTakeKey = (index: number): string => String.fromCharCode(65 + index)

const toSuggestions = (takes: SuggestionRunOutput['suggestions']): Suggestion[] =>
  takes.slice(0, TAKES_PER_RUN).map((take, index) => ({
    id: crypto.randomUUID(),
    key: getTakeKey(index),
    tone: take.tone,
    text: take.text,
    status: 'idle',
  }))

/**
 * One call, four takes. The structured output means the answer is takes and nothing else —
 * no preamble to strip, and no fragile parse.
 */
export const runSuggestions = async ({
  apiKey,
  ...input
}: RunSuggestionsInput & { apiKey: string }): Promise<RunSuggestionsResult> => {
  const tuning = getRequestTuning(input.model, input.mode)

  try {
    const message = await getAnthropicClient(apiKey).messages.parse({
      model: input.model,
      max_tokens: tuning.max_tokens,
      system: buildSystemBlocks(input),
      messages: [{ role: 'user', content: buildUserContent(input) }],
      output_config: {
        ...tuning.output_config,
        format: zodOutputFormat(suggestionRunSchema),
      },
    })

    // Read the stop reason first. A declined or cut-off answer carries no usable takes.
    if (message.stop_reason === 'refusal')
      return { status: 'refused', reason: message.stop_details?.category ?? 'unknown' }

    if (message.stop_reason === 'max_tokens') return { status: 'truncated' }

    const takes = message.parsed_output?.suggestions ?? []

    if (!takes.length) return { status: 'failed' }

    return { status: 'ok', suggestions: toSuggestions(takes) }
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) return { status: 'invalid_key' }
    if (error instanceof Anthropic.RateLimitError) return { status: 'rate_limited' }
    if (error instanceof Anthropic.APIConnectionError) return { status: 'unreachable' }

    // The thrown value can carry the key material, so nothing from it leaves this catch.
    return { status: 'failed' }
  }
}
