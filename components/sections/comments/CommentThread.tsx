'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import type { Comment, CommentReaction } from '@/lib/shared/types/Comment';
import type { CommentStatus } from '@/lib/shared/constants/CommentStatus';

type Props = {
  articleId: string;
  locale: string;
};

const statusLabels: Record<string, { label: string; color: 'warning' | 'success' | 'error' }> = {
  pending: { label: 'En attente', color: 'warning' },
  approved: { label: 'Approuvé', color: 'success' },
  rejected: { label: 'Rejeté', color: 'error' },
  flagged: { label: 'Signalé', color: 'error' },
};

function CommentCard({
  comment,
  onReply,
  onReact,
  depth,
}: {
  comment: Comment;
  onReply: (parentId: string) => void;
  onReact: (commentId: string) => void;
  depth: number;
}) {
  const statusInfo = statusLabels[comment.status] || statusLabels.pending;

  return (
    <Box
      sx={{
        pl: depth * 3,
        mb: 2,
        borderLeft: depth > 0 ? '2px solid' : 'none',
        borderColor: 'divider',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <Avatar src={comment.author.avatar} alt={comment.author.name} sx={{ width: 32, height: 32 }} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {comment.author.name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {new Date(comment.createdAt).toLocaleDateString('fr-MA')}
        </Typography>
        {comment.status !== 'approved' && (
          <Chip label={statusInfo.label} size="small" color={statusInfo.color} variant="outlined" />
        )}
      </Stack>

      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1 }}>
        {comment.body}
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small" onClick={() => onReact(comment.id)} sx={{ color: 'text.secondary' }}>
          {comment.reactions?.length > 0 ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
        </IconButton>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {comment.reactions?.length || 0}
        </Typography>
        <Button size="small" startIcon={<ReplyIcon />} onClick={() => onReply(comment.id)} sx={{ textTransform: 'none' }}>
          Répondre
        </Button>
      </Stack>
    </Box>
  );
}

export function CommentThread({ articleId, locale }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${articleId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.data || data.comments || []);
      }
    } catch {
      setError('Impossible de charger les commentaires.');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = (parentId: string) => {
    setReplyTo(parentId);
    setBody('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: body.trim(), parentId: replyTo }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Erreur lors de l\'envoi.');
        return;
      }

      setBody('');
      setReplyTo(null);
      fetchComments();
    } catch {
      setError('Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReact = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}/react`, { method: 'POST' });
      fetchComments();
    } catch {
      // silent
    }
  };

  const topLevel = comments.filter((c) => !c.parentId);
  const replies = (parentId: string) => comments.filter((c) => c.parentId === parentId);

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'primary.main', mb: 4 }}>
        Commentaires ({comments.length})
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error && comments.length === 0 ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            {replyTo && (
              <Typography variant="caption" sx={{ mb: 1, display: 'block', color: 'text.secondary' }}>
                Répondre au commentaire #{replyTo.slice(-4)}
                <Button size="small" onClick={() => setReplyTo(null)} sx={{ ml: 1, textTransform: 'none' }}>
                  Annuler
                </Button>
              </Typography>
            )}
            <TextField
              multiline
              rows={3}
              placeholder={replyTo ? 'Écrire une réponse...' : 'Laisser un commentaire...'}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              sx={{ mb: 1.5 }}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Votre commentaire sera modéré avant publication.
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!body.trim() || submitting}
              >
                {submitting ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : 'Envoyer'}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {topLevel.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
              Soyez le premier à commenter.
            </Typography>
          ) : (
            topLevel.map((comment) => (
              <Box key={comment.id}>
                <CommentCard comment={comment} onReply={handleReply} onReact={handleReact} depth={comment.depth} />
                {replies(comment.id).map((reply) => (
                  <CommentCard key={reply.id} comment={reply} onReply={handleReply} onReact={handleReact} depth={reply.depth} />
                ))}
              </Box>
            ))
          )}
        </>
      )}
    </Box>
  );
}
