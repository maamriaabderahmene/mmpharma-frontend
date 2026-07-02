import Link from 'next/link';
import { Brand } from '@/components/ui/Brand';
import { getTranslations } from '@/lib/i18n/server';
import { ROUTES } from '@/lib/shared/routes';
import { Certifications } from '@/components/layouts/Footer/Certifications';
import { Manifesto } from '@/components/layouts/Footer/Manifesto';
import { Newsletter } from '@/components/layouts/Footer/Newsletter';
import { WordmarkBleed } from '@/components/layouts/Footer/WordmarkBleed';

const socials = [
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'YT', href: 'https://youtube.com' },
  { label: 'IN', href: 'https://linkedin.com' },
  { label: 'FB', href: 'https://facebook.com' },
];

type Props = {
  locale: string;
};

export async function Footer({ locale }: Props) {
  const tNav = await getTranslations(locale, 'nav');
  const tFooter = await getTranslations(locale, 'footer');

  const sitemap = [
    { label: tNav('products'), href: ROUTES.products(locale) },
    { label: tNav('blog'), href: ROUTES.blog(locale) },
    { label: tNav('events'), href: ROUTES.events(locale) },
    { label: tNav('community'), href: ROUTES.community(locale) },
    { label: tFooter('contact'), href: ROUTES.contact(locale) },
  ];

  const legal = [
    { label: tFooter('privacy'), href: `/${locale}/legal/privacy` },
    { label: tFooter('terms'), href: `/${locale}/legal/terms` },
    { label: tFooter('cookies'), href: `/${locale}/legal/cookies` },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#050B14] text-[#E1E7EE]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_380px_at_0%_100%,rgba(6,42,79,0.6),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 pb-6 pt-20 md:px-8">
        <div className="mb-16 border-b border-white/10 pb-12">
          <Manifesto />
        </div>

        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">{tFooter('products')}</p>
            <ul className="space-y-3">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 transition hover:text-[#F2B135]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">{tFooter('legal')}</p>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 transition hover:text-[#F2B135]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Newsletter />
            <div className="mt-4 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center border border-white/20 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 transition hover:border-[#F2B135] hover:text-[#F2B135]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2B135]">{tFooter('contact')}</p>
            <p className="mb-2 text-sm text-white/80">Casablanca, Maroc</p>
            <p className="mb-2 text-sm text-white/80">+212 5XX XX XX XX</p>
            <p className="mb-3 text-sm text-[#F2B135]">contact@mmpharma.ma</p>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">Lun — Ven · 09h00 / 18h00</p>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-8">
          <div className="max-w-[520px]">
            <div className="mb-3">
              <Brand variant="light" size={40} />
            </div>
            <p className="text-sm leading-7 text-white/60">
              Fabricant marocain de produits d&apos;hygiène, de désinfection et d&apos;entretien professionnel.
              Formulés, testés et conditionnés au Maroc.
            </p>
          </div>
          <Certifications />
        </div>

        <WordmarkBleed />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
          <p className="m-0">© 2026 MM Pharma — Made in Casablanca</p>
          <div className="flex gap-5">
            <span>{locale}</span>
            <span>{process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
