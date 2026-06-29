import Link from 'next/link';
import { Grid, Card, CardContent, Typography, Box, Chip, Pagination, PaginationItem, Stack } from '@mui/material';
import type { Article } from '@/lib/shared/types/Article';

type Props = {
  locale: string;
  page: number;
};

async function fetchArticles(locale: string, page: number): Promise<{ articles: Article[]; totalPages: number }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?page=${page}&limit=9&locale=${locale}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { articles: [], totalPages: 1 };
    const data = await res.json();
    return { articles: data.data || data.articles || [], totalPages: data.totalPages || 1 };
  } catch {
    return { articles: [], totalPages: 1 };
  }
}

export async function BlogList({ locale, page }: Props) {
  const { articles, totalPages } = await fetchArticles(locale, page);

  if (articles.length === 0) {
    return (
      <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
        Aucun article pour le moment.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
            <Card
              component={Link}
              href={`/${locale}/article/${article.slug}`}
              sx={{
                textDecoration: 'none',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' },
              }}
            >
              <Box
                sx={{
                  height: 180,
                  background: article.heroImage?.url
                    ? `url(${article.heroImage.url}) center/cover no-repeat`
                    : 'linear-gradient(135deg, rgba(14,90,167,0.1), rgba(242,177,53,0.08))',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap' }}>
                  {article.tags?.slice(0, 2).map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: 11 }}>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString('fr-MA')
                    : ''}{' '}
                  · {article.body?.readingTime || 3} min de lecture
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', mt: 0.5, mb: 1, fontSize: 16, lineHeight: 1.3 }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {article.excerpt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            renderItem={(item) => (
              <Link href={`/${locale}/blog${item.page === 1 ? '' : `?page=${item.page}`}`} style={{ textDecoration: 'none' }}>
                <PaginationItem {...item} />
              </Link>
            )}
          />
        </Box>
      )}
    </>
  );
}
