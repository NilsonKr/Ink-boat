export type { DraftStatus } from '@/lib/db/generated/enums'

import type { DraftStatus } from '@/lib/db/generated/enums'

export type Draft = {
  publicId: string
  title: string
  description: string
  status: DraftStatus
  updatedAt: Date
  wordCount: number
}

export type StatusMeta = {
  label: string
  color: string
  tint: string
}

export type DraftsFilter = 'ALL' | DraftStatus

export type DraftsFilterTab = {
  key: DraftsFilter
  label: string
}

export type DraftsCopy = {
  eyebrow: string
  heading: string
  subtitle: string
  newDraft: string
  filters: Record<DraftsFilter, string>
}

export type DraftMetadata = {
  title: string
  description: string
}

export type EditorCopy = {
  navbar: {
    markLabel: string
    stories: string
    untitled: string
    saved: string
    saving: string
    publish: string
  }
}
