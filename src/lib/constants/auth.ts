import type { LoginCopy, RegisterCopy } from '@/types/auth'

export const LOGIN_COPY: LoginCopy = {
  brand: {
    mark: 'Ink boat',
    eyebrow: 'Welcome back',
    headingLines: ['Your drafts have', 'been waiting.'],
    paragraph: 'Pick up the sentence you left unfinished.',
    socialProofPrefix: 'Joined by',
    socialProofCount: '48,000+',
    socialProofSuffix: 'writers',
  },
  form: {
    heading: 'Sign in',
    newHerePrefix: 'New here?',
    createAccount: 'Create an account →',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    submit: 'Sign in',
  },
}

export const REGISTER_COPY: RegisterCopy = {
  brand: {
    mark: 'Ink boat',
    eyebrow: 'Become a member',
    headingLines: ['Your next draft', 'starts here.'],
    paragraph: 'Home for everything you mean to write.',
    socialProofPrefix: 'Joined by',
    socialProofCount: '48,000+',
    socialProofSuffix: 'writers',
  },
  form: {
    heading: 'Create your account',
    alreadyMemberPrefix: 'Already a member?',
    signIn: 'Sign in →',
    nameLabel: 'Name',
    namePlaceholder: 'Jane Doe',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '8+ characters',
    submit: 'Create account',
    divider: 'or',
    google: 'Continue with Google',
    terms: {
      prefix: 'By creating an account you agree to our',
      termsLink: 'Terms',
      middle: 'and',
      privacyLink: 'Privacy Policy',
      suffix: '.',
    },
  },
}
