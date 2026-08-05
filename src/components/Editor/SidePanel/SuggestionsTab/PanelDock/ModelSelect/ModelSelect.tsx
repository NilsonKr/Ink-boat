import { EDITOR_COPY } from '@/lib/constants/editor'
import { AI_PROVIDERS } from '@/lib/constants/providers'

import type { AIProvider } from '@/types/providers'

type ComponentProps = {
  provider: AIProvider
  model: string
  onModelChange: (model: string) => void
}

const ModelSelect: React.FC<ComponentProps> = ({ provider, model, onModelChange }) => {
  const { suggestions } = EDITOR_COPY

  const { models } = AI_PROVIDERS[provider]

  return (
    <div className='flex flex-none items-center gap-1.5'>
      <span className='font-mono text-[8px] uppercase tracking-[0.12em] text-(--text-label-color)'>
        {suggestions.modelLabel}
      </span>
      <div className='relative inline-flex items-center'>
        <select
          aria-label={suggestions.modelLabel}
          value={model}
          onChange={({ target }) => onModelChange(target.value)}
          className='cursor-pointer appearance-none border-none bg-transparent pr-3 font-mono text-[9px] tracking-[0.04em] text-(--text-body-color) outline-none'
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
  )
}

export default ModelSelect
