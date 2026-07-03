'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { JSONContent } from '@tiptap/react'
import type { Prisma } from '@/lib/db/generated/client'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import type { Draft, DraftStatus } from '@/types/drafts'

export const saveDraftAction = async (json: JSONContent) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const draft = await prisma.draft.create({
    data: {
      title: 'The Quiet Architecture of Mornings',
      description: 'What waking before dawn taught me about attention.',
      content: json as Prisma.InputJsonValue,
      userId: session.user.id,
    },
    select: { publicId: true, updatedAt: true },
  })

  return draft
}

export const getDraftListAction = async (): Promise<Draft[]> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const drafts = await prisma.draft.findMany({
    where: { userId: session.user.id },
    select: {
      publicId: true,
      title: true,
      description: true,
      status: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  return drafts.map((draft) => ({
    ...draft,
    status: draft.status.toLowerCase() as DraftStatus,
  }))
}

export const getDraftAction = async (slug: string) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const drafts = await prisma.draft.findUnique({
    where: { publicId: slug, userId: session.user.id, },
    select: {
      publicId: true,
      title: true,
      description: true,
      status: true,
      content: true,
      updatedAt: true,
    }
  })

  return drafts
}

