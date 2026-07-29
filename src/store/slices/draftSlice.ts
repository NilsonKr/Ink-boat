import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Content } from '@tiptap/react'

import type { DraftMetadata, DraftStatus, SaveStatus } from '@/types/drafts'

type DraftState = {
  publicId: string | null
  title: string
  description: string
  status: DraftStatus | null
  wordCount: number
  saveStatus: SaveStatus
  /**
   * Payload for the next save, not a copy of the ProseMirror document. It holds
   * only what the autosave listener still has to send, so a metadata edit that
   * lands inside the debounce window cannot drop a pending content change.
   */
  pendingContent: Content | null
  /** Increases on every local edit. The listener uses it to tell if the save it finished is still the latest one. */
  revision: number
}

export type DraftSeed = {
  publicId?: string | null
  title?: string | null
  description?: string | null
  status?: DraftStatus | null
  wordCount?: number | null
}

const initialState: DraftState = {
  publicId: null,
  title: '',
  description: '',
  status: null,
  wordCount: 0,
  saveStatus: 'saved',
  pendingContent: null,
  revision: 0,
}

/** Turns the draft a server component loaded into a full slice state, for `makeStore`. */
export const getPreloadedDraftState = (seed: DraftSeed = {}): DraftState => ({
  ...initialState,
  publicId: seed.publicId ?? null,
  title: seed.title ?? '',
  description: seed.description ?? '',
  status: seed.status ?? null,
  wordCount: seed.wordCount ?? 0,
})

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    draftHydrated: (_state, { payload }: PayloadAction<DraftSeed>) => getPreloadedDraftState(payload),

    /**
     * The count Tiptap reports for the loaded document. It touches neither `saveStatus`
     * nor `revision`, so opening a draft never queues a save — the stored count can lag
     * behind the document, but the user has not edited anything yet.
     */
    wordCountMeasured: (state, { payload }: PayloadAction<number>) => {
      state.wordCount = payload
    },

    contentChanged: (state, { payload }: PayloadAction<{ json: Content; wordCount: number }>) => {
      state.pendingContent = payload.json
      state.wordCount = payload.wordCount
      state.saveStatus = 'dirty'
      state.revision += 1
    },

    metadataChanged: (state, { payload }: PayloadAction<{ key: keyof DraftMetadata; value: string }>) => {
      state[payload.key] = payload.value
      state.saveStatus = 'dirty'
      state.revision += 1
    },

    draftCreated: (state, { payload }: PayloadAction<{ publicId: string }>) => {
      state.publicId = payload.publicId
    },

    saveStarted: state => {
      state.saveStatus = 'saving'
    },

    saveSucceeded: (state, { payload }: PayloadAction<{ revision: number }>) => {
      // A newer edit arrived while the request was in flight, so the draft stays dirty
      // and its pending content waits for the run that the new edit already scheduled.
      if (payload.revision !== state.revision) return

      state.pendingContent = null
      state.saveStatus = 'saved'
    },

    saveFailed: state => {
      state.saveStatus = 'error'
    },

    draftReset: () => initialState,
  },
  selectors: {
    selectDraft: state => state,
    selectDraftSlug: state => state.publicId,
    selectSaveStatus: state => state.saveStatus,
    selectWordCount: state => state.wordCount,
    selectTitle: state => state.title,
    selectDescription: state => state.description,
  },
})

export const {
  draftHydrated,
  wordCountMeasured,
  contentChanged,
  metadataChanged,
  draftCreated,
  saveStarted,
  saveSucceeded,
  saveFailed,
  draftReset,
} = draftSlice.actions

export const {
  selectDraft,
  selectDraftSlug,
  selectSaveStatus,
  selectWordCount,
  selectTitle,
  selectDescription,
} = draftSlice.selectors

export default draftSlice
