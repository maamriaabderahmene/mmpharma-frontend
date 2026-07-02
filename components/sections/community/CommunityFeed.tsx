'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';

type Post = {
  id: string;
  title: string;
  body: string;
  author: { name: string; avatar?: string };
  tags: string[];
  likes: number;
  liked: boolean;
  commentCount: number;
  createdAt: string;
};

type Props = {
  locale: string;
};

export function CommunityFeed({ locale }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/community/posts`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.data || data.posts || []);
      }
    } catch {
      setError('Impossible de charger les publications.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body: body.trim() }),
      });

      if (res.ok) {
        setTitle('');
        setBody('');
        setShowForm(false);
        fetchPosts();
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await fetch(`/api/community/posts/${postId}/like`, { method: 'POST' });
      fetchPosts();
    } catch {
      // silent
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 28 }, color: 'primary.main' }}>
          Questions & discussions
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : 'Nouvelle publication'}
        </Button>
      </Stack>

      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mb: 4, p: 3, borderRadius: 2, border: '1px solid', borderColor: 'primary.300' }}
        >
          <Stack spacing={2}>
            <TextField
              label="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Votre question ou message"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!title.trim() || !body.trim() || submitting}
            >
              {submitting ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : 'Publier'}
            </Button>
          </Stack>
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : posts.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
          Aucune publication pour le moment. Soyez le premier à poser une question !
        </Typography>
      ) : (
        <Stack spacing={2}>
          {posts.map((post) => (
            <Card key={post.id} sx={{ '&:hover': { borderColor: 'primary.300' } }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
                  <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: 32, height: 32 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {post.author.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(post.createdAt).toLocaleDateString('fr-MA')}
                  </Typography>
                </Stack>

                <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5, fontSize: 16 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                  {post.body}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap' }}>
                  {post.tags?.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>

                <Divider sx={{ mb: 1.5 }} />

                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <IconButton size="small" onClick={() => handleLike(post.id)} sx={{ color: 'text.secondary' }}>
                    {post.liked ? <ThumbUpIcon fontSize="small" color="primary" /> : <ThumbUpOutlinedIcon fontSize="small" />}
                  </IconButton>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.likes}
                  </Typography>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.commentCount}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
