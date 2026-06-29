import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { SeoEntry, CreateSeoEntryInput, UpdateSeoEntryInput } from '@/lib/shared/types/SeoEntry';
import { createSeoEntrySchema, updateSeoEntrySchema } from '@/lib/shared/schemas/seo';
import SeoModel from '@/lib/server/db/models/SeoEntry';

/**
 * Find an SEO entry by page path and locale.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const seo = await byPath('/products', 'fr-MA');
 */
export async function byPath(pagePath: string, locale: string): Promise<SeoEntry> {
  await connectDB();
  const entry = await SeoModel.findOne({ pagePath, locale }).lean().exec();
  if (!entry) throw new ApiError(404, 'NOT_FOUND', `SEO entry for ${pagePath} [${locale}] not found`);
  return entry as unknown as SeoEntry;
}

/**
 * Create or update an SEO entry for a given page path and locale.
 * @example
 * const seo = await upsert({ pagePath: '/products', locale: 'fr-MA', title: 'Produits', ... });
 */
export async function upsert(input: CreateSeoEntryInput): Promise<SeoEntry> {
  const parsed = createSeoEntrySchema.parse(input);
  await connectDB();
  const entry = await SeoModel.findOneAndUpdate(
    { pagePath: parsed.pagePath, locale: parsed.locale },
    { $set: parsed },
    { upsert: true, new: true },
  ).exec();
  return entry.toObject() as unknown as SeoEntry;
}

/**
 * Regenerate SEO metadata from rendered HTML content for a given entry.
 * @throws {ApiError} NOT_FOUND
 * @example
 * await regenerate('64a...', '<html><head><title>...</title></head></html>');
 */
export async function regenerate(id: string, html: string): Promise<void> {
  await connectDB();
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i);

  const update: Record<string, unknown> = { lastGeneratedAt: new Date().toISOString() };
  if (titleMatch?.[1]) update.title = titleMatch[1].trim();
  if (descMatch?.[1]) update.description = descMatch[1].trim();

  const result = await SeoModel.findByIdAndUpdate(id, { $set: update }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `SEO entry ${id} not found`);
}

/**
 * List SEO entries that have not been regenerated in the given number of days.
 * @example
 * const stale = await listStale(30);
 */
export async function listStale(days: number): Promise<SeoEntry[]> {
  await connectDB();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const entries = await SeoModel.find({
    $or: [
      { lastGeneratedAt: { $lt: cutoff.toISOString() } },
      { lastGeneratedAt: { $exists: false } },
    ],
  }).lean().exec();
  return entries as unknown as SeoEntry[];
}
