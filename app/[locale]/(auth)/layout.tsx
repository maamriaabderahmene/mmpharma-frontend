import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-deep-navy bg-mesh flex flex-col items-center justify-center p-4">
      <Link href={`/${locale}`} className="mb-8">
        <h1 className="font-heading text-3xl text-gold logo-glow">MM Pharma</h1>
      </Link>
      <div className="w-full max-w-md glass-card rounded-2xl p-8">
        {children}
      </div>
    </div>
  );
}
