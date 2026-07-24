import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react'

const DividerNodeView: React.FC<NodeViewProps> = ({ selected }) => (
  <NodeViewWrapper
    as='div'
    contentEditable={false}
    className={`editor-divider ${selected ? 'is-selected' : ''}`}
  >
    <span>✳ ✳ ✳</span>
  </NodeViewWrapper>
)

export default DividerNodeView
