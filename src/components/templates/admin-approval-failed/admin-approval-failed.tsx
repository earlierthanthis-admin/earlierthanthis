'use client';

import {
  Box,
  Button as MantineButton,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AuthLayout } from '@/src/components/templates';

export const AdminApprovalFailed = () => {
  const t = useTranslations('admin.approval.failed');

  return (
    <AuthLayout>
      <Paper
        p='xl'
        radius='lg'
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box ta='center'>
          <Box
            mb='lg'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <IconAlertTriangle size={40} color='#ef4444' />
          </Box>
          <Title order={1} c='white' fz='1.75rem' fw={600} mb='xs'>
            {t('title')}
          </Title>
          <Text c='rgba(255, 255, 255, 0.7)' fz='1rem' mb='lg'>
            {t('message')}
          </Text>
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem' mb='xl'>
            {t('instructions')}
          </Text>
          <MantineButton
            component={Link}
            href='/admin-signup'
            fullWidth
            mb='sm'
            styles={{
              root: {
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                border: 'none',
                color: '#000',
                fontWeight: 600,
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                },
              },
            }}
          >
            {t('requestAgain')}
          </MantineButton>
          <MantineButton
            component={Link}
            href='/'
            fullWidth
            variant='outline'
            styles={{
              root: {
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
            }}
          >
            {t('goHome')}
          </MantineButton>
        </Box>
      </Paper>
    </AuthLayout>
  );
};
