'use client'
import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'

type ComponentProps = {
  editor: Editor | null
}

const itemStyles =
  'flex items-center justify-center rounded-[5px] text-(--text-on-dark) cursor-pointer transition-colors hover:bg-white/10'
const markStyles = `${itemStyles} font-display px-[11px] py-[5px]`
const blockStyles = `${itemStyles} font-mono text-[9.5px] tracking-[0.1em] px-[10px] py-[5px]`
const dividerStyles = 'mx-1 h-[18px] w-px bg-(--line-on-dark)'

const SelectionToolbar: React.FC<ComponentProps> = ({ editor }) => {
  if (!editor) return null

  return (
    <BubbleMenu
      editor={editor}
      className='flex items-center gap-px rounded-(--radius-button) bg-(--espresso-800) p-[6px] shadow-(--shadow-pop)'
    >
      <button type='button' aria-label='Bold' className={`${markStyles} text-[15px] font-bold`}>
        B
      </button>
      <button type='button' aria-label='Italic' className={`${markStyles} text-[16px] italic`}>
        i
      </button>
      <button type='button' aria-label='Strikethrough' className={`${markStyles} text-[15px] line-through`}>
        S
      </button>
      <button type='button' aria-label='Inline code' className={`${blockStyles} tracking-[0.06em]`}>
        &lt;/&gt;
      </button>

      <span className={dividerStyles} />

      <button type='button' aria-label='Link' className={`${blockStyles} tracking-[0.12em]`}>
        LINK
      </button>

      <span className={dividerStyles} />

      <button type='button' aria-label='Heading 1' className={blockStyles}>
        H1
      </button>
      <button type='button' aria-label='Heading 2' className={blockStyles}>
        H2
      </button>
      <button type='button' aria-label='Quote' className={`${itemStyles} font-display text-[16px] px-[9px] py-[2px]`}>
        ❝
      </button>

      <span className={dividerStyles} />

      <button
        type='button'
        aria-label='Highlight'
        className='mx-2 size-[15px] shrink-0 rounded-[3px] bg-(--marigold-300) shadow-[0_0_0_1px_rgba(243,234,217,0.25)] cursor-pointer transition-shadow hover:shadow-[0_0_0_2px_var(--marigold-500)]'
      />
    </BubbleMenu>
  )
}

export default SelectionToolbar
