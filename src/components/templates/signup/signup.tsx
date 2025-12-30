'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { GoogleSignupButton } from '@/src/components/atoms';
import { FormField } from '@/src/components/molecules';
import { AuthForm } from '@/src/components/organisms';
import { AuthLayout } from '@/src/components/templates';
import { useSignup } from '@/src/hooks';

export const Signup = () => {
  const t = useTranslations('auth.signup');
  const tFields = useTranslations('auth.fields');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const signupMutation = useSignup();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError(t('validation.passwordMismatch'));
      return;
    }

    signupMutation.mutate({
      fullName: name,
      email,
      password,
    });
  };

  // Show validation error or API error
  const errorMessage = validationError ?? signupMutation.error?.message ?? null;

  return (
    <AuthLayout>
      <AuthForm
        title={t('title')}
        subtitle={t('subtitle')}
        submitLabel={t('submitButton')}
        onSubmit={handleSubmit}
        footerText={t('hasAccount')}
        footerLinkText={t('signIn')}
        footerLinkHref='/login'
        socialLogin={<GoogleSignupButton />}
        isLoading={signupMutation.isPending}
        error={errorMessage}
      >
        <FormField
          label={tFields('fullName.label')}
          type='text'
          id='name'
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={tFields('fullName.placeholder')}
          required
        />
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
          label={tFields('createPassword.label')}
          type='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={tFields('createPassword.placeholder')}
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
      </AuthForm>
    </AuthLayout>
  );
};
