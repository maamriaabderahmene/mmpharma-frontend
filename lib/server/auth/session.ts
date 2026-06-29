import 'server-only';
import { cookies } from 'next/headers';
import type { SessionPayload } from '@/lib/shared/types/Session';

const SESSION_COOKIE = 'mmpharma_session';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf-8')) as SessionPayload;
  } catch {
    return null;
  }
}

export function buildSessionCookie(payload: SessionPayload): {
  name: string;
  value: string;
  options: typeof COOKIE_OPTIONS;
} {
  const value = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64url');
  return { name: SESSION_COOKIE, value, options: COOKIE_OPTIONS };
}

export function clearSessionCookieConfig(): {
  name: string;
  value: string;
  options: { httpOnly: true; path: string; maxAge: 0 };
} {
  return { name: SESSION_COOKIE, value: '', options: { httpOnly: true, path: '/', maxAge: 0 } };
}
