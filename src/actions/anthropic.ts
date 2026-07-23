'use server'
import anthropicClient from '@/lib/anthropic'

export const anthropicMessage = async () => {
  const resBlocks = await anthropicClient.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Hello Claude!' }],
    model: 'claude-haiku-4-5',
  })

  for (const block of resBlocks.content) {
    if (block.type === 'text') {
      console.log(block.text)
      return block.text
    }
  }
}
