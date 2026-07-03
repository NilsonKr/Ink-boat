'use client'
import { useRouter } from "next/navigation"

import StatusBadge from "@/components/drafts/StatusBadge"

import { formatWords } from "@/lib/drafts"

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
          {draft.title}
        </h3>
        <p className="mb-[12px] max-w-[50ch] font-display text-[15.5px] leading-[1.45] text-[var(--text-muted-color)]">
          {draft.description}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-label-color)]">
          {draft?.readTime ?? ''} · {formatWords(draft?.words ?? 0)} · Edited {draft.updatedAt.toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col items-end gap-[18px] pt-[4px]">
        <StatusBadge status={draft.status} />
        <span className="-translate-x-[6px] font-display text-[22px] text-[var(--plum-500)] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          →
        </span>
      </div>
    </article>
  )
}

export default DraftRow
