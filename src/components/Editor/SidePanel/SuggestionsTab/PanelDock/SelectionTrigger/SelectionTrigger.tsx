'use client'
import { useState } from 'react'

import ModeMenu from '@/components/Editor/SidePanel/SuggestionsTab/PanelDock/SelectionTrigger/ModeMenu'

import { EDITOR_COPY } from '@/lib/constants/editor'
import { SUGGESTION_MODES } from '@/lib/constants/suggestions'

import type { DraftSelection, SuggestionModeKey } from '@/types/suggestions'

type ComponentProps = {
  selection: DraftSelection | null
  mode: SuggestionModeKey
  isRunning: boolean
  onModeChange: (mode: SuggestionModeKey) => void
  onRun: () => void
}

const rowStyles = 'relative flex items-center gap-[11px] py-[11px] pr-3.5 pl-[18px]'
const splitStyles = 'flex flex-none items-stretch overflow-hidden rounded-[10px]'
const modeButtonStyles =
  'flex items-center gap-[7px] bg-(--espresso-800) px-3 py-[9px] text-[12px] font-semibold text-(--text-on-dark)'
const runButtonStyles =
  'aurora-fill flex items-center justify-center px-[13px] py-[9px] font-display text-[14px] text-white'

const SelectionTrigger: React.FC<ComponentProps> = ({
  selection,
  mode,
  isRunning,
  onModeChange,
  onRun,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const { suggestions } = EDITOR_COPY

  const activeMode = SUGGESTION_MODES[mode]

  const handleSelectMode = (next: SuggestionModeKey) => {
    onModeChange(next)
    setIsMenuOpen(false)
  }

  if (!selection)
    return (
      <div className={`${rowStyles} pb-2`}>
        <div className='flex min-w-0 flex-1 items-center gap-2'>
          <span className='size-[6px] shrink-0 rounded-full bg-(--text-label-color)' />
          <span className='font-mono text-[9px] uppercase tracking-[0.12em] text-(--text-label-color)'>
            {suggestions.noSelection}
          </span>
        </div>

        <div className={`${splitStyles} opacity-45`}>
          <span className={modeButtonStyles}>
            {activeMode.label}
            <span className='text-[8px] opacity-70'>▾</span>
          </span>
          <span className={runButtonStyles}>{suggestions.rerunIcon}</span>
        </div>
      </div>
    )

  const { mark, excerpt, wordCount } = selection

  return (
    <div className={`${rowStyles} pb-2`}>
      {isMenuOpen && <ModeMenu activeMode={mode} onSelect={handleSelectMode} />}

      <div className='flex min-w-0 flex-1 items-center gap-2'>
        <span className='live-dot size-[6px] shrink-0 rounded-full bg-(--status-published)' />
        <span className='shrink-0 font-mono text-[9px] whitespace-nowrap uppercase tracking-[0.1em] text-(--text-body-color)'>
          {mark} · {wordCount}
          {suggestions.wordsSuffix}
        </span>
        <span className='min-w-0 truncate font-display text-[12.5px] italic leading-[1.4] text-(--text-muted-color)'>
          {excerpt}
        </span>
      </div>

      <div className={`${splitStyles} shadow-[0_2px_8px_rgba(20,12,6,0.14)]`}>
        <button
          type='button'
          onClick={() => setIsMenuOpen(prev => !prev)}
          className={`${modeButtonStyles} cursor-pointer`}
        >
          {activeMode.label}
          <span className='text-[8px] opacity-70'>{isMenuOpen ? '▴' : '▾'}</span>
        </button>

        <button
          type='button'
          aria-label={suggestions.runSuggestions}
          aria-busy={isRunning}
          disabled={isRunning}
          onClick={onRun}
          className={`${runButtonStyles} ${isRunning ? 'opacity-60' : 'cursor-pointer'}`}
        >
          {isRunning ? suggestions.runningIcon : suggestions.rerunIcon}
        </button>
      </div>
    </div>
  )
}

export default SelectionTrigger
