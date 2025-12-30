'use client';

import {
  Box,
  Button as MantineButton,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { IconCheck, IconShieldCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AuthLayout } from '@/src/components/templates';

export const AdminApprovalSuccess = () => {
  const t = useTranslations('admin.approval.success');

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
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <IconCheck size={40} color='#10b981' />
          </Box>
          <Title order={1} c='white' fz='1.75rem' fw={600} mb='xs'>
            {t('title')}
          </Title>
          <Text c='rgba(255, 255, 255, 0.7)' fz='1rem' mb='lg'>
            {t('message')}
          </Text>
          <Box
            p='md'
            mb='lg'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'rgba(251, 191, 36, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}
          >
            <IconShieldCheck size={20} color='#fbbf24' />
            <Text c='#fbbf24' fw={500}>
              {t('adminBadge')}
            </Text>
          </Box>
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem' mb='xl'>
            {t('instructions')}
          </Text>
          <MantineButton
            component={Link}
            href='/admin-login'
            fullWidth
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
            {t('goToLogin')}
          </MantineButton>
        </Box>
      </Paper>
    </AuthLayout>
  );
};
