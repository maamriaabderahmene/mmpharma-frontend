import type { Metadata } from 'next';
import { Container, Box } from '@mui/material';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { CartPage } from '@/components/cart/CartPage';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Panier',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/cart` },
  };
}

export default function CartRoutePage({ params }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <CartPage />
    </Container>
  );
}
