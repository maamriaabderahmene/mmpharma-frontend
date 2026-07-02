import type { Metadata } from 'next';
import { Hero } from '@/components/sections/home/Hero';
import { Stats } from '@/components/sections/home/Stats';
import { Ranges } from '@/components/sections/home/Ranges';
import { FeaturedProducts } from '@/components/sections/home/FeaturedProducts';
import { Quality } from '@/components/sections/home/Quality';
import { AboutPreview } from '@/components/sections/home/AboutPreview';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { Insights } from '@/components/sections/home/Insights';
import { EventsTeaser } from '@/components/sections/home/EventsTeaser';
import { CommunityTeaser } from '@/components/sections/home/CommunityTeaser';
import { FAQ } from '@/components/sections/home/FAQ';
import { ContactCTA } from '@/components/sections/home/ContactCTA';
import { HiddenSEO } from '@/components/seo/HiddenSEO';
import { generateHiddenSEO } from '@/lib/seo/deepseek';
import { featured } from '@/lib/server/api/products.service';
import { latest } from '@/lib/server/api/articles.service';
import { next } from '@/lib/server/api/events.service';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'MM Pharma — Fabricant de produits d\'hygiène et de désinfection en Algérie',
    description: 'MM Pharma conçoit et fabrique des produits d\'hygiène, de désinfection et d\'entretien pour les professionnels en Algérie.',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}` },
    openGraph: {
      title: 'MM Pharma — Fabricant de produits d\'hygiène et de désinfection en Algérie',
      description: 'MM Pharma conçoit et fabrique des produits d\'hygiène, de désinfection et d\'entretien pour les professionnels en Algérie.',
      locale,
      siteName: 'MM Pharma',
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const [products, articles, upcoming] = await Promise.all([
    featured(6, locale).catch(() => []),
    latest(3, locale).catch(() => []),
    next(locale).then((e) => e[0] ?? null).catch(() => null),
  ]);

  const seoHtml = await generateHiddenSEO('generic', { name: 'Accueil', slug: '' }, locale);

  return (
    <>
      <HiddenSEO html={seoHtml} />
      <Hero />
      <Stats />
      <Ranges />
      <FeaturedProducts products={products} />
      <Quality />
      <AboutPreview />
      <Testimonials />
      <Insights articles={articles} />
      <EventsTeaser event={upcoming} />
      <CommunityTeaser />
      <FAQ />
      <ContactCTA />
    </>
  );
}
