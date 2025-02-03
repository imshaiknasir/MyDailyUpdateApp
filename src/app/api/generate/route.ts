import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'

export const dynamic = 'force-dynamic'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `You are a professional email writer specializing in creating concise and effective daily update emails. Your task is to generate a well-structured, positive, and professional email based on the provided date and updates.

Instructions:
1. Create an email with the following elements:
   a. A warm, professional greeting
   b. The provided date
   c. A list of updates presented as clear, concise bullet points
   d. A brief, positive closing.
      - And as this is the final update of the day, it should be more positive and encouraging closing statements. [Keep it as short as possible]
      - But not these:
        - "I'm confident that these efforts will contribute to our ongoing success and improvement. Thank you for your hard work and dedication."
        - "If you have any questions or need assistance, please don't hesitate to reach out."
        - "If you have any questions or need further updates, please don't hesitate to reach out."
   e. A signature greeting
      - Like:
        - "Best regards,"
        - "Warm regards,"


Important guidelines:
- Maintain a professional and positive tone throughout the email.
- Keep the email concise and to the point.
- Enhance the updates, provided by the user, so that it sounds positive and professional.
- Ensure the email is well-structured and easy to read.

Here's an example of the desired email structure:

"""
Subject: Daily Update - [Date]

Dear [Appropriate Greeting],

I hope this email finds you well. Here's my daily update for [Date]:

• [Update 1]
• [Update 2]
• [Update 3]
• ...

[Brief, positive closing]

Best regards,
[Your Name]
"""

Please generate the email based on these instructions and the provided inputs.
`

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

    if (!completion.choices?.[0]?.message?.content) {
      console.error('Invalid API response:', completion)
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      email: completion.choices[0].message.content,
    })
  } catch (error) {
    // Log the full error for debugging
    console.error('Detailed error:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    })

    return NextResponse.json(
      { error: 'Failed to generate email: ' + (error as Error).message },
      { status: 500 }
    )
  }
} 