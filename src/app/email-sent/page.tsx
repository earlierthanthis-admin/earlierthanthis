'use client';

import { Center, Loader, Paper } from '@mantine/core';
import { Suspense } from 'react';

import { AuthLayout, EmailSent } from '@/src/components/templates';
import { cardStyles } from '@/src/theme';

export default function EmailSentPage() {
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
      <EmailSent />
    </Suspense>
  );
}
