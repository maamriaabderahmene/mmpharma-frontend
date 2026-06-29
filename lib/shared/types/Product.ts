import type { ObjectId } from './ObjectId';
import type { CloudinaryAsset } from './MediaAsset';
import type { ProductRange } from '@/lib/shared/constants/ProductRange';
import type { ProductCategory } from '@/lib/shared/constants/ProductCategory';

/**
 * Microbiological analysis results for a product.
 */
export interface ProductMicrobio {
  /** Total germ count result */
  germes: string;
  /** Yeast count result */
  levures: string;
  /** Escherichia coli detection result */
  escherichiaColi: string;
  /** Pseudomonas aeruginosa detection result */
  pseudomonasAeruginosa: string;
  /** Staphylococcus aureus detection result */
  staphylococcusAureus: string;
  /** Candida albicans detection result */
  candidaAlbicans: string;
  /** Overall conclusion of the analysis */
  conclusion?: string;
}

/**
 * Full product entity.
 */
export interface Product {
  /** Unique identifier */
  id: ObjectId;
  /** Product code (SKU) */
  code: string;
  /** Product display name */
  name: string;
  /** Product range affiliation */
  range: ProductRange;
  /** Product category */
  category: ProductCategory;
  /** Fragrance or scent descriptor */
  scent?: string;
  /** Long-form marketing description */
  description: string;
  /** List of therapeutic indications */
  indications: string[];
  /** List of ingredients / composition */
  composition: string[];
  /** Available packaging formats */
  conditionnement: string[];
  /** Usage instructions */
  modeUtilisation: string[];
  /** Microbiological analysis data */
  microbiologie?: ProductMicrobio;
  /** Product images */
  images: CloudinaryAsset[];
  /** Product PDF documents (e.g. technical sheets) */
  pdfs: CloudinaryAsset[];
  /** Associated tags */
  tags: string[];
  /** Whether this is a premium (haute gamme) product */
  isHauteGamme: boolean;
  /** Whether the product is active and visible */
  isActive: boolean;
  /** URL-friendly slug */
  slug: string;
  /** ISO-8601 timestamp of creation */
  createdAt: string;
  /** ISO-8601 timestamp of last update */
  updatedAt: string;
  /** ISO-8601 timestamp of soft-deletion */
  deletedAt?: string;
}

/**
 * Product search and filter parameters.
 */
export interface ProductFilter {
  /** Full-text search query */
  q?: string;
  /** Filter by product range */
  range?: ProductRange;
  /** Filter by scent */
  scent?: string;
  /** Filter by packaging format */
  conditionnement?: string;
  /** Filter by premium (haute gamme) only */
  haute?: boolean;
  /** Sort option */
  sort?: ProductSortOption;
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
}

/**
 * Available product sort options.
 */
export type ProductSortOption = 'popular' | 'newest' | 'name_asc' | 'name_desc';

/**
 * Aggregated product facet counts for faceted search.
 */
export interface ProductFacets {
  /** Counts per product range */
  ranges: Array<{ value: ProductRange; count: number }>;
  /** Counts per product category */
  categories: Array<{ value: ProductCategory; count: number }>;
  /** Counts per scent */
  scents: Array<{ value: string; count: number }>;
  /** Counts per packaging format */
  conditionnements: Array<{ value: string; count: number }>;
}

/**
 * Input for creating a new product.
 */
export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

/**
 * Input for updating an existing product (all fields optional).
 */
export type UpdateProductInput = Partial<CreateProductInput>;
