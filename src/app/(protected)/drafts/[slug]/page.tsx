import type { Content } from '@tiptap/react'

import { getDraftAction, saveDraftAction } from '@/actions/drafts'

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
        <h3 className='text-6xl font-medium font-display'>
          The Quiet Architecture of Mornings
        </h3>
        <p className='text-2xl font-display text-(--text-muted-color) mt-1'>
          What waking before dawn taught me about attention.
        </p>
        <section className='mt-20'>
          <Editor saveDraft={saveDraftAction} content={draft?.content as Content} />
        </section>
      </section>
    </section>
  )
}

export default Page