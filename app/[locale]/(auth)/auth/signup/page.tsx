import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SignupForm } from '@/components/auth/SignupForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function SignupPage({ params }: Props) {
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
