export type Note = {
  publicId: string
  body: string
}

export type OptimisticNote = Note & { isPending?: boolean }

export type PanelTab = 'suggestions' | 'notes'
