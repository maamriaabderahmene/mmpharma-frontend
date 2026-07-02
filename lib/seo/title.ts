import { getTranslations } from '@/lib/i18n/server';

type MetaSection =
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

const FALLBACKS: Record<MetaSection, string> = {
  home: 'MM Pharma — L’hygiène pharmaceutique, formulée en Algérie.',
  products: 'Catalogue · MM Pharma',
  productDetail: 'Produit · MM Pharma',
  about: 'À propos · MM Pharma',
  contact: 'Contact · MM Pharma',
  blog: 'Blog · MM Pharma',
  events: 'Événements · MM Pharma',
  community: 'Communauté · MM Pharma',
  faq: 'FAQ · MM Pharma',
  account: 'Espace client · MM Pharma',
  admin: 'Tableau de bord · MM Pharma',
};

const NAV_NAMESPACE_BY_SECTION: Partial<Record<MetaSection, string>> = {
  products: 'products',
  about: 'about',
  contact: 'contact',
  blog: 'blog',
  events: 'events',
  community: 'community',
  faq: 'faq',
};

export async function buildTitle(locale: string, section: MetaSection, explicit?: string): Promise<string> {
  if (explicit) {
    return section === 'home' ? explicit : `${explicit} · MM Pharma`;
  }

  if (section === 'home') return FALLBACKS.home;
  if (section === 'productDetail') return FALLBACKS.productDetail;
  if (section === 'account') return FALLBACKS.account;
  if (section === 'admin') return FALLBACKS.admin;

  const namespace = NAV_NAMESPACE_BY_SECTION[section];
  if (!namespace) return FALLBACKS[section];

  try {
    const t = await getTranslations(locale, 'nav');
    const localized = t(namespace);
    return `${localized} · MM Pharma`;
  } catch {
    return FALLBACKS[section];
  }
}
