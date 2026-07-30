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

export type DraftRowCopy = {
  share: string
  shareCopied: string
  menuTrigger: string
  copyLink: string
  publish: string
  settings: string
  remove: string
}

export type DraftsHeroCopy = {
  publication: string
  navStories: string
  navExplore: string
  navExploreBadge: string
  editedPrefix: string
  cta: string
  emptyTitle: string
  emptyExcerpt: string
  emptyCta: string
}

export type DraftsCopy = {
  eyebrow: string
  heading: string
  subtitle: string
  newDraft: string
  filters: Record<DraftsFilter, string>
  hero: DraftsHeroCopy
}

export type DraftMetadata = {
  title: string
  description: string
}

export type SaveStatus = 'saved' | 'dirty' | 'saving' | 'error'

export type EditorCopy = {
  navbar: {
    markLabel: string
    stories: string
    untitled: string
    saved: string
    saving: string
    publish: string
  }
  contents: {
    heading: string
    hint: string
    untitled: string
    empty: string
  }
  panel: {
    suggestionsStub: string
    noteEyebrow: string
    addNote: string
    emptyNotes: string
    notePlaceholder: string
    saveHint: string
    needsDraft: string
    remove: string
  }
}
