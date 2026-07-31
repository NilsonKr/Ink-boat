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
    models: [
      { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
      { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
    ],
  },
  ANTHROPIC: {
    label: 'Anthropic (Claude)',
    keyPrefixes: ['sk-ant-'],
    placeholder: 'sk-ant-••••••••••••',
    keyNameExample: 'Claude — personal',
    consoleLabel: 'the Anthropic Console',
    consoleUrl: 'https://console.anthropic.com/settings/keys',
    models: [
      { id: 'claude-opus-5', label: 'Claude Opus 5' },
      { id: 'claude-sonnet-5', label: 'Claude Sonnet 5' },
      { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5' },
    ],
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
