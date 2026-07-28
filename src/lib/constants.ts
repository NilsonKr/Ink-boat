//AUTH

export const AUTH_ROUTES = ['/login', '/register', '/recovery-password']

export const PUBLIC_ROUTES = ['/', ...AUTH_ROUTES]

//EDITOR

import type { PanelTab } from '@/types/notes'

export const HIGHLIGHT_COLORS: { name: string; value: string }[] = [
  { name: 'marigold', value: '#f1cf6f' },
  { name: 'plum', value: '#ead8e0' },
  { name: 'sage', value: '#cfe0c9' },
  { name: 'sky', value: '#d6e2ec' },
]

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
