'use client';

import { Center, Loader, Paper } from '@mantine/core';
import { Suspense } from 'react';

import { AuthLayout, ResetPassword } from '@/src/components/templates';
import { cardStyles } from '@/src/theme';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout>
          <Paper p='xl' radius='lg' style={cardStyles}>
            <Center py='xl'>
              <Loader color='gray' />
            </Center>
          </Paper>
        </AuthLayout>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
