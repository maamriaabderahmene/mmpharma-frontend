import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleValues } from '@/lib/shared/constants/Locale';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import { I18nProvider } from '@/lib/i18n/client';
import { buildLocaleAlternates } from '@/lib/seo/alternates';
import { defaultMetadata } from '@/lib/seo/defaults';

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
    ...defaultMetadata,
    title: { default: 'MM Pharma', template: '%s' },
    alternates: buildLocaleAlternates(locale, ''),
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
