export type { AIProvider } from '@/lib/db/generated/enums'

import type { AIProvider } from '@/lib/db/generated/enums'

export type ProviderMeta = {
  label: string
  keyPrefix: string
  placeholder: string
  consoleLabel: string
  consoleUrl: string
}

/** The only shape of a stored key that may cross to the client. */
export type ProviderKeySummary = {
  publicId: string
  provider: AIProvider
  label: string
  last4: string
}

export type ProviderKeyCheck = { status: 'valid' | 'invalid_key' | 'unreachable' }

export type SaveProviderKeyResult =
  | { status: 'saved'; key: ProviderKeySummary }
  | { status: 'invalid_input'; message: string }
  | { status: 'invalid_key' }
  | { status: 'unreachable' }
