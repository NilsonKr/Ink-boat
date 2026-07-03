'use client'
import { useEditor, EditorContent, JSONContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Button } from '@/components/ui/button'

type ComponentProps = {
  content?: Content | null
  saveDraft: (json: JSONContent) => void
}

export const Editor: React.FC<ComponentProps> = ({ saveDraft, content }) => {
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
  })

  return <>
    <EditorContent editor={editor} />
    <Button onClick={() => saveDraft(editor?.getJSON() as JSONContent)}>
      Save
    </Button>
  </>
}

export default Editor