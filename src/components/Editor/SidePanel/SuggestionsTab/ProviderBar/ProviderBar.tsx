'use client'
import { EDITOR_COPY } from '@/lib/constants/editor'
import { AI_PROVIDERS } from '@/lib/constants/providers'

import type { ProviderKeySummary } from '@/types/providers'

type ComponentProps = {
  providerKey: ProviderKeySummary
  onManage: () => void
}

const ProviderBar: React.FC<ComponentProps> = ({ providerKey, onManage }) => {
  const { providerSetup } = EDITOR_COPY

  const { label, last4, provider } = providerKey

  return (
    <div className='flex items-center justify-between gap-3 border-b border-(--line) bg-(--paper-50) px-[26px] py-[13px]'>
      <div className='flex min-w-0 items-center gap-[9px]'>
        <span className='size-[7px] shrink-0 rounded-full bg-(--status-published)' />
        <span className='truncate font-mono text-[9.5px] uppercase tracking-[0.08em] text-(--text-body-color)'>
          {AI_PROVIDERS[provider].label} · {label} · ••••••••{last4}
        </span>
      </div>
      <button
        type='button'
        onClick={onManage}
        className='shrink-0 cursor-pointer font-mono text-[9px] uppercase tracking-[0.1em] text-(--plum-500) hover:text-(--plum-700)'
      >
        {providerSetup.connectedManage}
      </button>
    </div>
  )
}

export default ProviderBar
