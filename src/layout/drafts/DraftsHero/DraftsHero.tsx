import Link from 'next/link'

import ParallaxSurface from './draftsHero.animate'

import { formatEditedAt, formatWords, readingTime } from '@/lib/drafts'

import type { Draft, DraftsHeroCopy } from '@/types/drafts'

type DraftsHeroProps = {
  draft?: Draft
  userInitial: string
  copy: DraftsHeroCopy
}

const DraftsHero: React.FC<DraftsHeroProps> = ({ draft, userInitial, copy }) => {
  const title = draft ? draft.title || 'Untitled' : copy.emptyTitle
  const excerpt = draft ? draft.description : copy.emptyExcerpt

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden bg-[var(--espresso-800)]">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-[190px] -right-[120px] size-[480px] rounded-full bg-[rgba(110,53,81,0.35)]"
        />

        <header className="relative mx-auto flex max-w-[1040px] items-center justify-between px-14 pt-[26px]">
          <div className="flex items-center gap-[11px]">
            <span className="flex size-[27px] items-center justify-center border-[1.5px] border-[var(--text-on-dark)] font-display text-base leading-none text-[var(--text-on-dark)]">
              ¶
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-on-dark)]">
              {copy.publication}
            </span>
          </div>

          <nav className="flex items-center gap-[22px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-on-dark)]">
              {copy.navStories}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-on-dark-muted)]">
              {copy.navRead}
            </span>
            <span className="flex size-[34px] items-center justify-center rounded-full bg-[var(--plum-500)] font-display text-[15px] text-white">
              {userInitial}
            </span>
          </nav>
        </header>

        <div className="relative mx-auto w-full max-w-[1040px] px-14 pt-[44px] pb-[60px]">
          {draft && (
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--marigold-500)]">
              {copy.editedPrefix} {formatEditedAt(draft.updatedAt)}
            </p>
          )}

          <h1 className="mb-[14px] max-w-[18ch] font-display text-[46px] font-medium leading-[1.02] tracking-[-0.022em] text-[var(--text-on-dark)]">
            {title}
          </h1>

          {excerpt && (
            <p className="mb-[26px] max-w-[52ch] font-display text-[18px] italic leading-[1.5] text-[var(--text-on-dark-muted)]">
              {excerpt}
            </p>
          )}

          <div className="flex items-center gap-5">
            <Link
              href={draft ? `/drafts/${draft.publicId}` : '/drafts/new-draft'}
              className="rounded-[var(--radius-button)] bg-[var(--marigold-500)] px-[22px] py-[12px] text-[14px] font-semibold text-[var(--on-accent)] shadow-[var(--shadow-cta)] transition-colors hover:bg-[var(--marigold-700)]"
            >
              {draft ? copy.cta : copy.emptyCta}
            </Link>

            {draft && (
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-on-dark-muted)]">
                {readingTime(draft.wordCount)} · {formatWords(draft.wordCount)}
              </span>
            )}
          </div>
        </div>
      </div>

      <ParallaxSurface />
    </>
  )
}

export default DraftsHero
