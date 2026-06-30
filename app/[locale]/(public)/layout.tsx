import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLayout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <>
      <a href="#main" className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-deep-navy focus:rounded focus:outline-none">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
