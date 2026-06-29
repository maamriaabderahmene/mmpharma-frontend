/**
 * User account statuses.
 */
export const UserStatus = {
  /** Account is active and usable */
  ACTIVE: 'active',
  /** Account is temporarily suspended */
  SUSPENDED: 'suspended',
  /** Account awaits email or admin verification */
  PENDING_VERIFICATION: 'pending-verification',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const UserStatusValues = Object.values(UserStatus) as readonly UserStatus[];
