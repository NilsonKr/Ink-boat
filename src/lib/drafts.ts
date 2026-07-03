import type { StatusMeta, DraftStatus } from '@/types/drafts'

export const STATUS_META: Record<DraftStatus, StatusMeta> = {
  draft: {
    label: 'Draft',
    color: 'var(--status-draft)',
    tint: 'var(--status-draft-tint)',
  },
  published: {
    label: 'Published',
    color: 'var(--status-published)',
    tint: 'var(--status-published-tint)',
  },
  archived: {
    label: 'Archived',
    color: 'var(--status-archived)',
    tint: 'var(--status-archived-tint)',
  },
}

export const formatWords = (words: number): string =>
  `${words.toLocaleString('en-US')} words`
