import { Container, Typography, Box, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { palette } from '@/theme/palette';

const ranges = [
  {
    id: 'hygiene',
    n: 'I',
    name: 'Hygiène & soin des mains',
    tagline: 'Gels hydroalcooliques · Savons doux, antibactériens et désinfectants',
    description:
      'Formulations dermo-compatibles pour un usage professionnel et grand public : hôpitaux, restauration, industrie agroalimentaire et particuliers exigeants.',
    count: 12,
  },
  {
    id: 'detergent',
    n: 'II',
    name: 'Détergents professionnels',
    tagline: 'Nettoyants concentrés · Machines à laver · Sanitaires · Désodorisants',
    description:
      'Puissance de nettoyage calibrée pour l\u2019hôtellerie, l\u2019industrie, les collectivités et les écoles. Rendement, sécurité, économies.',
    count: 5,
  },
  {
    id: 'disinfectant',
    n: 'III',
    name: 'Désinfectants',
    tagline: 'Surfaces · Sols · Textiles · Instruments chirurgicaux · Voie aérienne',
    description:
      'Solutions bactéricides, virucides et fongicides à large spectre — validées microbiologiquement selon les normes ISO en vigueur.',
    count: 9,
  },
  {
    id: 'inox',
    n: 'IV',
    name: 'Entretien de l\u2019inox',
    tagline: 'Antirouille · Rénovateur bain · Polish',
    description:
      'Protection et rénovation des surfaces inoxydables — cuisines professionnelles, blocs opératoires, ateliers industriels.',
    count: 3,
  },
  {
    id: 'misc',
    n: 'V',
    name: 'Consommables pharmaceutiques',
    tagline: 'Eau distillée · Glycérine végétale · Gel d\u2019échographie',
    description:
      'Produits ancillaires de haute pureté destinés aux laboratoires, cabinets d\u2019imagerie médicale et unités de production.',
    count: 3,
  },
] as const;

export function Ranges() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: palette.neutral[50] }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 8, md: 12 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ maxWidth: 720 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
              <Box sx={{ width: 32, height: '1px', bgcolor: palette.accent[700] }} />
              <Typography sx={{ fontSize: 11, letterSpacing: '0.28em', color: palette.accent[700], fontWeight: 600 }}>
                CATALOGUE — CINQ GAMMES
              </Typography>
            </Stack>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 36, md: 64 },
                lineHeight: 1,
                letterSpacing: '-0.03em',
                fontWeight: 500,
                color: palette.primary[900],
              }}
            >
              De la main du soignant au sol du bloc opératoire.
            </Typography>
          </Box>
          <Typography sx={{ maxWidth: 380, color: palette.neutral[700], fontSize: 15, lineHeight: 1.7 }}>
            32 références conçues et fabriquées en Algérie, alignées sur les protocoles hospitaliers,
            hôteliers et industriels les plus exigeants.
          </Typography>
        </Box>

        <Box sx={{ borderTop: `1px solid ${palette.primary[900]}` }}>
          {ranges.map((r) => (
            <Box
              key={r.id}
              component="a"
              href={`/products?range=${r.id}`}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '48px 1fr auto', md: '100px 1fr 2fr 80px' },
                alignItems: 'center',
                gap: { xs: 2, md: 4 },
                py: { xs: 4, md: 6 },
                px: { xs: 0, md: 2 },
                borderBottom: `1px solid ${palette.neutral[300]}`,
                textDecoration: 'none',
                color: 'inherit',
                position: 'relative',
                transition: 'all 300ms cubic-bezier(0.2, 0, 0, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  bgcolor: palette.primary[900],
                  transform: 'scaleY(0)',
                  transformOrigin: 'bottom',
                  transition: 'transform 400ms cubic-bezier(0.2, 0, 0, 1)',
                  zIndex: 0,
                },
                '&:hover::before': { transform: 'scaleY(1)' },
                '&:hover .range-cell': { color: palette.neutral[0] },
                '&:hover .range-arrow': { color: palette.accent[500], transform: 'translateX(8px)' },
                '& > *': { position: 'relative', zIndex: 1 },
              }}
            >
              <Typography
                className="range-cell"
                sx={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  color: palette.accent[700],
                  letterSpacing: '0.08em',
                  transition: 'color 300ms',
                }}
              >
                — {r.n}
              </Typography>
              <Box>
                <Typography
                  className="range-cell"
                  sx={{
                    fontSize: { xs: 22, md: 36 },
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: palette.primary[900],
                    mb: 1,
                    transition: 'color 300ms',
                  }}
                >
                  {r.name}
                </Typography>
                <Typography
                  className="range-cell"
                  sx={{
                    fontSize: { xs: 12, md: 13 },
                    color: palette.neutral[500],
                    letterSpacing: '0.02em',
                    transition: 'color 300ms',
                  }}
                >
                  {r.tagline} · {r.count} SKU
                </Typography>
              </Box>
              <Typography
                className="range-cell"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  fontSize: 14,
                  color: palette.neutral[700],
                  lineHeight: 1.6,
                  maxWidth: 460,
                  transition: 'color 300ms',
                }}
              >
                {r.description}
              </Typography>
              <Box
                className="range-arrow"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  color: palette.primary[900],
                  transition: 'all 300ms',
                }}
              >
                <ArrowForwardIcon />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}