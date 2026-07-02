export type DraftStatus = 'draft' | 'published' | 'scheduled'

export type Draft = {
  id: string
  title: string
  excerpt: string
  status: DraftStatus
  words: number
  readTime: string
  editedAt: string
}

export type StatusMeta = {
  label: string
  color: string
  tint: string
}

export type DraftsFilter = 'all' | DraftStatus

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
