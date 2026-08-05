'use client'
import { createContext, useContext } from 'react'

import type { Editor } from '@tiptap/react'

type ComponentProps = {
  editor: Editor | null
  children: React.ReactNode
}

const EditorContext = createContext<Editor | null>(null)

/**
 * The side panel sits beside the editor rather than inside it, so it cannot take the
 * instance as a prop. The context carries the instance itself, not a copy of the
 * selection — reading state is `useEditorState`'s job, and weaving a take back into the
 * document needs the instance anyway.
 */
const EditorProvider: React.FC<ComponentProps> = ({ editor, children }) => (
  <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
)

/** `null` until `useEditor` resolves, which is an ordinary first-render state. */
export const useEditorInstance = (): Editor | null => useContext(EditorContext)

export default EditorProvider
