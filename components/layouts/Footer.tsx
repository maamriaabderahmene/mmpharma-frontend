import Link from 'next/link';
import { palette } from '@/theme/palette';

const footerColumns = [
  {
    title: 'MM Pharma',
    links: [
      { label: 'À propos', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Carrières', href: '/community' },
    ],
  },
  {
    title: 'Produits',
    links: [
      { label: 'Hygiène', href: '/products?range=hygiene' },
      { label: 'Détergents', href: '/products?range=detergent' },
      { label: 'Désinfectants', href: '/products?range=disinfectant' },
      { label: 'Inox', href: '/products?range=inox' },
      { label: 'Divers', href: '/products?range=misc' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Événements', href: '/events' },
      { label: 'Communauté', href: '/community' },
      { label: 'Confidentialité', href: '/legal/privacy' },
      { label: 'CGV', href: '/legal/terms' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'contact@mmpharma.ma', href: 'mailto:contact@mmpharma.ma' },
      { label: '+212 5XX XX XX XX', href: 'tel:+2125XXXXXXX' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: palette.neutral[0],
        borderColor: palette.neutral[200],
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4
                className="font-heading text-sm mb-4 uppercase tracking-wider"
                style={{ color: palette.primary[500] }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs transition-colors"
                      style={{ color: palette.neutral[500] }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: palette.neutral[200], color: palette.neutral[500] }}>
          <p>© MM Pharma 2026. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="transition-colors" style={{ color: palette.neutral[500] }}>Confidentialité</Link>
            <Link href="/legal/terms" className="transition-colors" style={{ color: palette.neutral[500] }}>CGV</Link>
            <Link href="/legal/cookies" className="transition-colors" style={{ color: palette.neutral[500] }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
