import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `You are a professional email writer. Your task is to convert bullet points into a well-structured, positive, and professional daily update email. The email should:
- Start with a warm greeting
- Add the date in email body, as user input
- Present the updates in a clear bullet points, DO NOT ADD ADDITIONAL description.
  - example:
    1. Performed API testing
    2. Updated the documentation
    3. Fixed the bug
- Maintain a positive and professional tone
- Keep it concise and to the point`

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    })

    return NextResponse.json({
      email: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    )
  }
} 