import Link from 'next/link';
import { requireAuth } from '@/lib/server/auth/guards';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const sidebarLinks = [
  { href: '/account', label: 'Dashboard' },
  { href: '/account/my-orders', label: 'Mes commandes' },
  { href: '/account/my-articles', label: 'Mes articles' },
  { href: '/account/comments', label: 'Mes commentaires' },
  { href: '/account/settings', label: 'Paramètres' },
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
              key={link.href}
              href={`/${locale}${link.href}`}
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
