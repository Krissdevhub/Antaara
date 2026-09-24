import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminPassword, saveAdminPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('antaara_admin_session');

    if (!session || session.value !== 'authenticated_editor_session_token') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in first.' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields (Current, New, Confirm) are required.' },
        { status: 400 }
      );
    }

    // Verify current password
    const isCurrentValid = verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect. Please try again.' },
        { status: 400 }
      );
    }

    // Check confirm password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'New password and confirm password do not match.' },
        { status: 400 }
      );
    }

    // Length check
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Must be different
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { success: false, error: 'New password must be different from current password.' },
        { status: 400 }
      );
    }

    const saved = saveAdminPassword(newPassword);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Server error while saving new password.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin password updated successfully!',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update password.' },
      { status: 500 }
    );
  }
}
