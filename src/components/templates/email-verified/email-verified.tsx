'use client';

import { Alert, Box, Paper, Stack, Text, Title } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/src/components/atoms';
import { AuthLayout } from '@/src/components/templates';
import { cardStyles } from '@/src/theme';

export const EmailVerified = () => {
  const tSuccess = useTranslations('auth.emailVerified.success');
  const tFailure = useTranslations('auth.emailVerified.failure');
  const tCommon = useTranslations('common');

  const router = useRouter();
  const searchParameters = useSearchParams();
  const success = searchParameters.get('success');
  const error = searchParameters.get('error');

  const isVerified = success === 'true';

  return (
    <AuthLayout>
      <Paper p='xl' radius='lg' style={cardStyles}>
        <Box ta='center' mb='lg'>
          <Box mb='md'>
            {isVerified ? (
              <IconCircleCheck size={64} color='#4ade80' />
            ) : (
              <IconCircleX size={64} color='#f87171' />
            )}
          </Box>
          <Title
            order={1}
            c='white'
            fz='1.75rem'
            fw={600}
            style={{ letterSpacing: '0.5px' }}
          >
            {isVerified ? tSuccess('title') : tFailure('title')}
          </Title>
        </Box>

        <Box ta='center' mb='xl'>
          {isVerified ? (
            <>
              <Text c='rgba(255, 255, 255, 0.9)' fz='1rem' lh={1.6} mb='sm'>
                {tSuccess('message')}
              </Text>
              <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem' lh={1.5}>
                {tSuccess('instructions')}
              </Text>
            </>
          ) : (
            <>
              <Text c='rgba(255, 255, 255, 0.9)' fz='1rem' lh={1.6} mb='sm'>
                {tFailure('message')}
              </Text>
              {error ? (
                <Alert
                  color='red'
                  my='md'
                  radius='sm'
                  styles={{
                    root: {
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                    },
                    message: {
                      color: '#f87171',
                      textAlign: 'center',
                    },
                  }}
                >
                  {decodeURIComponent(error)}
                </Alert>
              ) : null}
              <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem' lh={1.5}>
                {tFailure('instructions')}
              </Text>
            </>
          )}
        </Box>

        <Stack gap='sm'>
          <Button
            variant='primary'
            fullWidth
            onClick={() => router.push('/login')}
          >
            {isVerified ? tSuccess('goToLogin') : tFailure('backToLogin')}
          </Button>
          {!isVerified && (
            <Button
              variant='ghost'
              fullWidth
              onClick={() => router.push('/signup')}
            >
              {tFailure('createNewAccount')}
            </Button>
          )}
        </Stack>

        <Box
          ta='center'
          mt='xl'
          pt='lg'
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <Text c='rgba(255, 255, 255, 0.5)' fz='0.85rem'>
            {tCommon('appName')}
          </Text>
        </Box>
      </Paper>
    </AuthLayout>
  );
};
