import { Container, Typography, Box, Stack, Grid } from '@mui/material';
import { palette } from '@/theme/palette';

const pillars = [
  {
    n: '01',
    heading: 'Contrôle microbiologique',
    kicker: 'ISO 21149 · 16212 · 21150 · 22717 · 22718 · 18416',
    description:
      'Chaque lot est analysé en laboratoire pour garantir l\u2019absence de germes pathogènes, levures et moisissures — Escherichia coli, Pseudomonas aeruginosa, Staphylococcus aureus, Candida albicans.',
  },
  {
    n: '02',
    heading: 'Conformité réglementaire',
    kicker: 'JO N°16 · 24 mars 2020',
    description:
      'Tous nos produits respectent l\u2019arrêté du 21/10/2019 publié au Journal Officiel n°16 du 24 mars 2020 et les normes pharmaceutiques algériennes en vigueur.',
  },
  {
    n: '03',
    heading: 'Fabrication locale',
    kicker: 'Unité de production en Algérie',
    description:
      'Produits conçus et fabriqués dans notre unité de production, avec un contrôle qualité rigoureux à chaque étape — dossier technique et traçabilité par lot.',
  },
] as const;

export function Quality() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: palette.primary[900],
        color: palette.neutral[0],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(50% 60% at 100% 0%, ${palette.accent[500]}18, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ mb: { xs: 8, md: 12 }, alignItems: 'flex-end' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
              <Box sx={{ width: 32, height: '1px', bgcolor: palette.accent[500] }} />
              <Typography sx={{ fontSize: 11, letterSpacing: '0.28em', color: palette.accent[500], fontWeight: 600 }}>
                MÉTHODE — QUALITÉ PHARMACEUTIQUE
              </Typography>
            </Stack>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 40, md: 72 },
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
                fontWeight: 500,
                color: palette.neutral[0],
              }}
            >
              Une qualité{' '}
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.accent[500] }}>
                mesurable
              </Box>
              , lot après lot.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography sx={{ color: `${palette.neutral[0]}B3`, fontSize: 15, lineHeight: 1.7, maxWidth: 460 }}>
              La conformité n&rsquo;est pas un argument commercial — c&rsquo;est un protocole.
              Notre laboratoire produit un dossier microbiologique complet pour chaque référence,
              disponible sur demande auprès de nos partenaires professionnels.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={0} sx={{ borderTop: `1px solid ${palette.neutral[0]}22` }}>
          {pillars.map((p, i) => (
            <Grid
              size={{ xs: 12, md: 4 }}
              key={p.n}
              sx={{
                p: { xs: 4, md: 6 },
                borderRight: { md: i < 2 ? `1px solid ${palette.neutral[0]}22` : 'none' },
                borderBottom: { xs: i < 2 ? `1px solid ${palette.neutral[0]}22` : 'none', md: 'none' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 12,
                  letterSpacing: '0.24em',
                  color: palette.accent[500],
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                {p.n} / 03
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 24, md: 28 },
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                  color: palette.neutral[0],
                  mb: 2,
                }}
              >
                {p.heading}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  color: palette.accent[500],
                  mb: 3,
                  lineHeight: 1.5,
                }}
              >
                {p.kicker}
              </Typography>
              <Typography sx={{ fontSize: 14, color: `${palette.neutral[0]}B3`, lineHeight: 1.7 }}>
                {p.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}