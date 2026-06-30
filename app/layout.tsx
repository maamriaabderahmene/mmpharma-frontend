import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MM Pharma",
  description: "Fabricant de produits d'hygiène et de désinfection au ALGERIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-MA">
      <body>{children}</body>
    </html>
  );
}
