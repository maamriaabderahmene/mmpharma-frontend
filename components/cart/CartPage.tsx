'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  IconButton,
  TextField,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { ROUTES } from '@/lib/shared/routes';
import type { CartLineItem } from '@/lib/shared/types/Cart';

export function CartPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fr-MA';

  const [items, setItems] = useState<CartLineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch {
      setError('Impossible de charger le panier.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await fetch('/api/cart/items', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      fetchCart();
    } catch {
      // silent
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await fetch('/api/cart/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      fetchCart();
    } catch {
      // silent
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: 'neutral.300', mb: 2 }} />
        <Typography variant="h5" sx={{ color: 'primary.main', mb: 1 }}>
          Votre panier est vide
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Découvrez nos produits et ajoutez-les à votre panier.
        </Typography>
        <Button
          component="a"
          href={ROUTES.products(locale)}
          variant="contained"
          color="primary"
        >
          Découvrir nos produits
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 36 }, color: 'primary.main', mb: 4 }}>
        Mon panier
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2} sx={{ mb: 4 }}>
        {items.map((item) => (
          <Card key={item.productId}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' } }}>
                <Box
                  sx={{
                    width: { xs: '100%', sm: 80 },
                    height: { xs: 160, sm: 80 },
                    borderRadius: 1,
                    overflow: 'hidden',
                    flexShrink: 0,
                    bgcolor: 'neutral.100',
                    '& img': { width: '100%', height: '100%', objectFit: 'cover' },
                  }}
                >
                  {item.productImage && <img src={item.productImage} alt={item.productName} />}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={ROUTES.productDetail(locale, item.slug)}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {item.productName}
                    </Typography>
                  </Link>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {item.productCode} · {item.conditionnement}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {item.unitPrice.toFixed(2)} MAD
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (val > 0) updateQuantity(item.productId, val);
                    }}
                    type="number"
                    size="small"
                    slotProps={{
                      htmlInput: { min: 1, style: { textAlign: 'center', width: 40 } },
                    }}
                    sx={{ width: 70 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Typography variant="body1" sx={{ fontWeight: 700, minWidth: 80, textAlign: 'right' }}>
                  {item.lineTotal.toFixed(2)} MAD
                </Typography>

                <IconButton onClick={() => removeItem(item.productId)} color="error" size="small">
                  <DeleteOutlinedIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack
        spacing={2}
        sx={{ flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' } }}
      >
        <Button component="a" href={ROUTES.products(locale)} variant="outlined" color="primary">
          Continuer mes achats
        </Button>

        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant="h5" sx={{ color: 'primary.main', mb: 1 }}>
            Sous-total : {subtotal.toFixed(2)} MAD
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push(ROUTES.checkout(locale))}
            fullWidth
          >
            Commander
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
