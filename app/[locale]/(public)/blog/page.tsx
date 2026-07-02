import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';
import { BlogList } from '@/components/sections/blog/BlogList';
import { palette } from '@/theme/palette';

const mono = "'JetBrains Mono', ui-monospace, monospace";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blog',
    description: 'Actualités, conseils et expertise en hygiène et désinfection professionnelle.',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/blog` },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const navy = palette.primary[900];
  const gold = palette.accent[500];

  return (
    <>
      <Box sx={{ bgcolor: navy, color: '#fff', pt: { xs: 14, md: 20 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(700px 320px at 80% 30%, rgba(197,160,89,0.14), transparent 60%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.34em', color: gold, textTransform: 'uppercase', mb: 3 }}>
            N° 08 — Journal
          </Typography>
          <Typography sx={{ fontSize: { xs: 48, sm: 72, md: 112 }, lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 600 }}>
            Sciences,<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: gold }}>terrain,</span> savoir-faire.
          </Typography>
          <Typography sx={{ mt: 4, maxWidth: 560, fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Analyses microbiologiques, guides pratiques d’hygiène et retours
            d’expérience — la voix de nos laboratoires et de nos partenaires.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg" sx={{ px: 0 }}>
          <BlogList locale={locale} page={currentPage} />
        </Container>
      </Box>
    </>
  );
}
