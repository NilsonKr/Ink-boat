'use client'
import { startTransition, useActionState, useMemo } from 'react'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { saveDraftAction, updateDraftAction } from '@/actions/drafts'

import { Button } from '@/components/ui/button'

import { debounce } from '@/lib/utils'

import type { Draft } from '@/types/drafts'

type ComponentProps = {
  content?: Content | null
  publicId?: string | null
}

export const Editor: React.FC<ComponentProps> = ({ content, publicId }) => {
  const [draft, saveDraft, pending] = useActionState((_: any, json: Content) => saveDraftAction(json), null)

  const updateActionDebounced = useMemo(() =>
    debounce((json: Content) =>
      updateDraftAction(publicId ?? draft?.publicId!, json), 1000),
    [publicId, draft])

  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        // class: 'bg-(--paper-100) h-screen'
      }
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate({ editor }) {
      updateActionDebounced(editor?.getJSON() as Content)
    },
  })

  const saveDraftTransition = (json: Content) => {
    startTransition(() => saveDraft(editor?.getJSON() as Content))
  }

  const draftSlug = publicId ?? draft?.publicId

  return <>
    <EditorContent editor={editor} />
    <Button onClick={() => draftSlug ? updateActionDebounced(editor?.getJSON() as Content) : saveDraftTransition(editor?.getJSON() as Content)}>
      Save
    </Button>
  </>
}

export default Editor