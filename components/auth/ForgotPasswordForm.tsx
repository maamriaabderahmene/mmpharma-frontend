'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ROUTES } from '@/lib/shared/routes';

export function ForgotPasswordForm() {
  const params = useParams();
  const locale = (params.locale as string) || 'fr-MA';

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Une erreur est survenue.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.
        </Alert>
        <Link href={ROUTES.signin(locale)} style={{ fontWeight: 600, textDecoration: 'underline' }}>
          Retour à la connexion
        </Link>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h4" sx={{ mb: 1, color: 'primary.main', textAlign: 'center' }}>
        Mot de passe oublié
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
        Saisissez votre email et nous vous enverrons un lien de réinitialisation.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          autoComplete="email"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Envoyer le lien'}
        </Button>
      </Stack>

      <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
        <Link
          href={ROUTES.signin(locale)}
          style={{ fontWeight: 600, textDecoration: 'underline' }}
        >
          Retour à la connexion
        </Link>
      </Typography>
    </Box>
  );
}
