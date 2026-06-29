import type { ObjectId } from './ObjectId';
import type { UserRole } from '@/lib/shared/constants/UserRole';
import type { UserStatus } from '@/lib/shared/constants/UserStatus';

/**
 * User preferences for customising the experience.
 */
export interface UserPreferences {
  /** UI theme preference */
  theme: string;
  /** Subscribed to newsletter */
  newsletter: boolean;
}

/**
 * Aggregated user statistics.
 */
export interface UserStats {
  /** Total number of orders placed */
  orderCount: number;
  /** Total number of comments written */
  commentCount: number;
}

/**
 * User entity representing a registered account.
 */
export interface User {
  /** Unique identifier */
  id: ObjectId;
  /** Email address (used for login) */
  email: string;
  /** Display name */
  name: string;
  /** Access control role */
  role: UserRole;
  /** Account status */
  status: UserStatus;
  /** Avatar image URL (Cloudinary) */
  avatar?: string;
  /** Contact phone number */
  phone?: string;
  /** Organisation or company name */
  company?: string;
  /** Locale code (e.g. fr-FR, en-US) */
  locale?: string;
  /** User customisation preferences */
  preferences?: UserPreferences;
  /** Aggregated user statistics */
  stats?: UserStats;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
  /** ISO-8601 timestamp of soft-deletion */
  deletedAt?: string;
}

/**
 * Input for creating a new user.
 */
export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Input for updating an existing user (all fields optional).
 */
export type UpdateUserInput = Partial<CreateUserInput>;
