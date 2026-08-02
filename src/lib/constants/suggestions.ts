import type {
  DraftSelection,
  SuggestionMode,
  SuggestionModeKey,
  SuggestionSet,
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
