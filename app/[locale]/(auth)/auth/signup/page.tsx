import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
