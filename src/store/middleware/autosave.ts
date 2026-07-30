import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import { saveDraftAction, updateDraftAction } from '@/actions/drafts'

import {
  contentChanged,
  draftCreated,
  metadataChanged,
  saveFailed,
  saveStarted,
  saveSucceeded,
  selectDraft,
} from '@/store/slices/draftSlice'

import { AUTOSAVE_DELAY } from '@/lib/constants/editor'

import type { AppDispatch, RootState } from '@/store'

export const autosaveMiddleware = createListenerMiddleware()

const startAppListening = autosaveMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
  matcher: isAnyOf(contentChanged, metadataChanged),
  effect: async (_action, listenerApi) => {
    // Each edit cancels the runs still waiting, so only the newest one reaches the
    // server. This replaces a debounce closure that had to be rebuilt on render
    // whenever the draft id changed, and it can never hold a stale id.
    listenerApi.cancelActiveListeners()
    await listenerApi.delay(AUTOSAVE_DELAY)

    const { publicId, title, description, wordCount, pendingContent, revision } = selectDraft(
      listenerApi.getState(),
    )

    listenerApi.dispatch(saveStarted())

    try {
      if (publicId) {
        await updateDraftAction(publicId, pendingContent, { title, description }, wordCount)
      } else {
        const draft = await saveDraftAction(pendingContent, { title, description }, wordCount)

        listenerApi.dispatch(draftCreated({ publicId: draft.publicId }))
      }

      listenerApi.dispatch(saveSucceeded({ revision }))
    } catch {
      listenerApi.dispatch(saveFailed())
    }
  },
})
