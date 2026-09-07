import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminRootPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('antaara_admin_session');

  if (session && session.value === 'authenticated_editor_session_token') {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login');
  }
}
