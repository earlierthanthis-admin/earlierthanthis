'use client';

import {
  Badge,
  Box,
  Burger,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconChevronDown,
  IconLogout,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useAdminAuth, useAdminLogout, useAdminProfile } from '@/src/hooks';

interface AdminNavbarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const AdminNavbar = ({
  isSidebarCollapsed,
  onToggleSidebar,
}: AdminNavbarProps) => {
  const t = useTranslations('admin.navbar');
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { isSuperAdmin } = useAdminAuth();
  const { data: profile } = useAdminProfile();
  const logoutMutation = useAdminLogout();

  const handleLogout = () => {
    setIsMenuOpened(false);
    logoutMutation.mutate();
  };

  const displayName =
    profile?.firstName ?? profile?.email?.split('@')[0] ?? t('admin');

  const sidebarWidth = isMobile ? 0 : isSidebarCollapsed ? 80 : 280;

  return (
    <Box
      component='header'
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarWidth,
        right: 0,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        background:
          'linear-gradient(180deg, rgba(10, 10, 25, 0.95) 0%, rgba(10, 10, 25, 0.9) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 99,
        transition: 'left 0.3s ease',
      }}
    >
      {/* Left Side - Burger (Mobile) or Page Title */}
      <Group gap='md'>
        {isMobile ? (
          <Burger
            opened={false}
            onClick={onToggleSidebar}
            color='rgba(255, 255, 255, 0.8)'
            size='sm'
          />
        ) : null}
      </Group>

      {/* Right Side - User Menu */}
      <Group gap='md'>
        {/* Role Badge */}
        <Badge
          size='sm'
          variant='light'
          color={isSuperAdmin ? 'green' : 'yellow'}
          leftSection={<IconShieldCheck size={12} />}
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
          {isSuperAdmin ? t('superAdmin') : t('admin')}
        </Badge>

        {/* User Menu */}
        <Menu
          opened={isMenuOpened}
          onChange={setIsMenuOpened}
          position='bottom-end'
          offset={8}
          styles={{
            dropdown: {
              backgroundColor: 'rgba(20, 20, 40, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              minWidth: '160px',
            },
            item: {
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            },
            itemSection: {
              marginRight: '0.5rem',
            },
          }}
        >
          <Menu.Target>
            <UnstyledButton
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'background 0.2s ease',
              }}
            >
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconUser size={18} />
              </Box>
              <Text fz='0.9rem' fw={500}>
                {displayName}
              </Text>
              <IconChevronDown
                size={14}
                style={{
                  transition: 'transform 0.2s ease',
                  transform: isMenuOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href='/admin/profile'
              leftSection={<IconUser size={14} />}
            >
              {t('profile')}
            </Menu.Item>
            <Menu.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Menu.Item
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              leftSection={<IconLogout size={14} />}
              color='red'
            >
              {logoutMutation.isPending ? t('loggingOut') : t('logout')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
};
