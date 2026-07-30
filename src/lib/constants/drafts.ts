import type { StatusMeta, DraftStatus, DraftsCopy, DraftRowCopy } from '@/types/drafts'

/** Character budget for the hero preview — the excerpt sits in a 52ch column. */
export const HERO_EXCERPT_LENGTH = 160

/** How long the Share button holds its "Copied" label after a successful write. */
export const COPIED_FEEDBACK_DELAY = 1800

export const DRAFT_ROW_COPY: DraftRowCopy = {
  share: 'Share',
  shareCopied: 'Copied',
  menuTrigger: 'Draft actions',
  copyLink: 'Copy link',
  publish: 'Publish',
  settings: 'Settings',
  remove: 'Delete draft',
}

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
    navExplore: 'Explore',
    navExploreBadge: 'Coming soon',
    editedPrefix: 'Freshest ink · Edited',
    cta: 'Keep writing →',
    emptyTitle: 'Nothing on the desk yet.',
    emptyExcerpt: 'Your freshest draft surfaces here once you start writing.',
    emptyCta: 'Start writing →',
  },
}
