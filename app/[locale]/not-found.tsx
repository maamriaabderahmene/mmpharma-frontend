import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NotFoundPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-deep-navy bg-mesh flex flex-col items-center justify-center p-4 text-center">
      <h1 className="font-heading text-8xl md:text-9xl text-gold logo-glow animate-float">404</h1>
      <p className="text-gray-400 text-lg mt-4 max-w-md">
        Page introuvable. Peut-être a-t-elle été déplacée ou supprimée.
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 px-6 py-3 rounded bg-gold text-deep-navy font-semibold hover:bg-amber transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
