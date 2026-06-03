import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MMPharma | Something Wonderful Is About To Be Created",
  description: "Something wonderful is about to be created — coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
