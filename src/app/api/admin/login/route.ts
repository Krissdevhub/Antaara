import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || 'antaara2024';

    if (password === correctPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });

      // Set cookie for 7 days
      response.cookies.set({
        name: 'antaara_admin_session',
        value: 'authenticated_editor_session_token',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password. Access denied.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication process failed' },
      { status: 500 }
    );
  }
}
