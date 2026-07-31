'use client'
import { useState } from 'react'

import AskComposer from '@/components/Editor/SidePanel/SuggestionsTab/AskComposer'
import ProviderBar from '@/components/Editor/SidePanel/SuggestionsTab/ProviderBar'
import ProviderSetup from '@/components/Editor/SidePanel/SuggestionsTab/ProviderSetup'
import SelectionTrigger from '@/components/Editor/SidePanel/SuggestionsTab/SelectionTrigger'
import SuggestionsEmpty from '@/components/Editor/SidePanel/SuggestionsTab/SuggestionsEmpty'

import type { ProviderKeySummary } from '@/types/providers'

type ComponentProps = {
  providerKeys: ProviderKeySummary[]
}

const SuggestionsTab: React.FC<ComponentProps> = ({ providerKeys }) => {
  const [keys, setKeys] = useState<ProviderKeySummary[]>(providerKeys)
  const [isManaging, setIsManaging] = useState<boolean>(false)

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

      <SuggestionsEmpty />
      <SelectionTrigger />
      <AskComposer provider={connectedKey.provider} />
    </div>
  )
}

export default SuggestionsTab
