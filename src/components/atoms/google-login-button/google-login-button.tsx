'use client';

import { Box, Button, Group, Loader, Text } from '@mantine/core';
import type { CodeResponse } from '@react-oauth/google';
import { useGoogleLogin as useGoogleOAuthLogin } from '@react-oauth/google';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { GoogleIcon } from '@/src/components/atoms';
import { useGoogleLogin } from '@/src/hooks';

export const GoogleLoginButton: React.FC = () => {
  const t = useTranslations('google');

  const [oauthError, setOauthError] = useState<string | null>(null);

  const googleLoginMutation = useGoogleLogin();

  const login = useGoogleOAuthLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse: CodeResponse) => {
      const { code } = codeResponse;
      if (!code) {
        setOauthError(t('errors.noAuthCode'));
        return;
      }
      setOauthError(null);
      googleLoginMutation.mutate({ code });
    },
    onError: () => {
      setOauthError(t('errors.loginFailed'));
    },
  });

  const errorMessage = oauthError ?? googleLoginMutation.error?.message ?? null;

  return (
    <Box w='100%' mt='md'>
      {googleLoginMutation.isPending ? (
        <Group justify='center' h={50}>
          <Loader size='sm' color='blue' />
        </Group>
      ) : (
        <Button
          onClick={() => login()}
          fullWidth
          h={50}
          mt='xs'
          leftSection={<GoogleIcon />}
          disabled={googleLoginMutation.isPending}
          styles={{
            root: {
              backgroundColor: '#fff',
              color: '#000',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              fontWeight: 500,
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&:disabled': {
                opacity: 0.6,
              },
            },
          }}
        >
          {googleLoginMutation.isPending ? t('signingIn') : t('continueWith')}
        </Button>
      )}
      {errorMessage ? (
        <Text c='red' size='sm' ta='center' mt='xs'>
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
};
