import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

type LayoutProps = {
  children: React.ReactNode
}

const ProtectedLayout: React.FC<LayoutProps> = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/login')

  return children
}

export default ProtectedLayout