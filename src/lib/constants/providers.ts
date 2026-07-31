import type { AIProvider, ProviderMeta } from '@/types/providers'

export const AI_PROVIDERS: Record<AIProvider, ProviderMeta> = {
  GEMINI: {
    label: 'Google (Gemini)',
    // Google AI Studio issues `AQ.Ab…` today, but keys made before the change start
    // with `AIza…` and still work.
    keyPrefixes: ['AQ.Ab', 'AIza'],
    placeholder: 'AQ.Ab••••••••••••',
    keyNameExample: 'Gemini — personal',
    consoleLabel: 'Google AI Studio',
    consoleUrl: 'https://aistudio.google.com/apikey',
  },
  ANTHROPIC: {
    label: 'Anthropic (Claude)',
    keyPrefixes: ['sk-ant-'],
    placeholder: 'sk-ant-••••••••••••',
    keyNameExample: 'Claude — personal',
    consoleLabel: 'the Anthropic Console',
    consoleUrl: 'https://console.anthropic.com/settings/keys',
  },
}

/** Order the setup form offers the providers in. */
export const PROVIDER_OPTIONS: AIProvider[] = ['GEMINI', 'ANTHROPIC']

export const PROVIDER_KEY_COPY = {
  invalidKey: 'The provider rejected that key. Check it and try again.',
  unreachable: 'The provider did not answer. Try again in a moment.',
  saveFailed: 'The key is good, but we could not store it. Try again.',
  prefixMismatch: 'That key does not match the provider you chose.',
  labelRequired: 'Name the key, so you can tell your keys apart later.',
  labelTooLong: 'Key name is too long.',
  keyTooShort: 'That key looks too short.',
  keyTooLong: 'That key looks too long.',
}
