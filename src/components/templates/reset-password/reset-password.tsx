'use client';

import { Alert, Box, Paper, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck, IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/src/components/atoms';
import { FormField } from '@/src/components/molecules';
import { AuthLayout } from '@/src/components/templates';
import { useResetPassword } from '@/src/hooks';
import { cardStyles } from '@/src/theme';

export const ResetPassword = () => {
  const t = useTranslations('auth.resetPassword');
  const tFields = useTranslations('auth.fields');

  const router = useRouter();
  const searchParameters = useSearchParams();
  const token = searchParameters.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPasswordMutation = useResetPassword({
    onSuccess: () => {
      setIsSuccess(true);
      notifications.show({
        title: t('notifications.success.title'),
        message: t('notifications.success.message'),
        color: 'green',
      });
    },
    onError: (error) => {
      notifications.show({
        title: t('notifications.error.title'),
        message: error.message || t('notifications.error.message'),
        color: 'red',
      });
    },
    redirectTo: undefined, // We handle redirect manually
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      notifications.show({
        title: t('notifications.error.title'),
        message: t('notifications.error.passwordMismatch'),
        color: 'red',
      });
      return;
    }

    if (password.length < 8) {
      notifications.show({
        title: t('notifications.error.title'),
        message: t('notifications.error.passwordTooShort'),
        color: 'red',
      });
      return;
    }

    if (!token) {
      notifications.show({
        title: t('notifications.error.title'),
        message: t('notifications.error.invalidLink'),
        color: 'red',
      });
      return;
    }

    resetPasswordMutation.mutate({ token, password });
  };

  // Invalid or missing token
  if (!token) {
    return (
      <AuthLayout>
        <Paper p='xl' radius='lg' style={cardStyles}>
          <Box ta='center' mb='lg'>
            <Box mb='md'>
              <IconAlertCircle size={64} color='#f87171' />
            </Box>
            <Title
              order={1}
              c='white'
              fz='1.75rem'
              fw={600}
              style={{ letterSpacing: '0.5px' }}
            >
              {t('invalidLink.title')}
            </Title>
          </Box>

          <Box ta='center' mb='xl'>
            <Text c='rgba(255, 255, 255, 0.6)' fz='0.95rem' lh={1.6}>
              {t('invalidLink.message')}
            </Text>
          </Box>

          <Stack gap='sm'>
            <Button
              variant='primary'
              fullWidth
              onClick={() => router.push('/forgot-password')}
            >
              {t('invalidLink.requestNewLink')}
            </Button>
            <Button
              variant='ghost'
              fullWidth
              onClick={() => router.push('/login')}
            >
              {t('invalidLink.backToLogin')}
            </Button>
          </Stack>
        </Paper>
      </AuthLayout>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <AuthLayout>
        <Paper p='xl' radius='lg' style={cardStyles}>
          <Box ta='center' mb='lg'>
            <Box
              mb='md'
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <IconCheck size={32} color='#4ade80' />
            </Box>
            <Title
              order={1}
              c='white'
              fz='1.75rem'
              fw={600}
              style={{ letterSpacing: '0.5px' }}
            >
              {t('success.title')}
            </Title>
          </Box>

          <Box ta='center' mb='xl'>
            <Text c='rgba(255, 255, 255, 0.6)' fz='0.95rem' lh={1.6}>
              {t('success.message')}
            </Text>
          </Box>

          <Button
            variant='primary'
            fullWidth
            onClick={() => router.push('/login')}
          >
            {t('success.goToLogin')}
          </Button>
        </Paper>
      </AuthLayout>
    );
  }

  // Reset password form
  return (
    <AuthLayout>
      <Paper p='xl' radius='lg' style={cardStyles}>
        <Box ta='center' mb='xl'>
          <Box
            mb='md'
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <IconLock size={32} color='rgba(255, 255, 255, 0.8)' />
          </Box>
          <Title
            order={1}
            c='white'
            fz='1.75rem'
            fw={600}
            mb='xs'
            style={{ letterSpacing: '0.5px' }}
          >
            {t('title')}
          </Title>
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.95rem'>
            {t('subtitle')}
          </Text>
        </Box>

        {resetPasswordMutation.error ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color='red'
            mb='md'
            radius='sm'
            styles={{
              root: {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              },
              message: {
                color: '#f87171',
              },
              icon: {
                color: '#f87171',
              },
            }}
          >
            {resetPasswordMutation.error.message ||
              t('notifications.error.message')}
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit}>
          <Stack gap='md'>
            <FormField
              label={tFields('newPassword.label')}
              type='password'
              id='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={tFields('newPassword.placeholder')}
              required
            />
            <FormField
              label={tFields('confirmPassword.label')}
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder={tFields('confirmPassword.placeholder')}
              required
            />
            <Button
              type='submit'
              fullWidth
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending
                ? t('resetting')
                : t('submitButton')}
            </Button>
          </Stack>
        </form>

        <Box
          ta='center'
          mt='lg'
          pt='lg'
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem'>
            {t('rememberPassword')}{' '}
            <Link
              href='/login'
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
              }}
            >
              {t('backToLogin')}
            </Link>
          </Text>
        </Box>
      </Paper>
    </AuthLayout>
  );
};
