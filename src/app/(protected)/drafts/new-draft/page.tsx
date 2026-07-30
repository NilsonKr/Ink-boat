import EditorStoreProvider from '@/providers/EditorStoreProvider'
import Editor from '@/components/Editor'

const page = () => {
  return (
    <EditorStoreProvider>
      <Editor />
    </EditorStoreProvider>
  )
}

export default page
