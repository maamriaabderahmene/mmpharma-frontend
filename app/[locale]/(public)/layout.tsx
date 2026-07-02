import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { palette } from '@/theme/palette';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLayout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <>
      <a
        href="#main"
        className="skip-link focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-deep-navy focus:text-gold focus:rounded focus:outline-none"
        style={{
          backgroundColor: palette.primary[500],
          color: palette.neutral[0],
        }}
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
