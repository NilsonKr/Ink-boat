import { getProviderKeysAction } from '@/actions/providerKeys'

import EditorStoreProvider from '@/store/providers/EditorStoreProvider'
import Editor from '@/components/Editor'

const page = async () => {
  const providerKeys = await getProviderKeysAction()

  return (
    <EditorStoreProvider>
      <Editor providerKeys={providerKeys} />
    </EditorStoreProvider>
  )
}

export default page
