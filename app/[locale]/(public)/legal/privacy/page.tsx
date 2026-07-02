import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Politique de confidentialité',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/legal/privacy` },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 40 }, color: 'primary.main', mb: 6 }}>
        Politique de confidentialité
      </Typography>

      <Box
        sx={{
          '& h2': { fontSize: 22, fontWeight: 700, color: 'primary.main', mt: 5, mb: 2 },
          '& h3': { fontSize: 18, fontWeight: 600, color: 'primary.main', mt: 4, mb: 1.5 },
          '& p': { fontSize: 15, lineHeight: 1.8, color: 'text.secondary', mb: 2 },
          '& ul': { pl: 3, mb: 2, '& li': { fontSize: 15, lineHeight: 1.8, color: 'text.secondary', mb: 0.5 } },
        }}
      >
        <h2>1. Collecte des données</h2>
        <p>
          Nous collectons les données personnelles que vous nous fournissez lors de la création de votre compte,
          la passation de commandes, ou via notre formulaire de contact : nom, email, téléphone, adresse de livraison.
        </p>

        <h2>2. Utilisation des données</h2>
        <p>
          Vos données sont utilisées pour le traitement de vos commandes, la gestion de votre compte,
          l'envoi d'informations commerciales (avec votre consentement), et l'amélioration de nos services.
        </p>

        <h2>3. Partage des données</h2>
        <p>
          Nous ne partageons vos données personnelles avec des tiers que lorsque cela est nécessaire
          à l'exécution de votre commande (transporteurs, prestataires de paiement) ou pour respecter
          une obligation légale.
        </p>

        <h2>4. Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles
          ont été collectées, conformément aux obligations légales en vigueur.
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Conformément à la loi algérienne 09-08 relative à la protection des données à caractère personnel,
          vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
          Pour exercer ces droits, contactez-nous à l'adresse email suivante : privacy@mmpharma.ma.
        </p>
      </Box>
    </Container>
  );
}
