import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MM Pharma",
  description: "Fabricant de produits d'hygiène et de désinfection au Maroc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
