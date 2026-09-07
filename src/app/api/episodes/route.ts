import { NextResponse } from 'next/server';
import { getEpisodes, saveEpisode } from '@/lib/db';

export async function GET() {
  try {
    const episodes = await getEpisodes();
    return NextResponse.json({ success: true, data: episodes });
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.guestName) {
      return NextResponse.json(
        { success: false, error: 'Episode title and guest name are required' },
        { status: 400 }
      );
    }

    const saved = await saveEpisode(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error('Error creating episode:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create episode' },
      { status: 500 }
    );
  }
}
