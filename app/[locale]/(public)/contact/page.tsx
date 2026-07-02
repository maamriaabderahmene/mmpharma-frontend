import type { Metadata } from 'next';
import { Container, Typography, Box, Grid, Stack, TextField, Button } from '@mui/material';
import { palette } from '@/theme/palette';

const mono = "'JetBrains Mono', ui-monospace, monospace";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact',
    description: 'Contactez MM Pharma — devis, information, support.',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  const navy = palette.primary[900];
  const gold = palette.accent[500];

  const infos = [
    { idx: '01', label: 'Adresse', value: 'MM Pharma — Casablanca, Maroc' },
    { idx: '02', label: 'Téléphone', value: '+212 5XX XX XX XX' },
    { idx: '03', label: 'Email', value: 'contact@mmpharma.ma' },
    { idx: '04', label: 'Horaires', value: 'Lun — Ven · 09h00 → 18h00' },
  ];

  return (
    <>
      {/* Hero */}
      <Box sx={{ bgcolor: navy, color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 320px at 70% 30%, rgba(197,160,89,0.14), transparent 60%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.34em', color: gold, textTransform: 'uppercase', mb: 3 }}>
            N° 10 — Contact
          </Typography>
          <Typography sx={{ fontSize: { xs: 44, sm: 72, md: 112 }, lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 600 }}>
            Parlons de<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>votre besoin.</span>
          </Typography>
          <Typography sx={{ mt: 4, maxWidth: 560, fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Devis, information technique, partenariats — notre équipe vous
            répond sous 48 heures ouvrées.
          </Typography>
        </Container>
      </Box>

      {/* Info strip */}
      <Box sx={{ bgcolor: '#fff', borderBottom: `1px solid ${palette.neutral[200]}` }}>
        <Container maxWidth="lg">
          <Grid container>
            {infos.map((it, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={it.label}
                sx={{
                  py: { xs: 3, md: 5 },
                  px: { xs: 2, md: 4 },
                  borderRight: { md: i < 3 ? `1px solid ${palette.neutral[200]}` : 'none' },
                  borderBottom: { xs: i < 3 ? `1px solid ${palette.neutral[200]}` : 'none', md: 'none' },
                }}
              >
                <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.24em', color: gold, textTransform: 'uppercase', mb: 1 }}>
                  N° {it.idx} · {it.label}
                </Typography>
                <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: navy, fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {it.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Form */}
      <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: palette.neutral[50] }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase', mb: 2 }}>
                Formulaire
              </Typography>
              <Typography sx={{ fontSize: { xs: 32, md: 48 }, lineHeight: 0.95, letterSpacing: '-0.03em', color: navy, fontWeight: 600 }}>
                Écrivez-nous.
              </Typography>
              <Typography sx={{ mt: 3, color: palette.neutral[700], fontSize: 15, lineHeight: 1.7, maxWidth: 420 }}>
                Décrivez votre besoin en quelques mots — volume, gamme cible,
                secteur d’activité. Nous revenons vers vous avec un devis
                personnalisé.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box component="form" noValidate sx={{ bgcolor: '#fff', p: { xs: 3, md: 5 }, border: `1px solid ${palette.neutral[200]}` }}>
                <Stack spacing={2.5}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Prénom" required fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField label="Nom" required fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                    </Grid>
                  </Grid>
                  <TextField label="Email" type="email" required fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                  <TextField label="Société" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                  <TextField label="Téléphone" type="tel" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                  <TextField label="Sujet" required fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                  <TextField label="Message" multiline rows={5} required fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }} />
                  <Button
                    type="submit"
                    disableElevation
                    sx={{
                      bgcolor: navy,
                      color: '#fff',
                      borderRadius: 0,
                      py: 2,
                      fontFamily: mono,
                      fontSize: 12,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      '&:hover': { bgcolor: gold, color: navy },
                    }}
                  >
                    Envoyer le message →
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
