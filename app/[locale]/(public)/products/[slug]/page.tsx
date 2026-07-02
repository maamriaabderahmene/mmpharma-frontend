import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Grid, Breadcrumbs, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { LocaleValues } from '@/lib/shared/constants/Locale';
import { getTranslations } from '@/lib/i18n/server';
import { ProductGallery } from '@/components/sections/products/detail/ProductGallery';
import { ProductMeta } from '@/components/sections/products/detail/ProductMeta';
import { ProductTabs } from '@/components/sections/products/detail/ProductTabs';
import { RelatedProducts } from '@/components/sections/products/detail/RelatedProducts';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { HiddenSEO } from '@/components/seo/HiddenSEO';
import { env } from '@/lib/env';
import type { SeoEntry } from '@/lib/shared/types/SeoEntry';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 120;

export async function generateStaticParams() {
  try {
    const { allSlugs } = await import('@/lib/server/api/products.service');
    const slugs = await allSlugs();
    return slugs.flatMap(({ slug }) =>
      LocaleValues.map((locale) => ({ locale, slug })),
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const { getDetail } = await import('@/lib/server/api/products.service');
    const { product, seo } = await getDetail(slug, locale);
    const seoData = seo as SeoEntry | null;

    const title = seoData?.title
      ? `${seoData.title} | MM Pharma`
      : `${product.name} | MM Pharma`;
    const description = seoData?.description ?? product.description;
    const canonical = `${env.MMP_APP_URL}/${locale}/products/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: {
          'fr-MA': `${env.MMP_APP_URL}/fr-MA/products/${slug}`,
          'ar-MA': `${env.MMP_APP_URL}/ar-MA/products/${slug}`,
          'en-US': `${env.MMP_APP_URL}/en-US/products/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        images: product.images?.[0] ? [{ url: product.images[0].secureUrl }] : [],
      },
    };
  } catch {
    return { title: 'Produit | MM Pharma' };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!LocaleValues.includes(locale as typeof LocaleValues[number])) {
    notFound();
  }

  let product: Awaited<ReturnType<typeof import('@/lib/server/api/products.service').getDetail>>['product'];
  let related: Awaited<ReturnType<typeof import('@/lib/server/api/products.service').getDetail>>['related'];
  let seoData: SeoEntry | null = null;

  try {
    const { getDetail } = await import('@/lib/server/api/products.service');
    const result = await getDetail(slug, locale);
    product = result.product;
    related = result.related;
    seoData = result.seo as SeoEntry | null;
  } catch {
    notFound();
  }

  const t = await getTranslations(locale, 'nav');

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 5 }, pb: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link component={NextLink} underline="hover" color="inherit" href={`/${locale}`}>
            {t('home')}
          </Link>
          <Link component={NextLink} underline="hover" color="inherit" href={`/${locale}/products`}>
            {t('products')}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 3, md: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductGallery images={product.images} name={product.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductMeta product={product} locale={locale} />
          </Grid>
        </Grid>

        <ProductTabs product={product} locale={locale} />
      </Container>

      <RelatedProducts products={related} locale={locale} />

      {seoData?.hiddenHtml && <HiddenSEO html={seoData.hiddenHtml} />}
    </>
  );
}
