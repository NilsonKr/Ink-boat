'use client'
import { useEffect, useRef, useState } from 'react'

import { COPIED_FEEDBACK_DELAY, DRAFT_ROW_COPY } from '@/lib/constants/drafts'

type DraftRowActionsProps = {
  publicId: string
}

const DraftRowActions: React.FC<DraftRowActionsProps> = ({ publicId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutside)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current)
    },
    []
  )

  // The row itself navigates to the draft, so every control here has to hold its click.
  const handleCopyLink = async (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsMenuOpen(false)

    try {
      await navigator.clipboard.writeText(`${window.location.origin}/drafts/${publicId}`)
    } catch {
      // Clipboard is unavailable outside a secure context — leave the label untouched.
      return
    }

    setHasCopied(true)

    if (copiedTimer.current) clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setHasCopied(false), COPIED_FEEDBACK_DELAY)
  }

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsMenuOpen((open) => !open)
  }

  const handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsMenuOpen(false)
  }

  const menuId = `draft-actions-${publicId}`
  const itemClass =
    'w-full rounded-[8px] px-[12px] py-[9px] text-left text-[13.5px] text-[var(--text-strong)] cursor-pointer hover:bg-[var(--sand-200)]'

  return (
    <div ref={containerRef} className="relative flex items-center gap-[8px]">
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex cursor-pointer items-center gap-[7px] rounded-[var(--radius-button)] border border-[var(--line)] bg-[var(--paper-0)] px-[13px] py-[7px] text-[12.5px] font-semibold text-[var(--text-strong)] transition-colors hover:bg-[var(--sand-200)]"
      >
        <svg
          aria-hidden
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
          <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
        </svg>
        {hasCopied ? DRAFT_ROW_COPY.shareCopied : DRAFT_ROW_COPY.share}
      </button>

      <button
        type="button"
        onClick={handleToggleMenu}
        aria-label={DRAFT_ROW_COPY.menuTrigger}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        className="inline-flex size-[32px] cursor-pointer items-center justify-center rounded-[var(--radius-button)] border border-[var(--line)] bg-[var(--paper-0)] text-[var(--text-muted)] transition-colors hover:bg-[var(--sand-200)] hover:text-[var(--text-strong)]"
      >
        <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="1.7" />
          <circle cx="12" cy="12" r="1.7" />
          <circle cx="19" cy="12" r="1.7" />
        </svg>
      </button>

      {isMenuOpen && (
        <div
          id={menuId}
          role="menu"
          className="absolute top-[40px] right-0 z-30 min-w-[190px] rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--paper-0)] p-[6px] text-left shadow-[var(--shadow-raised)]"
        >
          <button type="button" role="menuitem" onClick={handleCopyLink} className={itemClass}>
            {DRAFT_ROW_COPY.copyLink}
          </button>

          <div className="mx-[6px] my-[5px] h-px bg-[var(--line)]" />

          <button type="button" role="menuitem" onClick={handleDismiss} className={itemClass}>
            {DRAFT_ROW_COPY.publish}
          </button>
          <button type="button" role="menuitem" onClick={handleDismiss} className={itemClass}>
            {DRAFT_ROW_COPY.settings}
          </button>

          <div className="mx-[6px] my-[5px] h-px bg-[var(--line)]" />

          <button
            type="button"
            role="menuitem"
            onClick={handleDismiss}
            className="w-full cursor-pointer rounded-[8px] px-[12px] py-[9px] text-left text-[13.5px] text-[#b23b3b] hover:bg-[rgba(178,59,59,0.10)]"
          >
            {DRAFT_ROW_COPY.remove}
          </button>
        </div>
      )}
    </div>
  )
}

export default DraftRowActions
