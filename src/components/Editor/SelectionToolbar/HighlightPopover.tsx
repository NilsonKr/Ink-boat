'use client'
import { HIGHLIGHT_COLORS } from '@/lib/constants/theme'

type ComponentProps = {
  activeColor?: string
  onSelect: (color: string) => void
  onClear: () => void
}

/** Colour swatches for the highlight mark, anchored under the format bar. */
const HighlightPopover: React.FC<ComponentProps> = ({ activeColor, onSelect, onClear }) => (
  <div className='absolute top-[calc(100%+8px)] right-0 z-10 w-[150px] rounded-[7px] border border-(--line) bg-(--paper-0) p-3 shadow-(--shadow-pop)'>
    <div className='mb-[10px] font-mono text-[9px] tracking-[0.14em] uppercase text-(--text-label-color)'>
      Highlight
    </div>
    <div className='flex flex-wrap gap-[9px]'>
      {HIGHLIGHT_COLORS.map(({ name, value }) => (
        <button
          key={name}
          type='button'
          aria-label={`Highlight ${name}`}
          onClick={() => onSelect(value)}
          style={{ background: value }}
          className={`size-6 rounded-[5px] cursor-pointer ${activeColor === value ? 'shadow-[0_0_0_2px_var(--marigold-700)]' : ''}`}
        />
      ))}
      <button
        type='button'
        aria-label='Remove highlight'
        onClick={onClear}
        className='flex size-6 items-center justify-center rounded-[5px] border border-(--line) bg-(--paper-0) font-sans text-[13px] text-(--text-muted-color) cursor-pointer'
      >
        ×
      </button>
    </div>
  </div>
)

export default HighlightPopover
