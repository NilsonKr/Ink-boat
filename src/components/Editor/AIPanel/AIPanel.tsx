'use client'
// React or third-party imports
import { useEffect, useRef, useState } from 'react'

type AIPanelProps = {
  open: boolean
  onClose: () => void
  selectedWordCount?: number
}

const AIPanel: React.FC<AIPanelProps> = ({ open, onClose, selectedWordCount = 0 }) => {
  // use states
  const [query, setQuery] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // constants
  const ghostChips = ['Pull quote', 'Retitle', 'Ask anything…']

  // use effects
  useEffect(() => {
    if (!open) return

    inputRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="gradline fixed bottom-[44px] left-1/2 z-50 w-[min(680px,86%)] -translate-x-1/2 rounded-[20px] p-[1.5px] shadow-[0_28px_90px_rgba(20,12,6,.4)]">
      <div className="overflow-hidden rounded-[18.5px] bg-[oklch(0.98_0.005_85_/_.94)] backdrop-blur-[16px]">
        {/* input row */}
        <div className="flex items-center gap-3 border-b border-[rgba(0,0,0,.07)] px-[22px] py-[17px]">
          <span className="text-base">✦</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            placeholder="Ask anything…"
            className="flex-1 border-none bg-transparent font-sans text-[15px] text-(--text-strong) caret-[oklch(0.55_0.13_340)] outline-none placeholder:text-(--text-label-color)"
          />
          <span className="font-mono text-[9px] tracking-[0.1em] text-(--text-label-color)">
            {selectedWordCount} words selected
          </span>
        </div>

        {/* command hints */}
        <div className="flex flex-wrap gap-[7px] px-[22px] pt-3 pb-1">
          <span className="flex items-center gap-[6px] rounded-[var(--radius-pill)] bg-(--espresso-800) px-3 py-[6px] font-mono text-[9px] uppercase tracking-[0.08em] text-(--text-on-dark)">
            ✦ Extend the metaphor
          </span>
          {ghostChips.map((chip) => (
            <span
              key={chip}
              className="cursor-pointer rounded-[var(--radius-pill)] bg-black/5 px-3 py-[6px] font-mono text-[9px] uppercase tracking-[0.08em] text-(--text-body-color) hover:bg-black/9"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* inline diff result */}
        <div className="px-[22px] pt-[14px] pb-3">
          <div className="mb-[10px] font-mono text-[8.5px] uppercase tracking-[0.14em] text-[oklch(0.55_0.13_340)]">
            Proposed · replaces selection
          </div>
          <p className="m-0 font-display text-[15.5px] leading-[1.62] text-(--text-strong)">
            …a room you can furnish —{' '}
            <span className="rounded-[4px] bg-[oklch(0.95_0.05_85)]">
              a chair dragged to the east window, a cup that steams unhurried, one sentence left
              open like a door ajar
            </span>
            <span className="text-(--text-label-color) line-through">
              {' '}— slowly, and only with things you chose
            </span>
            .
          </p>
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 px-4 pt-[6px] pb-[14px]">
          <button className="flex cursor-pointer items-center gap-2 rounded-[10px] border-none bg-(--espresso-800) px-[15px] py-[10px] font-sans text-[12.5px] font-semibold text-(--text-on-dark) transition-colors duration-100 hover:bg-(--espresso-900)">
            Apply{' '}
            <span className="rounded-[4px] border border-white/30 px-[6px] py-[2px] font-mono text-[9px] opacity-70">
              ↵
            </span>
          </button>
          <button className="flex cursor-pointer items-center gap-2 rounded-[10px] border-none bg-black/5 px-[15px] py-[10px] font-sans text-[12.5px] text-(--text-body-color) transition-colors duration-100 hover:bg-black/9">
            Another take{' '}
            <span className="rounded-[4px] border border-black/12 px-[6px] py-[2px] font-mono text-[9px] text-(--text-label-color)">
              tab
            </span>
          </button>
          <button className="flex cursor-pointer items-center gap-2 rounded-[10px] border-none bg-black/5 px-[15px] py-[10px] font-sans text-[12.5px] text-(--text-body-color) transition-colors duration-100 hover:bg-black/9">
            Side by side{' '}
            <span className="rounded-[4px] border border-black/12 px-[6px] py-[2px] font-mono text-[9px] text-(--text-label-color)">
              ⌘2
            </span>
          </button>
          <span
            onClick={onClose}
            className="ml-auto cursor-pointer font-mono text-[9px] uppercase tracking-[0.1em] text-(--text-label-color)"
          >
            esc
          </span>
        </div>
      </div>
    </div>
  )
}

export default AIPanel
