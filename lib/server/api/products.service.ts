import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '@/lib/shared/utils/ApiError';
import { UserRole } from '@/lib/shared/constants/UserRole';
import type { Product, ProductFilter, ProductFacets, Paginated, CreateProductInput, UpdateProductInput } from '@/lib/shared/types/Product';
import type { SessionPayload } from '@/lib/shared/types/Session';
import * as productsRepo from './products.repo';
import * as seoRepo from './seo.repo';
import * as mediaRepo from './media.repo';
import { create as createAuditLog } from './audit.repo';
import { cacheHeaders } from './cache';

export async function search(filter: ProductFilter): Promise<{ products: Paginated<Product>; facets: ProductFacets }> {
  const products = await productsRepo.list(filter);
  const facets = await productsRepo.facets();
  return { products, facets };
}

export async function getDetail(slug: string, locale = 'fr-MA'): Promise<{ product: Product; related: Product[]; seo: unknown }> {
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
        folder: 'products' as const,
        kind: 'image' as const,
        alt: product.name,
        productId: product.id,
      });
    }
  }

  await createAuditLog({
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

  await createAuditLog({
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

  await createAuditLog({
    userId: session.userId,
    action: 'delete_product',
    resource: 'product',
    resourceId: id,
    ip: '',
    userAgent: '',
  });
}

export async function featured(limit = 6, locale = 'fr-MA'): Promise<Product[]> {
  return productsRepo.featured(limit, locale);
}

export async function related(product: Product, limit = 4): Promise<Product[]> {
  return productsRepo.related(product, limit);
}

export async function allSlugs(): Promise<{ slug: string }[]> {
  return productsRepo.allSlugs();
}
