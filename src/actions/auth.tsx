'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { APIError } from 'better-auth'

import { auth } from '@/lib/auth'
import { registerSchema, loginSchema } from '@/schemas/auth'


export type RegisterStateType = {
  fieldErrors: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  formError: string | null
}

export const registerAction = async (
  _prev: RegisterStateType,
  formData: FormData
): Promise<RegisterStateType> => {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, formError: null }
  }

  const { name, email, password } = parsed.data

  try {
    await auth.api.signUpEmail({ body: { name, email, password } })

  } catch (error) {
    const message = error instanceof APIError ? error.message : (error as Error).message

    return { fieldErrors: {}, formError: message }
  }

  redirect('/drafts')
}


export type LoginStateType = {
  fieldErrors: {
    email?: string[]
    password?: string[]
  }
  formError: string | null
}

export const loginAction = async (
  _prev: LoginStateType,
  formData: FormData
): Promise<LoginStateType> => {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, formError: null }
  }

  const { email, password } = parsed.data

  try {
    await auth.api.signInEmail({ body: { email, password } })

  } catch (error) {
    const message = error instanceof APIError ? error.message : (error as Error).message

    return { fieldErrors: {}, formError: message }
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