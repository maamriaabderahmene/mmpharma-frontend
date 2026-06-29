import 'server-only';
import { NextRequest } from 'next/server';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { SessionPayload } from '@/lib/shared/types/Session';

const SESSION_COOKIE = 'mmpharma_session';

export function getSessionFromRequest(req: NextRequest): SessionPayload | null {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf-8')) as SessionPayload;
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest): SessionPayload {
  const session = getSessionFromRequest(req);
  if (!session) throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
  return session;
}

export function requireRole(req: NextRequest, ...roles: number[]): SessionPayload {
  const session = requireAuth(req);
  if (!roles.includes(session.role)) {
    throw new ApiError(403, 'FORBIDDEN', 'Insufficient permissions');
  }
  return session;
}

export function buildSessionCookie(payload: SessionPayload): {
  name: string;
  value: string;
  options: Record<string, unknown>;
} {
  const value = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64url');
  return {
    name: SESSION_COOKIE,
    value,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

export function clearSessionCookie(): {
  name: string;
  value: string;
  options: Record<string, unknown>;
} {
  return {
    name: SESSION_COOKIE,
    value: '',
    options: { httpOnly: true, path: '/', maxAge: 0 },
  };
}
