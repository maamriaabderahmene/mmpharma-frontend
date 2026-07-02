'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/shared/routes';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { palette } from '@/theme/palette';
import { Brand } from '@/components/ui/Brand';
import { SearchAutocomplete } from '@/components/ui/molecules/SearchAutocomplete';
import { useTranslations } from '@/lib/i18n/client';

type Props = {
  session: SessionPayload | null;
};

export function NavbarClient({ session }: Props) {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || 'fr-MA';
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('home'), href: ROUTES.home(locale) },
    { label: t('blog'), href: ROUTES.blog(locale) },
    { label: t('products'), href: ROUTES.products(locale) },
    { label: t('events'), href: ROUTES.events(locale) },
    { label: t('community'), href: ROUTES.community(locale) },
  ];

  const accountLinks = [
    { label: t('myAccount'), href: ROUTES.account(locale) },
    { label: t('myOrders'), href: ROUTES.myOrders(locale) },
    { label: t('myArticles'), href: ROUTES.myArticles(locale) },
    { label: t('myComments'), href: ROUTES.myComments(locale) },
    { label: t('settings'), href: ROUTES.settings(locale) },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 h-14 md:h-16 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.9)' : 'linear-gradient(180deg, rgba(6,42,79,0.62), rgba(6,42,79,0.22), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : undefined,
          borderBottom: scrolled ? `1px solid ${palette.neutral[200]}` : '1px solid rgba(255,255,255,0.1)',
          boxShadow: scrolled ? '0 12px 28px -24px rgba(15,22,32,0.55)' : undefined,
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ color: scrolled ? palette.primary[700] : palette.neutral[0] }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>

            <Brand href={ROUTES.home(locale)} variant={scrolled ? 'default' : 'light'} size={32} />

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="rounded-md px-3 py-2 text-sm transition-colors"
                  style={{
                    minHeight: 44,
                    color: scrolled ? (isActive(link.href) ? palette.primary[700] : palette.neutral[700]) : palette.neutral[0],
                    background: isActive(link.href)
                      ? (scrolled ? palette.primary[50] : 'rgba(255,255,255,0.18)')
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:block">
            <SearchAutocomplete locale={locale} />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={ROUTES.cart(locale)}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg"
              style={{ color: scrolled ? palette.neutral[700] : palette.neutral[0] }}
              aria-label={t('cart')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>

            {session ? (
              <div className="relative group">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                  style={{
                    color: palette.primary[700],
                    backgroundColor: scrolled ? palette.primary[50] : 'rgba(255,255,255,0.88)',
                    border: `1px solid ${palette.neutral[200]}`,
                  }}
                  aria-label={t('myAccount')}
                >
                  {session.email.charAt(0).toUpperCase()}
                </button>
                <div
                  className="invisible absolute right-0 top-full mt-2 w-56 rounded-lg py-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100"
                  style={{ backgroundColor: palette.neutral[0], border: `1px solid ${palette.neutral[200]}` }}
                >
                  {accountLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm transition-colors"
                      style={{ color: palette.neutral[700] }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" style={{ borderColor: palette.neutral[200] }} />
                  <form action={`/${locale}/api/auth/signout`} method="POST">
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 text-left text-sm transition-colors"
                      style={{ color: palette.error[500] }}
                    >
                      {t('signout')}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href={ROUTES.signin(locale)}
                  className="px-3 py-2 text-sm transition-colors"
                  style={{ color: scrolled ? palette.neutral[700] : palette.neutral[0] }}
                >
                  {t('signin')}
                </Link>
                <Link
                  href={ROUTES.signup(locale)}
                  className="rounded-md border px-3 py-2 text-sm transition-colors"
                  style={{
                    color: palette.primary[700],
                    backgroundColor: scrolled ? palette.primary[50] : 'rgba(255,255,255,0.95)',
                    borderColor: palette.neutral[200],
                  }}
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/55" onClick={() => setMobileOpen(false)} />
          <aside
            className="absolute left-0 top-0 h-full w-[86vw] max-w-[360px] p-5"
            style={{ backgroundColor: palette.neutral[0], borderRight: `1px solid ${palette.neutral[200]}` }}
          >
            <div className="mb-6 flex items-center justify-between">
              <Brand href={ROUTES.home(locale)} variant="default" size={30} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ color: palette.neutral[500] }}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <SearchAutocomplete locale={locale} />
            </div>

            <nav className="space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="block rounded-md px-3 py-3 text-sm"
                  style={{
                    color: isActive(link.href) ? palette.primary[700] : palette.neutral[700],
                    backgroundColor: isActive(link.href) ? palette.primary[50] : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {!session && (
              <div className="mt-5 grid gap-2">
                <Link
                  href={ROUTES.signin(locale)}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md border px-3 py-2 text-center text-sm"
                  style={{ borderColor: palette.neutral[300], color: palette.primary[700] }}
                >
                  {t('signin')}
                </Link>
                <Link
                  href={ROUTES.signup(locale)}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-center text-sm"
                  style={{ backgroundColor: palette.primary[700], color: palette.neutral[0] }}
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
