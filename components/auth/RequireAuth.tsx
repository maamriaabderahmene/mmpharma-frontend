'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/shared/routes';

type Props = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: Props) {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fr-MA';

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('mmpharma_session='));

    if (!token) {
      router.replace(ROUTES.signin(locale, window.location.pathname));
    }
  }, [locale, router]);

  return <>{children}</>;
}
