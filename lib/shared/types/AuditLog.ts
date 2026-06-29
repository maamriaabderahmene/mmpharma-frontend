import type { ObjectId } from './ObjectId';

/**
 * Auditable action identifier.
 */
export type AuditAction = string;

/**
 * Audit log entry recording an action performed by a user.
 */
export interface AuditLog {
  /** Unique identifier */
  id: ObjectId;
  /** User who performed the action */
  userId: ObjectId;
  /** Action identifier (e.g. create, update, delete, login) */
  action: AuditAction;
  /** Resource type acted upon (e.g. product, article) */
  resource: string;
  /** Identifier of the affected resource */
  resourceId?: string;
  /** Additional contextual details */
  details?: Record<string, unknown>;
  /** Request IP address */
  ip: string;
  /** Request User-Agent header */
  userAgent: string;
  /** ISO-8601 timestamp of the action */
  createdAt: string;
}

/**
 * Input for logging a new audit entry.
 */
export type CreateAuditLogInput = Omit<AuditLog, 'id' | 'createdAt'>;

/**
 * Input for updating an audit log entry (all fields optional; typically immutable).
 */
export type UpdateAuditLogInput = Partial<CreateAuditLogInput>;
