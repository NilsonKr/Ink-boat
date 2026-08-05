import type {
  DraftSelection,
  SuggestionMode,
  SuggestionModeKey,
  SuggestionSet,
  SuggestionsFailureStatus,
} from '@/types/suggestions'

export const SUGGESTION_MODES: Record<SuggestionModeKey, SuggestionMode> = {
  reformulate: { key: 'reformulate', label: 'Reformulate', hint: 'Say it another way' },
  complete: { key: 'complete', label: 'Complete', hint: 'Carry the thought on' },
  expand: { key: 'expand', label: 'Expand', hint: 'Add detail & texture' },
  shorten: { key: 'shorten', label: 'Shorten', hint: 'Tighten to essentials' },
  tone: {
    key: 'tone',
    label: 'Change tone…',
    hint: 'Pick a voice',
    options: ['Warmer', 'Sparer', 'Formal'],
  },
}

export const DEFAULT_SUGGESTION_MODE: SuggestionModeKey = 'reformulate'

/**
 * One call writes four takes and the panel shows two. The rest are already paid for, so
 * "2 more" costs the writer nothing.
 */
export const TAKES_PER_RUN = 4
export const TAKES_SHOWN = 2

/** What the panel says when a run does not come back with takes. */
export const SUGGESTION_RUN_COPY: Record<SuggestionsFailureStatus, string> = {
  invalid_key: 'The provider rejected your key. Connect it again.',
  rate_limited: 'Your key hit its limit. Try again in a moment.',
  unreachable: 'The provider did not answer. Try again in a moment.',
  refused: 'The model declined this passage.',
  truncated: 'The answer was cut short. Run it again.',
  failed: 'The run did not finish. Try again.',
  // `invalid_input` carries its own message. This is the fallback if one is missing.
  invalid_input: 'That run could not be sent. Change the selection and try again.',
  no_key: 'Connect a provider key to run suggestions.',
  unsupported_provider: 'Suggestions run on an Anthropic key for now.',
}

export const SUGGESTION_INPUT_COPY = {
  passageRequired: 'Select a passage first.',
  passageTooLong: 'That passage is too long. Select less of the draft.',
  unknownModel: 'That model does not belong to the connected provider.',
}

/** Stub data — the panel shows the shape of a real run until the model is wired in. */

export const SUGGESTION_SET_STUB: SuggestionSet = {
  selection: {
    mark: '¶2',
    excerpt: '…a room you can furnish',
    wordCount: 22,
  },
  mode: 'reformulate',
  suggestedAgo: '12s ago',
  remaining: 2,
  suggestions: [
    {
      id: 'stub-a',
      key: 'A',
      tone: 'Warmer',
      text: '…a chair dragged to the east window, a cup that steams unhurried, one sentence left open like a door ajar.',
      status: 'idle',
    },
    {
      id: 'stub-b',
      key: 'B',
      tone: 'Sparer',
      text: '…and mornings are when I choose what gets to stay.',
      status: 'woven',
    },
  ],
}

export const CURRENT_SELECTION_STUB: DraftSelection = {
  mark: '¶3',
  excerpt: '…the same forty minutes before anyone else’s day can make a claim on mine.',
  wordCount: 27,
}
