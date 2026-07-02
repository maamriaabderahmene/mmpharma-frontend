import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { Product, ProductFilter, ProductFacets, CreateProductInput, UpdateProductInput } from '@/lib/shared/types/Product';
import type { Paginated } from '@/lib/shared/types/Paginated';
import type { SessionPayload } from '@/lib/shared/types/Session';
import * as productsRepo from './products.repo';
import * as seoRepo from './seo.repo';
import * as mediaRepo from './media.repo';
import * as auditRepo from './audit.repo';

const emptyFacets: ProductFacets = {
  ranges: [],
  categories: [],
  scents: [],
  conditionnements: [],
};

const emptyPage = (filter: ProductFilter): Paginated<Product> => ({
  data: [],
  total: 0,
  page: filter.page ?? 1,
  limit: filter.limit ?? 20,
  totalPages: 0,
});

function isDbReachable(): boolean {
  return Boolean(process.env.MONGO_URI && process.env.MONGO_URI.length > 0);
}

export async function search(filter: ProductFilter): Promise<{ products: Paginated<Product>; facets: ProductFacets }> {
  if (!isDbReachable()) {
    return { products: emptyPage(filter), facets: emptyFacets };
  }
  try {
    const products = await productsRepo.list(filter);
    const facets = await productsRepo.facets();
    return { products, facets };
  } catch (err) {
    console.error('[products.search] failed', { filter, err: (err as Error).message });
    return { products: emptyPage(filter), facets: emptyFacets };
  }
}

export async function getDetail(slug: string, locale = 'fr-MA'): Promise<{ product: Product; related: Product[]; seo: unknown }> {
  if (!isDbReachable()) {
    throw new ApiError(404, 'NOT_FOUND', `Product ${slug} not found`);
  }
  try {
    const product = await productsRepo.bySlug(slug);
    if (!product) {
      throw new ApiError(404, 'NOT_FOUND', `Product with slug ${slug} not found`);
    }
    const related = await productsRepo.related(product, 4);
    let seo = null;
    try {
      seo = await seoRepo.byPath(`/products/${slug}`, locale);
    } catch {
      seo = null;
    }
    return { product, related, seo };
  } catch (err) {
    if (err instanceof ApiError) throw err;
    console.error('[products.getDetail] failed', { slug, err: (err as Error).message });
    throw new ApiError(404, 'NOT_FOUND', `Product ${slug} not found`);
  }
}

export async function create(input: CreateProductInput, session: SessionPayload): Promise<Product> {
  if (session.role < UserRole.ADMIN) {
    throw new ApiError(403, 'FORBIDDEN', 'Only admins can create products');
  }

  const product = await productsRepo.create(input);

  if (input.images?.[0]?.publicId) {
    try {
      await mediaRepo.byPublicId(input.images[0].publicId);
    } catch {
      const result = await cloudinary.uploader.upload(input.images[0].publicId, {
        folder: 'products',
      });
      await mediaRepo.create({
        publicId: result.public_id,
        url: result.url,
        secureUrl: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        folder: 'product' as const,
        kind: 'image' as const,
        alt: product.name,
        productId: product.id,
      });
    }
  }

  await auditRepo.create({
    userId: session.userId,
    action: 'create_product',
    resource: 'product',
    resourceId: product.id,
    ip: '',
    userAgent: '',
  });

  return product;
}

export async function update(id: string, input: UpdateProductInput, session: SessionPayload): Promise<Product> {
  if (session.role < UserRole.ADMIN) {
    throw new ApiError(403, 'FORBIDDEN', 'Only admins can update products');
  }

  const product = await productsRepo.update(id, input);

  await auditRepo.create({
    userId: session.userId,
    action: 'update_product',
    resource: 'product',
    resourceId: id,
    ip: '',
    userAgent: '',
  });

  return product;
}

export async function softDelete(id: string, session: SessionPayload): Promise<void> {
  if (session.role < UserRole.ADMIN) {
    throw new ApiError(403, 'FORBIDDEN', 'Only admins can delete products');
  }

  await productsRepo.softDelete(id);

  await auditRepo.create({
    userId: session.userId,
    action: 'delete_product',
    resource: 'product',
    resourceId: id,
    ip: '',
    userAgent: '',
  });
}

export async function featured(limit = 6, locale = 'fr-MA'): Promise<Product[]> {
  if (!isDbReachable()) return [];
  try {
    return await productsRepo.featured(limit, locale);
  } catch (err) {
    console.error('[products.featured] failed', { err: (err as Error).message });
    return [];
  }
}

export async function related(product: Product, limit = 4): Promise<Product[]> {
  if (!isDbReachable()) return [];
  try {
    return await productsRepo.related(product, limit);
  } catch (err) {
    console.error('[products.related] failed', { err: (err as Error).message });
    return [];
  }
}

export async function allSlugs(): Promise<{ slug: string }[]> {
  if (!isDbReachable()) return [];
  try {
    return await productsRepo.allSlugs();
  } catch (err) {
    console.error('[products.allSlugs] failed', { err: (err as Error).message });
    return [];
  }
}
