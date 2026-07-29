import type { StatusMeta, DraftStatus, DraftsCopy } from '@/types/drafts'

export const STATUS_META: Record<DraftStatus, StatusMeta> = {
  DRAFT: {
    label: 'Draft',
    color: 'var(--status-draft)',
    tint: 'var(--status-draft-tint)',
  },
  PUBLISHED: {
    label: 'Published',
    color: 'var(--status-published)',
    tint: 'var(--status-published-tint)',
  },
  ARCHIVED: {
    label: 'Archived',
    color: 'var(--status-archived)',
    tint: 'var(--status-archived-tint)',
  },
}

export const DRAFTS_COPY: DraftsCopy = {
  eyebrow: 'Your desk',
  heading: 'Drafts',
  subtitle: "Everything you're writing, in one place.",
  newDraft: 'New draft',
  filters: {
    ALL: 'All',
    DRAFT: 'Drafts',
    PUBLISHED: 'Published',
    ARCHIVED: 'Archived',
  },
  hero: {
    publication: 'Your Publication',
    navStories: 'Stories',
    navRead: 'Read',
    editedPrefix: 'Freshest ink · Edited',
    cta: 'Keep writing →',
    emptyTitle: 'Nothing on the desk yet.',
    emptyExcerpt: 'Your freshest draft surfaces here once you start writing.',
    emptyCta: 'Start writing →',
  },
}
