import type { Metadata } from 'next';
import { Container, Typography, Box, Card, CardContent, Chip, Stack } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Mes commentaires',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/account/comments` },
  };
}

export default async function MyCommentsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, color: 'primary.main', mb: 4 }}>
        Mes commentaires
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Historique de vos commentaires et leur statut de modération.
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
        Aucun commentaire pour le moment.
      </Typography>
    </Container>
  );
}
