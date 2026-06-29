import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Politique des cookies',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/legal/cookies` },
  };
}

export default async function CookiesPage({ params }: Props) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 40 }, color: 'primary.main', mb: 6 }}>
        Politique des cookies
      </Typography>

      <Box
        sx={{
          '& h2': { fontSize: 22, fontWeight: 700, color: 'primary.main', mt: 5, mb: 2 },
          '& p': { fontSize: 15, lineHeight: 1.8, color: 'text.secondary', mb: 2 },
          '& ul': { pl: 3, mb: 2, '& li': { fontSize: 15, lineHeight: 1.8, color: 'text.secondary', mb: 0.5 } },
        }}
      >
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.
          Il permet de stocker des informations relatives à votre navigation.
        </p>

        <h2>2. Cookies utilisés</h2>
        <p>Nous utilisons les catégories de cookies suivantes :</p>
        <ul>
          <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (session, panier).</li>
          <li><strong>Cookies fonctionnels :</strong> permettent de mémoriser vos préférences.</li>
          <li><strong>Cookies analytiques :</strong> nous aident à comprendre comment vous utilisez le site.</li>
        </ul>

        <h2>3. Durée de conservation</h2>
        <p>
          Les cookies sont conservés pour une durée maximale de 13 mois à compter de leur dépôt,
          conformément aux recommandations de la CNPD.
        </p>

        <h2>4. Gestion des cookies</h2>
        <p>
          Vous pouvez à tout moment configurer vos préférences en matière de cookies via les paramètres
          de votre navigateur ou via notre module de gestion des cookies accessible depuis le site.
        </p>

        <h2>5. Contact</h2>
        <p>
          Pour toute question relative à notre politique des cookies, contactez-nous à l'adresse
          email suivante : privacy@mmpharma.ma.
        </p>
      </Box>
    </Container>
  );
}
