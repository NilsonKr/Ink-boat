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
    <section className='px-70'>
      <section className='bg-(--paper-100) min-h-screen p-12'>
        <Editor
          publicId={slug}
          content={draft?.content as Content}
          title={draft?.title}
          description={draft?.description}
        />
      </section>
    </section>
  )
}

export default Page