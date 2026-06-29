import type { Metadata } from 'next';
import { Container, Typography, Box, Card, CardContent, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Mes commandes',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/account/my-orders` },
  };
}

const statusColors: Record<string, 'warning' | 'info' | 'success' | 'error' | 'default'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',
  refunded: 'default',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  processing: 'En cours',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

export default async function MyOrdersPage({ params }: Props) {
  const { locale } = await params;

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, color: 'primary.main', mb: 4 }}>
        Mes commandes
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Historique et suivi de vos commandes.
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
        Aucune commande pour le moment.
      </Typography>
    </Container>
  );
}
