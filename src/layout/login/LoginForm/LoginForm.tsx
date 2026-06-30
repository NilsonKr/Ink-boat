import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

import { cn } from "@/lib/utils"

import { LOGIN_COPY } from "@/lib/constants"

import type { LoginFormProps } from "@/types/auth"

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { form } = LOGIN_COPY

  const inputClassName =
    "h-auto rounded-[var(--radius-input)] border-input bg-card px-4 py-[13px] text-[15px] md:text-[15px]"
  const labelClassName =
    "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-label-color)]"

  return (
    <form
      className={cn(
        "flex flex-col justify-center bg-muted p-8 text-[var(--text-strong)] md:p-[52px]",
        className
      )}
    >
      <h1 className="font-display text-[38px] font-medium leading-none tracking-[-0.02em]">
        {form.heading}
      </h1>
      <p className="mt-3 font-sans text-[14px] text-[var(--text-muted-color)]">
        {form.newHerePrefix}{" "}
        <Link
          href="/register"
          className="border-b border-[var(--secondary)]/40 font-semibold text-[var(--secondary)]"
        >
          {form.createAccount}
        </Link>
      </p>

      <FieldGroup className="mt-8">
        <Field>
          <FieldLabel htmlFor="email" className={labelClassName}>
            {form.emailLabel}
          </FieldLabel>
          <Input
            id="email"
            type="email"
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
            id="password"
            type="password"
            placeholder={form.passwordPlaceholder}
            autoComplete="current-password"
            className={inputClassName}
          />
        </Field>

        <Button
          type="submit"
          className="mt-1 h-auto w-full rounded-[var(--radius-button)] py-[15px] text-[15px] font-semibold shadow-[var(--shadow-cta)]"
        >
          {form.submit}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
