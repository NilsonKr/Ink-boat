import { ReactNodeViewRenderer } from '@tiptap/react'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import CodeBlockNodeView from '@/components/Editor/extensions/CodeBlockNodeView'

// One shared registry for the ~35 common languages, reused by the NodeView's
// language dropdown (extension.options.lowlight.listLanguages()).
export const lowlight = createLowlight(common)

// Replaces StarterKit's monochrome codeBlock: lowlight paints per-token
// decorations, the NodeView adds the design's header (language + copy) chrome.
export const CodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNodeView)
  },
}).configure({ lowlight, defaultLanguage: 'javascript' })

export default CodeBlock
