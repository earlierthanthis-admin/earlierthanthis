'use client';

import { Box, Paper, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/src/components/atoms';
import { FormField } from '@/src/components/molecules';
import { AuthLayout } from '@/src/components/templates';
import { useRequestPasswordReset } from '@/src/hooks';
import { cardStyles } from '@/src/theme';

export const ForgotPassword = () => {
  const t = useTranslations('auth.forgotPassword');
  const tFields = useTranslations('auth.fields');

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestResetMutation = useRequestPasswordReset({
    onSuccess: () => {
      setIsSubmitted(true);
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
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    requestResetMutation.mutate({ email });
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <Paper p='xl' radius='lg' style={cardStyles}>
          <Box ta='center' mb='lg'>
            <Box mb='md'>
              <IconMail size={64} color='rgba(255, 255, 255, 0.8)' />
            </Box>
            <Title
              order={1}
              c='white'
              fz='1.75rem'
              fw={600}
              style={{ letterSpacing: '0.5px' }}
            >
              {t('emailSent.title')}
            </Title>
          </Box>

          <Box ta='center' mb='xl'>
            <Text c='rgba(255, 255, 255, 0.9)' fz='1rem' lh={1.6} mb='xs'>
              {t('emailSent.message')}
            </Text>
            <Text
              c='white'
              fz='1.1rem'
              fw={600}
              my='md'
              p='md'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                wordBreak: 'break-all',
              }}
            >
              {email}
            </Text>
            <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem' lh={1.5}>
              {t('emailSent.instructions')}
            </Text>
          </Box>

          <Stack gap='sm'>
            <Button
              variant='primary'
              fullWidth
              onClick={() => window.open('https://mail.google.com', '_blank')}
            >
              {t('emailSent.openGmail')}
            </Button>
            <Button
              variant='ghost'
              fullWidth
              onClick={() => window.open('https://outlook.live.com', '_blank')}
            >
              {t('emailSent.openOutlook')}
            </Button>
          </Stack>

          <Box
            ta='center'
            mt='xl'
            pt='lg'
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <Text c='rgba(255, 255, 255, 0.5)' fz='0.85rem' lh={1.5}>
              {t('rememberPassword')}{' '}
              <Link
                href='/login'
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  textDecoration: 'underline',
                }}
              >
                {t('backToLogin')}
              </Link>
            </Text>
          </Box>
        </Paper>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Paper p='xl' radius='lg' style={cardStyles}>
        <Box ta='center' mb='xl'>
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

        <form onSubmit={handleSubmit}>
          <Stack gap='md'>
            <FormField
              label={tFields('email.label')}
              type='email'
              id='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={tFields('email.placeholder')}
              required
            />
            <Button
              type='submit'
              fullWidth
              disabled={requestResetMutation.isPending}
            >
              {requestResetMutation.isPending
                ? t('sending')
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
