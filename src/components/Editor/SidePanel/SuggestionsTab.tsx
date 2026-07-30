'use client'
import { useState } from 'react'

import ProviderBar from '@/components/Editor/SidePanel/ProviderBar'
import ProviderSetup from '@/components/Editor/SidePanel/ProviderSetup'

import { EDITOR_COPY } from '@/lib/constants/editor'

import type { ProviderKeySummary } from '@/types/providers'

type ComponentProps = {
  providerKeys: ProviderKeySummary[]
}

const SuggestionsTab: React.FC<ComponentProps> = ({ providerKeys }) => {
  const { panel } = EDITOR_COPY

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

      <div className='flex-1 overflow-auto px-[26px] pt-[26px] pb-8'>
        <p className='font-display text-[14px] italic text-(--text-label-color)'>
          {panel.suggestionsStub}
        </p>
      </div>
    </div>
  )
}

export default SuggestionsTab
