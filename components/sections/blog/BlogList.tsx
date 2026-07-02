import Link from 'next/link';
import { Grid, Typography, Box, Pagination, PaginationItem, Stack } from '@mui/material';
import type { Article } from '@/lib/shared/types/Article';
import { palette } from '@/theme/palette';

const mono = "'JetBrains Mono', ui-monospace, monospace";

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
      <Typography sx={{ color: palette.neutral[500], textAlign: 'center', py: 12, fontFamily: mono, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 12 }}>
        Aucun article pour le moment.
      </Typography>
    );
  }

  const navy = palette.primary[900];
  const gold = palette.accent[500];

  return (
    <>
      <Grid container spacing={0}>
        {articles.map((article, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}
            sx={{
              borderRight: { md: i % 3 !== 2 ? `1px solid ${palette.neutral[200]}` : 'none' },
              borderBottom: `1px solid ${palette.neutral[200]}`,
              borderTop: i < 3 ? `1px solid ${palette.neutral[200]}` : 'none',
            }}
          >
            <Link href={`/${locale}/article/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  transition: 'background 0.3s',
                  '&:hover': { bgcolor: palette.neutral[50] },
                  '&:hover .arrow': { transform: 'translate(4px, -4px)', color: gold },
                }}
              >
                <Box
                  sx={{
                    aspectRatio: '16 / 10',
                    background: article.heroImage?.url
                      ? `url(${article.heroImage.url}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${navy}, ${palette.primary[700]})`,
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      fontFamily: mono,
                      fontSize: 10,
                      letterSpacing: '0.24em',
                      color: '#fff',
                      textTransform: 'uppercase',
                      bgcolor: 'rgba(10,25,47,0.7)',
                      px: 1.2,
                      py: 0.6,
                    }}
                  >
                    N°{String(i + 1).padStart(2, '0')}
                  </Typography>
                </Box>

                <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: palette.neutral[500], textTransform: 'uppercase' }}>
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-MA') : ''}
                  {' · '}{article.body?.readingTime || 3} MIN
                </Typography>

                <Typography
                  sx={{
                    color: navy,
                    fontSize: { xs: 20, md: 24 },
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    flex: 1,
                  }}
                >
                  {article.title}
                </Typography>

                <Typography
                  sx={{
                    color: palette.neutral[700],
                    fontSize: 14,
                    lineHeight: 1.65,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {article.excerpt}
                </Typography>

                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, borderTop: `1px solid ${palette.neutral[200]}` }}>
                  <Typography sx={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.24em', color: navy, textTransform: 'uppercase' }}>
                    Lire l’article
                  </Typography>
                  <Box
                    className="arrow"
                    sx={{
                      transition: 'all 0.3s',
                      color: navy,
                      fontSize: 20,
                      lineHeight: 1,
                    }}
                  >
                    ↗
                  </Box>
                </Stack>
              </Box>
            </Link>
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
