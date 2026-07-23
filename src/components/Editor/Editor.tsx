'use client'
import { startTransition, useActionState, useEffect, useMemo, useState } from 'react'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { saveDraftAction, updateDraftAction } from '@/actions/drafts'

import { Button } from '@/components/ui/button'
import AIPanel from '@/components/Editor/AIPanel'
import Caret from '@/components/Editor/Caret'
import SelectionToolbar from '@/components/Editor/SelectionToolbar'
import { EnterNewParagraph } from '@/components/Editor/extensions/EnterNewParagraph'

import { debounce } from '@/lib/utils'

import '@/components/Editor/editor.css'

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
  const [draft, saveDraft] = useActionState(
    async (_: any, payload: DraftActionPayload) => {
      const res = await saveDraftAction(payload.json, payload.metadata)

      setIsSaved(true)
      window.history.replaceState(null, '', `/drafts/${res.publicId}`)
      return res
    }, null)

  const saveDraftTransition = (json: Content, metadata?: DraftMetadata) => {
    startTransition(() => saveDraft({ json, ...(metadata ? { metadata } : {}) }))
  }

  const [draftMetada, setDraftMetadata] = useState<DraftMetadata>({ title: title ?? '', description: description ?? '' })
  const [isSaved, setIsSaved] = useState<boolean>(true)
  const [isAIPanelOpen, setIsAIPanelOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsAIPanelOpen(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const editor = useEditor({
    extensions: [StarterKit, EnterNewParagraph],
    content: content ?? '',
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none',
      }
    },
    immediatelyRender: false,
    onUpdate({ editor }) {
      setIsSaved(false)
      updateSaveActionDebounced(editor?.getJSON() as Content)
    },
  })

  const updateAction = async (slug: string, json: Content, metadata?: DraftMetadata) => {
    const res = await updateDraftAction(slug, json, metadata)

    setIsSaved(true)
    return res
  }

  const updateSaveActionDebounced = useMemo(() =>
    debounce((json: Content, metadata?: DraftMetadata) => {
      const draftSlug = publicId ?? draft?.publicId

      return draftSlug ?
        updateAction(publicId ?? draft?.publicId!, json, metadata)
        :
        saveDraftTransition(json, metadata)

    }, 1000),
    [publicId, draft])

  const handleSaveMetadata = (key: string, value: string) => {
    setIsSaved(false)
    setDraftMetadata(prev => {
      const newMetadata = { ...prev, [key]: value }

      updateSaveActionDebounced(null, newMetadata)

      return newMetadata
    })
  }

  return <>
    <p className='min-h-[28px] font-display text-(--text-muted-color) text-xl text-end' >
      {isSaved && 'Saved'}
    </p>
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

    <section className='relative mt-20'>
      <EditorContent editor={editor} />
      <Caret editor={editor} />
      <SelectionToolbar editor={editor} />
      {/* <Button
        onClick={() => draftSlug ?
          updateSaveActionDebounced(editor?.getJSON() as Content)
          :
          saveDraftTransition(editor?.getJSON() as Content)}
      >
        Save
      </Button> */}
    </section>

    <AIPanel open={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
  </>
}

export default Editor