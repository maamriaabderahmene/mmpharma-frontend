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
      <a
        href="#main"
        className="skip-link"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
