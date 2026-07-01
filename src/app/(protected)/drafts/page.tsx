'use client'
import { logoutAction } from '@/actions/auth'

import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <section>
      <div className="mb-10">Auth drafts page</div>
      <Button
        type="button"
        onClick={logoutAction}
        className="mt-1 h-auto w-full rounded-[var(--radius-button)] py-[15px] text-[15px] font-semibold shadow-[var(--shadow-cta)]"
      >
        Log out
      </Button>

    </section>
  )
}

export default page