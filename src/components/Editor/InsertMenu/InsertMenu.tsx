'use client'
import { useState } from 'react'
import type { Editor } from '@tiptap/react'

import { INSERT_BLOCKS } from '@/lib/constants/editor'

type ComponentProps = {
  editor: Editor | null
}

const pillStyles = `
  flex items-center gap-[7px] rounded-(--radius-pill) border border-(--line) bg-(--paper-0)
  px-[13px] py-2 font-mono text-[9.5px] tracking-[0.08em] uppercase text-(--text-body-color)
  cursor-pointer transition-colors hover:border-(--marigold-500) hover:text-(--marigold-700)
`

const InsertMenu: React.FC<ComponentProps> = ({ editor }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  // The rail sits outside the editor DOM, so mousedown would otherwise drop the caret.
  const handleKeepFocus = (event: React.MouseEvent) => event.preventDefault()

  const handleToggle = () => setIsExpanded(prev => !prev)

  const handleInsert = (name: string) => {
    if (!editor) return

    // The rail is a fixed bar at the bottom of the surface, so blocks append to
    // the end of the document rather than wherever the caret last sat.
    const docEnd = editor.state.doc.content.size

    switch (name) {
      case 'Quote':
        editor
          .chain()
          .insertContentAt(docEnd, { type: 'blockquote', content: [{ type: 'paragraph' }] })
          .focus()
          .run()
        break
      case 'Divider':
        editor.chain().focus('end').setHorizontalRule().run()
        break
      case 'Code':
        editor
          .chain()
          .insertContentAt(docEnd, { type: 'codeBlock', attrs: { language: 'javascript' } })
          .focus(docEnd + 1)
          .run()
        break
    }

    setIsExpanded(false)
  }

  return (
    <div className='mt-6 flex items-center gap-4' onMouseDown={handleKeepFocus}>
      <button
        type='button'
        aria-label='Insert block'
        aria-expanded={isExpanded}
        onClick={handleToggle}
        className={`
          flex size-8 shrink-0 items-center justify-center rounded-full border
          font-sans text-[20px] leading-none cursor-pointer transition-all duration-200
          ${isExpanded
            ? 'rotate-45 border-(--marigold-500) text-(--marigold-700)'
            : 'border-(--line-strong) text-(--text-muted-color) hover:border-(--marigold-500) hover:text-(--marigold-700)'
          }
        `}
      >
        <span className='-mt-[2px]'>+</span>
      </button>

      <div
        aria-hidden={!isExpanded}
        className={`
          flex flex-wrap items-center gap-[7px] transition-all duration-200
          ${isExpanded ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-2 opacity-0'}
        `}
      >
        {INSERT_BLOCKS.map(({ name, icon, iconFont }) => (
          <button
            key={name}
            type='button'
            tabIndex={isExpanded ? 0 : -1}
            onClick={() => handleInsert(name)}
            className={pillStyles}
          >
            <span
              className={
                iconFont === 'mono'
                  ? 'font-mono text-[11px] text-(--plum-500)'
                  : 'font-display text-[12px] text-(--plum-500)'
              }
            >
              {icon}
            </span>
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default InsertMenu
