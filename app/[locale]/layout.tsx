import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { LocaleValues } from '@/lib/shared/constants/Locale';
import ThemeRegistry from '@/components/providers/ThemeRegistry';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '600'],
});

const isRtl = (locale: string) => locale === 'ar-MA';

export async function generateStaticParams() {
  return LocaleValues.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { default: 'MM Pharma', template: '%s | MM Pharma' },
    description: "Fabricant de produits d'hygiène et de désinfection au Maroc",
    alternates: { canonical: `https://www.mmpharma.ma/${locale}` },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!LocaleValues.includes(locale as typeof LocaleValues[number])) {
    notFound();
  }

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
