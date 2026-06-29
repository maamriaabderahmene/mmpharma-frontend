import { Typography, Box, Chip, Stack, Avatar } from '@mui/material';
import type { Article } from '@/lib/shared/types/Article';

type Props = {
  article: Article;
  locale: string;
};

export function ArticleBody({ article, locale }: Props) {
  return (
    <article>
      <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale) : ''} ·{' '}
        {article.body?.readingTime || 3} min de lecture
      </Typography>

      <Typography
        variant="h1"
        sx={{ fontSize: { xs: 28, md: 40 }, color: 'primary.main', my: 2 }}
      >
        {article.title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <Avatar src={article.author.avatar} alt={article.author.name} sx={{ width: 36, height: 36 }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {article.author.name}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 4 }} flexWrap="wrap" useFlexGap>
        {article.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Stack>

      {article.heroImage?.url && (
        <Box
          sx={{
            width: '100%',
            height: { xs: 240, md: 400 },
            borderRadius: 2,
            overflow: 'hidden',
            mb: 5,
            '& img': { width: '100%', height: '100%', objectFit: 'cover' },
          }}
        >
          <img src={article.heroImage.url} alt={article.title} />
        </Box>
      )}

      <Box
        sx={{
          '& h2': {
            fontSize: { xs: 22, md: 28 },
            fontWeight: 700,
            color: 'primary.main',
            mt: 5,
            mb: 2,
            scrollMarginTop: 80,
          },
          '& h3': {
            fontSize: { xs: 18, md: 22 },
            fontWeight: 600,
            color: 'primary.main',
            mt: 4,
            mb: 1.5,
          },
          '& p': {
            fontSize: 16,
            lineHeight: 1.8,
            color: 'text.secondary',
            mb: 2,
          },
          '& ul, & ol': {
            pl: 3,
            mb: 2,
            '& li': { fontSize: 16, lineHeight: 1.8, color: 'text.secondary', mb: 0.5 },
          },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            pl: 3,
            py: 1,
            my: 3,
            bgcolor: 'primary.50',
            borderRadius: 1,
            '& p': { mb: 0, fontStyle: 'italic' },
          },
          '& a': { color: 'primary.main', textDecoration: 'underline' },
          '& img': { maxWidth: '100%', borderRadius: 2, my: 3 },
          '& pre': {
            bgcolor: 'neutral.100',
            p: 3,
            borderRadius: 2,
            overflow: 'auto',
            fontSize: 14,
            lineHeight: 1.6,
            mb: 2,
          },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: article.body?.markdown || '' }} />
      </Box>
    </article>
  );
}
