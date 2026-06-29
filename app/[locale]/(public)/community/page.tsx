import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';
import { CommunityFeed } from '@/components/sections/community/CommunityFeed';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Communauté',
    description: 'Échangez avec nos experts et partagez vos expériences.',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/community` },
  };
}

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 32, md: 48 }, color: 'primary.main', mb: 2 }}
        >
          Communauté
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: 600 }}>
          Échangez avec nos experts, posez vos questions et partagez vos expériences avec la communauté MM Pharma.
        </Typography>
        <CommunityFeed locale={locale} />
      </Container>
    </Box>
  );
}
