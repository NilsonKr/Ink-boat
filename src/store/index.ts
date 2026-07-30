import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { autosaveMiddleware } from '@/store/middleware/autosave'
import draftSlice from '@/store/slices/draftSlice'

const rootReducer = combineSlices(draftSlice)

/**
 * A factory, not a singleton. On the server one module instance is shared by every
 * request, so a module-level store would leak one user's draft into another's render.
 * `preloadedState` lets a server component seed the store before its first render.
 */
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        // `pendingContent` holds the whole document and is rewritten on every keystroke.
        // The JSON is serializable — this only keeps the dev checks from walking it each time.
        serializableCheck: { ignoredPaths: ['draft.pendingContent'] },
        immutableCheck: { ignoredPaths: ['draft.pendingContent'] },
      }).prepend(autosaveMiddleware.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
