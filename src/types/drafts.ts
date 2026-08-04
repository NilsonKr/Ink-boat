export type { DraftStatus } from '@/lib/db/generated/enums'

import type { DraftStatus } from '@/lib/db/generated/enums'

export type Draft = {
  publicId: string
  title: string
  description: string
  status: DraftStatus
  updatedAt: Date
  wordCount: number
}

export type StatusMeta = {
  label: string
  color: string
  tint: string
}

export type DraftsFilter = 'ALL' | DraftStatus

export type DraftsFilterTab = {
  key: DraftsFilter
  label: string
}

export type DraftRowCopy = {
  share: string
  shareCopied: string
  menuTrigger: string
  copyLink: string
  publish: string
  settings: string
  remove: string
}

export type DraftsHeroCopy = {
  publication: string
  navStories: string
  navExplore: string
  navExploreBadge: string
  editedPrefix: string
  cta: string
  emptyTitle: string
  emptyExcerpt: string
  emptyCta: string
}

export type DraftsCopy = {
  eyebrow: string
  heading: string
  subtitle: string
  newDraft: string
  filters: Record<DraftsFilter, string>
  hero: DraftsHeroCopy
}

export type DraftMetadata = {
  title: string
  description: string
}

export type SaveStatus = 'saved' | 'dirty' | 'saving' | 'error'

export type EditorCopy = {
  navbar: {
    markLabel: string
    stories: string
    untitled: string
    saved: string
    saving: string
    publish: string
  }
  contents: {
    heading: string
    hint: string
    untitled: string
    empty: string
  }
  providerSetup: {
    eyebrow: string
    mark: string
    heading: string
    intro: string
    providerLabel: string
    providerHint: string
    keyNameLabel: string
    keyNameHint: string
    apiKeyLabel: string
    reveal: string
    hide: string
    keyHint: string
    connect: string
    connectIcon: string
    connecting: string
    cancel: string
    connectedManage: string
  }
  suggestions: {
    mark: string
    panelHeading: string
    panelMode: string
    keyPrefix: string
    keyMask: string
    emptyHeading: string
    emptyBody: string
    steps: string[]
    resultsEyebrow: string
    pinnedPrefix: string
    weaveIn: string
    wovenBadge: string
    wovenInto: string
    undo: string
    moreSuffix: string
    rerunIcon: string
    noSelection: string
    wordsSuffix: string
    runSuggestions: string
    modeMenuHeading: string
    dockSwitchIcon: string
    dockSuggest: string
    dockAsk: string
    askPlaceholder: string
    askShortcut: string
    modelLabel: string
  }
  panel: {
    noteEyebrow: string
    addNote: string
    emptyNotes: string
    notePlaceholder: string
    saveHint: string
    needsDraft: string
    remove: string
  }
}
