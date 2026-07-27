import type { Content } from '@tiptap/react'

import { getDraftAction } from '@/actions/drafts'

import Editor from '@/components/Editor'

type ComponentProps = {
  params: Promise<{ slug: string }>
}

const Page: React.FC<ComponentProps> = async ({ params }) => {
  const { slug } = await params

  const draft = await getDraftAction(slug)

  return (
    <Editor
      publicId={slug}
      content={draft?.content as Content}
      title={draft?.title}
      description={draft?.description}
      status={draft?.status}
    />
  )
}

export default Page