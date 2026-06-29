import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import { ApiError } from '@/lib/shared/utils/ApiError';
import type { Product, ProductFilter, ProductFacets } from '@/lib/shared/types/Product';
import type { ProductRange } from '@/lib/shared/constants/ProductRange';
import type { ProductCategory } from '@/lib/shared/constants/ProductCategory';
import type { Paginated } from '@/lib/shared/types/Paginated';
import { createProductSchema, updateProductSchema, productFilterSchema } from '@/lib/shared/schemas/product';
import ProductModel from '@/lib/server/db/models/Product';

/**
 * List products with filtering, sorting, and pagination.
 * @example
 * const result = await list({ range: 'hygiene', page: 1, limit: 20 });
 */
export async function list(filter: ProductFilter): Promise<Paginated<Product>> {
  productFilterSchema.parse(filter);
  await connectDB();

  const query: Record<string, unknown> = { deletedAt: null, isActive: true };
  if (filter.range) query.range = filter.range;
  if (filter.scent) query.scent = filter.scent;
  if (filter.conditionnement) query.conditionnement = filter.conditionnement;
  if (filter.haute !== undefined) query.isHauteGamme = filter.haute;
  if (filter.q) query.name = { $regex: filter.q, $options: 'i' };

  const page = filter.page ?? 1;
  const limit = filter.limit ?? 20;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
    ProductModel.countDocuments(query).exec(),
  ]);

  return { data: data as unknown as Product[], total, page, limit, totalPages: Math.ceil(total / limit) };
}

/**
 * Find a single product by its URL slug.
 * @example
 * const product = await bySlug('gel-nettoyant-visage');
 */
export async function bySlug(slug: string): Promise<Product | null> {
  await connectDB();
  const product = await ProductModel.findOne({ slug, deletedAt: null }).lean().exec();
  return product as Product | null;
}

/**
 * Find a single product by its code (SKU).
 * @example
 * const product = await byCode('MMP-HYG-001');
 */
export async function byCode(code: string): Promise<Product | null> {
  await connectDB();
  const product = await ProductModel.findOne({ code, deletedAt: null }).lean().exec();
  return product as Product | null;
}

/**
 * Create a new product.
 * @example
 * const product = await create({ code: 'MMP-HYG-001', name: 'Gel Nettoyant', ... });
 */
export async function create(input: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Product> {
  const parsed = createProductSchema.parse(input);
  await connectDB();
  const product = await ProductModel.create(parsed);
  return product.toObject() as unknown as Product;
}

/**
 * Update an existing product.
 * @throws {ApiError} NOT_FOUND
 * @example
 * const product = await update('64a...', { name: 'Updated Name' });
 */
export async function update(id: string, input: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Product> {
  const parsed = updateProductSchema.parse(input);
  await connectDB();
  const product = await ProductModel.findByIdAndUpdate(id, { $set: parsed }, { new: true }).exec();
  if (!product) throw new ApiError(404, 'NOT_FOUND', `Product ${id} not found`);
  return product.toObject() as unknown as Product;
}

/**
 * Soft-delete a product (set deletedAt timestamp).
 * @throws {ApiError} NOT_FOUND
 * @example
 * await softDelete('64a...');
 */
export async function softDelete(id: string): Promise<void> {
  await connectDB();
  const result = await ProductModel.findByIdAndUpdate(id, { $set: { deletedAt: new Date().toISOString() } }).exec();
  if (!result) throw new ApiError(404, 'NOT_FOUND', `Product ${id} not found`);
}

/**
 * Retrieve featured / highlighted products.
 * @example
 * const featured = await featured(6, 'fr-MA');
 */
export async function featured(limit: number, _locale: string): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find({ isHauteGamme: true, deletedAt: null, isActive: true })
    .sort({ createdAt: -1 }).limit(limit).lean().exec();
  return products as unknown as Product[];
}

/**
 * Retrieve related products for a given product.
 * @example
 * const related = await related(product, 4);
 */
export async function related(product: Product, limit: number): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find({
    _id: { $ne: product.id },
    range: product.range,
    deletedAt: null,
    isActive: true,
  }).sort({ createdAt: -1 }).limit(limit).lean().exec();
  return products as unknown as Product[];
}

/**
 * Retrieve all slugs for sitemap generation.
 * @example
 * const slugs = await allSlugs();
 */
export async function allSlugs(): Promise<{ slug: string }[]> {
  await connectDB();
  const docs = await ProductModel.find({ deletedAt: null, isActive: true }).select('slug').lean().exec();
  return docs as unknown as { slug: string }[];
}

/**
 * Retrieve aggregated product facet counts.
 * @example
 * const facets = await facets();
 */
export async function facets(): Promise<ProductFacets> {
  await connectDB();
  const [ranges, categories, scents, conditionnements] = await Promise.all([
    ProductModel.aggregate<{ _id: string; count: number }>([
      { $match: { deletedAt: null, isActive: true } },
      { $group: { _id: '$range', count: { $sum: 1 } } },
    ]).exec(),
    ProductModel.aggregate<{ _id: string; count: number }>([
      { $match: { deletedAt: null, isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]).exec(),
    ProductModel.aggregate<{ _id: string; count: number }>([
      { $match: { deletedAt: null, isActive: true, scent: { $exists: true, $ne: '' } } },
      { $group: { _id: '$scent', count: { $sum: 1 } } },
    ]).exec(),
    ProductModel.aggregate<{ _id: string; count: number }>([
      { $match: { deletedAt: null, isActive: true } },
      { $unwind: '$conditionnement' },
      { $group: { _id: '$conditionnement', count: { $sum: 1 } } },
    ]).exec(),
  ]);

  return {
    ranges: ranges.map((r) => ({ value: r._id as ProductRange, count: r.count })),
    categories: categories.map((c) => ({ value: c._id as ProductCategory, count: c.count })),
    scents: scents.map((s) => ({ value: s._id, count: s.count })),
    conditionnements: conditionnements.map((c) => ({ value: c._id, count: c.count })),
  };
}
