import { Extension } from '@tiptap/react'
import { Plugin, PluginKey, Selection } from '@tiptap/pm/state'

/**
 * Clicking the empty space under the article parks the caret at the end of the
 * last block instead of opening a block there — new paragraphs only come from Enter.
 */
export const ClickBelowContent = Extension.create({
  name: 'clickBelowContent',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('clickBelowContent'),
        props: {
          handleDOMEvents: {
            mousedown: (view, event) => {
              const lastBlock = view.dom.lastElementChild
              if (!lastBlock) return false

              const isBelowContent = event.clientY > lastBlock.getBoundingClientRect().bottom
              if (!isBelowContent) return false

              const { state, dispatch } = view
              dispatch(state.tr.setSelection(Selection.atEnd(state.doc)).scrollIntoView())
              view.focus()
              event.preventDefault()

              return true
            },
          },
        },
      }),
    ]
  },
})

export default ClickBelowContent
