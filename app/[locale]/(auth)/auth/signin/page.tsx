import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SigninForm } from '@/components/auth/SigninForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function SigninPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <SigninForm />
    </Suspense>
  );
}
