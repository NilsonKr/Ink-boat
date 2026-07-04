export type DraftStatus = 'draft' | 'published' | 'archived'

export type Draft = {
  publicId: string
  title: string
  description: string
  status: DraftStatus
  updatedAt: Date
  words?: number
  readTime?: string
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

export type DraftMetadata = {
  title: string
  description: string
}
