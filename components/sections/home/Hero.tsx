import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { palette } from '@/theme/palette';

const marquee = ['ISO 21149', 'ISO 16212', 'ISO 21150', 'ISO 22717', 'ISO 22718', 'ISO 18416', 'JO N°16 · 2020'];

export function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        bgcolor: palette.primary[900],
        color: palette.neutral[0],
        isolation: 'isolate',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(60% 50% at 85% 10%, ${palette.primary[500]}55 0%, transparent 60%), radial-gradient(50% 45% at 10% 90%, ${palette.accent[500]}22 0%, transparent 60%)`,
          zIndex: -1,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${palette.neutral[0]}0A 1px, transparent 1px), linear-gradient(90deg, ${palette.neutral[0]}0A 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)',
          zIndex: -1,
        }}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 12, md: 14 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 8, md: 0 } }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box sx={{ width: 32, height: '1px', bgcolor: palette.accent[500] }} />
            <Typography sx={{ fontSize: 11, letterSpacing: '0.28em', color: palette.accent[500], fontWeight: 600 }}>
              N° 01 — PHARMACEUTIQUE
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 11, letterSpacing: '0.28em', color: `${palette.neutral[0]}66`, fontWeight: 500, display: { xs: 'none', md: 'block' } }}>
            EST. MMXIV · ALGERIA
          </Typography>
        </Stack>

        <Box sx={{ maxWidth: 1200 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 52, sm: 80, md: 120, lg: 152 },
              lineHeight: { xs: 0.98, md: 0.9 },
              letterSpacing: '-0.045em',
              fontWeight: 600,
              color: palette.neutral[0],
              mb: { xs: 5, md: 7 },
            }}
          >
            L&rsquo;hygiène,{' '}
            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.accent[500] }}>
              par la science.
            </Box>
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 8 }} sx={{ alignItems: { md: 'flex-end' } }}>
            <Typography
              sx={{
                color: `${palette.neutral[0]}CC`,
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.6,
                maxWidth: 520,
                fontWeight: 400,
              }}
            >
              MM Pharma conçoit, fabrique et distribue une gamme complète de produits d&rsquo;hygiène,
              de désinfection et d&rsquo;entretien pour les professionnels de santé, l&rsquo;hôtellerie,
              l&rsquo;industrie et les collectivités.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexShrink: 0 }}>
              <Button
                component="a"
                href="/products"
                size="large"
                sx={{
                  px: 4,
                  height: 56,
                  borderRadius: 0,
                  bgcolor: palette.accent[500],
                  color: palette.primary[900],
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  '&:hover': { bgcolor: palette.neutral[0] },
                }}
              >
                Découvrir le catalogue →
              </Button>
              <Button
                component="a"
                href="/contact"
                size="large"
                sx={{
                  px: 4,
                  height: 56,
                  borderRadius: 0,
                  color: palette.neutral[0],
                  border: `1px solid ${palette.neutral[0]}33`,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  '&:hover': { borderColor: palette.neutral[0], bgcolor: `${palette.neutral[0]}0A` },
                }}
              >
                Demander un devis
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ mt: { xs: 10, md: 12 }, pt: 4, borderTop: `1px solid ${palette.neutral[0]}1F` }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 10, letterSpacing: '0.32em', color: `${palette.neutral[0]}66`, fontWeight: 600 }}>
              CONTRÔLE MICROBIOLOGIQUE — LOT PAR LOT
            </Typography>
            <Stack direction="row" spacing={{ xs: 2, md: 4 }} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              {marquee.map((m) => (
                <Typography
                  key={m}
                  sx={{
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: palette.neutral[0],
                    fontWeight: 500,
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                >
                  {m}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}