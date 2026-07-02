'use client'
import { saveDraftAction } from '@/actions/drafts'

import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Button } from '@/components/ui/button'

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        // class: 'bg-(--paper-100) h-screen'
      }
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  return <>
    <EditorContent editor={editor} />
    <Button onClick={() => saveDraftAction(editor?.getJSON() as JSONContent)}>
      Save
    </Button>
  </>
}

export default Editor