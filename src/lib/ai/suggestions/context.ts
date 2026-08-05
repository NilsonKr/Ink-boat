import { buildModeInstruction, SUGGESTION_SYSTEM } from '@/lib/ai/suggestions/prompts'
import { TAKES_PER_RUN } from '@/lib/constants/suggestions'

import type Anthropic from '@anthropic-ai/sdk'

import type { RunSuggestionsInput } from '@/types/suggestions'

const MAX_META_CHARS = 200

/** A selection longer than this is a section, not a passage. The cap keeps one paste in bounds. */
const MAX_PASSAGE_CHARS = 4000

const EMPTY = '—'

const cap = (text: string, limit: number): string =>
  text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text

const buildDraftBlock = ({ draft, context }: RunSuggestionsInput): string =>
  [
    `Draft title: ${cap(draft.title, MAX_META_CHARS) || EMPTY}`,
    `Draft description: ${cap(draft.description, MAX_META_CHARS) || EMPTY}`,
    '',
    'Text before the passage:',
    context.before || EMPTY,
    '',
    'Text after the passage:',
    context.after || EMPTY,
  ].join('\n')

/**
 * Stable first, volatile last. The frozen rules and the draft body do not move while the
 * writer works, so the breakpoint at the end of the draft block lets a second run on the
 * same draft read the cache instead of paying for the prefix again.
 */
export const buildSystemBlocks = (input: RunSuggestionsInput): Anthropic.TextBlockParam[] => [
  { type: 'text', text: SUGGESTION_SYSTEM },
  {
    type: 'text',
    text: buildDraftBlock(input),
    cache_control: { type: 'ephemeral' },
  },
]

/** The mode and the passage change on every run, so they sit after the breakpoint. */
export const buildUserContent = ({ mode, toneOption, context }: RunSuggestionsInput): string =>
  [
    buildModeInstruction(mode, toneOption),
    '',
    `Write ${TAKES_PER_RUN} takes on this passage:`,
    '',
    cap(context.selected, MAX_PASSAGE_CHARS),
  ].join('\n')
