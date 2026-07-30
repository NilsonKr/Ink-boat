'use client'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { makeStore } from '@/store'
import { getPreloadedDraftState } from '@/store/slices/draftSlice'

import type { DraftSeed } from '@/store/slices/draftSlice'

type ComponentProps = {
  draft?: DraftSeed
  children: React.ReactNode
}

const EditorStoreProvider: React.FC<ComponentProps> = ({ draft, children }) => {
  // Lazy initializer, so one store is built per mount with the server draft already
  // in it. The first client render reads real values, with no hydrate effect and no
  // frame showing an empty title.
  const [store] = useState(() => makeStore({ draft: getPreloadedDraftState(draft) }))

  return <Provider store={store}>{children}</Provider>
}

export default EditorStoreProvider
