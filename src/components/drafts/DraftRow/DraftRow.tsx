'use client'
import { useRouter } from "next/navigation"

import DraftRowActions from "@/components/drafts/DraftRowActions"
import StatusBadge from "@/components/drafts/StatusBadge"

import { formatWords, readingTime } from "@/lib/drafts"

import type { Draft } from "@/types/drafts"

type DraftRowProps = {
  draft: Draft
  index: number
}

const DraftRow: React.FC<DraftRowProps> = ({ draft, index }) => {
  const router = useRouter()
  const num = String(index + 1).padStart(2, "0")

  return (
    <article onClick={() => router.push(`/drafts/${draft.publicId}`)} className="group -mx-[18px] grid cursor-pointer grid-cols-[34px_60px_1fr_auto] items-start gap-6 rounded-[2px] border-b border-[var(--line)] px-[18px] py-[30px] transition-colors hover:bg-[var(--plum-100)]">
      <span className="pt-[6px] font-mono text-[12px] text-[var(--text-label-color)]">
        {num}
      </span>

      <div
        className="h-[78px] w-[60px] border border-[var(--line)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#e7e0d0 0,#e7e0d0 5px,#ded6c2 5px,#ded6c2 10px)",
        }}
      />

      <div>
        <h3 className="mb-[8px] font-display text-[24px] font-medium leading-[1.12] tracking-[-0.012em]">
          {draft.title ? draft.title : 'Untitled'}
        </h3>
        <p className="mb-[12px] max-w-[50ch] font-display text-[15.5px] leading-[1.45] text-[var(--text-muted-color)]">
          {draft.description ? draft.description : 'Add a description for this blog'}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-label-color)]">
          {readingTime(draft.wordCount)} · {formatWords(draft.wordCount)} · Edited {draft.updatedAt.toLocaleDateString()}
        </p>
      </div>

      <div className="relative flex flex-col items-end justify-between self-stretch gap-6 pt-[4px] whitespace-nowrap">
        <StatusBadge status={draft.status} />


        <div className="flex items-center gap-4" >
          <span className="pointer-events-none -translate-x-[8px]  font-display text-[24px] text-[var(--plum-500)] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            →
          </span>
          <DraftRowActions publicId={draft.publicId} />
        </div>
      </div>
    </article>
  )
}

export default DraftRow
