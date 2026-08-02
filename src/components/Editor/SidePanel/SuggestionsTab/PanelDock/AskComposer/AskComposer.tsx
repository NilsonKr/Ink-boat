import { EDITOR_COPY } from '@/lib/constants/editor'

const AskComposer: React.FC = () => {
  const { suggestions } = EDITOR_COPY

  return (
    <div className='flex flex-none flex-col px-[22px] pt-[11px] pb-2'>
      <div className='flex items-center gap-2.5 rounded-xl border border-(--line) bg-(--paper-0) px-3.5 py-[11px]'>
        <span aria-hidden className='font-display text-[15px] text-(--plum-500)'>
          {suggestions.mark}
        </span>
        <span className='flex-1 font-display text-[14px] italic text-(--text-label-color)'>
          {suggestions.askPlaceholder}
        </span>
        <span className='rounded border border-(--line) px-1.5 py-px font-mono text-[9px] tracking-[0.1em] text-(--text-label-color)'>
          {suggestions.askShortcut}
        </span>
      </div>
    </div>
  )
}

export default AskComposer
