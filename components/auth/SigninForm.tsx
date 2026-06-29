'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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

export function SigninForm() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fr-MA';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const next = searchParams.get('next') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Email ou mot de passe incorrect.');
        return;
      }

      router.push(next ? decodeURIComponent(next) : ROUTES.account(locale));
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', textAlign: 'center' }}>
        Connexion
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
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          autoComplete="current-password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Se connecter'}
        </Button>
      </Stack>

      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        <Link
          href={ROUTES.forgotPassword(locale)}
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          Mot de passe oublié ?
        </Link>
      </Typography>

      <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
        Pas encore de compte ?{' '}
        <Link
          href={ROUTES.signup(locale)}
          style={{ fontWeight: 600, textDecoration: 'underline' }}
        >
          S'inscrire
        </Link>
      </Typography>
    </Box>
  );
}
