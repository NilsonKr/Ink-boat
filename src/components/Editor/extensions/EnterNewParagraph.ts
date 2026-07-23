import { Extension } from '@tiptap/react'

export const EnterNewParagraph = Extension.create({
  name: 'enterNewParagraph',

  priority: 1000,

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { state } = this.editor
        const { $from, empty } = state.selection
        const block = $from.parent
        const blockName = block.type.name

        // Only collapsed carets on top-level blocks; nested blocks (list items,
        // quotes) and code blocks keep their native Enter.
        if (!empty || $from.depth !== 1 || blockName === 'codeBlock') return false

        if (block.content.size === 0) {
          return blockName === 'heading' ? this.editor.commands.setParagraph() : true
        }

        const isAtEndOfHeading =
          blockName === 'heading' && $from.parentOffset === block.content.size
        if (!isAtEndOfHeading) return false

        return this.editor
          .chain()
          .insertContentAt($from.after(), { type: 'paragraph' })
          .unsetAllMarks()
          .run()
      },
    }
  },
})

export default EnterNewParagraph
