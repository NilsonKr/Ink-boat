/** A take is neutral until the writer weaves it into the draft. */
export type SuggestionStatus = 'idle' | 'woven'

export type SuggestionModeKey = 'reformulate' | 'complete' | 'expand' | 'shorten' | 'tone'

export type SuggestionMode = {
  key: SuggestionModeKey
  label: string
  hint: string
  /** Tone-like modes carry variants instead of a single hint. */
  options?: string[]
}

/** The dock shows one body at a time — a run against the selection, or a free question. */
export type SuggestionsDockTab = 'suggest' | 'ask'

export type DraftSelection = {
  /** Paragraph mark the panel shows, e.g. `¶3`. */
  mark: string
  excerpt: string
  wordCount: number
}

export type Suggestion = {
  id: string
  /** Letter that orders the take in the list, e.g. `A`. */
  key: string
  tone: string
  text: string
  status: SuggestionStatus
}

/** Takes stay pinned to the selection they were fired from. */
export type SuggestionSet = {
  selection: DraftSelection
  mode: SuggestionModeKey
  suggestions: Suggestion[]
  suggestedAgo: string
  remaining: number
}
