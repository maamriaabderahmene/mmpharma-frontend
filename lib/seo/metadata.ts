import type { Metadata } from 'next';
import { buildLocaleAlternates } from '@/lib/seo/alternates';
import { buildTitle } from '@/lib/seo/title';

type PageMetaInput = {
  locale: string;
  path: string;
  section:
    | 'home'
    | 'products'
    | 'productDetail'
    | 'about'
    | 'contact'
    | 'blog'
    | 'events'
    | 'community'
    | 'faq'
    | 'account'
    | 'admin';
  title?: string;
  description?: string;
};

export async function buildPageMetadata(input: PageMetaInput): Promise<Metadata> {
  const title = await buildTitle(input.locale, input.section, input.title);

  return {
    title,
    description: input.description,
    alternates: buildLocaleAlternates(input.locale, input.path),
    openGraph: {
      title,
      description: input.description,
      url: `/${input.locale}${input.path}`,
    },
  };
}
