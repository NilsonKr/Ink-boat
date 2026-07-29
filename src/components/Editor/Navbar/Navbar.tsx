import Link from 'next/link'

import StatusBadge from '@/components/drafts/StatusBadge'

import { EDITOR_COPY } from '@/lib/constants/editor'
import { formatWords, readingTime } from '@/lib/drafts'

import type { DraftStatus } from '@/types/drafts'

type ComponentProps = {
  issue?: string
  words: number
  isSaved: boolean
  status?: DraftStatus
}

const Navbar: React.FC<ComponentProps> = ({
  issue,
  words,
  isSaved,
  status = 'DRAFT',
}) => {
  const { navbar } = EDITOR_COPY

  const meta = [
    readingTime(words),
    formatWords(words),
    isSaved ? navbar.saved : navbar.saving,
  ].join(' · ')

  return (
    <header className="flex items-center justify-between border-b-2 border-[var(--espresso-800)] px-10 py-[18px]">
      <div className="flex items-center gap-[22px]">
        <Link
          href="/drafts"
          aria-label={navbar.markLabel}
          className="flex size-[27px] items-center justify-center border-[1.5px] border-[var(--espresso-800)] font-display text-[16px] leading-none"
        >
          ¶
        </Link>

        <nav className="flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted-color)]">
          <Link href="/drafts" className="shrink-0 hover:text-[var(--text-strong)]">
            {navbar.stories}
          </Link>
          <span className="mx-[6px] text-[var(--text-label-color)]">/</span>
          <span className="max-w-[42ch] truncate text-[var(--text-strong)]">
            {issue || navbar.untitled}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-label-color)]">
          {meta}
        </span>

        <StatusBadge status={status} />

        <button
          type="button"
          className="rounded-[var(--radius-button)] bg-[var(--marigold-500)] px-[18px] py-[10px] text-[13.5px] font-semibold text-[var(--on-accent)] shadow-[var(--shadow-cta)] hover:bg-[var(--marigold-700)]"
        >
          {navbar.publish}
        </button>
      </div>
    </header>
  )
}

export default Navbar
