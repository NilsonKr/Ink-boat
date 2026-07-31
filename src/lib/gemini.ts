import { GoogleGenAI } from '@google/genai'

/** One client per request — the key belongs to the signed-in user, not to the process. */
export const getGeminiClient = (apiKey: string) => new GoogleGenAI({ apiKey })
