import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
