import Link from 'next/link';
import { palette } from '@/theme/palette';
import { Brand } from '@/components/ui/Brand';
import { getTranslations } from '@/lib/i18n/server';
import { ROUTES } from '@/lib/shared/routes';

const socials = [
  { label: 'IG', href: 'https://instagram.com', title: 'Instagram' },
  { label: 'YT', href: 'https://youtube.com', title: 'YouTube' },
  { label: 'IN', href: 'https://linkedin.com', title: 'LinkedIn' },
];

type Props = {
  locale: string;
};

export async function Footer({ locale }: Props) {
  const tNav = await getTranslations(locale, 'nav');
  const tFooter = await getTranslations(locale, 'footer');

  const footerColumns = [
    {
      title: tFooter('contact'),
      isContact: true,
      links: [{ label: 'contact@mmpharma.ma', href: 'mailto:contact@mmpharma.ma' }],
    },
    {
      title: tFooter('products'),
      links: [
        { label: 'Gamme I — Hygiène', href: `${ROUTES.products(locale)}?range=hygiene` },
        { label: 'Gamme II — Détergent', href: `${ROUTES.products(locale)}?range=detergent` },
        { label: 'Gamme III — Désinfectant', href: `${ROUTES.products(locale)}?range=disinfectant` },
        { label: 'Gamme IV — Inox', href: `${ROUTES.products(locale)}?range=inox` },
        { label: 'Gamme V — Divers', href: `${ROUTES.products(locale)}?range=misc` },
      ],
    },
    {
      title: tFooter('about'),
      links: [
        { label: tNav('home'), href: ROUTES.home(locale) },
        { label: tNav('blog'), href: ROUTES.blog(locale) },
        { label: tNav('events'), href: ROUTES.events(locale) },
        { label: tNav('community'), href: ROUTES.community(locale) },
        { label: tFooter('contact'), href: ROUTES.contact(locale) },
      ],
    },
    {
      title: tFooter('resources'),
      links: [
        { label: 'FAQ', href: ROUTES.faq(locale) },
        { label: tNav('community'), href: ROUTES.community(locale) },
        { label: 'Fiches techniques', href: ROUTES.products(locale) },
        { label: 'Normes & conformité', href: `${ROUTES.about(locale)}#quality` },
      ],
    },
    {
      title: tFooter('legal'),
      links: [
        { label: tFooter('privacy'), href: `/${locale}/legal/privacy` },
        { label: tFooter('terms'), href: `/${locale}/legal/terms` },
        { label: tFooter('cookies'), href: `/${locale}/legal/cookies` },
      ],
    },
  ];

  const navy = palette.primary[900];
  const gold = palette.accent[500];
  const mono = "'JetBrains Mono', ui-monospace, monospace";
  return (
    <footer
      style={{
        backgroundColor: '#050B14',
        color: '#E1E7EE',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            `radial-gradient(700px 380px at 85% 0%, rgba(242,177,53,0.10), transparent 60%), radial-gradient(600px 400px at 0% 100%, ${navy}88, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 1360, margin: '0 auto', padding: '96px 24px 24px' }}>
        {/* Top CTA — headline centered */}
        <div
          style={{
            textAlign: 'center',
            paddingBottom: 72,
            marginBottom: 72,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: gold,
              marginBottom: 32,
            }}
          >
            — Hygiène pharmaceutique · Maroc —
          </div>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(36px, 6.5vw, 84px)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: '#F5F7FA',
              margin: '0 auto 40px',
              maxWidth: 1100,
            }}
          >
            L&rsquo;hygiène pharmaceutique,{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: gold }}>
              formulée au Maroc.
            </span>
          </h2>
          <div style={{ display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href={`${ROUTES.contact(locale)}?intent=quote`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 28px',
                background: gold,
                color: navy,
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Demander un devis <span>→</span>
            </Link>
            <Link
              href={ROUTES.products(locale)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 28px',
                background: 'transparent',
                color: '#F5F7FA',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Voir le catalogue
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 48,
            marginBottom: 96,
          }}
        >
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: 24,
                  fontWeight: 600,
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 14,
                        color: col.isContact ? gold : 'rgba(255,255,255,0.78)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        display: 'inline-block',
                        borderBottom: col.isContact ? `1px solid ${gold}55` : 'none',
                        paddingBottom: col.isContact ? 2 : 0,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.isContact && (
                  <li style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        title={s.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 36,
                          height: 36,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.75)',
                          textDecoration: 'none',
                          fontFamily: mono,
                          fontSize: 10,
                          letterSpacing: '0.1em',
                          fontWeight: 700,
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand block + certifications */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <div style={{ marginBottom: 16 }}>
              <Brand variant="light" size={40} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              Fabricant marocain de produits d&apos;hygiène, de désinfection et
              d&apos;entretien professionnel. Formulés, testés et conditionnés au
              Maroc — conformes à la norme JO N°16 · 2020.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['ISO 9001', 'JO N°16 · 2020', 'Made in Morocco'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  padding: '10px 14px',
                  border: '1px solid rgba(242,177,53,0.35)',
                  color: gold,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Oversized wordmark — bleeds at the bottom */}
        <div
          aria-hidden
          style={{
            marginTop: 64,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(64px, 19vw, 260px)',
            letterSpacing: '-0.05em',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            textAlign: 'center',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          MM<span style={{ WebkitTextStroke: `1px rgba(242,177,53,0.22)` }}>·</span>PHARMA
        </div>

        <div
          style={{
            marginTop: 24,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            fontFamily: mono,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <p style={{ margin: 0 }}>
            MM Pharma est un fabricant marocain de produits d&apos;hygiène et de désinfection.
            Les formulations respectent l&apos;arrêté du 21/10/2019 (JO N°16 · 24 mars 2020).
            Copyright © MM Pharma Inc. 2026 — Casablanca, Maroc.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href={`/${locale}/legal/privacy`} style={{ color: 'inherit', textDecoration: 'none' }}>{tFooter('privacy')}</Link>
            <Link href={`/${locale}/legal/terms`} style={{ color: 'inherit', textDecoration: 'none' }}>{tFooter('terms')}</Link>
            <Link href={`/${locale}/legal/cookies`} style={{ color: 'inherit', textDecoration: 'none' }}>{tFooter('cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
