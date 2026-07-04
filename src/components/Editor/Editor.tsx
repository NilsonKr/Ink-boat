'use client'
import { startTransition, useActionState, useMemo, useState } from 'react'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { saveDraftAction, updateDraftAction } from '@/actions/drafts'

import { Button } from '@/components/ui/button'

import { debounce } from '@/lib/utils'

import type { DraftMetadata } from '@/types/drafts'

type ComponentProps = {
  content?: Content | null
  publicId?: string | null
  title?: string
  description?: string
}

type DraftActionPayload = {
  json: Content
  metadata?: DraftMetadata
}

export const Editor: React.FC<ComponentProps> = ({ content, publicId, title, description }) => {
  const [draft, saveDraft, pending] = useActionState(
    async (_: any, payload: DraftActionPayload) => {
      const res = await saveDraftAction(payload.json, payload.metadata)

      window.history.replaceState(null, '', `/drafts/${res.publicId}`)
      return res
    }, null)

  const [draftMetada, setDraftMetadata] = useState<DraftMetadata>({ title: title ?? '', description: description ?? '' })

  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        // class: 'bg-(--paper-100) h-screen'
      }
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      updateSaveActionDebounced(editor?.getJSON() as Content)
    },
  })

  const updateSaveActionDebounced = useMemo(() =>
    debounce((json: Content, metadata?: DraftMetadata) => {
      const draftSlug = publicId ?? draft?.publicId

      return draftSlug ?
        updateDraftAction(publicId ?? draft?.publicId!, json, metadata)
        :
        saveDraftTransition(json, metadata)

    }, 1000),
    [publicId, draft])

  const saveDraftTransition = (json: Content, metadata?: DraftMetadata) => {
    startTransition(() => saveDraft({ json, ...(metadata ? { metadata } : {}) }))
  }

  const handleSaveMetadata = (key: string, value: string) => {
    setDraftMetadata(prev => {
      const newMetadata = { ...prev, [key]: value }

      updateSaveActionDebounced(null, newMetadata)

      return newMetadata
    })
  }

  const draftSlug = publicId ?? draft?.publicId

  return <>

    <textarea
      rows={1}
      placeholder="Title"
      name="title"
      value={draftMetada.title}
      onChange={({ target }) => handleSaveMetadata('title', target.value)}
      className="
        w-full text-6xl font-medium font-display resize-none border-none bg-transparent outline-none
        field-sizing-content overflow-hidden
        leading-tight
        placeholder:text-stone-300
      "
    />
    <textarea
      rows={1}
      name='description'
      placeholder="Description"
      value={draftMetada.description}
      onChange={({ target }) => handleSaveMetadata('description', target.value)}
      className="
       w-full text-2xl font-display text-(--text-muted-color) mt-1
       resize-none border-none bg-transparent outline-none
        field-sizing-content overflow-hidden
        leading-tight
        placeholder:text-stone-300
      "
    />

    <section className='mt-20'>
      <EditorContent editor={editor} />
      <Button
        onClick={() => draftSlug ?
          updateSaveActionDebounced(editor?.getJSON() as Content)
          :
          saveDraftTransition(editor?.getJSON() as Content)}
      >
        Save
      </Button>
    </section>
  </>
}

export default Editor