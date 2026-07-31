import type { Content } from '@tiptap/react'

import { getDraftAction } from '@/actions/drafts'
import { getProviderKeysAction } from '@/actions/providerKeys'

import EditorStoreProvider from '@/store/providers/EditorStoreProvider'
import Editor from '@/components/Editor'

type ComponentProps = {
  params: Promise<{ slug: string }>
}

const Page: React.FC<ComponentProps> = async ({ params }) => {
  const { slug } = await params

  const [draft, providerKeys] = await Promise.all([getDraftAction(slug), getProviderKeysAction()])

  return (
    // The key forces a fresh store per draft. Without it, a move between two slugs
    // reuses this segment's tree, and the store would keep the previous draft.
    <EditorStoreProvider
      key={slug}
      draft={{
        publicId: slug,
        title: draft?.title,
        description: draft?.description,
        status: draft?.status,
        wordCount: draft?.wordCount,
      }}
    >
      <Editor
        publicId={slug}
        content={draft?.content as Content}
        title={draft?.title}
        description={draft?.description}
        status={draft?.status}
        notes={draft?.notes}
        providerKeys={providerKeys}
      />
    </EditorStoreProvider>
  )
}

export default Page
