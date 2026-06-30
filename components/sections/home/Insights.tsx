import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import Link from 'next/link';
import type { Article } from '@/lib/shared/types/Article';
import { palette } from '@/theme/palette';

type Props = {
  articles: Article[];
};

export function Insights({ articles }: Props) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: palette.neutral[0] }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, flexWrap: 'wrap', gap: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: palette.primary[900],
            }}
          >
            Ressources & expertise
          </Typography>
          <Button
            component={Link}
            href="/blog"
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 28, px: 3 }}
          >
            Tous les articles
          </Button>
        </Box>

        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <Card
                component={Link}
                href={`/article/${article.slug}`}
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  transition: 'all 200ms cubic-bezier(0.2, 0, 0, 1)',
                  cursor: 'pointer',
                  borderRadius: 12,
                  '&:hover': {
                    borderColor: palette.primary[500],
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(14, 90, 167, 0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: 180,
                    background: 'linear-gradient(135deg, rgba(14, 90, 167, 0.08), rgba(22, 163, 122, 0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: `1px solid ${palette.neutral[200]}`,
                  }}
                >
                  <Typography variant="caption" sx={{ color: palette.neutral[500] }}>
                    {article.heroImage?.url ? 'Image' : 'Illustration'}
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: palette.neutral[500], letterSpacing: 1, fontSize: 11 }}
                  >
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-MA') : ''}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: palette.primary[900],
                      mt: 0.5,
                      mb: 1,
                      fontSize: 16,
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: palette.neutral[700],
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
      </Container>
    </Box>
  );
}
