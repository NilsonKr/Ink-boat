'use client'
import { useEffect, useState } from 'react'
import type { Editor } from '@tiptap/react'

type ComponentProps = {
  editor: Editor | null
}

type CaretRect = {
  left: number
  top: number
  height: number
}

const Caret: React.FC<ComponentProps> = ({ editor }) => {
  const [rect, setRect] = useState<CaretRect | null>(null)

  useEffect(() => {
    if (!editor) return

    const syncPosition = () => {
      const { state, view } = editor
      const { selection } = state

      if (!view.hasFocus() || !selection.empty) return setRect(null)

      const coords = view.coordsAtPos(selection.head)
      const editorBox = view.dom.getBoundingClientRect()

      // Viewport coords → offsets inside the relative wrapper the caret lives in.
      const editorDom = view.dom as HTMLElement

      setRect({
        left: coords.left - editorBox.left + editorDom.offsetLeft,
        top: coords.top - editorBox.top + editorDom.offsetTop,
        height: coords.bottom - coords.top,
      })
    }

    const hideCaret = () => setRect(null)

    editor.on('transaction', syncPosition)
    editor.on('selectionUpdate', syncPosition)
    editor.on('focus', syncPosition)
    editor.on('blur', hideCaret)
    window.addEventListener('resize', syncPosition)

    syncPosition()

    return () => {
      editor.off('transaction', syncPosition)
      editor.off('selectionUpdate', syncPosition)
      editor.off('focus', syncPosition)
      editor.off('blur', hideCaret)
      window.removeEventListener('resize', syncPosition)
    }
  }, [editor])

  if (!rect) return null

  return (
    <span
      aria-hidden
      className='editor-caret'
      style={{ left: rect.left, top: rect.top, height: rect.height }}
    />
  )
}

export default Caret
