'use client';

import { Anchor, Box } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { GoogleLoginButton } from '@/src/components/atoms';
import { FormField } from '@/src/components/molecules';
import { AuthForm } from '@/src/components/organisms';
import { AuthLayout } from '@/src/components/templates';
import { useLogin } from '@/src/hooks';

export const Login = () => {
  const t = useTranslations('auth.login');
  const tFields = useTranslations('auth.fields');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <AuthLayout>
      <AuthForm
        title={t('title')}
        subtitle={t('subtitle')}
        submitLabel={t('submitButton')}
        onSubmit={handleSubmit}
        footerText={t('noAccount')}
        footerLinkText={t('signUp')}
        footerLinkHref='/signup'
        socialLogin={<GoogleLoginButton />}
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
        <Box ta='right' mt='-xs'>
          <Anchor
            component={Link}
            href='/forgot-password'
            fz='0.85rem'
            c='rgba(255, 255, 255, 0.7)'
            style={{
              transition: 'color 0.3s ease',
            }}
          >
            {t('forgotPassword')}
          </Anchor>
        </Box>
      </AuthForm>
    </AuthLayout>
  );
};
