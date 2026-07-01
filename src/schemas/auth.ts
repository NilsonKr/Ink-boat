import { z } from 'zod'

const email = z.string().trim().toLowerCase().pipe(z.email('Enter a valid email address'))

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name is too long'),
  email,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password can be at most 64 characters long'),
})

export const loginSchema = z.object({
  email,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password can be at most 64 characters long'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
