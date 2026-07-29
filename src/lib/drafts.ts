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
