import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleValues } from '@/lib/shared/constants/Locale';
import { ProductRangeValues } from '@/lib/shared/constants/ProductRange';
import type { ProductFilter, ProductSortOption } from '@/lib/shared/types/Product';
import { getTranslations } from '@/lib/i18n/server';
import { CatalogHeader } from '@/components/sections/products/CatalogHeader';
import { CatalogFilters } from '@/components/sections/products/CatalogFilters';
import { CatalogResults } from '@/components/sections/products/CatalogResults';
import { CatalogPagination } from '@/components/sections/products/CatalogPagination';
import { safeSearch } from '@/lib/server/api/products.service';
import { buildPageMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    range?: string;
    scent?: string;
    conditionnement?: string;
    haute?: string;
    sort?: string;
    page?: string;
  }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function parseSort(raw: string | undefined): ProductSortOption | undefined {
  if (!raw) return undefined;
  const valid: ProductSortOption[] = ['popular', 'newest', 'name_asc', 'name_desc'];
  return valid.includes(raw as ProductSortOption) ? (raw as ProductSortOption) : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, 'products');
  return buildPageMetadata({
    locale,
    section: 'products',
    path: '/products',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!LocaleValues.includes(locale as typeof LocaleValues[number])) {
    notFound();
  }

  const sp = await searchParams;

  const filter: ProductFilter = {
    q: sp.q || undefined,
    range: sp.range && ProductRangeValues.includes(sp.range as (typeof ProductRangeValues)[number])
      ? (sp.range as (typeof ProductRangeValues)[number])
      : undefined,
    scent: sp.scent || undefined,
    conditionnement: sp.conditionnement || undefined,
    haute: sp.haute === 'true' ? true : sp.haute === 'false' ? false : undefined,
    sort: parseSort(sp.sort),
    page: sp.page ? Math.max(1, parseInt(sp.page, 10) || 1) : 1,
    limit: 20,
  };

  const { products, facets: facetsData } = await safeSearch(filter);

  const scents = (facetsData?.scents ?? []).map((s) => s.value);

  return (
    <>
      <CatalogHeader locale={locale} totalProducts={products.total} />
      <CatalogFilters locale={locale} scents={scents} />
      <CatalogResults locale={locale} products={products.data} />
      <CatalogPagination
        locale={locale}
        currentPage={products.page}
        totalPages={products.totalPages}
      />
    </>
  );
}
