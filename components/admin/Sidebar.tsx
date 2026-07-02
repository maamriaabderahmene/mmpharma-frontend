import Link from 'next/link';
import { ROUTES } from '@/lib/shared/routes';

const links = [
  { key: 'overview', label: 'Overview', href: (locale: string) => ROUTES.admin(locale) },
  { key: 'products', label: 'Products', href: (locale: string) => `/${locale}/admin/products` },
  { key: 'articles', label: 'Articles', href: (locale: string) => `/${locale}/admin/articles` },
  { key: 'events', label: 'Events', href: (locale: string) => `/${locale}/admin/events` },
  { key: 'orders', label: 'Orders', href: (locale: string) => `/${locale}/admin/orders` },
  { key: 'users', label: 'Users', href: (locale: string) => `/${locale}/admin/users` },
  { key: 'media', label: 'Media', href: (locale: string) => `/${locale}/admin/media` },
  { key: 'seo', label: 'SEO', href: (locale: string) => `/${locale}/admin/seo` },
  { key: 'settings', label: 'Settings', href: (locale: string) => `/${locale}/admin/settings` },
];

type Props = {
  locale: string;
  pathname: string;
};

export function Sidebar({ locale, pathname }: Props) {
  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-[#F2B135]/20 bg-[#062A4F] p-5 text-white lg:block">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#F2B135]">Admin</p>
      <nav className="space-y-1" aria-label="Admin navigation">
        {links.map((link) => {
          const href = link.href(locale);
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={link.key}
              href={href}
              className={`flex h-11 items-center rounded-md px-3 text-sm transition ${
                active ? 'bg-[#F2B135] text-[#062A4F]' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
