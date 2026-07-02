import { Brand } from '@/components/ui/Brand';
import { palette } from '@/theme/palette';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: `radial-gradient(60% 50% at 50% 0%, ${palette.primary[700]}55 0%, transparent 60%), ${palette.primary[900]}`,
      }}
    >
      <div className="mb-10">
        <Brand href={`/${locale}`} variant="light" size={48} />
      </div>
      <div
        className="w-full max-w-md p-8"
        style={{
          backgroundColor: palette.neutral[0],
          border: `1px solid ${palette.neutral[200]}`,
          borderRadius: 4,
          boxShadow: '0 24px 64px rgba(6,42,79,0.35)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
