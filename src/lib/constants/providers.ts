import type { AIProvider, ProviderMeta } from '@/types/providers'

export const AI_PROVIDERS: Record<AIProvider, ProviderMeta> = {
  GEMINI: {
    label: 'Google (Gemini)',
    keyPrefix: 'AIza',
    placeholder: 'AIza…',
    consoleLabel: 'Google AI Studio',
    consoleUrl: 'https://aistudio.google.com/apikey',
  },
  ANTHROPIC: {
    label: 'Anthropic (Claude)',
    keyPrefix: 'sk-ant-',
    placeholder: 'sk-ant-…',
    consoleLabel: 'the Anthropic Console',
    consoleUrl: 'https://console.anthropic.com/settings/keys',
  },
}

/** Order the setup form offers the providers in. */
export const PROVIDER_OPTIONS: AIProvider[] = ['GEMINI', 'ANTHROPIC']

export const PROVIDER_KEY_COPY = {
  invalidKey: 'The provider rejected that key. Check it and try again.',
  unreachable: 'The provider did not answer. Try again in a moment.',
  prefixMismatch: 'That key does not match the provider you chose.',
  labelRequired: 'Name the key, so you can tell your keys apart later.',
  labelTooLong: 'Key name is too long.',
  keyTooShort: 'That key looks too short.',
  keyTooLong: 'That key looks too long.',
}
