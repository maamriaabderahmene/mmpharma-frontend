import { env } from '@/lib/env';

export function buildAlternates(pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return {
    canonical: `${env.MMP_APP_URL}/fr-MA${normalized}`,
    languages: {
      'fr-MA': `${env.MMP_APP_URL}/fr-MA${normalized}`,
      'ar-MA': `${env.MMP_APP_URL}/ar-MA${normalized}`,
      'en-US': `${env.MMP_APP_URL}/en-US${normalized}`,
      'x-default': `${env.MMP_APP_URL}/fr-MA${normalized}`,
    },
  };
}

export function buildLocaleAlternates(locale: string, pathname: string) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return {
    canonical: `${env.MMP_APP_URL}/${locale}${normalized}`,
    languages: {
      'fr-MA': `${env.MMP_APP_URL}/fr-MA${normalized}`,
      'ar-MA': `${env.MMP_APP_URL}/ar-MA${normalized}`,
      'en-US': `${env.MMP_APP_URL}/en-US${normalized}`,
      'x-default': `${env.MMP_APP_URL}/fr-MA${normalized}`,
    },
  };
}
