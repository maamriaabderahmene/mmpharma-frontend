'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export function SignupForm() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fr-MA';

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Une erreur est survenue lors de l\'inscription.');
        return;
      }

      router.push(ROUTES.signin(locale));
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', textAlign: 'center' }}>
        Créer un compte
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <TextField
          label="Nom complet"
          value={form.name}
          onChange={handleChange('name')}
          required
          fullWidth
          autoComplete="name"
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          required
          fullWidth
          autoComplete="email"
        />
        <TextField
          label="Mot de passe"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          required
          fullWidth
          autoComplete="new-password"
        />
        <TextField
          label="Confirmer le mot de passe"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          required
          fullWidth
          autoComplete="new-password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Créer mon compte'}
        </Button>
      </Stack>

      <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
        Déjà un compte ?{' '}
        <Link
          href={ROUTES.signin(locale)}
          style={{ fontWeight: 600, textDecoration: 'underline' }}
        >
          Se connecter
        </Link>
      </Typography>
    </Box>
  );
}
