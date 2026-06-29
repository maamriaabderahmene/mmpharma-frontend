import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { withApi } from '@/lib/server/api/withApi';
import { requireAuth } from '@/lib/server/api/session';
import { env } from '@/lib/env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = withApi(async (req: NextRequest) => {
  requireAuth(req);

  const { folder, publicId } = await req.json();
  const timestamp = Math.round(Date.now() / 1000);
  const params: Record<string, string | number> = {
    timestamp,
    upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
  };
  if (folder) params.folder = folder;
  if (publicId) params.public_id = publicId;

  const signature = crypto
    .createHash('sha256')
    .update(
      Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, val]) => `${key}=${val}`)
        .join('&') + env.CLOUDINARY_API_SECRET,
    )
    .digest('hex');

  return NextResponse.json({
    data: {
      signature,
      timestamp,
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      uploadPreset: env.CLOUDINARY_UPLOAD_PRESET,
      folder: folder ?? undefined,
    },
  });
});
