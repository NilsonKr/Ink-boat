
import { getDraftListAction } from '@/actions/drafts'

import DraftsView from "@/layout/drafts/DraftsView"

import { DRAFTS_COPY } from "@/lib/copy"

import type { Draft } from "@/types/drafts"

const DRAFTS: Draft[] = [
  {
    publicId: "1",
    title: "The Quiet Architecture of Mornings",
    description:
      "What three years of waking before dawn taught me about attention, ritual, and the shape of an empty hour.",
    status: "draft",
    words: 1240,
    readTime: "5 min",
    updatedAt: new Date(),
  },
  {
    publicId: "2",
    title: "Notes on Leaving the City",
    description:
      "I traded the noise for a field and a slower kind of restlessness. A reckoning, in twelve parts.",
    status: "published",
    words: 2680,
    readTime: "11 min",
    updatedAt: new Date()
  },
  {
    publicId: "3",
    title: "Why I Stopped Measuring My Days",
    description:
      "The productivity dashboards promised clarity. What they delivered was a quieter kind of dread.",
    status: "draft",
    words: 540,
    readTime: "2 min",
    updatedAt: new Date(),
  },
  {
    publicId: "4",
    title: "A Field Guide to Slow Software",
    description:
      "In praise of tools that wait for you — and the designers brave enough to build them.",
    status: "archived",
    words: 1890,
    readTime: "8 min",
    updatedAt: new Date(),
  },
  {
    publicId: "5",
    title: "On Keeping a Commonplace Book",
    description:
      "For four hundred years, readers hoarded sentences. I started again, by hand, and everything changed.",
    status: "published",
    words: 1430,
    readTime: "6 min",
    updatedAt: new Date(),
  },
  {
    publicId: "6",
    title: "The Year I Read Nothing New",
    description:
      "A diet of only rereads. What returning to old books revealed about who I used to be.",
    status: "draft",
    words: 320,
    readTime: "1 min",
    updatedAt: new Date(),
  },
]

const DraftsPage = async () => {
  const draftList = await getDraftListAction()

  return <DraftsView drafts={draftList} copy={DRAFTS_COPY} />
}

export default DraftsPage
