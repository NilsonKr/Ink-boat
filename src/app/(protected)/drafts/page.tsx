
import { getDraftListAction } from '@/actions/drafts'

import DraftsView from "@/layout/drafts/DraftsView"

import { DRAFTS_COPY } from "@/lib/constants/drafts"

const DraftsPage = async () => {
  const draftList = await getDraftListAction()

  return <DraftsView drafts={draftList} copy={DRAFTS_COPY} />
}

export default DraftsPage
