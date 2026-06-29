import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/lib/env';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  overwrite?: boolean;
  invalidate?: boolean;
  transformation?: Array<Record<string, string | number>>;
}

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export async function uploadFromBuffer(
  buffer: Buffer,
  options: UploadOptions = {},
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.publicId,
        overwrite: options.overwrite ?? false,
        invalidate: options.invalidate ?? true,
        transformation: options.transformation,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Upload failed'));
        resolve({
          publicId: result.public_id,
          url: result.url,
          secureUrl: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      },
    );
    uploadStream.end(buffer);
  });
}

export async function uploadFromUrl(
  url: string,
  options: UploadOptions = {},
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(url, {
    folder: options.folder,
    public_id: options.publicId,
    overwrite: options.overwrite ?? false,
    invalidate: options.invalidate ?? true,
    transformation: options.transformation,
    resource_type: 'auto',
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteAsset(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { invalidate: true });
}

export interface SignedUploadPayload {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder?: string;
  uploadPreset?: string;
}

export function generateSignedUploadPayload(
  folder?: string,
): SignedUploadPayload {
  const timestamp = Math.round(Date.now() / 1000);
  const params: Record<string, string | number> = {
    timestamp,
    ...(folder && { folder }),
  };
  const signature = cloudinary.utils.api_sign_request(
    params,
    env.CLOUDINARY_API_SECRET,
  );

  return {
    signature,
    timestamp,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    folder,
    uploadPreset: env.CLOUDINARY_UPLOAD_PRESET,
  };
}
