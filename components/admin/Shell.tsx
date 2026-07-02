import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';

type Props = {
  locale: string;
  pathname: string;
  title: string;
  subtitle?: string;
  userLabel: string;
  children: React.ReactNode;
};

export function Shell({ locale, pathname, title, subtitle, userLabel, children }: Props) {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#0F1620] lg:flex">
      <Sidebar locale={locale} pathname={pathname} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar title={title} subtitle={subtitle} userLabel={userLabel} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
