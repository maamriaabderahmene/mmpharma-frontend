import type { Metadata } from 'next';
import { env } from '@/lib/env';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(env.MMP_APP_URL),
  description: "Fabricant de produits d'hygiène et de désinfection au Maroc",
  openGraph: {
    siteName: 'MM Pharma',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MM Pharma',
  },
};
