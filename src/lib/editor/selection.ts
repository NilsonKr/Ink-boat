import { EDITOR_COPY } from '@/lib/constants/editor'

import type { Editor } from '@tiptap/react'

import type { EditorSelection, SuggestionContext } from '@/types/suggestions'

/**
 * Blocks that carry prose. A divider or an image is skipped, so inserting one never
 * renumbers the marks the panel already showed.
 */
const TEXT_BLOCKS = new Set(['paragraph', 'heading', 'blockquote', 'codeBlock'])

const EXCERPT_LIMIT = 15

/** Per side of the passage. Keeps one long chapter from filling the request. */
const CONTEXT_LIMIT = 600

type TextBlock = {
  /** Order among text blocks only — what the `¶n` mark counts. */
  index: number
  /** Position of the node itself, so `from` sits in `[from, to)`. */
  from: number
  to: number
}

const countWords = (text: string): number => text.split(/\s+/).filter(Boolean).length

const truncate = (text: string, limit: number): string =>
  text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text

/** Keeps the tail, which is the part nearest the passage. */
const truncateStart = (text: string, limit: number): string =>
  text.length > limit ? `…${text.slice(-limit).trimStart()}` : text

const getTextBlocks = (editor: Editor): TextBlock[] => {
  const blocks: TextBlock[] = []

  editor.state.doc.forEach((node, offset) => {
    if (!TEXT_BLOCKS.has(node.type.name)) return

    blocks.push({ index: blocks.length, from: offset, to: offset + node.nodeSize })
  })

  return blocks
}

const findBlockAt = (blocks: TextBlock[], pos: number): TextBlock | undefined =>
  blocks.find(block => pos >= block.from && pos < block.to)

/**
 * The selection as the panel needs it. `null` covers an empty caret and a node selection
 * such as the divider, because neither yields text between the two positions.
 */
export const getDraftSelection = (editor: Editor): EditorSelection | null => {
  const { from, to } = editor.state.selection

  const selected = editor.state.doc.textBetween(from, to, ' ').trim()

  if (!selected) return null

  const block = findBlockAt(getTextBlocks(editor), from)

  return {
    mark: `${EDITOR_COPY.suggestions.mark}${block ? block.index + 1 : ''}`,
    excerpt: truncateStart(selected, EXCERPT_LIMIT),
    wordCount: countWords(selected),
    from,
    to,
  }
}

/**
 * The passage with the prose around it. The model needs the run-up and the run-out to match
 * the voice, so a take reads as a replacement rather than as a fragment on its own.
 */
export const getSelectionContext = (editor: Editor): SuggestionContext | null => {
  const { doc, selection } = editor.state
  const { from, to } = selection

  const selected = doc.textBetween(from, to, ' ').trim()

  if (!selected) return null

  const blocks = getTextBlocks(editor)

  const startBlock = findBlockAt(blocks, from)
  const endBlock = findBlockAt(blocks, to) ?? startBlock

  const before = [
    startBlock && blocks[startBlock.index - 1],
    startBlock && { from: startBlock.from, to: from },
  ]
    .map(range => (range ? doc.textBetween(range.from, range.to, ' ').trim() : ''))
    .filter(Boolean)
    .join('\n\n')

  const after = [
    endBlock && { from: to, to: endBlock.to },
    endBlock && blocks[endBlock.index + 1],
  ]
    .map(range => (range ? doc.textBetween(range.from, range.to, ' ').trim() : ''))
    .filter(Boolean)
    .join('\n\n')

  return {
    before: truncateStart(before, CONTEXT_LIMIT),
    selected,
    after: truncate(after, CONTEXT_LIMIT),
  }
}
