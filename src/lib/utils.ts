import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Content, JSONContent, Editor as TiptapEditor } from '@tiptap/react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null

  function debounced(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }

  return debounced
}

/** Coarse relative time for a panel eyebrow. It reads at render, so it needs no timer. */
export const formatAgo = (timestamp: number): string => {
  const seconds = Math.max(Math.round((Date.now() - timestamp) / 1000), 0)

  if (seconds < 60) return `${seconds}s ago`

  const minutes = Math.round(seconds / 60)

  return minutes < 60 ? `${minutes}m ago` : `${Math.round(minutes / 60)}h ago`
}

// TIPTAP EDITOR

/**
 * ProseMirror builds node/mark `attrs` with `Object.create(null)`, and React refuses to
 * serialize null-prototype objects into a server action — it sends an opaque temporary
 * reference instead, which blows up server-side ("Cannot access toStringTag on the server").
 * Only nodes/marks that carry attrs are affected (link, heading, highlight), so re-parsing
 * the document gives every object a plain prototype before it crosses the boundary.
 */
export const getSerializableContent = (editor: TiptapEditor): Content =>
  JSON.parse(JSON.stringify(editor.getJSON())) as Content

export const isEmptyParagraph = (node: JSONContent) =>
  node.type === 'paragraph' && !node.content?.length

/**
 * Drafts saved while StarterKit's trailing-node plugin was on carry empty paragraphs it
 * appended after every non-paragraph block. Dropping them on load makes the editable
 * surface end where the writing ends, so there is no dead block left to click into.
 */
export const trimTrailingEmptyParagraphs = (content?: Content | null): Content => {
  const doc = content as JSONContent | null | undefined

  if (!doc?.content?.length) return content ?? ''

  const blocks = [...doc.content]

  // The schema needs at least one block, so the first one always stays.
  while (blocks.length > 1 && isEmptyParagraph(blocks[blocks.length - 1])) blocks.pop()

  return { ...doc, content: blocks }
}
