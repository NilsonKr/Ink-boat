'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import type { Note } from '@/types/notes'

export const createNoteAction = async (draftSlug: string, body: string): Promise<Note | null> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  // Resolving the draft through the session scopes the write — a slug the user
  // doesn't own simply finds nothing to attach the note to.
  const draft = await prisma.draft.findUnique({
    where: { publicId: draftSlug, userId: session.user.id },
    select: { id: true },
  })

  if (!draft) return null

  return prisma.note.create({
    data: { body, draftId: draft.id },
    select: { publicId: true, body: true },
  })
}

export const updateNoteAction = async (publicId: string, body: string): Promise<Note | null> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const notes = await prisma.note.updateManyAndReturn({
    where: { publicId, draft: { userId: session.user.id } },
    data: { body },
    select: { publicId: true, body: true },
  })

  return notes[0] ?? null
}

export const deleteNoteAction = async (publicId: string): Promise<boolean> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const { count } = await prisma.note.deleteMany({
    where: { publicId, draft: { userId: session.user.id } },
  })

  return count > 0
}
