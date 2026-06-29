import type { ObjectId } from './ObjectId';
import type { CloudinaryAsset } from './MediaAsset';

/**
 * SEO metadata entry for a given page path and locale.
 */
export interface SeoEntry {
  /** Unique identifier */
  id: ObjectId;
  /** Page path (e.g. /products, /about) */
  pagePath: string;
  /** Locale code (e.g. fr-FR, en-US) */
  locale: string;
  /** HTML title tag content */
  title: string;
  /** Meta description content */
  description: string;
  /** Canonical URL */
  canonical: string;
  /** Open Graph image */
  ogImage?: CloudinaryAsset;
  /** JSON-LD structured data */
  jsonLd?: Record<string, unknown>;
  /** Hidden HTML (e.g. H1 for SEO) */
  hiddenHtml?: string;
  /** Target keywords */
  keywords: string[];
  /** ISO-8601 timestamp of last regeneration */
  lastGeneratedAt?: string;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Input for creating a new SEO entry.
 */
export type CreateSeoEntryInput = Omit<SeoEntry, 'id' | 'lastGeneratedAt' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating an existing SEO entry (all fields optional).
 */
export type UpdateSeoEntryInput = Partial<CreateSeoEntryInput>;
