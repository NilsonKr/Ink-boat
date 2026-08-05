'use client'
import { useState } from 'react'

import AskComposer from '@/components/Editor/SidePanel/SuggestionsTab/PanelDock/AskComposer'
import ModelSelect from '@/components/Editor/SidePanel/SuggestionsTab/PanelDock/ModelSelect'
import SelectionTrigger from '@/components/Editor/SidePanel/SuggestionsTab/PanelDock/SelectionTrigger'

import { EDITOR_COPY } from '@/lib/constants/editor'

import type { AIProvider } from '@/types/providers'
import type { DraftSelection, SuggestionModeKey, SuggestionsDockTab } from '@/types/suggestions'

type ComponentProps = {
  provider: AIProvider
  selection: DraftSelection | null
  mode: SuggestionModeKey
  model: string
  isRunning: boolean
  onModeChange: (mode: SuggestionModeKey) => void
  onModelChange: (model: string) => void
  onRun: () => void
}

const PanelDock: React.FC<ComponentProps> = ({
  provider,
  selection,
  mode,
  model,
  isRunning,
  onModeChange,
  onModelChange,
  onRun,
}) => {
  const [tab, setTab] = useState<SuggestionsDockTab>('suggest')

  const { suggestions } = EDITOR_COPY

  const handleSwitchTab = () => setTab(prev => (prev === 'suggest' ? 'ask' : 'suggest'))

  const isSuggest = tab === 'suggest'

  return (
    <div className='min-h-[120px] flex flex-none flex-col border-t-2 border-(--espresso-800) bg-(--paper-50)'>
      <button
        type='button'
        onClick={handleSwitchTab}
        className='
          flex cursor-pointer items-center gap-[7px] self-start pt-[11px] pb-0.5 pr-[22px] pl-[18px]
          font-mono text-[9px] uppercase tracking-[0.12em] text-(--text-label-color)
          hover:text-(--text-body-color)
        '
      >
        <span aria-hidden className='text-[12px] leading-none'>
          {suggestions.dockSwitchIcon}
        </span>
        {isSuggest ? suggestions.dockAsk : suggestions.dockSuggest}
      </button>

      {isSuggest ? (
        <SelectionTrigger
          selection={selection}
          mode={mode}
          isRunning={isRunning}
          onModeChange={onModeChange}
          onRun={onRun}
        />
      ) : (
        <AskComposer />
      )}

      <div className='flex flex-none pr-[22px] pb-3 pl-[18px]'>
        <ModelSelect provider={provider} model={model} onModelChange={onModelChange} />
      </div>
    </div>
  )
}

export default PanelDock
