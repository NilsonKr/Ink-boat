import type { StatusMeta, DraftStatus } from '@/types/drafts'

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

export const formatWords = (words: number): string =>
  `${words.toLocaleString('en-US')} words`

export const readingTime = (words: number): string =>
  `${Math.max(1, Math.ceil(words / 250))} min`
