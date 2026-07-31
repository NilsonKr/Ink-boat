'use client'
import { useRef, useState } from 'react'

import { EDITOR_COPY } from '@/lib/constants/editor'

type ComponentProps = {
  initialBody?: string
  onSave: (body: string) => void
  onCancel: () => void
}

const NoteComposer: React.FC<ComponentProps> = ({ initialBody = '', onSave, onCancel }) => {
  const { panel } = EDITOR_COPY

  const [body, setBody] = useState<string>(initialBody)

  // Saving unmounts this composer, which can fire blur on the way out — the
  // latch keeps that from committing the note a second time.
  const isClosed = useRef<boolean>(false)

  const handleSave = () => {
    if (isClosed.current) return

    isClosed.current = true

    const trimmed = body.trim()

    if (trimmed) onSave(trimmed)
    else onCancel()
  }

  const handleCancel = () => {
    if (isClosed.current) return

    isClosed.current = true
    onCancel()
  }

  // Plain Enter has to stay a newline — notes are prose, not single-line input.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      handleSave()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      handleCancel()
    }
  }

  return (
    <div className='mb-[14px] rounded-(--radius-card) border border-(--line) bg-(--paper-0) px-4 py-[14px] shadow-(--shadow-card)'>
      <textarea
        autoFocus
        rows={3}
        value={body}
        placeholder={panel.notePlaceholder}
        onChange={({ target }) => setBody(target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className='
          field-sizing-content w-full resize-none border-none bg-transparent outline-none
          font-display text-[14px] italic leading-[1.5] text-(--text-body-color)
          placeholder:text-(--text-label-color)
        '
      />
      <p className='mt-2 font-mono text-[8.5px] uppercase tracking-[0.1em] text-(--text-label-color)'>
        {panel.saveHint}
      </p>
    </div>
  )
}

export default NoteComposer
