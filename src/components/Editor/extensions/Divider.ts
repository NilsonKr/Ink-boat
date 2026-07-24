import {
  Node,
  mergeAttributes,
  nodeInputRule,
  isNodeSelection,
  ReactNodeViewRenderer,
} from '@tiptap/react'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'

import DividerNodeView from '@/components/Editor/extensions/DividerNodeView'

export const Divider = Node.create({
  name: 'horizontalRule',

  group: 'block',

  parseHTML() {
    return [{ tag: 'hr' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DividerNodeView)
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain, state }) => {
          const { selection } = state
          const { $from: $originFrom, $to: $originTo } = selection
          const currentChain = chain()

          if ($originFrom.parentOffset === 0) {
            currentChain.insertContentAt(
              { from: Math.max($originFrom.pos - 1, 0), to: $originTo.pos },
              { type: this.name }
            )
          } else if (isNodeSelection(selection)) {
            currentChain.insertContentAt($originTo.pos, { type: this.name })
          } else {
            currentChain.insertContent({ type: this.name })
          }

          return currentChain
            .command(({ tr, dispatch }) => {
              if (dispatch) {
                const { $to } = tr.selection
                const posAfter = $to.end()

                if ($to.nodeAfter) {
                  if ($to.nodeAfter.isTextblock) {
                    tr.setSelection(TextSelection.create(tr.doc, $to.start()))
                  } else if ($to.nodeAfter.isBlock) {
                    tr.setSelection(NodeSelection.create(tr.doc, $to.pos))
                  } else {
                    tr.setSelection(TextSelection.create(tr.doc, $to.pos))
                  }
                } else {
                  // The rule is the last node — add a paragraph so writing can continue.
                  const node = $to.parent.type.contentMatch.defaultType?.create()

                  if (node) {
                    tr.insert(posAfter, node)
                    tr.setSelection(TextSelection.create(tr.doc, posAfter + 1))
                  }
                }

                tr.scrollIntoView()
              }

              return true
            })
            .run()
        },
    }
  },

  addInputRules() {
    return [nodeInputRule({ find: /^(?:---|—-|___\s|\*\*\*\s)$/, type: this.type })]
  },
})

export default Divider
