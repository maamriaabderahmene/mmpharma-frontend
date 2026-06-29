'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  Drawer,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { ROUTES } from '@/lib/shared/routes';
import type { CartLineItem } from '@/lib/shared/types/Cart';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fr-MA';

  const [items, setItems] = useState<CartLineItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchCart();
  }, [open]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    await fetch('/api/cart/items', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const removeItem = async (productId: string) => {
    await fetch('/api/cart/items', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  };

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  const handleRedirect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, maxWidth: '100vw' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Mon panier ({items.length})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: 'neutral.300', mb: 2 }} />
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Votre panier est vide
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => handleRedirect(ROUTES.products(locale))}>
              Découvrir nos produits
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              <Stack spacing={2}>
                {items.map((item) => (
                  <Box key={item.productId}>
                    <Stack direction="row" spacing={1.5}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
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
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {item.productName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {item.conditionnement}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                          {item.unitPrice.toFixed(2)} MAD
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                          <IconButton size="small" onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton size="small" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <Box sx={{ flex: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.lineTotal.toFixed(2)} MAD
                          </Typography>
                          <IconButton size="small" onClick={() => removeItem(item.productId)} color="error">
                            <DeleteOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Sous-total
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {subtotal.toFixed(2)} MAD
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Button variant="contained" color="primary" fullWidth onClick={() => handleRedirect(ROUTES.checkout(locale))}>
                  Commander
                </Button>
                <Button variant="outlined" color="primary" fullWidth onClick={() => handleRedirect(ROUTES.cart(locale))}>
                  Voir le panier
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
