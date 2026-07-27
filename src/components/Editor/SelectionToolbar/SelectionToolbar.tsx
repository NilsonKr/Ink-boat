'use client'
import { useEffect, useState } from 'react'
import { BubbleMenu } from '@tiptap/react/menus'
import { useEditorState, isNodeSelection } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

import LinkInput from '@/components/Editor/SelectionToolbar/LinkInput'
import HighlightPopover from '@/components/Editor/SelectionToolbar/HighlightPopover'

type ComponentProps = {
  editor: Editor | null
}

type ToolbarMode = 'format' | 'link' | 'highlight'

const itemStyles =
  'flex items-center justify-center rounded-[5px] text-(--text-on-dark) cursor-pointer transition-colors hover:bg-white/10'
const markStyles = `${itemStyles} font-display px-[11px] py-[5px]`
const blockStyles = `${itemStyles} font-mono text-[9.5px] tracking-[0.1em] px-[10px] py-[5px]`
const dividerStyles = 'mx-1 h-[18px] w-px bg-(--line-on-dark)'
const activeStyles = 'text-(--marigold-500) bg-[rgba(232,184,55,0.14)]'

const SelectionToolbar: React.FC<ComponentProps> = ({ editor }) => {
  const [mode, setMode] = useState<ToolbarMode>('format')

  const marks = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) =>
      currentEditor && {
        isBold: currentEditor.isActive('bold'),
        isItalic: currentEditor.isActive('italic'),
        isStrike: currentEditor.isActive('strike'),
        isCode: currentEditor.isActive('code'),
        isLink: currentEditor.isActive('link'),
        isH1: currentEditor.isActive('heading', { level: 1 }),
        isH2: currentEditor.isActive('heading', { level: 2 }),
        isQuote: currentEditor.isActive('blockquote'),
        isHighlight: currentEditor.isActive('highlight'),
        linkHref: (currentEditor.getAttributes('link').href as string) ?? '',
        highlightColor: currentEditor.getAttributes('highlight').color as string | undefined,
      },
  })

  // A new selection always starts back on the format bar.
  useEffect(() => {
    if (!editor) return

    const resetMode = () => setMode('format')

    editor.on('selectionUpdate', resetMode)
    return () => {
      editor.off('selectionUpdate', resetMode)
    }
  }, [editor])

  if (!editor || !marks) return null

  const handleApplyLink = (url: string) => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setMode('format')
  }

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setMode('format')
  }

  const handleSelectHighlight = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run()
    setMode('format')
  }

  const handleClearHighlight = () => {
    editor.chain().focus().unsetHighlight().run()
    setMode('format')
  }

  const isLinkMode = mode === 'link'
  const isHighlightMode = mode === 'highlight'

  return (
    <BubbleMenu
      editor={editor}
      // Only over real text selections — never a selected block like the divider.
      shouldShow={({ state }) => !state.selection.empty && !isNodeSelection(state.selection)}
      className='relative flex items-center gap-px rounded-(--radius-button) bg-(--espresso-800) p-[6px] shadow-(--shadow-pop)'
    >
      {isLinkMode ? (
        <LinkInput
          initialUrl={marks.linkHref}
          onApply={handleApplyLink}
          onRemove={handleRemoveLink}
          onCancel={() => setMode('format')}
        />
      ) : (
        <>
          <button
            type='button'
            aria-label='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${markStyles} text-[15px] font-bold ${marks.isBold ? activeStyles : ''}`}
          >
            B
          </button>
          <button
            type='button'
            aria-label='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${markStyles} text-[16px] italic ${marks.isItalic ? activeStyles : ''}`}
          >
            i
          </button>
          <button
            type='button'
            aria-label='Strikethrough'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${markStyles} text-[15px] line-through ${marks.isStrike ? activeStyles : ''}`}
          >
            S
          </button>
          <button
            type='button'
            aria-label='Inline code'
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`${blockStyles} tracking-[0.06em] ${marks.isCode ? activeStyles : ''}`}
          >
            &lt;/&gt;
          </button>

          <span className={dividerStyles} />

          <button
            type='button'
            aria-label='Link'
            onClick={() => setMode('link')}
            className={`${blockStyles} tracking-[0.12em] ${marks.isLink ? activeStyles : ''}`}
          >
            LINK
          </button>

          <span className={dividerStyles} />

          <button
            type='button'
            aria-label='Heading 1'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${blockStyles} ${marks.isH1 ? activeStyles : ''}`}
          >
            H1
          </button>
          <button
            type='button'
            aria-label='Heading 2'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${blockStyles} ${marks.isH2 ? activeStyles : ''}`}
          >
            H2
          </button>
          <button
            type='button'
            aria-label='Quote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${itemStyles} font-display text-[16px] px-[9px] py-[2px] ${marks.isQuote ? activeStyles : ''}`}
          >
            ❝
          </button>

          <span className={dividerStyles} />

          <button
            type='button'
            aria-label='Highlight'
            onClick={() => setMode(isHighlightMode ? 'format' : 'highlight')}
            style={{ background: marks.highlightColor ?? 'var(--marigold-300)' }}
            className={`mx-2 size-[15px] shrink-0 rounded-[3px] cursor-pointer transition-shadow ${
              marks.isHighlight || isHighlightMode
                ? 'shadow-[0_0_0_2px_var(--marigold-500)]'
                : 'shadow-[0_0_0_1px_rgba(243,234,217,0.25)]'
            }`}
          />

          {isHighlightMode && (
            <HighlightPopover
              activeColor={marks.highlightColor}
              onSelect={handleSelectHighlight}
              onClear={handleClearHighlight}
            />
          )}
        </>
      )}
    </BubbleMenu>
  )
}

export default SelectionToolbar
