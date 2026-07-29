'use client'
import { useState } from 'react'

import NotesTab from '@/components/Editor/SidePanel/NotesTab'
import SuggestionsTab from '@/components/Editor/SidePanel/SuggestionsTab'

import { PANEL_TABS } from '@/lib/constants/editor'

import type { Note, PanelTab } from '@/types/notes'

type ComponentProps = {
  draftSlug?: string | null
  notes: Note[]
}

const tabStyles =
  'flex flex-1 items-center justify-center gap-[7px] border-b-2 px-3 py-4 cursor-pointer font-mono text-[10px] uppercase tracking-[0.14em] transition-colors'

const SidePanel: React.FC<ComponentProps> = ({ draftSlug, notes }) => {
  const [tab, setTab] = useState<PanelTab>('notes')

  return (
    <aside className='flex min-h-0 flex-col border-l border-(--line)'>
      <div className='flex items-stretch border-b border-(--line)'>
        {PANEL_TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            type='button'
            aria-selected={key === tab}
            onClick={() => setTab(key)}
            className={`
              ${tabStyles}
              ${key === tab
                ? 'border-(--plum-500) text-(--plum-500)'
                : 'border-transparent text-(--text-label-color) hover:text-(--text-strong)'
              }
            `}
          >
            {icon && <span className='font-display text-[13px]'>{icon}</span>}
            {label}
          </button>
        ))}
      </div>

      {tab === 'notes' ? <NotesTab draftSlug={draftSlug} notes={notes} /> : <SuggestionsTab />}
    </aside>
  )
}

export default SidePanel
