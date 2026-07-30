'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Content } from '@tiptap/react'
import type { Prisma } from '@/lib/db/generated/client'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import type { Draft, DraftMetadata } from '@/types/drafts'

export const getDraftListAction = async (): Promise<Draft[]> => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  return prisma.draft.findMany({
    where: { userId: session.user.id },
    select: {
      publicId: true,
      title: true,
      description: true,
      status: true,
      updatedAt: true,
      wordCount: true,
    },
    orderBy: { updatedAt: 'desc' },
  })
}

/** Content only — the hero preview needs one draft's prose, not the whole list's documents. */
export const getDraftContentAction = async (publicId: string) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const draft = await prisma.draft.findUnique({
    where: { publicId, userId: session.user.id },
    select: { content: true },
  })

  return draft?.content ?? null
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
      wordCount: true,
      // Ascending: the panel's "+ Note" affordance sits under the stack, so new notes append there.
      notes: {
        select: { publicId: true, body: true },
        orderBy: { createdAt: 'asc' },
      },
    }
  })

  return drafts
}


export const saveDraftAction = async (json: Content, metadata?: DraftMetadata, wordCount?: number) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const draft = await prisma.draft.create({
    data: {
      ...(json ? { content: json as Prisma.InputJsonValue } : {}),
      ...(metadata ? metadata : {}),
      ...(wordCount !== undefined ? { wordCount } : {}),
      userId: session.user.id,
    },
    select: { publicId: true },
  })

  return draft
}

export const updateDraftAction = async (slug: string, json: Content, metadata?: DraftMetadata, wordCount?: number) => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) return redirect('/login')

  const draft = await prisma.draft.update({
    where: { publicId: slug, userId: session.user.id },
    data: {
      ...(json ? { content: json as Prisma.InputJsonValue } : {}),
      ...(metadata ? metadata : {}),
      ...(wordCount !== undefined ? { wordCount } : {}),
    },
    select: { publicId: true },
  })

  return draft
}

