'use client';

import { usePathname } from 'next/navigation';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { Sidebar } from '@/components/admin/Sidebar';

type Props = {
  locale: string;
  session: SessionPayload;
  children: React.ReactNode;
};

export function LayoutFrame({ locale, session, children }: Props) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#0F1620] lg:flex">
      <Sidebar locale={locale} pathname={pathname} />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[#E1E7EE] bg-[#FAFBFC]/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A8694]">MM Pharma · Admin</p>
              <p className="text-sm text-[#3F4A57]">{session.email}</p>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
