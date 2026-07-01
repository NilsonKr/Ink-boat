'use server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { APIError } from 'better-auth'

import { auth } from '@/lib/auth'


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


export type LoginStateType = {
  error: string | null
}

export const loginAction = async (
  _prev: LoginStateType,
  formData: FormData
): Promise<LoginStateType> => {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  try {
    await auth.api.signInEmail({ body: { email, password } })

  } catch (error) {
    if (error instanceof APIError) return { error: error.message }

    return { error: (error as Error).message }
  }

  redirect('/drafts')
}


export const logoutAction = async (): Promise<LoginStateType> => {
  try {
    await auth.api.signOut({
      headers: await headers()
    })

  } catch (error) {

    console.log(error)

    throw new Error((error as Error).message)
  }

  redirect('/')
}