import type { ObjectId } from './ObjectId';
import type { UserRole } from '@/lib/shared/constants/UserRole';

/**
 * Authenticated session payload stored in the JWT or session token.
 */
export interface SessionPayload {
  /** Authenticated user identifier */
  userId: ObjectId;
  /** Authenticated user email */
  email: string;
  /** User role for authorization checks */
  role: UserRole;
  /** User locale preference */
  locale?: string;
  /** ISO-8601 timestamp or Unix epoch when the session expires */
  expiresAt: string;
}
