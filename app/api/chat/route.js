import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body?.messages || [];
    const fileIds = body?.fileIds || [];

    const systemPrompt = `You are a friendly, patient School Tutor AI.
- Use the Socratic method to guide students.
- Never provide direct answers to homework, tests, exercises or exam questions.
- Ask questions, give hints, and break problems into small steps.
- Be encouraging and adapt explanations to the student's level.
- When a student uploads a document, you may refer to it to provide context and hints, but do not copy or produce final answers.
`;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const resp = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.6,
      max_tokens: 700
    });

    const reply = resp.choices?.[0]?.message || { role:'assistant', content: 'No reply' };
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
