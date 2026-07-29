import type { EditorCopy } from '@/types/drafts'
import type { PanelTab } from '@/types/notes'

export const PANEL_TABS: { key: PanelTab; label: string; icon?: string }[] = [
  { key: 'suggestions', label: 'Suggestions', icon: '✦' },
  { key: 'notes', label: 'Notes' },
]

/** Blocks offered by the insert rail on an empty line. */
export const INSERT_BLOCKS: { name: string; icon: string; iconFont: 'display' | 'mono' }[] = [
  { name: 'Image', icon: '✦', iconFont: 'display' },
  { name: 'Quote', icon: '❝', iconFont: 'display' },
  { name: 'Divider', icon: '—', iconFont: 'display' },
  { name: 'Code', icon: '</>', iconFont: 'mono' },
  { name: 'Embed', icon: '⌗', iconFont: 'display' },
]

export const EDITOR_COPY: EditorCopy = {
  navbar: {
    markLabel: 'Ink boat',
    stories: 'Stories',
    untitled: 'Untitled draft',
    saved: 'Saved',
    saving: 'Saving…',
    publish: 'Publish →',
  },
  contents: {
    heading: 'Contents',
    hint: 'Auto · from headings',
    untitled: 'Untitled section',
    empty: 'Headings you add appear here',
  },
  panel: {
    suggestionsStub: 'The margin is quiet for now.',
    noteEyebrow: 'Note · You',
    addNote: '＋ Note',
    emptyNotes: 'Nothing in the margin yet.',
    notePlaceholder: 'A thought about this draft…',
    saveHint: '⌘ ↵ to save · esc to cancel',
    needsDraft: 'Write something first — notes attach to a saved draft',
    remove: 'Remove',
  },
}
