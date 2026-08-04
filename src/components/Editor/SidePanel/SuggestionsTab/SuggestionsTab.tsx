'use client'
import { useState } from 'react'

import PanelDock from '@/components/Editor/SidePanel/SuggestionsTab/PanelDock'
import ProviderBar from '@/components/Editor/SidePanel/SuggestionsTab/ProviderBar'
import ProviderSetup from '@/components/Editor/SidePanel/SuggestionsTab/ProviderSetup'
import SuggestionsEmpty from '@/components/Editor/SidePanel/SuggestionsTab/SuggestionsEmpty'
import SuggestionsList from '@/components/Editor/SidePanel/SuggestionsTab/SuggestionsList'

import {
  CURRENT_SELECTION_STUB,
  DEFAULT_SUGGESTION_MODE,
  SUGGESTION_SET_STUB,
} from '@/lib/constants/suggestions'

import type { ProviderKeySummary } from '@/types/providers'
import type { DraftSelection, SuggestionModeKey, SuggestionSet } from '@/types/suggestions'

type ComponentProps = {
  providerKeys: ProviderKeySummary[]
}

const SuggestionsTab: React.FC<ComponentProps> = ({ providerKeys }) => {
  const [keys, setKeys] = useState<ProviderKeySummary[]>(providerKeys)
  const [isManaging, setIsManaging] = useState<boolean>(false)
  const [mode, setMode] = useState<SuggestionModeKey>(DEFAULT_SUGGESTION_MODE)

  // Stubbed until the model call lands — the panel only shows the shape of a run.
  const suggestionSet: SuggestionSet | null = SUGGESTION_SET_STUB
  const currentSelection: DraftSelection | null = CURRENT_SELECTION_STUB

  const handleConnected = (key: ProviderKeySummary) => {
    // One key per provider, so a saved key replaces the entry it just overwrote.
    setKeys(prev => [key, ...prev.filter(entry => entry.provider !== key.provider)])
    setIsManaging(false)
  }

  const [connectedKey] = keys

  if (!connectedKey || isManaging)
    return (
      <ProviderSetup
        initialProvider={connectedKey?.provider}
        initialLabel={connectedKey?.label}
        onConnected={handleConnected}
        onCancel={connectedKey ? () => setIsManaging(false) : undefined}
      />
    )

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <ProviderBar providerKey={connectedKey} onManage={() => setIsManaging(true)} />

      {suggestionSet ? <SuggestionsList suggestionSet={suggestionSet} /> : <SuggestionsEmpty />}

      <PanelDock
        provider={connectedKey.provider}
        selection={currentSelection}
        mode={mode}
        onModeChange={setMode}
      />
    </div>
  )
}

export default SuggestionsTab
