import SuggestionCard from '@/components/Editor/SidePanel/SuggestionsTab/SuggestionsList/SuggestionCard'

import { EDITOR_COPY } from '@/lib/constants/editor'
import { SUGGESTION_MODES } from '@/lib/constants/suggestions'

import type { SuggestionSet } from '@/types/suggestions'

type ComponentProps = {
  suggestionSet: SuggestionSet
  onReveal: () => void
}

const SuggestionsList: React.FC<ComponentProps> = ({ suggestionSet, onReveal }) => {
  const { suggestions: copy } = EDITOR_COPY

  const { selection, mode, suggestions, suggestedAgo, remaining } = suggestionSet

  return (
    <div className='flex flex-1 flex-col gap-[13px] overflow-auto px-[22px] pt-5 pb-[22px]'>
      <div className='flex flex-none items-center justify-between gap-3'>
        <span className='font-mono text-[9.5px] uppercase tracking-[0.14em] text-(--plum-500)'>
          {copy.resultsEyebrow}
        </span>
        <span className='font-mono text-[9px] uppercase tracking-[0.1em] text-(--text-label-color)'>
          {SUGGESTION_MODES[mode].label} · {suggestedAgo}
        </span>
      </div>

      <div className='flex flex-none items-baseline gap-2 rounded-r-(--radius-input) border-l-2 border-(--plum-500) bg-(--plum-100) px-3 py-[9px]'>
        <span className='pt-0.5 font-mono text-[8.5px] whitespace-nowrap uppercase tracking-[0.12em] text-(--plum-500)'>
          {copy.pinnedPrefix} {selection.mark}
        </span>
        <p className='font-display text-[12.5px] italic leading-[1.5] text-(--text-body-color)'>
          {selection.excerpt}
        </p>
      </div>

      {suggestions.map(suggestion => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} pinnedMark={selection.mark} />
      ))}

      {remaining > 0 && (
        <button
          type='button'
          onClick={onReveal}
          className='mt-0.5 flex-none cursor-pointer text-left font-mono text-[9px] uppercase tracking-[0.1em] text-(--text-label-color) hover:text-(--text-body-color)'
        >
          {copy.rerunIcon} {remaining} {copy.moreSuffix} {selection.mark}
        </button>
      )}
    </div>
  )
}

export default SuggestionsList
