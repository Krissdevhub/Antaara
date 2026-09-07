import { NextResponse } from 'next/server';
import { getEpisodes, saveEpisode, deleteEpisode } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const episodes = await getEpisodes();
    const episode = episodes.find((e) => e.id === id);

    if (!episode) {
      return NextResponse.json({ success: false, error: 'Episode not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: episode });
  } catch (error) {
    console.error('Error fetching episode:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch episode' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const episodes = await getEpisodes();
    const existing = episodes.find((e) => e.id === id);

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Episode not found' }, { status: 404 });
    }

    const updated = await saveEpisode({
      ...existing,
      ...body,
      id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating episode:', error);
    return NextResponse.json({ success: false, error: 'Failed to update episode' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteEpisode(id);
    return NextResponse.json({ success: true, message: 'Episode deleted successfully' });
  } catch (error) {
    console.error('Error deleting episode:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete episode' }, { status: 500 });
  }
}
