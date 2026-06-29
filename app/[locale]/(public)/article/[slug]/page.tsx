import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Box } from '@mui/material';
import { ArticleBody } from '@/components/sections/blog/ArticleBody';
import { CommentThread } from '@/components/sections/comments/CommentThread';
import { HiddenSEO } from '@/components/seo/HiddenSEO';
import type { Article } from '@/lib/shared/types/Article';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function fetchArticle(slug: string, locale: string): Promise<Article | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}?locale=${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await fetchArticle(slug, locale);
  if (!article) return { title: 'Article non trouvé' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `https://www.mmpharma.ma/${locale}/article/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const article = await fetchArticle(slug, locale);

  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author.name },
    datePublished: article.publishedAt,
    image: article.heroImage?.url,
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HiddenSEO html={`<h1>${article.title}</h1><p>${article.excerpt}</p>`} />
      <ArticleBody article={article} locale={locale} />
      <Box sx={{ mt: 8 }}>
        <CommentThread articleId={article.id} locale={locale} />
      </Box>
    </Container>
  );
}
