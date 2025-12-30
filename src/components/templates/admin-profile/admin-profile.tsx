'use client';

import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconCamera,
  IconDeviceFloppy,
  IconLock,
  IconMail,
  IconPhone,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/src/components/atoms';
import { useAdminAuth } from '@/src/hooks';

export const AdminProfile = () => {
  const t = useTranslations('admin.profile');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isSuperAdmin } = useAdminAuth();

  // Mock profile data - in production, this would come from useAdminProfile hook
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email] = useState('admin@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 234 567 8900');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputStyles = {
    label: { color: 'rgba(255, 255, 255, 0.7)' },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: 'white',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.4)',
      },
    },
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb='xl'>
        <Title order={1} c='white' fz='1.75rem' fw={600}>
          {t('title')}
        </Title>
        <Text c='rgba(255, 255, 255, 0.6)' fz='0.95rem'>
          {t('subtitle')}
        </Text>
      </Box>

      <Grid gutter='lg'>
        {/* Profile Card */}
        <Grid.Col span={isMobile ? 12 : 4}>
          <Paper
            p='lg'
            radius='md'
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box ta='center'>
              <Box
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: 16,
                }}
              >
                <Avatar
                  size={100}
                  radius='50%'
                  color='yellow'
                  styles={{
                    placeholder: {
                      backgroundColor: 'rgba(251, 191, 36, 0.2)',
                      color: '#fbbf24',
                    },
                  }}
                >
                  {firstName[0]}
                  {lastName[0]}
                </Avatar>
                <Box
                  component='button'
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#fbbf24',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCamera size={16} color='#000' />
                </Box>
              </Box>
              <Title order={3} c='white' fz='1.25rem' fw={600}>
                {firstName} {lastName}
              </Title>
              <Text c='rgba(255, 255, 255, 0.5)' fz='0.9rem' mb='md'>
                {email}
              </Text>
              <Badge
                size='lg'
                variant='light'
                color={isSuperAdmin ? 'green' : 'yellow'}
                leftSection={<IconShieldCheck size={14} />}
                styles={{
                  root: {
                    backgroundColor: isSuperAdmin
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(251, 191, 36, 0.15)',
                    border: `1px solid ${isSuperAdmin ? 'rgba(16, 185, 129, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`,
                    color: isSuperAdmin ? '#10b981' : '#fbbf24',
                  },
                }}
              >
                {isSuperAdmin ? t('roles.superAdmin') : t('roles.admin')}
              </Badge>
            </Box>
          </Paper>
        </Grid.Col>

        {/* Settings Forms */}
        <Grid.Col span={isMobile ? 12 : 8}>
          <Stack gap='lg'>
            {/* Personal Information */}
            <Paper
              p='lg'
              radius='md'
              style={{
                background:
                  'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Group justify='space-between' mb='lg'>
                <Group gap='sm'>
                  <IconUser size={20} color='#fbbf24' />
                  <Title order={3} c='white' fz='1.1rem' fw={600}>
                    {t('personalInfo.title')}
                  </Title>
                </Group>
                <Button size='sm' leftSection={<IconDeviceFloppy size={14} />}>
                  {t('personalInfo.save')}
                </Button>
              </Group>

              <Grid gutter='md'>
                <Grid.Col span={isMobile ? 12 : 6}>
                  <TextInput
                    label={t('personalInfo.firstName')}
                    value={firstName}
                    onChange={(inputEvent) =>
                      setFirstName(inputEvent.target.value)
                    }
                    leftSection={<IconUser size={16} />}
                    styles={inputStyles}
                  />
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 6}>
                  <TextInput
                    label={t('personalInfo.lastName')}
                    value={lastName}
                    onChange={(inputEvent) =>
                      setLastName(inputEvent.target.value)
                    }
                    leftSection={<IconUser size={16} />}
                    styles={inputStyles}
                  />
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 6}>
                  <TextInput
                    label={t('personalInfo.email')}
                    value={email}
                    disabled
                    leftSection={<IconMail size={16} />}
                    styles={{
                      ...inputStyles,
                      input: {
                        ...inputStyles.input,
                        '&:disabled': {
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          color: 'rgba(255, 255, 255, 0.4)',
                          opacity: 0.8,
                        },
                      },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 6}>
                  <TextInput
                    label={t('personalInfo.phone')}
                    value={phoneNumber}
                    onChange={(inputEvent) =>
                      setPhoneNumber(inputEvent.target.value)
                    }
                    leftSection={<IconPhone size={16} />}
                    styles={inputStyles}
                  />
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Change Password */}
            <Paper
              p='lg'
              radius='md'
              style={{
                background:
                  'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Group justify='space-between' mb='lg'>
                <Group gap='sm'>
                  <IconLock size={20} color='#fbbf24' />
                  <Title order={3} c='white' fz='1.1rem' fw={600}>
                    {t('security.title')}
                  </Title>
                </Group>
                <Button
                  size='sm'
                  leftSection={<IconDeviceFloppy size={14} />}
                  disabled={
                    !currentPassword || !newPassword || !confirmPassword
                  }
                >
                  {t('security.updatePassword')}
                </Button>
              </Group>

              <Stack gap='md'>
                <PasswordInput
                  label={t('security.currentPassword')}
                  value={currentPassword}
                  onChange={(inputEvent) =>
                    setCurrentPassword(inputEvent.target.value)
                  }
                  placeholder={t('security.currentPasswordPlaceholder')}
                  styles={inputStyles}
                />
                <Divider color='rgba(255, 255, 255, 0.1)' />
                <Grid gutter='md'>
                  <Grid.Col span={isMobile ? 12 : 6}>
                    <PasswordInput
                      label={t('security.newPassword')}
                      value={newPassword}
                      onChange={(inputEvent) =>
                        setNewPassword(inputEvent.target.value)
                      }
                      placeholder={t('security.newPasswordPlaceholder')}
                      styles={inputStyles}
                    />
                  </Grid.Col>
                  <Grid.Col span={isMobile ? 12 : 6}>
                    <PasswordInput
                      label={t('security.confirmPassword')}
                      value={confirmPassword}
                      onChange={(inputEvent) =>
                        setConfirmPassword(inputEvent.target.value)
                      }
                      placeholder={t('security.confirmPasswordPlaceholder')}
                      error={
                        confirmPassword && newPassword !== confirmPassword
                          ? t('security.passwordMismatch')
                          : undefined
                      }
                      styles={inputStyles}
                    />
                  </Grid.Col>
                </Grid>
                <Text c='rgba(255, 255, 255, 0.5)' fz='0.85rem'>
                  {t('security.passwordHint')}
                </Text>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
