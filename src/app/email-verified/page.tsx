'use client';

import { Center, Loader, Paper } from '@mantine/core';
import { Suspense } from 'react';

import { AuthLayout, EmailVerified } from '@/src/components/templates';
import { cardStyles } from '@/src/theme';

export default function EmailVerifiedPage() {
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
      <EmailVerified />
    </Suspense>
  );
}
