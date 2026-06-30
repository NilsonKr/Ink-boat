import { createAuthClient } from 'better-auth/client'
import { jwtClient } from 'better-auth/client/plugins'

export const auhtClient = createAuthClient({
  plugins: [jwtClient()],
})
