'use client'
import NoteComposer from '@/components/Editor/SidePanel/NotesTab/NoteComposer'

import { EDITOR_COPY } from '@/lib/constants/editor'

import type { Note } from '@/types/notes'

type ComponentProps = {
  note: Note
  isEditing: boolean
  isPending: boolean
  onEdit: () => void
  onSave: (body: string) => void
  onCancel: () => void
  onDelete: () => void
}

const NoteCard: React.FC<ComponentProps> = ({
  note,
  isEditing,
  isPending,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { panel } = EDITOR_COPY

  if (isEditing) {
    return <NoteComposer initialBody={note.body} onSave={onSave} onCancel={onCancel} />
  }

  return (
    <article
      onClick={isPending ? undefined : onEdit}
      className={`
        group mb-[14px] rounded-(--radius-card) border border-(--line) bg-(--paper-0)
        px-4 py-[14px] shadow-(--shadow-card) transition-opacity
        ${isPending ? 'opacity-55' : 'cursor-text'}
      `}
    >
      <div className='mb-2 flex items-center justify-between'>
        <span className='font-mono text-[9px] uppercase tracking-[0.1em] text-(--text-label-color)'>
          {panel.noteEyebrow}
        </span>
        {!isPending && (
          <button
            type='button'
            aria-label={panel.remove}
            onClick={event => {
              event.stopPropagation()
              onDelete()
            }}
            className='cursor-pointer font-mono text-[11px] leading-none text-(--text-label-color) opacity-0 transition-opacity group-hover:opacity-100 hover:text-(--plum-500)'
          >
            ✕
          </button>
        )}
      </div>

      <p className='whitespace-pre-wrap font-display text-[14px] italic leading-[1.5] text-(--text-body-color)'>
        {note.body}
      </p>
    </article>
  )
}

export default NoteCard
