import 'server-only';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/server/auth/session';
import type { UserRole } from '@/lib/shared/constants/UserRole';

export async function requireAuth(nextPath: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/auth/signin?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}

export async function requireRole(minRole: UserRole, nextPath: string) {
  const session = await requireAuth(nextPath);
  if (session.role < minRole) {
    redirect('/?error=forbidden');
  }
  return session;
}

export async function getOptionalSession() {
  return getSession();
}
