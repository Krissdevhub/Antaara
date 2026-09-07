import { NextResponse } from 'next/server';
import { getGuests, saveGuest, deleteGuest } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const guests = await getGuests();
    const guest = guests.find((g) => g.id === id || g.slug === id);

    if (!guest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: guest });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch guest' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const guests = await getGuests();
    const existing = guests.find((g) => g.id === id);

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }

    const updated = await saveGuest({
      ...existing,
      ...body,
      id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating guest:', error);
    return NextResponse.json({ success: false, error: 'Failed to update guest' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteGuest(id);
    return NextResponse.json({ success: true, message: 'Guest deleted successfully' });
  } catch (error) {
    console.error('Error deleting guest:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete guest' }, { status: 500 });
  }
}
