import { Anthropic } from '@anthropic-ai/sdk'

/** One client per request — the key belongs to the signed-in user, not to the process. */
export const getAnthropicClient = (apiKey: string) => new Anthropic({ apiKey })
