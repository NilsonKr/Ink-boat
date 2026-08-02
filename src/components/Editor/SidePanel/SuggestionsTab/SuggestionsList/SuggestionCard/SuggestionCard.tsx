import { EDITOR_COPY } from '@/lib/constants/editor'

import type { Suggestion } from '@/types/suggestions'

type ComponentProps = {
  suggestion: Suggestion
  pinnedMark: string
}

const eyebrowStyles = 'font-mono text-[9px] uppercase tracking-[0.14em]'

const SuggestionCard: React.FC<ComponentProps> = ({ suggestion, pinnedMark }) => {
  const { suggestions } = EDITOR_COPY

  const { key, tone, text, status } = suggestion

  const label = `${key} · ${tone}`

  if (status === 'woven')
    return (
      <article className='flex flex-none flex-col gap-[9px] rounded-xl border border-(--status-published) bg-(--status-published-tint) px-3.5 py-[13px]'>
        <div className='flex items-center justify-between gap-3'>
          <span className={`${eyebrowStyles} text-(--status-published)`}>{label}</span>
          <span className='inline-flex items-center gap-[5px] rounded-(--radius-pill) border border-(--status-published) bg-(--paper-0) px-[9px] py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--status-published)'>
            {suggestions.wovenBadge}
          </span>
        </div>

        <p className='font-display text-[13.5px] leading-[1.55] text-(--text-body-color)'>{text}</p>

        <div className='flex items-center gap-2.5 border-t border-[color-mix(in_srgb,var(--status-published)_25%,transparent)] pt-[9px]'>
          <span className='font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--status-published)'>
            {suggestions.wovenInto} {pinnedMark}
          </span>
          <button
            type='button'
            className='ml-auto cursor-pointer font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--text-label-color) hover:text-(--text-body-color)'
          >
            {suggestions.undo}
          </button>
        </div>
      </article>
    )

  return (
    <article className='flex flex-none flex-col gap-[9px] rounded-xl border border-(--line) bg-(--paper-0) px-3.5 py-[13px]'>
      <div className='flex items-center justify-between gap-3'>
        <span className={`${eyebrowStyles} text-(--plum-500)`}>{label}</span>
        <button
          type='button'
          className='
            shrink-0 cursor-pointer rounded-(--radius-button)
            border border-(--line-strong) px-[11px] py-1.5
            text-[11px] font-semibold text-(--plum-500)
            hover:bg-(--plum-100)
          '
        >
          {suggestions.weaveIn}
        </button>
      </div>

      <p className='font-display text-[13.5px] leading-[1.55] text-(--text-strong)'>{text}</p>
    </article>
  )
}

export default SuggestionCard
