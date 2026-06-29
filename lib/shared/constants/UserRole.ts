/**
 * User role access levels.
 * Values are sent as integers over the wire.
 */
export const UserRole = {
  /** Guest user with minimal access */
  GUEST: 10,
  /** Registered customer */
  CUSTOMER: 20,
  /** Pro-tier customer */
  PRO: 30,
  /** Content editor */
  EDITOR: 40,
  /** Full administrative access */
  ADMIN: 99,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserRoleValues = Object.values(UserRole) as readonly UserRole[];
