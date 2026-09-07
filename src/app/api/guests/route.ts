import { NextResponse } from 'next/server';
import { getGuests, saveGuest } from '@/lib/db';

export async function GET() {
  try {
    const guests = await getGuests();
    return NextResponse.json({ success: true, data: guests });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Guest name and category are required' },
        { status: 400 }
      );
    }

    const saved = await saveGuest(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guest' },
      { status: 500 }
    );
  }
}
