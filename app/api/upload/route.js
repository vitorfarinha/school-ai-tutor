import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const uploaded = await client.files.create({
      file: new Blob([arrayBuffer]),
      purpose: 'assistants'
    });

    return NextResponse.json({ fileId: uploaded.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
