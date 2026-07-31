import { EDITOR_COPY } from '@/lib/constants/editor'

const stepStyles =
  'flex items-center gap-[9px] text-left font-mono text-[9px] uppercase tracking-[0.08em] text-(--text-label-color)'

const SuggestionsEmpty: React.FC = () => {
  const { suggestions } = EDITOR_COPY

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 overflow-auto p-[22px] text-center'>
      <span aria-hidden className='aurora-ring size-[52px] rounded-full' />

      <div className='flex max-w-[270px] flex-col gap-[7px]'>
        <h3 className='font-display text-[20px] font-medium leading-[1.15] tracking-[-0.01em] text-(--text-strong)'>
          {suggestions.emptyHeading}
        </h3>
        <p className='font-display text-[13.5px] leading-[1.5] text-(--text-muted-color)'>
          {suggestions.emptyBody}
        </p>
      </div>

      <ol className='mt-1 flex w-full max-w-[290px] flex-col gap-2'>
        {suggestions.steps.map((step, index) => (
          <li key={step} className={stepStyles}>
            <span className='flex size-[18px] shrink-0 items-center justify-center rounded-full border border-(--line-strong) text-[8.5px] text-(--text-body-color)'>
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default SuggestionsEmpty
