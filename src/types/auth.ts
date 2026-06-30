export type AuthBrandCopy = {
  mark: string
  eyebrow: string
  headingLines: [string, string]
  paragraph: string
  socialProofPrefix: string
  socialProofCount: string
  socialProofSuffix: string
}

export type BrandPanelProps = {
  copy: AuthBrandCopy
  className?: string
}

export type LoginFormCopy = {
  heading: string
  newHerePrefix: string
  createAccount: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  submit: string
}

export type LoginCopy = {
  brand: AuthBrandCopy
  form: LoginFormCopy
}

export type LoginFormProps = {
  className?: string
}

export type RegisterTermsCopy = {
  prefix: string
  termsLink: string
  middle: string
  privacyLink: string
  suffix: string
}

export type RegisterFormCopy = {
  heading: string
  alreadyMemberPrefix: string
  signIn: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  submit: string
  divider: string
  google: string
  terms: RegisterTermsCopy
}

export type RegisterCopy = {
  brand: AuthBrandCopy
  form: RegisterFormCopy
}

export type RegisterFormProps = {
  className?: string
}
