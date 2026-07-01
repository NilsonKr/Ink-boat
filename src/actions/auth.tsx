'use server'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { APIError } from 'better-auth'


export type RegisterStateType = {
  error: string | null
}

export const registerAction = async (
  _prev: RegisterStateType,
  formData: FormData
): Promise<RegisterStateType> => {
  const name = String(formData.get('name') ?? '')
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  try {
    await auth.api.signUpEmail({ body: { name, email, password } })

  } catch (error) {
    if (error instanceof APIError) return { error: error.message }

    return { error: (error as Error).message }
  }

  redirect('/drafts')
}