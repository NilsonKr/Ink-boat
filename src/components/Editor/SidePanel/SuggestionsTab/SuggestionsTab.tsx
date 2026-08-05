'use client'
import { useState, useTransition } from 'react'
import { useEditorState } from '@tiptap/react'

import { useEditorInstance } from '@/context/EditorProvider'
import { useAppSelector } from '@/store/hooks'
import { selectDescription, selectTitle } from '@/store/slices/draftSlice'

import PanelDock from '@/components/Editor/SidePanel/SuggestionsTab/PanelDock'
import ProviderBar from '@/components/Editor/SidePanel/SuggestionsTab/ProviderBar'
import ProviderSetup from '@/components/Editor/SidePanel/SuggestionsTab/ProviderSetup'
import SuggestionsEmpty from '@/components/Editor/SidePanel/SuggestionsTab/SuggestionsEmpty'
import SuggestionsList from '@/components/Editor/SidePanel/SuggestionsTab/SuggestionsList'

import { runSuggestionsAction } from '@/actions/suggestions'
import { AI_PROVIDERS } from '@/lib/constants/providers'
import {
  DEFAULT_SUGGESTION_MODE,
  SUGGESTION_RUN_COPY,
  TAKES_SHOWN,
} from '@/lib/constants/suggestions'
import { getDraftSelection, getSelectionContext } from '@/lib/editor/selection'
import { formatAgo } from '@/lib/utils'

import type { AIProvider, ProviderKeySummary } from '@/types/providers'
import type {
  DraftSelection,
  Suggestion,
  SuggestionModeKey,
  SuggestionSet,
} from '@/types/suggestions'

type ComponentProps = {
  providerKeys: ProviderKeySummary[]
}

/** One run's takes, held whole. The panel shows a slice of them and keeps the rest. */
type CompletedRun = {
  selection: DraftSelection
  mode: SuggestionModeKey
  suggestions: Suggestion[]
  ranAt: number
}

const getFirstModel = (provider: AIProvider): string => AI_PROVIDERS[provider].models[0].id

const SuggestionsTab: React.FC<ComponentProps> = ({ providerKeys }) => {
  const editor = useEditorInstance()

  const title = useAppSelector(selectTitle)
  const description = useAppSelector(selectDescription)

  const [keys, setKeys] = useState<ProviderKeySummary[]>(providerKeys)
  const [isManaging, setIsManaging] = useState<boolean>(false)
  const [mode, setMode] = useState<SuggestionModeKey>(DEFAULT_SUGGESTION_MODE)
  const [model, setModel] = useState<string>(() =>
    getFirstModel(providerKeys[0]?.provider ?? 'ANTHROPIC')
  )
  const [run, setRun] = useState<CompletedRun | null>(null)
  const [shown, setShown] = useState<number>(TAKES_SHOWN)
  const [error, setError] = useState<string | null>(null)

  const [isRunning, startRun] = useTransition()

  const currentSelection = useEditorState({
    editor,
    selector: ({ editor: current }) => (current ? getDraftSelection(current) : null),
  })

  const [connectedKey] = keys

  // The takes are held whole and revealed a few at a time, so "more" spends no tokens.
  const suggestionSet: SuggestionSet | null = run && {
    selection: run.selection,
    mode: run.mode,
    suggestions: run.suggestions.slice(0, shown),
    suggestedAgo: formatAgo(run.ranAt),
    remaining: Math.max(run.suggestions.length - shown, 0),
  }

  const handleConnected = (key: ProviderKeySummary) => {
    // One key per provider, so a saved key replaces the entry it just overwrote.
    setKeys(prev => [key, ...prev.filter(entry => entry.provider !== key.provider)])
    setModel(getFirstModel(key.provider))
    setIsManaging(false)
  }

  const handleRun = () => {
    if (!editor || !currentSelection || !connectedKey) return

    const context = getSelectionContext(editor)

    if (!context) return

    // The pin is the selection as it was at the run, so moving the caret afterwards never
    // repoints takes that are already on the page.
    const pinned = currentSelection

    setError(null)

    startRun(async () => {
      const result = await runSuggestionsAction({
        provider: connectedKey.provider,
        model,
        mode,
        context,
        draft: { title, description },
      })

      if (result.status === 'ok') {
        setRun({ selection: pinned, mode, suggestions: result.suggestions, ranAt: Date.now() })
        setShown(TAKES_SHOWN)
        return
      }

      // A missing key is a step to go back to, not a message to read.
      if (result.status === 'no_key') {
        setIsManaging(true)
        return
      }

      setError(
        result.status === 'invalid_input' ? result.message : SUGGESTION_RUN_COPY[result.status]
      )
    })
  }

  const handleReveal = () => {
    if (run) setShown(run.suggestions.length)
  }

  if (!connectedKey || isManaging)
    return (
      <ProviderSetup
        initialProvider={connectedKey?.provider}
        initialLabel={connectedKey?.label}
        onConnected={handleConnected}
        onCancel={connectedKey ? () => setIsManaging(false) : undefined}
      />
    )

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <ProviderBar providerKey={connectedKey} onManage={() => setIsManaging(true)} />

      {error && (
        <p
          role='alert'
          className='flex-none border-b border-(--line) bg-(--paper-50) px-[18px] py-2.5 font-display text-[13px] leading-[1.45] text-(--destructive)'
        >
          {error}
        </p>
      )}

      {suggestionSet ? (
        <SuggestionsList suggestionSet={suggestionSet} onReveal={handleReveal} />
      ) : (
        <SuggestionsEmpty />
      )}

      <PanelDock
        provider={connectedKey.provider}
        selection={currentSelection}
        mode={mode}
        model={model}
        isRunning={isRunning}
        onModeChange={setMode}
        onModelChange={setModel}
        onRun={handleRun}
      />
    </div>
  )
}

export default SuggestionsTab
