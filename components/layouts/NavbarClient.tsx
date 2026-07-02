'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/shared/routes';
import type { SessionPayload } from '@/lib/shared/types/Session';
import { Brand } from '@/components/ui/Brand';
import { SearchAutocomplete } from '@/components/ui/molecules/SearchAutocomplete';
import { useTranslations } from '@/lib/i18n/client';
import { ScrollProgress } from '@/components/layouts/ScrollProgress';

type Props = {
  session: SessionPayload | null;
};

const CERTIFICATIONS = ['ISO 9001', 'JO N°16 · 2020', 'Made in Algeria', 'Formulation pharmaceutique'];
const LOCALES = ['fr-MA', 'ar-MA', 'en-US'] as const;

function localizedPath(pathname: string, locale: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${locale}`;
  segments[0] = locale;
  return `/${segments.join('/')}`;
}

export function NavbarClient({ session }: Props) {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || 'fr-MA';
  const t = useTranslations('nav');

  const [scrolled, setScrolled] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setCondensed(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onEsc);
    };
  }, [mobileOpen]);

  const navLinks = useMemo(
    () => [
      { label: t('home'), href: ROUTES.home(locale), short: '01' },
      { label: t('products'), href: ROUTES.products(locale), short: '02' },
      { label: t('blog'), href: ROUTES.blog(locale), short: '03' },
      { label: t('events'), href: ROUTES.events(locale), short: '04' },
      { label: t('community'), href: ROUTES.community(locale), short: '05' },
    ],
    [locale, t],
  );

  const accountLinks = useMemo(
    () => [
      { label: t('myAccount'), href: ROUTES.account(locale) },
      { label: t('myOrders'), href: ROUTES.myOrders(locale) },
      { label: t('myArticles'), href: ROUTES.myArticles(locale) },
      { label: t('myComments'), href: ROUTES.myComments(locale) },
      { label: t('settings'), href: ROUTES.settings(locale) },
    ],
    [locale, t],
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const shellClass = scrolled
    ? 'bg-[rgba(245,241,232,0.9)] backdrop-blur-md border-b border-[#E1E7EE] shadow-[0_20px_40px_-32px_rgba(15,22,32,0.6)]'
    : 'bg-gradient-to-b from-[rgba(6,42,79,0.72)] via-[rgba(6,42,79,0.2)] to-transparent border-b border-white/20';

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-40">
        <div className="h-7 border-b border-white/10 bg-[#062A4F] text-white">
          <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
              {LOCALES.map((target) => {
                const active = target === locale;
                return (
                  <Link
                    key={target}
                    href={localizedPath(pathname, target)}
                    className={`rounded px-1 py-0.5 transition ${active ? 'text-[#F2B135]' : 'hover:text-white'}`}
                  >
                    {target.slice(0, 2)}
                  </Link>
                );
              })}
            </div>
            <div className="hidden overflow-hidden md:block md:w-[520px]">
              <div className="animate-[marquee_24s_linear_infinite] whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-white/60 [@media(prefers-reduced-motion:reduce)]:animate-none">
                {CERTIFICATIONS.concat(CERTIFICATIONS).map((item, index) => (
                  <span key={`${item}-${index}`} className="mr-6">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">MM Pharma</div>
          </div>
        </div>

        <div className={`h-14 md:h-16 transition-all duration-300 ${shellClass}`}>
          <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3 md:gap-6">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-md md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>

              <Brand href={ROUTES.home(locale)} variant={scrolled ? 'default' : 'light'} size={32} />

              <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`group relative rounded-md px-3 py-2 text-sm transition-colors ${
                      scrolled ? 'text-[#3F4A57] hover:text-[#062A4F]' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {condensed ? link.short : link.label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-0.5 origin-left transition-transform duration-200 ${
                        isActive(link.href) ? 'scale-x-100 bg-[#F2B135]' : 'scale-x-0 bg-[#F2B135] group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden lg:block">
              <SearchAutocomplete locale={locale} />
            </div>

            <div className="flex items-center gap-2">
              <Link href={ROUTES.cart(locale)} className="relative flex h-11 w-11 items-center justify-center rounded-md" aria-label={t('cart')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </Link>

              {session ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1E7EE] bg-white text-sm font-semibold text-[#062A4F]"
                    aria-label={t('myAccount')}
                    aria-expanded={accountOpen}
                  >
                    {session.email.charAt(0).toUpperCase()}
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-[#E1E7EE] bg-white py-2 shadow-xl">
                      {accountLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-sm text-[#3F4A57] hover:bg-[#F2F5F8]">
                          {link.label}
                        </Link>
                      ))}
                      <hr className="my-2 border-[#E1E7EE]" />
                      <form action={`/${locale}/api/auth/signout`} method="POST">
                        <button type="submit" className="w-full px-4 py-2.5 text-left text-sm text-[#D63A3A] hover:bg-[#FDECEC]">
                          {t('signout')}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Link href={ROUTES.signin(locale)} className="px-3 py-2 text-sm">
                    {t('signin')}
                  </Link>
                  <Link
                    href={`${ROUTES.contact(locale)}?intent=quote`}
                    className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-md border border-[#E1E7EE] bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#062A4F] transition hover:bg-[#F5F1E8]"
                  >
                    Devis ↗
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ScrollProgress />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="absolute left-0 top-0 h-full w-[calc(100%-32px)] max-w-[360px] border-r border-[#E1E7EE] bg-[#F5F1E8] p-6">
            <div className="mb-8 flex items-center justify-between">
              <Brand href={ROUTES.home(locale)} variant="default" size={30} />
              <button type="button" onClick={() => setMobileOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-md" aria-label="Close menu">
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
                  className={`block rounded-md px-3 py-3 text-sm ${isActive(link.href) ? 'bg-[#062A4F] text-white' : 'text-[#3F4A57]'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {!session && (
              <div className="mt-6 grid gap-2">
                <Link href={ROUTES.signin(locale)} onClick={() => setMobileOpen(false)} className="inline-flex h-11 items-center justify-center rounded-md border border-[#C5CFD9] text-sm text-[#062A4F]">
                  {t('signin')}
                </Link>
                <Link href={ROUTES.signup(locale)} onClick={() => setMobileOpen(false)} className="inline-flex h-11 items-center justify-center rounded-md bg-[#062A4F] text-sm text-white">
                  {t('signup')}
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
