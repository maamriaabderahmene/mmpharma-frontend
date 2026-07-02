import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleValues } from '@/lib/shared/constants/Locale';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import { I18nProvider } from '@/lib/i18n/client';
import { env } from '@/lib/env';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const isRtl = (locale: string) => locale === 'ar-MA';

export async function generateStaticParams() {
  return LocaleValues.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { default: 'MM Pharma', template: '%s | MM Pharma' },
    description: "Fabricant de produits d'hygiène et de désinfection au Maroc",
    alternates: {
      canonical: `${env.MMP_APP_URL}/${locale}`,
      languages: {
        'fr-MA': `${env.MMP_APP_URL}/fr-MA`,
        'ar-MA': `${env.MMP_APP_URL}/ar-MA`,
        'en-US': `${env.MMP_APP_URL}/en-US`,
        'x-default': `${env.MMP_APP_URL}/fr-MA`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!LocaleValues.includes(locale as typeof LocaleValues[number])) {
    notFound();
  }

  let messages: Record<string, unknown>;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = {};
  }

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <I18nProvider messages={messages}>{children}</I18nProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
