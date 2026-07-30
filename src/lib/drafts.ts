import type { JSONContent } from '@tiptap/react'

import { HERO_EXCERPT_LENGTH } from '@/lib/constants/drafts'

export const formatWords = (words: number): string =>
  `${words.toLocaleString('en-US')} words`

export const readingTime = (words: number): string =>
  `${Math.max(1, Math.ceil(words / 250))} min`

/** Relative label for recent edits, calendar date past a week — "2h ago", "Yesterday", "Jun 18". */
export const formatEditedAt = (date: Date): string => {
  const hours = Math.floor((Date.now() - date.getTime()) / 3_600_000)

  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)

  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const nodeText = (node: JSONContent): string =>
  node.text ?? (node.content ?? []).map(nodeText).join('')

/**
 * First paragraph that carries text, cut on a word boundary. Headings and block nodes are
 * skipped so the preview reads as prose rather than as the title repeated.
 */
export const excerptFromContent = (
  content?: unknown,
  limit: number = HERO_EXCERPT_LENGTH
): string => {
  const doc = content as JSONContent | null | undefined

  const paragraph = doc?.content?.find(
    (node) => node.type === 'paragraph' && nodeText(node).trim().length > 0
  )

  if (!paragraph) return ''

  const text = nodeText(paragraph).trim().replace(/\s+/g, ' ')

  if (text.length <= limit) return text

  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')

  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?—-]$/, '')}…`
}
