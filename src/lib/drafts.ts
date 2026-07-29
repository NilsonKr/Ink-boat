export const formatWords = (words: number): string =>
  `${words.toLocaleString('en-US')} words`

export const readingTime = (words: number): string =>
  `${Math.max(1, Math.ceil(words / 250))} min`
