'use client';

import { Badge, Box, Paper, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconMail, IconShieldCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/src/components/atoms';
import { FormField } from '@/src/components/molecules';
import { AuthLayout } from '@/src/components/templates';
import { useAdminSignup } from '@/src/hooks';

export const AdminSignup = () => {
  const t = useTranslations('admin.signup');
  const tFields = useTranslations('auth.fields');

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const signupMutation = useAdminSignup({
    onSuccess: () => {
      setIsSubmitted(true);
      notifications.show({
        title: t('success.title'),
        message: t('success.message'),
        color: 'green',
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to submit admin request',
        color: 'red',
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signupMutation.mutate({ email });
  };

  if (isSubmitted) {
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
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <IconCheck size={32} color='#10b981' />
            </Box>
            <Title order={2} c='white' fz='1.5rem' fw={600} mb='xs'>
              {t('success.title')}
            </Title>
            <Text c='rgba(255, 255, 255, 0.7)' mb='md'>
              {t('success.message')}
            </Text>
            <Box
              p='md'
              mb='lg'
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <IconMail
                size={20}
                color='rgba(255, 255, 255, 0.7)'
                style={{ marginBottom: 8 }}
              />
              <Text c='white' fw={500}>
                {email}
              </Text>
            </Box>
            <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem'>
              {t('success.instructions')}
            </Text>
          </Box>
        </Paper>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Box mb='md' ta='center'>
        <Badge
          size='lg'
          variant='light'
          color='yellow'
          leftSection={<IconShieldCheck size={16} />}
          styles={{
            root: {
              backgroundColor: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              color: '#fbbf24',
            },
          }}
        >
          {t('badge')}
        </Badge>
      </Box>
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
            <Text c='rgba(255, 255, 255, 0.5)' fz='0.85rem'>
              {t('passwordNote')}
            </Text>
            <Button type='submit' fullWidth disabled={signupMutation.isPending}>
              {signupMutation.isPending ? t('submitting') : t('submitButton')}
            </Button>
          </Stack>
        </form>

        <Box
          ta='center'
          mt='lg'
          pt='lg'
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem'>
            {t('hasAccount')}{' '}
            <a
              href='/admin-login'
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              {t('signIn')}
            </a>
          </Text>
        </Box>
      </Paper>
      <Text ta='center' mt='lg' fz='0.85rem' c='rgba(255, 255, 255, 0.5)'>
        {t('userSignupHint')}
      </Text>
    </AuthLayout>
  );
};
