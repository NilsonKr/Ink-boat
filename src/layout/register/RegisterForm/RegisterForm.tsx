'use client'
import { useActionState } from 'react'
import Link from "next/link"

import { registerAction } from '@/actions/auth'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

import { cn } from "@/lib/utils"
import { REGISTER_COPY } from "@/lib/copy"

type ComponentProps = {
  className: string
}

const RegisterForm: React.FC<ComponentProps> = ({ className }) => {
  const [state, formAction, pending] = useActionState(registerAction, { error: null })

  const { form } = REGISTER_COPY

  const inputClassName =
    "h-auto rounded-[var(--radius-input)] border-input bg-card px-4 py-[13px] text-[15px] md:text-[15px]"
  const labelClassName =
    "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-label-color)]"
  const termsLinkClassName =
    "border-b border-[var(--secondary)]/30 text-[var(--secondary)]"

  return (
    <form
      action={formAction}
      className={cn(
        "flex flex-col justify-center bg-muted p-8 text-[var(--text-strong)] md:p-[52px]",
        className
      )}
    >
      <h1 className="font-display text-[38px] font-medium leading-none tracking-[-0.02em]">
        {form.heading}
      </h1>
      <p className="mt-3 font-sans text-[14px] text-[var(--text-muted-color)]">
        {form.alreadyMemberPrefix}{" "}
        <Link
          href="/login"
          className="border-b border-[var(--secondary)]/40 font-semibold text-[var(--secondary)]"
        >
          {form.signIn}
        </Link>
      </p>

      <FieldGroup className="mt-7 gap-[18px]">
        <Field>
          <FieldLabel htmlFor="name" className={labelClassName}>
            {form.nameLabel}
          </FieldLabel>
          <Input
            required
            id="name"
            name="name"
            type="text"
            placeholder={form.namePlaceholder}
            autoComplete="name"
            className={inputClassName}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className={labelClassName}>
            {form.emailLabel}
          </FieldLabel>
          <Input
            required
            id="email"
            type="email"
            name="email"
            placeholder={form.emailPlaceholder}
            autoComplete="email"
            className={inputClassName}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className={labelClassName}>
            {form.passwordLabel}
          </FieldLabel>
          <Input
            required
            id="password"
            type="password"
            name="password"
            placeholder={form.passwordPlaceholder}
            autoComplete="new-password"
            className={inputClassName}
          />
        </Field>

        <Button
          disabled={pending}
          type="submit"
          className="mt-1 h-auto w-full rounded-[var(--radius-button)] py-[15px] text-[15px] font-semibold shadow-[var(--shadow-cta)]"
        >
          {form.submit}
        </Button>
      </FieldGroup>



      <p className="mt-[22px] font-sans text-[12px] leading-normal text-[var(--text-label-color)]">
        {form.terms.prefix}{" "}
        <a href="#" className={termsLinkClassName}>
          {form.terms.termsLink}
        </a>{" "}
        {form.terms.middle}{" "}
        <a href="#" className={termsLinkClassName}>
          {form.terms.privacyLink}
        </a>
        {form.terms.suffix}
      </p>

      <p className='text-center text-red-700 font-medium text-lg mt-8 min-h-14'>
        {state.error ?? ''}
      </p>
    </form>
  )
}

export default RegisterForm
