'use client';

import { Anchor, Box, Divider, Paper, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { Button } from '@/src/components/atoms';

interface AuthFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  onSubmit: (event: FormEvent) => void;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  socialLogin?: ReactNode;
  isLoading?: boolean;
  error?: string | null;
}

export const AuthForm = ({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  socialLogin,
  isLoading = false,
  error = null,
}: AuthFormProps) => {
  const tCommon = useTranslations('common');
  const previousError = useRef<string | null>(null);

  // Show toast notification when error changes
  useEffect(() => {
    if (error && error !== previousError.current) {
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red',
      });
    }
    previousError.current = error;
  }, [error]);

  return (
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
          {title}
        </Title>
        <Text c='rgba(255, 255, 255, 0.6)' fz='0.95rem'>
          {subtitle}
        </Text>
      </Box>

      <form onSubmit={onSubmit}>
        <Stack gap='md'>
          {children}
          <Button type='submit' fullWidth disabled={isLoading}>
            {isLoading ? tCommon('pleaseWait') : submitLabel}
          </Button>
        </Stack>
      </form>

      {socialLogin ? (
        <Box mt='lg'>
          <Divider
            label={tCommon('or')}
            labelPosition='center'
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
          {socialLogin}
        </Box>
      ) : null}

      <Box
        ta='center'
        mt='lg'
        pt='lg'
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Text c='rgba(255, 255, 255, 0.6)' fz='0.9rem'>
          {footerText}{' '}
          <Anchor
            component={Link}
            href={footerLinkHref}
            fw={500}
            c='rgba(255, 255, 255, 0.9)'
            style={{
              transition: 'color 0.3s ease',
            }}
          >
            {footerLinkText}
          </Anchor>
        </Text>
      </Box>
    </Paper>
  );
};
