import 'server-only';
import { z } from 'zod';

const envSchema = z.object({
  // App
  MMP_APP_URL: z.string().url().default('http://localhost:3000'),
  MMP_DEFAULT_LOCALE: z.string().default('fr-MA'),
  MMP_SUPPORTED_LOCALES: z.string().default('fr-MA,ar-MA,en-US'),

  // MongoDB
  MONGO_URI: z.string(),
  MONGO_DB_NAME: z.string().default('mmpharma'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_UPLOAD_PRESET: z.string(),

  // DeepSeek
  DEEPSEEK_API_KEY: z.string(),
  DEEPSEEK_MODEL: z.string().default('deepseek-chat'),

  // Sentry
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

  // Upstash
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
