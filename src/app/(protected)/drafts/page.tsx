import { headers } from 'next/headers'

import { getDraftContentAction, getDraftListAction } from '@/actions/drafts'

import DraftsHero from "@/layout/drafts/DraftsHero"
import DraftsView from "@/layout/drafts/DraftsView"

import { auth } from '@/lib/auth'
import { DRAFTS_COPY } from "@/lib/constants/drafts"
import { excerptFromContent } from '@/lib/drafts'

const DraftsPage = async () => {
  const draftList = await getDraftListAction()
  const session = await auth.api.getSession({ headers: await headers() })

  const userLabel = session?.user.name || session?.user.email || '·'
  const [heroDraft] = draftList

  const heroContent = heroDraft ? await getDraftContentAction(heroDraft.publicId) : null
  const heroPreview = excerptFromContent(heroContent)

  return (
    <div className="relative bg-[var(--espresso-800)]">
      <DraftsHero
        draft={heroDraft}
        preview={heroPreview}
        userInitial={userLabel.charAt(0).toUpperCase()}
        copy={DRAFTS_COPY.hero}
      />

      <div className="relative z-[2] mt-8">
        <div className="h-[56vh]" />
        <DraftsView drafts={draftList} copy={DRAFTS_COPY} />
      </div>
    </div>
  )
}

export default DraftsPage
