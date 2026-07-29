'use client'
import { startTransition, useOptimistic, useState } from 'react'

import { createNoteAction, deleteNoteAction, updateNoteAction } from '@/actions/notes'

import NoteCard from '@/components/Editor/SidePanel/NoteCard'
import NoteComposer from '@/components/Editor/SidePanel/NoteComposer'

import { EDITOR_COPY } from '@/lib/copy'

import type { Note, OptimisticNote } from '@/types/notes'

type ComponentProps = {
  draftSlug?: string | null
  notes: Note[]
}

const NotesTab: React.FC<ComponentProps> = ({ draftSlug, notes: initialNotes }) => {
  const { panel } = EDITOR_COPY

  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isComposing, setIsComposing] = useState<boolean>(false)

  const [optimisticNotes, addOptimisticNote] = useOptimistic<OptimisticNote[], string>(
    notes,
    (current, body) => [...current, { publicId: crypto.randomUUID(), body, isPending: true }],
  )

  const handleCreate = (body: string) => {
    setIsComposing(false)

    if (!draftSlug) return

    // The optimistic note holds the slot until the action resolves, so the list
    // never flashes back to empty between composer close and server response.
    startTransition(async () => {
      addOptimisticNote(body)

      const note = await createNoteAction(draftSlug, body)

      if (note) setNotes(prev => [...prev, note])
    })
  }

  const handleUpdate = async (publicId: string, body: string) => {
    setEditingId(null)

    const note = await updateNoteAction(publicId, body)

    if (note) setNotes(prev => prev.map(entry => (entry.publicId === publicId ? note : entry)))
  }

  const handleDelete = async (publicId: string) => {
    const isDeleted = await deleteNoteAction(publicId)

    if (isDeleted) setNotes(prev => prev.filter(entry => entry.publicId !== publicId))
  }

  return (
    <div className='flex-1 overflow-auto px-[26px] pt-[26px] pb-8'>
      {optimisticNotes.map(note => (
        <NoteCard
          key={note.publicId}
          note={note}
          isPending={!!note.isPending}
          isEditing={note.publicId === editingId}
          onEdit={() => setEditingId(note.publicId)}
          onSave={body => handleUpdate(note.publicId, body)}
          onCancel={() => setEditingId(null)}
          onDelete={() => handleDelete(note.publicId)}
        />
      ))}

      {!optimisticNotes.length && !isComposing && (
        <p className='font-display text-[14px] italic text-(--text-label-color)'>
          {panel.emptyNotes}
        </p>
      )}

      {isComposing && <NoteComposer onSave={handleCreate} onCancel={() => setIsComposing(false)} />}

      {draftSlug ? (
        <button
          type='button'
          onClick={() => setIsComposing(true)}
          className='mt-[18px] cursor-pointer font-mono text-[10px] uppercase tracking-[0.12em] text-(--text-label-color) hover:text-(--plum-500)'
        >
          {panel.addNote}
        </button>
      ) : (
        <p className='mt-[18px] font-mono text-[9px] uppercase tracking-[0.1em] text-(--text-label-color)'>
          {panel.needsDraft}
        </p>
      )}
    </div>
  )
}

export default NotesTab
