import 'server-only';
import mongoose, { Schema, Document } from 'mongoose';
import type { UserPreferences, UserStats } from '@/lib/shared/types/User';
import { UserRoleValues } from '@/lib/shared/constants/UserRole';
import { UserStatusValues } from '@/lib/shared/constants/UserStatus';

export interface UserDocument extends Document {
  email: string;
  name: string;
  role: number;
  status: string;
  avatar?: string;
  phone?: string;
  company?: string;
  locale?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const userPreferencesSchema = new Schema<UserPreferences>(
  {
    theme: { type: String, default: 'light' },
    newsletter: { type: Boolean, default: false },
  },
  { _id: false }
);

const userStatsSchema = new Schema<UserStats>(
  {
    orderCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: Number, required: true, default: 20, enum: UserRoleValues },
    status: { type: String, required: true, default: 'active', enum: UserStatusValues },
    avatar: { type: String },
    phone: { type: String },
    company: { type: String },
    locale: { type: String, default: 'fr-MA' },
    preferences: { type: userPreferencesSchema, default: () => ({ theme: 'light', newsletter: false }) },
    stats: { type: userStatsSchema, default: () => ({ orderCount: 0, commentCount: 0 }) },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

const User = mongoose.models.User ?? mongoose.model<UserDocument>('User', userSchema);

export default User;
