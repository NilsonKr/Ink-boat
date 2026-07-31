import type { EditorCopy } from '@/types/drafts'
import type { PanelTab } from '@/types/notes'

/** Idle time in ms before the autosave listener sends the draft. */
export const AUTOSAVE_DELAY = 1000

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
  providerSetup: {
    eyebrow: 'Setup',
    mark: '✦',
    heading: 'AI Suggestions',
    intro: 'A collaborator on the page. Add a key to begin.',
    providerLabel: 'AI provider',
    providerHint: 'More providers coming soon',
    keyNameLabel: 'Key name',
    keyNameHint: 'A label so you can tell keys apart later.',
    apiKeyLabel: 'API key',
    reveal: 'Show',
    hide: 'Hide',
    keyHint: 'Get a key from',
    connect: 'Connect provider',
    connectIcon: '✦ →',
    connecting: 'Checking the key…',
    cancel: 'Cancel',
    connectedManage: 'Manage',
  },
  suggestions: {
    emptyHeading: 'Nothing suggested yet',
    emptyBody:
      'Select a passage in the draft, then get suggestions on it — takes appear here and stay pinned to that selection.',
    steps: ['Select text in the galley', 'Get suggestions on it', 'Weave the take you like'],
    noSelection: 'No selection yet',
    waitingSelection: 'Waiting for a selection…',
    askPlaceholder: 'Ask about the draft…',
    askShortcut: '⌘↵',
    modelLabel: 'Model',
  },
  panel: {
    noteEyebrow: 'Note · You',
    addNote: '＋ Note',
    emptyNotes: 'Nothing in the margin yet.',
    notePlaceholder: 'A thought about this draft…',
    saveHint: '⌘ ↵ to save · esc to cancel',
    needsDraft: 'Write something first — notes attach to a saved draft',
    remove: 'Remove',
  },
}
