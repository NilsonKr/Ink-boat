import { z } from 'zod'

/**
 * No `.length()` or `.min()` on the array. Structured outputs drops array-count constraints
 * from the schema it sends and then checks them on our side, so a short answer would throw
 * instead of degrading. The count is asked for in the prompt and trimmed after the parse.
 */
export const suggestionRunSchema = z.object({
  suggestions: z.array(
    z.object({
      tone: z.string().describe('One or two words naming the register, e.g. Warmer.'),
      text: z.string().describe('The replacement for the passage, as plain prose.'),
    })
  ),
})

export type SuggestionRunOutput = z.infer<typeof suggestionRunSchema>
