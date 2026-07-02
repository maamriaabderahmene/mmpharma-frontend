'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/shared/routes';
import { Brand } from '@/components/ui/Brand';

type Props = {
  locale: string;
};

const modules = [
  { label: 'Tableau de bord', href: (l: string) => ROUTES.admin(l), icon: '◈' },
  { label: 'Produits', href: (l: string) => `/admin/products`, icon: '⊡' },
  { label: 'Articles', href: (l: string) => `/admin/articles`, icon: '⊟' },
  { label: 'Événements', href: (l: string) => `/admin/events`, icon: '⊡' },
  { label: 'Commandes', href: (l: string) => `/admin/orders`, icon: '⊞' },
  { label: 'Utilisateurs', href: (l: string) => `/admin/users`, icon: '⊡' },
  { label: 'Média', href: (l: string) => `/admin/media`, icon: '⊟' },
  { label: 'SEO', href: (l: string) => `/admin/seo`, icon: '⊡' },
  { label: 'Paramètres', href: (l: string) => `/admin/settings`, icon: '⚙' },
];

export function AdminSidebar({ locale }: Props) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-[#E1E7EE] bg-white md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-[#E1E7EE] px-5">
        <Link href={ROUTES.admin(locale)}>
          <Brand variant="default" size={28} showWordmark={false} />
        </Link>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#062A4F]">
          MM Pharma
        </span>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Admin navigation">
        {modules.map((mod) => {
          const href = `/${locale}${mod.href(locale)}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={mod.href(locale)}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? 'bg-[#F5F1E8] font-medium text-[#062A4F]'
                  : 'text-[#3F4A57] hover:bg-[#F2F5F8]'
              }`}
            >
              <span className="w-5 text-center font-mono text-xs text-[#F2B135]">{mod.icon}</span>
              <span>{mod.label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#F2B135]" />}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[#E1E7EE] p-3">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#7A8694] transition-colors hover:bg-[#F2F5F8]"
        >
          ← Retour au site
        </Link>
      </div>
    </aside>
  );
}

/** @deprecated Use AdminSidebar */
export const Sidebar = AdminSidebar;
