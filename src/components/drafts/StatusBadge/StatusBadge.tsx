import { STATUS_META } from "@/lib/constants/drafts"

import type { DraftStatus } from "@/types/drafts"

type StatusBadgeProps = {
  status: DraftStatus
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const meta = STATUS_META[status]

  return (
    <span
      className="inline-flex items-center gap-[7px] rounded-[var(--radius-pill)] px-[11px] py-[4px]"
      style={{ backgroundColor: meta.tint }}
    >
      <span
        className="size-[6px] rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      <span
        className="font-mono text-[9.5px] uppercase tracking-[0.1em]"
        style={{ color: meta.color }}
      >
        {meta.label}
      </span>
    </span>
  )
}

export default StatusBadge
