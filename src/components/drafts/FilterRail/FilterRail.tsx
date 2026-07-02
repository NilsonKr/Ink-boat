// React / third-party imports

// utils, constants imports
import { cn } from "@/lib/utils"

// types imports
import type { DraftsFilter, DraftsFilterTab } from "@/types/drafts"

type FilterRailProps = {
  tabs: DraftsFilterTab[]
  counts: Record<DraftsFilter, number>
  active: DraftsFilter
  onChange: (filter: DraftsFilter) => void
}

const FilterRail: React.FC<FilterRailProps> = ({
  tabs,
  counts,
  active,
  onChange,
}) => {
  return (
    <div className="mt-[34px] flex gap-[28px] border-b-2 border-[var(--espresso-800)]">
      {tabs.map((tab) => {
        const isActive = tab.key === active

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "-mb-[2px] flex items-center gap-[7px] border-b-2 pb-[14px] font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
              isActive
                ? "border-[var(--marigold-500)] text-[var(--text-strong)]"
                : "border-transparent text-[var(--text-muted-color)] hover:text-[var(--text-strong)]"
            )}
          >
            {tab.label}
            <span className="text-[var(--text-label-color)]">
              {counts[tab.key]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default FilterRail
