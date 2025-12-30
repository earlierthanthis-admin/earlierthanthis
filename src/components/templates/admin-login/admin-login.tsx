'use client';

import { Badge, Box, Text } from '@mantine/core';
import { IconShieldCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FormField } from '@/src/components/molecules';
import { AuthForm } from '@/src/components/organisms';
import { AuthLayout } from '@/src/components/templates';
import { useAdminLogin } from '@/src/hooks';

export const AdminLogin = () => {
  const t = useTranslations('admin.login');
  const tFields = useTranslations('auth.fields');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useAdminLogin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

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
      <AuthForm
        title={t('title')}
        subtitle={t('subtitle')}
        submitLabel={t('submitButton')}
        onSubmit={handleSubmit}
        footerText={t('noAccount')}
        footerLinkText={t('requestAccess')}
        footerLinkHref='/admin-signup'
        isLoading={loginMutation.isPending}
        error={loginMutation.error?.message ?? null}
      >
        <FormField
          label={tFields('email.label')}
          type='email'
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={tFields('email.placeholder')}
          required
        />
        <FormField
          label={tFields('password.label')}
          type='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={tFields('password.placeholder')}
          required
        />
      </AuthForm>
      <Text ta='center' mt='lg' fz='0.85rem' c='rgba(255, 255, 255, 0.5)'>
        {t('userLoginHint')}
      </Text>
    </AuthLayout>
  );
};
