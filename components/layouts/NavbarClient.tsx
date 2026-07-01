'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/shared/routes';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { palette } from '@/theme/palette';

type Props = {
  session: SessionPayload | null;
};

const publicLinks = [
  { label: 'Accueil', href: ROUTES.home },
  { label: 'Blog', href: ROUTES.blog },
  { label: 'Produits', href: ROUTES.products },
  { label: 'Événements', href: ROUTES.events },
  { label: 'Communauté', href: ROUTES.community },
] as const;

export function NavbarClient({ session }: Props) {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || 'fr-MA';
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const primaryColor = palette.primary[500];
  const hoverBg = palette.primary[50];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 h-14 md:h-16 flex items-center transition-shadow duration-200"
        style={{
          backgroundColor: scrolled ? palette.neutral[0] : 'transparent',
          boxShadow: scrolled ? '0 2px 8px rgba(15, 22, 32, 0.08)' : undefined,
          borderBottom: scrolled ? `1px solid ${palette.neutral[200]}` : undefined,
        }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded"
              style={{ color: primaryColor, minHeight: 44 }}
              onClick={() => setDrawerOpen(true)}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>

            <Link href={ROUTES.home(locale)} className="font-heading text-xl" style={{ color: primaryColor, fontWeight: 700 }}>
              MM Pharma
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {publicLinks.map((link) => {
                const href = link.href(locale);
                const active = isActive(href);
                return (
                  <Link
                    key={link.label}
                    href={href}
                    className="px-3 py-2 rounded text-sm transition-colors"
                    style={{
                      backgroundColor: active ? hoverBg : undefined,
                      color: active ? primaryColor : palette.neutral[700],
                      minHeight: 44,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.cart(locale)}
              className="relative w-11 h-11 flex items-center justify-center rounded"
              style={{ color: palette.neutral[500], minHeight: 44 }}
              aria-label="Panier"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>

            {session ? (
              <div className="relative group">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    backgroundColor: palette.primary[50],
                    border: `1px solid ${palette.neutral[200]}`,
                    color: primaryColor,
                    minHeight: 44,
                  }}
                >
                  {session.email.charAt(0).toUpperCase()}
                </button>
                <div
                  className="absolute right-0 top-full mt-2 w-56 py-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                  style={{ backgroundColor: palette.neutral[0], border: `1px solid ${palette.neutral[200]}` }}
                >
                  <Link href={ROUTES.account(locale)} className="block px-4 py-3 text-sm transition-colors" style={{ color: palette.neutral[700] }}>Mon compte</Link>
                  <Link href={ROUTES.myOrders(locale)} className="block px-4 py-3 text-sm transition-colors" style={{ color: palette.neutral[700] }}>Mes commandes</Link>
                  <Link href={ROUTES.myArticles(locale)} className="block px-4 py-3 text-sm transition-colors" style={{ color: palette.neutral[700] }}>Mes articles</Link>
                  <Link href={ROUTES.myComments(locale)} className="block px-4 py-3 text-sm transition-colors" style={{ color: palette.neutral[700] }}>Mes commentaires</Link>
                  <hr className="my-2" style={{ borderColor: palette.neutral[200] }} />
                  <form action={`/${locale}/api/auth/signout`} method="POST">
                    <button type="submit" className="w-full text-left px-4 py-3 text-sm transition-colors" style={{ color: palette.error[500] }}>Déconnexion</button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href={ROUTES.signin(locale)} className="px-4 py-2 text-sm transition-colors" style={{ color: palette.neutral[700], minHeight: 44 }}>
                  Connexion
                </Link>
                <Link
                  href={ROUTES.signup(locale)}
                  className="px-4 py-2 text-sm rounded transition-colors"
                  style={{
                    backgroundColor: palette.primary[50],
                    border: `1px solid ${palette.neutral[300]}`,
                    color: primaryColor,
                    minHeight: 44,
                  }}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 p-6 overflow-y-auto"
            style={{
              backgroundColor: palette.neutral[0],
              borderRight: `1px solid ${palette.neutral[200]}`,
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-heading text-lg" style={{ color: primaryColor, fontWeight: 700 }}>Menu</span>
              <button onClick={() => setDrawerOpen(false)} className="w-11 h-11 flex items-center justify-center rounded transition-colors" style={{ color: palette.neutral[500], minHeight: 44 }} aria-label="Fermer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              {publicLinks.map((link) => {
                const href = link.href(locale);
                const active = isActive(href);
                return (
                  <Link
                    key={link.label}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="block px-4 py-3 rounded text-sm transition-colors"
                    style={{
                      backgroundColor: active ? hoverBg : undefined,
                      color: active ? primaryColor : palette.neutral[700],
                      minHeight: 44,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {!session && (
              <div className="mt-6 space-y-2">
                <Link
                  href={ROUTES.signin(locale)}
                  onClick={() => setDrawerOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm rounded transition-colors"
                  style={{
                    border: `1px solid ${palette.neutral[300]}`,
                    color: primaryColor,
                    minHeight: 44,
                  }}
                >
                  Connexion
                </Link>
                <Link
                  href={ROUTES.signup(locale)}
                  onClick={() => setDrawerOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm rounded transition-colors"
                  style={{
                    backgroundColor: primaryColor,
                    color: palette.neutral[0],
                    minHeight: 44,
                  }}
                >
                  Inscription
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}