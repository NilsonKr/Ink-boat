'use server'
import geminiClient from '@/lib/gemini'

export async function geminiMessage() {
  const response = await geminiClient.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: ['Hello Gemini!'],
    config: {
      // systemInstruction:
      //   'You rewrite prose. Return exactly 3 alternatives for the passage.',
      responseMimeType: 'application/json',
      // responseSchema: {
      // type: 'object',
      //   properties: {
      //     suggestions: {
      //       type: 'array',
      //       items: {
      //         type: 'object',
      //         properties: {
      //           text: { type: 'string' },
      //           rationale: { type: 'string' },
      //         },
      //         required: ['text', 'rationale'],
      //         propertyOrdering: ['text', 'rationale'],
      //       },
      //     },
      //   },
      //   required: ['suggestions'],
      // },
    },
  })

  const res = JSON.parse(response.text!)

  console.log(res)
}
