import { cn } from "@/lib/utils"

import type { BrandPanelProps } from "@/types/auth"

const BrandPanel: React.FC<BrandPanelProps> = ({ copy, className }) => {
  return (
    <section
      className={cn(
        "relative flex flex-col justify-between overflow-hidden bg-(--surface-ink) p-8 text-(--text-on-dark) md:h-[700px] md:max-h-[700px] md:p-[46px]",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-16 size-[230px] rounded-full bg-[var(--plum-500)] opacity-60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-12 size-[180px] rounded-full bg-[var(--marigold-500)] opacity-[0.16]"
      />

      <div className="relative flex items-center gap-6">
        <span className="flex size-12 items-center justify-center border-[1.5px] border-[var(--text-on-dark)] font-display text-sm leading-none">
          ¶
        </span>
        <span className="font-mono text-lg uppercase tracking-[0.2em]">
          {copy.mark}
        </span>
      </div>

      <div className="relative flex flex-col gap-4">
        <span className="font-mono text-sm uppercase tracking-[0.16em] text-(--marigold-500)">
          {copy.eyebrow}
        </span>
        <h2 className="font-display text-7xl font-medium text-(--text-on-dark) leading-[1.08] tracking-[-0.015em]">
          {copy.headingLines[0]}
          <br />
          {copy.headingLines[1]}
        </h2>
        <p className="max-w-[32ch] font-display text-2xl italic text-(--text-on-dark-muted)">
          {copy.paragraph}
        </p>
      </div>

      <div className="relative flex items-center gap-3">
        <div className="flex">
          <span className="size-8 rounded-full border-2 border-[var(--espresso-800)] bg-[var(--marigold-500)]" />
          <span className="-ml-[9px] size-8 rounded-full border-2 border-[var(--espresso-800)] bg-[var(--plum-500)]" />
          <span className="-ml-[9px] size-8 rounded-full border-2 border-[var(--espresso-800)] bg-[var(--sand-300)]" />
        </div>
        <p className="font-sans text-[13px] text-[var(--text-on-dark-muted)]">
          {copy.socialProofPrefix}{" "}
          <span className="font-semibold text-[var(--text-on-dark)]">
            {copy.socialProofCount}
          </span>{" "}
          {copy.socialProofSuffix}
        </p>
      </div>
    </section>
  )
}

export default BrandPanel
