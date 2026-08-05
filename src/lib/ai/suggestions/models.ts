import type { SuggestionModeKey } from '@/types/suggestions'

type ModelTuning = {
  /** Claude Haiku 4.5 answers any request carrying `effort` with a 400. */
  supportsEffort: boolean
  /** Claude Opus 5 and Sonnet 5 think unless told not to, and thinking shares `max_tokens`. */
  thinksByDefault: boolean
}

/** Keyed by the ids in `AI_PROVIDERS.ANTHROPIC.models`. */
const MODEL_TUNING: Record<string, ModelTuning> = {
  'claude-opus-5': { supportsEffort: true, thinksByDefault: true },
  'claude-sonnet-5': { supportsEffort: true, thinksByDefault: true },
  'claude-haiku-4-5-20251001': { supportsEffort: false, thinksByDefault: false },
}

/** An id we do not know gets only what every Claude model accepts. */
const FALLBACK_TUNING: ModelTuning = { supportsEffort: false, thinksByDefault: false }

/** Small on purpose. A take replaces one passage, not a section. */
const MODE_MAX_TOKENS: Record<SuggestionModeKey, number> = {
  shorten: 700,
  reformulate: 1200,
  tone: 1200,
  complete: 1600,
  expand: 2400,
}

const MODE_EFFORT: Record<SuggestionModeKey, 'low' | 'medium'> = {
  reformulate: 'low',
  shorten: 'low',
  tone: 'low',
  complete: 'medium',
  expand: 'medium',
}

export type RequestTuning = {
  max_tokens: number
  output_config?: { effort: 'low' | 'medium' }
}

/**
 * The one place that knows how the models differ. Every call site sends the same request
 * and lets this decide what the chosen model can carry.
 */
export const getRequestTuning = (model: string, mode: SuggestionModeKey): RequestTuning => {
  const { supportsEffort, thinksByDefault } = MODEL_TUNING[model] ?? FALLBACK_TUNING

  // `max_tokens` caps thinking and answer together, so a thinking model needs room for both.
  const maxTokens = MODE_MAX_TOKENS[mode] * (thinksByDefault ? 2 : 1)

  if (!supportsEffort) return { max_tokens: maxTokens }

  return { max_tokens: maxTokens, output_config: { effort: MODE_EFFORT[mode] } }
}
