import { NextResponse } from 'next/server';

const LUMA_URL = 'https://api.lumalabs.ai/dream-machine/v1/generations';

type Keyframe = { type: 'image' | 'generation'; url?: string; id?: string };

export async function POST(request: Request) {
  const apiKey = process.env.LUMA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Luma is not configured. Add LUMA_API_KEY to the Vercel project environment variables.' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (prompt.length < 3) {
      return NextResponse.json({ error: 'Prompt must be at least 3 characters.' }, { status: 400 });
    }
    if (prompt.length > 5000) {
      return NextResponse.json({ error: 'Prompt must be 5000 characters or fewer.' }, { status: 400 });
    }

    const payload: Record<string, unknown> = {
      prompt,
      model: body.model === 'ray-flash-2' ? 'ray-flash-2' : 'ray-2',
      aspect_ratio: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9', '9:21'].includes(body.aspectRatio)
        ? body.aspectRatio
        : '16:9',
    };

    if (['540p', '720p', '1080', '4k'].includes(body.resolution)) payload.resolution = body.resolution;
    if (['5s', '9s'].includes(body.duration)) payload.duration = body.duration;
    if (body.loop === true) payload.loop = true;

    const keyframes: Record<string, Keyframe> = {};
    if (typeof body.startImageUrl === 'string' && body.startImageUrl.startsWith('http')) {
      keyframes.frame0 = { type: 'image', url: body.startImageUrl };
    }
    if (typeof body.endImageUrl === 'string' && body.endImageUrl.startsWith('http')) {
      keyframes.frame1 = { type: 'image', url: body.endImageUrl };
    }
    if (Object.keys(keyframes).length) payload.keyframes = keyframes;

    const response = await fetch(LUMA_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { error: data?.detail || data?.message || 'Luma rejected the generation request.', details: data },
        { status: response.status },
      );
    }

    return NextResponse.json({ id: data.id, state: data.state, generation: data });
  } catch {
    return NextResponse.json({ error: 'Unable to start the video generation.' }, { status: 500 });
  }
}
