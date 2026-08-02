import { EDITOR_COPY } from '@/lib/constants/editor'
import { SUGGESTION_MODES } from '@/lib/constants/suggestions'

import type { SuggestionModeKey } from '@/types/suggestions'

type ComponentProps = {
  activeMode: SuggestionModeKey
  onSelect: (mode: SuggestionModeKey) => void
}

const rowStyles = 'flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-[9px] text-left'

const ModeMenu: React.FC<ComponentProps> = ({ activeMode, onSelect }) => {
  const { suggestions } = EDITOR_COPY

  const modes = Object.values(SUGGESTION_MODES)

  return (
    <div
      className='
        absolute right-3.5 bottom-full left-[18px] z-10 mb-2 overflow-hidden
        rounded-xl border border-(--line-strong) bg-(--paper-0)
        shadow-[0_18px_44px_rgba(20,12,6,0.22)]
      '
    >
      <p className='px-3.5 pt-[9px] pb-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-(--text-label-color)'>
        {suggestions.modeMenuHeading}
      </p>

      {modes.map(({ key, label, hint, options }) => {
        const isActive = key === activeMode

        return (
          <button
            key={key}
            type='button'
            onClick={() => onSelect(key)}
            className={`
              ${rowStyles}
              ${options ? 'border-t border-(--line)' : ''}
              ${isActive ? 'bg-(--plum-100)' : 'hover:bg-(--paper-50)'}
            `}
          >
            <span
              className={`size-[6px] shrink-0 rounded-full ${
                isActive ? 'bg-(--plum-500)' : 'border border-(--line-strong)'
              }`}
            />
            <span
              className={`text-[12.5px] ${
                isActive ? 'font-semibold text-(--text-strong)' : 'text-(--text-body-color)'
              }`}
            >
              {label}
            </span>

            {options ? (
              <span className='ml-auto font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--text-label-color)'>
                {options.join(' · ')}
              </span>
            ) : (
              <span
                className={`ml-auto font-display text-[12px] ${
                  isActive ? 'text-(--text-muted-color)' : 'text-(--text-label-color)'
                }`}
              >
                {hint}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default ModeMenu
