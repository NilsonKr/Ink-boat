'use client'
import { useEffect, useState } from 'react'
import { useEditor, EditorContent, type Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { CharacterCount } from '@tiptap/extensions'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  contentChanged,
  metadataChanged,
  selectDescription,
  selectDraftSlug,
  selectSaveStatus,
  selectTitle,
  selectWordCount,
  wordCountMeasured,
} from '@/store/slices/draftSlice'

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

import { getSerializableContent, trimTrailingEmptyParagraphs } from '@/lib/utils'

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

export const Editor: React.FC<ComponentProps> = ({ content, status, notes = [] }) => {
  const dispatch = useAppDispatch()

  const draftSlug = useAppSelector(selectDraftSlug)
  const title = useAppSelector(selectTitle)
  const description = useAppSelector(selectDescription)
  const wordCount = useAppSelector(selectWordCount)
  const isSaved = useAppSelector(selectSaveStatus) === 'saved'

  const [isAIPanelOpen, setIsAIPanelOpen] = useState<boolean>(false)

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
      dispatch(wordCountMeasured(editor.storage.characterCount.words()))
    },
    onUpdate({ editor }) {
      dispatch(contentChanged({
        json: getSerializableContent(editor),
        wordCount: editor.storage.characterCount.words(),
      }))
    },
  })

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

  // Browser history is external state, so the URL follows the id the store now holds.
  // The guard skips the /drafts/[slug] route, where the seeded id already matches.
  useEffect(() => {
    if (!draftSlug || window.location.pathname === `/drafts/${draftSlug}`) return

    window.history.replaceState(null, '', `/drafts/${draftSlug}`)
  }, [draftSlug])

  const handleSaveMetadata = (key: keyof DraftMetadata, value: string) =>
    dispatch(metadataChanged({ key, value }))

  return <div className='flex h-screen flex-col'>
    <Navbar
      issue={title}
      words={wordCount}
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
            value={title}
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
            value={description}
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

      <SidePanel draftSlug={draftSlug} notes={notes} />
    </div>

    <AIPanel open={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
  </div>
}

export default Editor
