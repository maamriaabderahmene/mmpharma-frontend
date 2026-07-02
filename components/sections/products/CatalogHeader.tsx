import { Container, Typography, Box } from '@mui/material';
import { getTranslations } from '@/lib/i18n/server';
import { palette } from '@/theme/palette';

const mono = "'JetBrains Mono', ui-monospace, monospace";

type Props = {
  locale: string;
  totalProducts: number;
};

export async function CatalogHeader({ locale, totalProducts }: Props) {
  const t = await getTranslations(locale, 'products');

  const navy = palette.primary[900];
  const gold = palette.accent[500];

  return (
    <Box component="section" sx={{ bgcolor: navy, color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 340px at 90% 20%, rgba(197,160,89,0.14), transparent 60%)' }} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.34em', color: gold, textTransform: 'uppercase', mb: 3 }}>
          N° 03 — Catalogue
        </Typography>
        <Typography sx={{ fontSize: { xs: 44, sm: 72, md: 112 }, lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 600 }}>
          Produits <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>certifiés,</span><br />
          formulés au Maroc.
        </Typography>
        <Typography sx={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', mt: 5, pt: 3, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          {String(totalProducts).padStart(3, '0')} · {t('stats')}
        </Typography>
      </Container>
    </Box>
  );
}
