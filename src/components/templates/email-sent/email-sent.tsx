'use client';

import {
  Box,
  Divider,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/src/components/atoms';
import { AuthLayout } from '@/src/components/templates';
import { useResendVerificationEmail } from '@/src/hooks';
import { cardStyles } from '@/src/theme';

export const EmailSent = () => {
  const t = useTranslations('auth.emailSent');
  const tCommon = useTranslations('common');

  const router = useRouter();
  const searchParameters = useSearchParams();
  const email = searchParameters.get('email') || '';
  const decodedEmail = email ? decodeURIComponent(email) : '';
  const [resendStatus, setResendStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const resendMutation = useResendVerificationEmail({
    onSuccess: () => {
      setResendStatus('success');
    },
    onError: () => {
      setResendStatus('error');
    },
  });

  const handleResendEmail = () => {
    if (decodedEmail) {
      setResendStatus('idle');
      resendMutation.mutate(decodedEmail);
    }
  };

  const handleOpenGmail = () => {
    window.open('https://mail.google.com', '_blank');
  };

  const handleOpenOutlook = () => {
    window.open('https://outlook.live.com', '_blank');
  };

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
            {t('title')}
          </Title>
        </Box>

        <Box ta='center' mb='xl'>
          <Text c='rgba(255, 255, 255, 0.9)' fz='1rem' lh={1.6} mb='xs'>
            {t('message')}
          </Text>
          {decodedEmail ? (
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
              {decodedEmail}
            </Text>
          ) : null}
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem' lh={1.5}>
            {t('instructions')}
          </Text>
        </Box>

        <Stack gap='sm'>
          <Button variant='primary' fullWidth onClick={handleOpenGmail}>
            {t('openGmail')}
          </Button>
          <Button variant='ghost' fullWidth onClick={handleOpenOutlook}>
            {t('openOutlook')}
          </Button>
        </Stack>

        <Divider
          label={tCommon('or')}
          labelPosition='center'
          my='lg'
          styles={{
            label: {
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.85rem',
              textTransform: 'lowercase',
            },
            root: {
              '&::before, &::after': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            },
          }}
        />

        <Button variant='ghost' fullWidth onClick={() => router.push('/login')}>
          {t('goToLogin')}
        </Button>

        <Box
          ta='center'
          mt='xl'
          pt='lg'
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <Text c='rgba(255, 255, 255, 0.5)' fz='0.85rem' lh={1.5}>
            {t('didntReceive')}{' '}
            <UnstyledButton
              onClick={handleResendEmail}
              disabled={resendMutation.isPending || !decodedEmail}
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'underline',
                opacity: resendMutation.isPending || !decodedEmail ? 0.5 : 1,
                cursor:
                  resendMutation.isPending || !decodedEmail
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              {resendMutation.isPending ? t('sending') : t('resendEmail')}
            </UnstyledButton>
          </Text>
          {resendStatus === 'success' && (
            <Text c='#4ade80' fz='0.85rem' mt='sm'>
              {t('resendSuccess')}
            </Text>
          )}
          {resendStatus === 'error' && (
            <Text c='#f87171' fz='0.85rem' mt='sm'>
              {resendMutation.error?.message || t('resendError')}
            </Text>
          )}
        </Box>
      </Paper>
    </AuthLayout>
  );
};
