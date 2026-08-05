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
    mark: '¶',
    panelHeading: 'AI Suggestions',
    panelMode: 'On demand',
    keyPrefix: 'Key',
    keyMask: '····',
    emptyHeading: 'Nothing suggested yet',
    emptyBody:
      'Select a passage, pick a mode, and run — takes appear here and stay pinned to that selection.',
    steps: ['Select text in the galley', 'Choose a mode, then run', 'Weave the take you like'],
    resultsEyebrow: 'Suggestions',
    pinnedPrefix: 'For',
    weaveIn: 'Weave in →',
    wovenBadge: '✓ Woven in',
    wovenInto: 'Woven into',
    undo: 'Undo',
    moreSuffix: 'more for',
    rerunIcon: '↻',
    runningIcon: '⋯',
    noSelection: 'No selection yet',
    wordsSuffix: 'w',
    runSuggestions: 'Run suggestions',
    modeMenuHeading: 'Suggestion mode',
    dockSwitchIcon: '⇄',
    dockSuggest: 'Suggest from selection',
    dockAsk: 'Ask about suggestions',
    askPlaceholder: 'Why this take? Ask anything…',
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
