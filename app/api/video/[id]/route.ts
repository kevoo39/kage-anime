import { NextResponse } from 'next/server';

const LUMA_URL = 'https://api.lumalabs.ai/dream-machine/v1/generations';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const apiKey = process.env.LUMA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Luma is not configured.' }, { status: 503 });
  }

  const { id } = await params;
  if (!id || !/^[a-zA-Z0-9-]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid generation id.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${LUMA_URL}/${id}`, {
      headers: { accept: 'application/json', authorization: `Bearer ${apiKey}` },
      cache: 'no-store',
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.detail || data?.message || 'Unable to retrieve generation.', details: data },
        { status: response.status },
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Unable to retrieve generation.' }, { status: 500 });
  }
}
