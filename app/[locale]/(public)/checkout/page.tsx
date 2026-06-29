import type { Metadata } from 'next';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { RequireAuth } from '@/components/auth/RequireAuth';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Commander',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/checkout` },
  };
}

export default function CheckoutPage({ params }: Props) {
  return (
    <RequireAuth>
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, color: 'primary.main', mb: 4 }}>
          Commander
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Interface de commande à intégrer.
        </Typography>
      </Container>
    </RequireAuth>
  );
}
