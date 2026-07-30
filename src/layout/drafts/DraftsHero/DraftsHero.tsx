import Link from 'next/link'

import ParallaxSurface from './draftsHero.animate'

import { formatEditedAt, formatWords, readingTime } from '@/lib/drafts'

import type { Draft, DraftsHeroCopy } from '@/types/drafts'

type DraftsHeroProps = {
  draft?: Draft
  preview?: string
  userInitial: string
  copy: DraftsHeroCopy
}

const DraftsHero: React.FC<DraftsHeroProps> = ({ draft, preview, userInitial, copy }) => {
  const title = draft ? draft.title || 'Untitled' : copy.emptyTitle
  const description = draft ? draft.description : copy.emptyExcerpt

  return (
    <>
      <div className="sticky inset-0  overflow-hidden bg-[var(--espresso-800)]">
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
            <span className="inline-flex items-center gap-[7px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-on-dark-muted)]">
                {copy.navExplore}
              </span>
              <span className="rounded-full border border-[rgba(226,168,74,0.45)] px-[6px] py-[2px] font-mono text-[8px] uppercase leading-none tracking-[0.1em] text-[var(--marigold-500)]">
                {copy.navExploreBadge}
              </span>
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

          {(description || preview) && (
            <div className="mb-[26px] max-w-[52ch] space-y-[10px]">
              {description && (
                <p className="font-display text-[18px] italic leading-[1.5] text-[var(--text-on-dark-muted)]">
                  {description}
                </p>
              )}

              {draft && preview && (
                <p className="font-display text-[15.5px] leading-[1.55] text-[var(--text-on-dark-muted)]">
                  {preview}
                </p>
              )}
            </div>
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
