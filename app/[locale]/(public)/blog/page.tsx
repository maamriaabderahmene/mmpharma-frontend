import type { Metadata } from 'next';
import { Container, Typography, Box } from '@mui/material';
import { BlogList } from '@/components/sections/blog/BlogList';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blog',
    description: 'Actualités, conseils et expertise en hygiène et désinfection professionnelle.',
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/blog` },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: 32, md: 48 }, color: 'primary.main', mb: 6 }}
        >
          Blog
        </Typography>
        <BlogList locale={locale} page={currentPage} />
      </Container>
    </Box>
  );
}
