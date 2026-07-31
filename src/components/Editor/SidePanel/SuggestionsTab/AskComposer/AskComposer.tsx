import { EDITOR_COPY } from '@/lib/constants/editor'
import { AI_PROVIDERS } from '@/lib/constants/providers'

import type { AIProvider } from '@/types/providers'

type ComponentProps = {
  provider: AIProvider
}

const AskComposer: React.FC<ComponentProps> = ({ provider }) => {
  const { suggestions } = EDITOR_COPY

  const { models } = AI_PROVIDERS[provider]

  return (
    <div className='flex flex-none flex-col gap-[9px] border-t border-(--line) px-[22px] pt-3.5 pb-4'>
      <div className='flex items-center gap-2.5 rounded-xl border border-(--line) bg-(--paper-0) px-3.5 py-[11px]'>
        <span className='flex-1 font-display text-[14px] italic text-(--text-label-color)'>
          {suggestions.askPlaceholder}
        </span>
        <span className='rounded border border-(--line) px-[7px] py-[3px] font-mono text-[9px] tracking-[0.1em] text-(--text-label-color)'>
          {suggestions.askShortcut}
        </span>
      </div>

      <div className='flex items-center gap-1.5 px-0.5'>
        <span className='font-mono text-[8.5px] uppercase tracking-[0.12em] text-(--text-label-color)'>
          {suggestions.modelLabel}
        </span>
        <div className='relative inline-flex items-center'>
          <select
            aria-label={suggestions.modelLabel}
            defaultValue={models[0].id}
            className='cursor-pointer appearance-none border-none bg-transparent pr-3 font-mono text-[9.5px] tracking-[0.04em] text-(--text-body-color) outline-none'
          >
            {models.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <span className='pointer-events-none absolute right-0 font-mono text-[8px] text-(--text-label-color)'>
            ▾
          </span>
        </div>
      </div>
    </div>
  )
}

export default AskComposer
