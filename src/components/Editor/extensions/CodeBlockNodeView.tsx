'use client'
import { useMemo, useState } from 'react'
import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react'

// highlight.js ids are lowercase; a few read better with a friendlier label.
const LANGUAGE_LABELS: Record<string, string> = {
  xml: 'HTML',
  plaintext: 'Plain text',
}

const labelFor = (id: string) => LANGUAGE_LABELS[id] ?? id.toUpperCase()

const CodeBlockNodeView: React.FC<NodeViewProps> = ({ node, updateAttributes, extension }) => {
  const [copied, setCopied] = useState(false)

  // The registry lives on the extension options — one source of truth with the
  // lowlight instance that actually paints the tokens.
  const languages = useMemo<string[]>(
    () => extension.options.lowlight.listLanguages().sort(),
    [extension.options.lowlight],
  )

  const current = (node.attrs.language as string) || 'plaintext'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(node.textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // Clipboard denied (insecure context / permissions) — nothing to recover.
    }
  }

  return (
    <NodeViewWrapper as='div' className='editor-codeblock'>
      <div className='editor-codeblock__bar' contentEditable={false}>
        <label className='editor-codeblock__lang'>
          <span>{labelFor(current)}</span>
          <span aria-hidden>▾</span>
          <select
            aria-label='Code language'
            value={languages.includes(current) ? current : 'plaintext'}
            onChange={event => updateAttributes({ language: event.target.value })}
          >
            {!languages.includes('plaintext') && <option value='plaintext'>Plain text</option>}
            {languages.map(id => (
              <option key={id} value={id}>
                {labelFor(id)}
              </option>
            ))}
          </select>
        </label>

        <button type='button' className='editor-codeblock__copy' onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre>
        <NodeViewContent<'code'> as='code' />
      </pre>
    </NodeViewWrapper>
  )
}

export default CodeBlockNodeView
