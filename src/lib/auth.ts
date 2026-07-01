import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { jwt, bearer } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'

import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },
  plugins: [jwt(), bearer(), nextCookies()],
})

export type Session = typeof auth.$Infer.Session
