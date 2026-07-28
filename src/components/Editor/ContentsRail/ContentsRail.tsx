'use client'
import { useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

import { EDITOR_COPY } from '@/lib/copy'

type ComponentProps = {
  editor: Editor | null
}

type HeadingEntry = {
  level: number
  pos: number
  end: number
  text: string
}

const entryStyles =
  'flex w-full items-baseline gap-[11px] border-b border-(--line) text-left last:border-b-0 cursor-pointer'
const badgeStyles =
  'w-5 shrink-0 font-mono text-[8.5px] tracking-[0.08em] text-(--text-label-color)'
const activeStyles = 'border-b-2 border-(--marigold-500) pb-[2px] text-(--text-strong)'

const getHeadingIndex = (editor: Editor | null) => {
  const headings: HeadingEntry[] = []

  if (!editor) return { headings, activePos: null }

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== 'heading' || node.attrs.level > 2) return

    headings.push({
      level: node.attrs.level,
      pos,
      // Last position inside the heading, so the caret lands after its text.
      end: pos + node.nodeSize - 1,
      text: node.textContent,
    })
  })

  const { from } = editor.state.selection

  return { headings, activePos: headings.findLast(entry => entry.pos <= from)?.pos ?? null }
}

const ContentsRail: React.FC<ComponentProps> = ({ editor }) => {
  const { contents } = EDITOR_COPY

  // Subscription only. useEditorState caches a snapshot taken before useEditor
  // resolves, and refreshes it solely on a transaction — so reading the index
  // from its selector leaves the rail empty until the first keystroke. The
  // editor prop is already current on the render that creates it.
  useEditorState({ editor, selector: ({ transactionNumber }) => transactionNumber })

  const { headings, activePos } = getHeadingIndex(editor)

  const handleJump = (end: number) => editor?.chain().focus(end).scrollIntoView().run()

  return (
    <aside className='overflow-y-auto border-r border-(--line) px-7 pt-9 pb-12'>
      <div className='mb-4 flex items-center justify-between'>
        <span className='font-mono text-[10px] uppercase tracking-[0.16em] text-(--plum-500)'>
          {contents.heading}
        </span>
        <span className='font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--text-label-color)'>
          {contents.hint}
        </span>
      </div>

      {headings.length ? (
        <nav className='flex flex-col'>
          {headings.map(({ level, pos, end, text }) => {
            const isActive = pos === activePos
            const isH1 = level === 1

            return (
              <button
                key={pos}
                type='button'
                aria-current={isActive}
                onClick={() => handleJump(end)}
                className={`${entryStyles} ${isH1 ? 'py-3' : 'py-[10px] pl-5'}`}
              >
                <span className={badgeStyles}>H{level}</span>
                <span
                  className={`
                    font-display line-clamp-2
                    ${isH1
                      ? 'text-[15.5px] font-medium tracking-[-0.01em] text-(--text-strong)'
                      : 'text-[14px] text-(--text-muted-color)'
                    }
                    ${isActive ? activeStyles : ''}
                    ${text ? '' : 'italic text-(--text-label-color)'}
                  `}
                >
                  {text || contents.untitled}
                </span>
              </button>
            )
          })}
        </nav>
      ) : (
        <p className='font-display text-[14px] italic text-(--text-label-color)'>
          {contents.empty}
        </p>
      )}
    </aside>
  )
}

export default ContentsRail
