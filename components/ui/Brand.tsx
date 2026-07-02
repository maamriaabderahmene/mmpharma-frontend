import Link from 'next/link';
import Image from 'next/image';
import { palette } from '@/theme/palette';

type Variant = 'default' | 'light' | 'compact';

type Props = {
  href?: string;
  variant?: Variant;
  size?: number;
  showWordmark?: boolean;
};

/**
 * Brand — MM Pharma lockup.
 * SVG mark (from /public/logo.svg) + letter-spaced "MM PHARMA" wordmark.
 * Used across navbar, footer, auth pages, empty states.
 */
export function Brand({
  href,
  variant = 'default',
  size = 32,
  showWordmark = true,
}: Props) {
  const isLight = variant === 'light';
  const markColor = isLight ? palette.neutral[0] : palette.primary[900];
  const accentColor = palette.accent[500];
  const subColor = isLight ? 'rgba(255,255,255,0.55)' : palette.neutral[500];

  const content = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: variant === 'compact' ? 8 : 12,
        textDecoration: 'none',
        lineHeight: 1,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          width: size,
          height: size,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <Image
          src="/logo.svg"
          alt="MM Pharma"
          width={size}
          height={size}
          priority
          style={{ objectFit: 'contain' }}
        />
      </span>

      {showWordmark && (
        <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '0.05em',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: variant === 'compact' ? 14 : 16,
              letterSpacing: '0.28em',
              color: markColor,
              textTransform: 'uppercase',
            }}
          >
            {'MM'.split('').map((c, i) => (
              <span key={`m-${i}`}>{c}</span>
            ))}
            <span style={{ display: 'inline-block', width: '0.4em' }} />
            {'PHARMA'.split('').map((c, i) => (
              <span key={`p-${i}`} style={i === 0 ? { color: accentColor } : undefined}>
                {c}
              </span>
            ))}
          </span>
          {variant !== 'compact' && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 9,
                letterSpacing: '0.32em',
                color: subColor,
                textTransform: 'uppercase',
              }}
            >
              Hygiène · Maroc
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="MM Pharma — Accueil" style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }
  return content;
}