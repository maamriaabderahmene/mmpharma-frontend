import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import { palette } from '@/theme/palette';
import ScienceIcon from '@mui/icons-material/Science';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';

export function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Animated Mesh Background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        background: 'linear-gradient(135deg, rgba(224,242,254,0.6) 0%, rgba(240,242,255,0.2) 100%)',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.primary[500]}15 0%, rgba(255,255,255,0) 70%)`,
          filter: 'blur(60px)',
          animation: 'pulse 10s infinite alternate',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1) translate(0, 0)' },
            '100%': { transform: 'scale(1.1) translate(-20px, 20px)' },
          },
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.secondary[500]}15 0%, rgba(255,255,255,0) 70%)`,
          filter: 'blur(80px)',
          animation: 'pulse 12s infinite alternate-reverse',
        }} />
      </Box>

      {/* Hero Content */}
      <Container maxWidth="lg" sx={{ zIndex: 1, position: 'relative', flex: 1, display: 'flex', alignItems: 'center', py: { xs: 12, md: 20 } }}>
        <Stack spacing={4} sx={{ maxWidth: '800px' }}>
          
          {/* Eyebrow Label */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 40, height: 2, bgcolor: palette.accent[500] }} />
            <Typography variant="overline" sx={{ color: palette.accent[700], fontWeight: 700, letterSpacing: 2, fontSize: '0.85rem' }}>
              PHARMACEUTIQUE · MAROC
            </Typography>
          </Box>
          
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '3rem', md: '5rem', lg: '5.5rem' }, 
            fontWeight: 800, 
            lineHeight: 1.05,
            color: '#0f172a',
            letterSpacing: '-0.03em',
            textShadow: '0 4px 20px rgba(255,255,255,0.4)'
          }}>
            L'excellence en <br />
            <Box component="span" sx={{ 
              color: palette.primary[600],
              background: `linear-gradient(to right, ${palette.primary[600]}, ${palette.primary[400]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              hygiène médicale
            </Box>
          </Typography>
          
          <Typography variant="h5" sx={{ 
            color: '#475569', 
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: '650px',
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}>
            MM Pharma conçoit et fabrique des produits de désinfection avec des standards mondiaux. Protéger la santé publique et les professionnels exige le plus haut niveau d'expertise.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ pt: 2 }}>
            <Button 
              component={Link}
              href="/products"
              variant="contained" 
              size="large"
              sx={{ 
                px: 5, 
                py: 2, 
                borderRadius: '50px',
                fontSize: '1.1rem',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: `0 10px 25px -5px ${palette.primary[500]}40`,
                bgcolor: palette.primary[600],
                '&:hover': {
                  bgcolor: palette.primary[700],
                  boxShadow: `0 15px 35px -5px ${palette.primary[500]}60`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Découvrir nos produits
            </Button>
            <Button 
              component={Link}
              href="/contact"
              variant="outlined" 
              size="large"
              sx={{ 
                px: 5, 
                py: 2, 
                borderRadius: '50px',
                fontSize: '1.1rem',
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2,
                color: palette.primary[900],
                borderColor: 'rgba(15, 23, 42, 0.15)',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: palette.primary[900],
                  bgcolor: 'transparent',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Demander un devis
            </Button>
          </Stack>

          {/* Features Bottom Row */}
          <Box sx={{ display: 'flex', gap: { xs: 3, md: 5 }, mt: { xs: 6, md: 8 }, flexWrap: 'wrap' }}>
            {[
              { icon: <ScienceIcon sx={{ color: palette.primary[600] }} />, text: 'Formules certifiées' },
              { icon: <LocalHospitalIcon sx={{ color: palette.primary[600] }} />, text: 'Normes ISO 9001' },
              { icon: <SecurityIcon sx={{ color: palette.primary[600] }} />, text: 'Protection 24/7' }
            ].map((feature, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: '12px', 
                  bgcolor: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 4px 15px -3px rgba(0,0,0,0.03)',
                  display: 'flex'
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>

        </Stack>
      </Container>
    </Box>
  );
}
