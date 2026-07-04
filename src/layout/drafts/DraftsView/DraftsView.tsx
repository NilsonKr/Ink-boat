"use client"
// React / third-party imports
import Link from 'next/link'
import { useMemo, useState } from "react"

// component imports
import { Button } from "@/components/ui/button"
import DraftRow from "@/components/drafts/DraftRow"
import FilterRail from "@/components/drafts/FilterRail"

// types imports
import type {
  DraftsCopy,
  DraftsFilter,
  DraftsFilterTab,
  Draft,
} from "@/types/drafts"

type DraftsViewProps = {
  drafts: Draft[]
  copy: DraftsCopy
}

const DraftsView: React.FC<DraftsViewProps> = ({ drafts, copy }) => {
  const [active, setActive] = useState<DraftsFilter>("all")

  const counts = useMemo<Record<DraftsFilter, number>>(
    () => ({
      all: drafts.length,
      draft: drafts.filter((draft) => draft.status === "draft").length,
      published: drafts.filter((draft) => draft.status === "published").length,
      archived: drafts.filter((draft) => draft.status === "archived").length,
    }),
    [drafts]
  )

  const tabs: DraftsFilterTab[] = [
    { key: "all", label: copy.filters.all },
    { key: "draft", label: copy.filters.draft },
    { key: "published", label: copy.filters.published },
    { key: "archived", label: copy.filters.archived },
  ]

  const visibleDrafts = useMemo(
    () =>
      active === "all"
        ? drafts
        : drafts.filter((draft) => draft.status === active),
    [drafts, active]
  )

  return (
    <section className="min-h-screen bg-[var(--sand-200)] px-14 py-14">
      <div className="mx-auto max-w-[928px] rounded-[var(--radius-card)] bg-[var(--paper-100)] px-[60px] pb-[64px] pt-[56px] shadow-[var(--shadow-card)]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mb-[14px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--plum-500)]">
              {copy.eyebrow}
            </p>
            <h1 className="font-display text-[64px] font-medium leading-[0.9] tracking-[-0.025em]">
              {copy.heading}
            </h1>
          </div>

          <Link href='/drafts/new-draft' className="flex h-auto items-end gap-[9px] rounded-[var(--radius-button)] bg-[var(--marigold-500)] px-[22px] py-[13px] text-[14.5px] font-semibold text-[var(--on-accent)] shadow-[var(--shadow-cta)] hover:bg-[var(--marigold-700)]">
            <span className="font-display text-[18px] leading-none">✎</span>
            {copy.newDraft}
          </Link>
        </div>

        <p className="mt-4 font-display text-[19px] italic text-[var(--text-muted-color)]">
          {copy.subtitle}
        </p>

        <FilterRail
          tabs={tabs}
          counts={counts}
          active={active}
          onChange={setActive}
        />

        <div className="mt-2">
          {visibleDrafts.map((draft, index) => (
            <DraftRow key={draft.publicId} draft={draft} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DraftsView
