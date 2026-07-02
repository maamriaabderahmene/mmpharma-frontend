import { redirect } from 'next/navigation';
import { getOptionalSession } from '@/lib/server/auth/guards';
import { UserRole } from '@/lib/shared/constants/UserRole';
import { LayoutFrame } from '@/components/admin/LayoutFrame';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  const session = await getOptionalSession();

  if (!session || session.role < UserRole.ADMIN) {
    redirect(`/${locale}/auth/signin?next=/${locale}/admin`);
  }

  return (
    <LayoutFrame locale={locale} session={session}>
      {children}
    </LayoutFrame>
  );
}
