import Link from 'next/link';
import { requireAuth } from '@/lib/server/auth/guards';
import { ROUTES } from '@/lib/shared/routes';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const sidebarLinks = [
  { href: ROUTES.account, label: 'Dashboard' },
  { href: ROUTES.myOrders, label: 'Mes commandes' },
  { href: ROUTES.myArticles, label: 'Mes articles' },
  { href: ROUTES.myComments, label: 'Mes commentaires' },
  { href: ROUTES.settings, label: 'Paramètres' },
  { href: ROUTES.admin, label: 'Admin' },
];

export default async function AccountLayout({ children, params }: Props) {
  const { locale } = await params;
  await requireAuth(`/${locale}/account`);

  return (
    <div className="min-h-screen bg-deep-navy flex">
      <aside className="w-64 border-r border-gold/10 p-6 hidden md:block">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href(locale)}
              className="block px-4 py-2 rounded text-sm text-gray-300 hover:text-gold hover:bg-gold/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <form action={`/${locale}/api/auth/signout`} method="POST" className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-left"
            >
              Déconnexion
            </button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
