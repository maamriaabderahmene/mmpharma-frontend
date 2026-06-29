import type { Product } from '@/lib/shared/types/Product';
import { env } from '@/lib/env';

type Props = {
  product: Product;
  locale: string;
};

export function ProductJsonLd({ product, locale }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.code,
    productID: product.id,
    category: product.category,
    image: product.images?.map((img) => img.secureUrl) ?? [],
    url: `${env.MMP_APP_URL}/${locale}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'MM Pharma',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'MAD',
      price: '0',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0',
        priceCurrency: 'MAD',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
