import { EDITOR_COPY } from '@/lib/constants/editor'

const SelectionTrigger: React.FC = () => {
  const { suggestions } = EDITOR_COPY

  return (
    <div className='flex flex-none flex-col gap-2.5 border-t-2 border-(--espresso-800) bg-(--paper-50) px-[22px] pt-[15px] pb-4'>
      <div className='flex items-center gap-[7px]'>
        <span className='size-[6px] rounded-full bg-(--text-label-color)' />
        <span className='font-mono text-[9px] uppercase tracking-[0.12em] text-(--text-label-color)'>
          {suggestions.noSelection}
        </span>
      </div>

      <div
        className='
          flex w-full items-center justify-center
          rounded-[11px] border border-dashed border-(--line) px-[14px] py-3
          font-mono text-[9.5px] uppercase tracking-[0.12em] text-(--text-label-color)
        '
      >
        {suggestions.waitingSelection}
      </div>
    </div>
  )
}

export default SelectionTrigger
