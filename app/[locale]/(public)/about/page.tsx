import type { Metadata } from 'next';
import { Container, Typography, Box, Grid, Stack } from '@mui/material';
import { palette } from '@/theme/palette';

const mono = "'JetBrains Mono', ui-monospace, monospace";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'À propos',
    description: "MM Pharma — fabricant de produits d'hygiène et de désinfection au Maroc.",
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/about` },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  const navy = palette.primary[900];
  const gold = palette.accent[500];

  const values = [
    { idx: 'I', title: 'Qualité', body: 'Contrôles microbiologiques et physico-chimiques rigoureux sur chaque lot.' },
    { idx: 'II', title: 'Innovation', body: 'R&D constante pour des formulations toujours plus performantes.' },
    { idx: 'III', title: 'Engagement', body: 'ISO 9001. Conformité JO N°16 · 2020. Traçabilité totale.' },
    { idx: 'IV', title: 'Proximité', body: 'Fabrication marocaine — service réactif, empreinte réduite.' },
  ];

  const numbers = [
    { k: '15+', v: 'Années d’expertise' },
    { k: '32', v: 'Références actives' },
    { k: '100%', v: 'Fabrication au Maroc' },
    { k: 'ISO 9001', v: 'Certification qualité' },
  ];

  return (
    <>
      {/* Hero */}
      <Box sx={{ bgcolor: navy, color: '#fff', pt: { xs: 14, md: 22 }, pb: { xs: 10, md: 16 }, position: 'relative', overflow: 'hidden' }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 320px at 10% 30%, rgba(197,160,89,0.14), transparent 60%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.34em', color: gold, textTransform: 'uppercase', mb: 3 }}>
            N° 02 — Maison
          </Typography>
          <Typography sx={{ fontSize: { xs: 44, sm: 72, md: 112 }, lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 600, maxWidth: 1100 }}>
            L’hygiène<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>professionnelle,</span><br />
            à échelle industrielle.
          </Typography>
          <Typography sx={{ mt: 6, maxWidth: 640, fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
            MM Pharma conçoit, fabrique et distribue depuis plus de 15 ans des
            produits d’hygiène, de désinfection et d’entretien pour les
            établissements de santé, l’hôtellerie, l’industrie et les
            collectivités marocaines.
          </Typography>
        </Container>
      </Box>

      {/* Numbers */}
      <Box sx={{ bgcolor: '#fff', borderBottom: `1px solid ${palette.neutral[200]}` }}>
        <Container maxWidth="lg">
          <Grid container>
            {numbers.map((n, i) => (
              <Grid size={{ xs: 6, md: 3 }} key={n.v}
                sx={{
                  py: { xs: 4, md: 6 },
                  px: { xs: 2, md: 4 },
                  borderRight: { md: i < 3 ? `1px solid ${palette.neutral[200]}` : 'none' },
                  borderBottom: { xs: i < 2 ? `1px solid ${palette.neutral[200]}` : 'none', md: 'none' },
                }}
              >
                <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.24em', color: palette.neutral[500], textTransform: 'uppercase', mb: 1.5 }}>
                  {String(i + 1).padStart(2, '0')} / 04
                </Typography>
                <Typography sx={{ fontSize: { xs: 40, md: 64 }, fontWeight: 600, color: navy, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {n.k}
                </Typography>
                <Typography sx={{ fontSize: 13, color: palette.neutral[700], mt: 1.5 }}>{n.v}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values */}
      <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: palette.neutral[50] }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 8 }} sx={{ mb: { xs: 6, md: 10 } }}>
            <Box sx={{ flex: '0 0 auto', minWidth: { md: 280 } }}>
              <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase', mb: 2 }}>
                N° 03 — Valeurs
              </Typography>
              <Typography sx={{ fontSize: { xs: 36, md: 56 }, lineHeight: 0.95, letterSpacing: '-0.03em', color: navy, fontWeight: 600 }}>
                Nos quatre<br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>principes.</span>
              </Typography>
            </Box>
          </Stack>
          <Grid container>
            {values.map((v, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={v.title}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderTop: `1px solid ${palette.neutral[300]}`,
                  borderRight: { sm: i % 2 === 0 ? `1px solid ${palette.neutral[300]}` : 'none' },
                  '&:nth-last-of-type(-n+1)': { borderBottom: `1px solid ${palette.neutral[300]}` },
                }}
              >
                <Stack direction="row" sx={{ alignItems: 'baseline', gap: 3, mb: 2 }}>
                  <Typography sx={{ fontFamily: mono, fontSize: 13, letterSpacing: '0.2em', color: gold, fontWeight: 700 }}>{v.idx}</Typography>
                  <Typography sx={{ fontSize: { xs: 24, md: 32 }, color: navy, fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {v.title}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 15, color: palette.neutral[700], lineHeight: 1.75, maxWidth: 460 }}>
                  {v.body}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ bgcolor: navy, color: '#fff', py: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 320px at 80% 50%, rgba(197,160,89,0.14), transparent 60%)' }} />
        <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase', mb: 3 }}>
            Engagement qualité
          </Typography>
          <Typography sx={{ fontSize: { xs: 32, md: 56 }, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 600, mb: 4 }}>
            De la matière première<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>à la livraison.</span>
          </Typography>
          <Typography sx={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
            Chaque étape est tracée, contrôlée, documentée — pour des produits
            sûrs, efficaces et conformes aux exigences les plus strictes.
          </Typography>
        </Container>
      </Box>
    </>
  );
}