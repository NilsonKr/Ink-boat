'use client'
import { startTransition, useActionState, useEffect, useMemo, useState } from 'react'
import { useEditor, EditorContent, type Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { CharacterCount } from '@tiptap/extensions'

import { saveDraftAction, updateDraftAction } from '@/actions/drafts'

import AIPanel from '@/components/Editor/AIPanel'
import Caret from '@/components/Editor/Caret'
import ContentsRail from '@/components/Editor/ContentsRail'
import InsertMenu from '@/components/Editor/InsertMenu'
import Navbar from '@/components/Editor/Navbar'
import SelectionToolbar from '@/components/Editor/SelectionToolbar'
import SidePanel from '@/components/Editor/SidePanel'
import { EnterNewParagraph } from '@/components/Editor/extensions/EnterNewParagraph'
import { Divider } from '@/components/Editor/extensions/Divider'
import { CodeBlock } from '@/components/Editor/extensions/CodeBlock'

import { debounce, getSerializableContent, trimTrailingEmptyParagraphs } from '@/lib/utils'

import '@/components/Editor/editor.css'

import type { DraftMetadata, DraftStatus } from '@/types/drafts'
import type { Note } from '@/types/notes'

type ComponentProps = {
  content?: Content | null
  publicId?: string | null
  title?: string
  description?: string
  status?: DraftStatus
  notes?: Note[]
}

type DraftActionPayload = {
  json: Content
  metadata?: DraftMetadata
  wordCount?: number
}


export const Editor: React.FC<ComponentProps> = ({ content, publicId, title, description, status, notes = [] }) => {
  const [draft, saveDraft] = useActionState(
    async (_: any, payload: DraftActionPayload) => {
      const res = await saveDraftAction(payload.json, payload.metadata, payload.wordCount)

      setIsSaved(true)
      window.history.replaceState(null, '', `/drafts/${res.publicId}`)
      return res
    }, null)

  const saveDraftTransition = (json: Content, metadata?: DraftMetadata, wordCount?: number) => {
    startTransition(() => saveDraft({ json, ...(metadata ? { metadata } : {}), wordCount }))
  }

  const [draftMetada, setDraftMetadata] = useState<DraftMetadata>({ title: title ?? '', description: description ?? '' })
  const [isSaved, setIsSaved] = useState<boolean>(true)
  const [isAIPanelOpen, setIsAIPanelOpen] = useState<boolean>(false)
  const [words, setWords] = useState<number>(0)

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
    extensions: [
      StarterKit.configure({ link: { openOnClick: false }, trailingNode: false, horizontalRule: false, codeBlock: false }),
      Highlight.configure({ multicolor: true }),
      Divider,
      CodeBlock,
      EnterNewParagraph,
      CharacterCount,
    ],
    content: trimTrailingEmptyParagraphs(content),
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none',
      }
    },
    immediatelyRender: false,
    onCreate({ editor }) {
      setWords(editor.storage.characterCount.words())
    },
    onUpdate({ editor }) {
      const nextWords = editor.storage.characterCount.words()

      setIsSaved(false)
      setWords(nextWords)
      updateSaveActionDebounced(getSerializableContent(editor), undefined, nextWords)
    },
  })

  const updateAction = async (slug: string, json: Content, metadata?: DraftMetadata, wordCount?: number) => {
    const res = await updateDraftAction(slug, json, metadata, wordCount)

    setIsSaved(true)
    return res
  }

  const updateSaveActionDebounced = useMemo(() =>
    debounce((json: Content, metadata?: DraftMetadata, wordCount?: number) => {
      const draftSlug = publicId ?? draft?.publicId

      return draftSlug ?
        updateAction(publicId ?? draft?.publicId!, json, metadata, wordCount)
        :
        saveDraftTransition(json, metadata, wordCount)

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

  return <div className='flex h-screen flex-col'>
    <Navbar
      issue={draftMetada.title}
      words={words}
      isSaved={isSaved}
      status={status}
    />

    <div className='grid min-h-0 flex-1 grid-cols-[250px_1fr_360px]'>
      <ContentsRail editor={editor} />

      <section className='overflow-y-auto bg-(--paper-100) px-16 pt-13 pb-14'>
        <div className='mx-auto w-full max-w-[68ch]'>
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

          <div className='h-[2px] bg-(--espresso-800) mt-[22px]' />

          <section className='relative mt-20'>
            <EditorContent editor={editor} />
            <Caret editor={editor} />
            <SelectionToolbar editor={editor} />
            <InsertMenu editor={editor} />
          </section>
        </div>
      </section>

      <SidePanel draftSlug={publicId ?? draft?.publicId} notes={notes} />
    </div>

    <AIPanel open={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
  </div>
}

export default Editor