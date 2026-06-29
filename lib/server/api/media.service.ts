import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { SessionPayload } from '@/lib/shared/types/Session';
import * as mediaRepo from './media.repo';
import { create as createAuditLog } from './audit.repo';

interface SignUploadInput {
  folder: string;
  publicId?: string;
}

export async function signUpload(input: SignUploadInput, session: SessionPayload): Promise<{
  signature: string;
  timestamp: number;
  publicId: string;
  folder: string;
}> {
  const timestamp = Math.round(Date.now() / 1000);
  const publicId = input.publicId ?? `${input.folder}/${crypto.randomUUID()}`;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: input.folder,
      public_id: publicId,
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  await createAuditLog({
    userId: session.userId,
    action: 'sign_upload',
    resource: 'media',
    resourceId: publicId,
    ip: '',
    userAgent: '',
  });

  return { signature, timestamp, publicId, folder: input.folder };
}

export async function deleteMedia(publicId: string, session: SessionPayload): Promise<void> {
  if (session.role < UserRole.ADMIN) {
    throw new ApiError(403, 'FORBIDDEN', 'Only admins can delete media');
  }

  const asset = await mediaRepo.byPublicId(publicId);

  await cloudinary.uploader.destroy(publicId);

  await mediaRepo.softDelete(asset.id);

  await createAuditLog({
    userId: session.userId,
    action: 'delete_media',
    resource: 'media',
    resourceId: publicId,
    ip: '',
    userAgent: '',
  });
}
