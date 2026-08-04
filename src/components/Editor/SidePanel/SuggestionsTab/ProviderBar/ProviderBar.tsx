'use client'
import { EDITOR_COPY } from '@/lib/constants/editor'
import { AI_PROVIDERS } from '@/lib/constants/providers'

import type { ProviderKeySummary } from '@/types/providers'

type ComponentProps = {
  providerKey: ProviderKeySummary
  onManage: () => void
}

const ProviderBar: React.FC<ComponentProps> = ({ providerKey, onManage }) => {
  const { providerSetup, suggestions } = EDITOR_COPY

  const { last4, provider } = providerKey

  return (
    <div className='flex flex-none items-center justify-between gap-3.5 border-b border-(--line) bg-(--paper-50) px-[18px] py-3'>
      <div className='flex min-w-0 items-center gap-[11px]'>
        <span
          aria-hidden
          className='aurora-fill flex size-[30px] shrink-0 items-center justify-center rounded-full p-0.5'
        >
          <span className='flex size-full items-center justify-center rounded-full bg-(--paper-50) font-display text-[15px] text-(--plum-500)'>
            {suggestions.mark}
          </span>
        </span>

        <div className='flex min-w-0 flex-col gap-0.5'>
          <span className='truncate text-[13px] font-semibold text-(--text-strong)'>
            {suggestions.panelHeading}
          </span>
          <span className='font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--text-label-color)'>
            {suggestions.panelMode}
          </span>
        </div>
      </div>

      <div className='flex flex-none flex-col items-end gap-0.5'>
        <div className='flex items-center gap-[7px]'>
          <span className='live-dot size-[7px] shrink-0 rounded-full bg-(--status-published)' />
          <span className='font-mono text-[9.5px] uppercase tracking-[0.08em] text-(--text-body-color)'>
            {AI_PROVIDERS[provider].label}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='font-mono text-[9px] tracking-[0.06em] text-(--text-label-color)'>
            {suggestions.keyPrefix} {suggestions.keyMask}
            {last4}
          </span>
          <button
            type='button'
            onClick={onManage}
            className='cursor-pointer font-mono text-[9px] uppercase tracking-[0.1em] text-(--plum-500) hover:text-(--plum-700)'
          >
            {providerSetup.connectedManage}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProviderBar
