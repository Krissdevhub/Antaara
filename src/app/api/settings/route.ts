import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({
      success: true,
      data: settings,
      supabaseConnected: isSupabaseConfigured,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateSettings(body);
    return NextResponse.json({
      success: true,
      data: updated,
      supabaseConnected: isSupabaseConfigured,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
